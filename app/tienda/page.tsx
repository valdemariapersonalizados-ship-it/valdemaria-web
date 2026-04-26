"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userEmail, setUserEmail] = useState("");

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rut, setRut] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [envio, setEnvio] = useState("retiro");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarProductos();
    cargarUsuario();
  }, []);

  async function cargarUsuario() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      setUserEmail(user.email);
      setCorreo(user.email);
    }
  }

  async function cargarProductos() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    setProducts(data || []);
  }

  function agregarCarrito(producto: Product) {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...producto, quantity: 1 }];
    });
  }

  function subtotal() {
    return cart.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );
  }

  function costoEnvio() {
    return envio === "bluexpress" ? 3990 : 0;
  }

  function iva() {
    return Math.round(subtotal() * 0.19);
  }

  function total() {
    return subtotal() + iva() + costoEnvio();
  }

  async function pagarConMercadoPago() {
    if (!nombre || !correo || !telefono) {
      alert("Completa nombre, correo y teléfono.");
      return;
    }

    if (cart.length === 0) {
      alert("Agrega productos al carrito.");
      return;
    }

    setLoading(true);

    const numeroPedido = "VDM-" + Math.floor(100000 + Math.random() * 900000);

    const { error } = await supabase.from("orders").insert([
      {
        order_number: numeroPedido,
        customer_name: nombre,
        customer_email: correo,
        customer_phone: telefono,
        customer_rut: rut,
        shipping_method: envio,
        shipping_region: region,
        shipping_city: comuna,
        shipping_address: direccion,
        items: cart,
        subtotal: subtotal(),
        shipping_total: costoEnvio(),
        iva_total: iva(),
        final_total: total(),
        payment_status: "pendiente",
        user_email: userEmail || correo,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error al crear pedido.");
      setLoading(false);
      return;
    }

    const mpItems = [
      ...cart.map((item) => ({
        title: `${item.name} x${item.quantity}`,
        quantity: 1,
        unit_price: Number(item.price) * item.quantity,
        currency_id: "CLP",
      })),
      {
        title: "IVA 19%",
        quantity: 1,
        unit_price: iva(),
        currency_id: "CLP",
      },
      {
        title:
          envio === "bluexpress"
            ? "Envío Blue Express"
            : "Retiro en tienda",
        quantity: 1,
        unit_price: costoEnvio(),
        currency_id: "CLP",
      },
    ];

    const res = await fetch("/api/mercadopago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: mpItems,
        name: nombre,
        email: correo,
        order_number: numeroPedido,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("No se pudo generar el pago.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7eef4] p-5 md:p-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-black">
          Tienda Valdemaria
        </h1>

        <p className="mt-2 text-slate-600">
          Productos personalizados disponibles.
        </p>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {products.map((product) => (
            <div key={product.id} className="rounded-3xl bg-white p-5 shadow">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full rounded-2xl object-cover"
                />
              )}

              <p className="mt-4 text-sm font-black uppercase text-pink-500">
                {product.category}
              </p>

              <h2 className="mt-1 text-2xl font-black">{product.name}</h2>

              <p className="mt-2 text-2xl font-black">${product.price}</p>

              <p className="mt-2 text-sm text-slate-600">
                {product.description}
              </p>

              <button
                onClick={() => agregarCarrito(product)}
                className="mt-5 w-full rounded-full bg-pink-500 py-3 font-black text-white"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 shadow">
          <h2 className="text-3xl font-black">🛒 Checkout</h2>

          <p className="mt-2 text-sm text-slate-500">
            {cart.length === 0
              ? "Carrito vacío"
              : `${cart.length} producto(s) agregado(s)`}
          </p>

          <div className="mt-5 space-y-3">
            <input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            <input
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            <input
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            <input
              placeholder="RUT"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            <select
              value={envio}
              onChange={(e) => setEnvio(e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="retiro">Retiro en tienda</option>
              <option value="bluexpress">Envío Blue Express</option>
            </select>

            <input
              placeholder="Región"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            <input
              placeholder="Comuna"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

            <input
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div className="mt-6 space-y-2 border-t pt-5 text-lg">
            <p>Subtotal: ${subtotal()}</p>
            <p>IVA 19%: ${iva()}</p>
            <p>Envío: ${costoEnvio()}</p>
            <p className="text-2xl font-black">Total: ${total()}</p>
          </div>

          <button
            onClick={pagarConMercadoPago}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-pink-500 py-4 text-lg font-black text-white disabled:opacity-60"
          >
            {loading ? "Creando pago..." : "Pagar con Mercado Pago"}
          </button>
        </section>
      </div>
    </main>
  );
}
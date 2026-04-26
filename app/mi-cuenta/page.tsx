"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_method: string;
  shipping_region: string;
  shipping_city: string;
  shipping_address: string;
  items: any[];
  subtotal: number;
  shipping_total: number;
  iva_total: number;
  final_total: number;
  payment_status: string;
  created_at: string;
};

export default function MiCuentaPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      window.location.href = "/login";
      return;
    }

    setEmail(user.email);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data || []);
  }

  async function cerrarSesion() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-pink-50 p-6 text-slate-900">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-pink-600">Mi Cuenta</h1>
            <p className="mt-2 text-slate-600">{email}</p>
          </div>

          <button
            onClick={cerrarSesion}
            className="rounded-full bg-pink-500 px-6 py-3 font-black text-white"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-sm text-slate-500">Pedidos</p>
            <p className="text-3xl font-black">{orders.length}</p>
          </div>

          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-sm text-slate-500">Cursos</p>
            <p className="text-3xl font-black">0</p>
          </div>

          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-sm text-slate-500">Descargas</p>
            <p className="text-3xl font-black">0</p>
          </div>

          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-sm text-slate-500">Direcciones</p>
            <p className="text-3xl font-black">0</p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black">Historial de pedidos</h2>

          {orders.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-pink-100 bg-pink-50 p-5 text-slate-600">
              Aún no tienes pedidos registrados.
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-3xl border border-pink-100 bg-white p-6 shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-pink-600">
                        {order.order_number}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {new Date(order.created_at).toLocaleString("es-CL")}
                      </p>
                    </div>

                    <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-600">
                      {order.payment_status || "pendiente"}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-black">Entrega</h4>
                      <p className="text-sm text-slate-600">
                        {order.shipping_method}
                      </p>
                      <p className="text-sm text-slate-600">
                        {order.shipping_address}
                      </p>
                      <p className="text-sm text-slate-600">
                        {order.shipping_city}, {order.shipping_region}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-black">Totales</h4>
                      <p className="text-sm text-slate-600">
                        Subtotal: ${order.subtotal}
                      </p>
                      <p className="text-sm text-slate-600">
                        Envío: ${order.shipping_total}
                      </p>
                      <p className="text-sm text-slate-600">
                        IVA: ${order.iva_total}
                      </p>
                      <p className="mt-1 font-black text-pink-600">
                        Total: ${order.final_total}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-black">Productos</h4>
                    <div className="mt-2 space-y-2">
                      {order.items?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="rounded-2xl bg-pink-50 p-3 text-sm"
                        >
                          <p className="font-bold">{item.name}</p>
                          <p className="text-slate-600">
                            Precio: ${item.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
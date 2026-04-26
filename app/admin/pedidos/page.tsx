"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_rut: string;
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

export default function AdminPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    cargarPedidos();
  }, []);

  async function cargarPedidos() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      alert("Error al cargar pedidos");
      return;
    }

    setOrders(data || []);
  }

  return (
    <main className="min-h-screen bg-pink-50 p-8 text-slate-900">
      <h1 className="text-4xl font-black text-pink-600">
        Pedidos Valdemaria
      </h1>

      <section className="mt-8 space-y-5">
        {orders.length === 0 && (
          <div className="rounded-3xl bg-white p-6 shadow">
            Aún no hay pedidos.
          </div>
        )}

        {orders.map((order) => (
          <div key={order.id} className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-pink-600">
                  {order.order_number}
                </h2>
                <p className="text-sm text-slate-500">
                  {new Date(order.created_at).toLocaleString("es-CL")}
                </p>
              </div>

              <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-600">
                {order.payment_status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-black">Cliente</h3>
                <p>{order.customer_name}</p>
                <p>{order.customer_email}</p>
                <p>{order.customer_phone}</p>
                <p>{order.customer_rut}</p>
              </div>

              <div>
                <h3 className="font-black">Envío</h3>
                <p>{order.shipping_method}</p>
                <p>{order.shipping_address}</p>
                <p>
                  {order.shipping_city}, {order.shipping_region}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-black">Productos</h3>
              <div className="mt-2 space-y-2">
                {order.items?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-pink-50 p-3 text-sm"
                  >
                    <p className="font-bold">{item.name}</p>
                    <p>
                      Cantidad: {item.quantity} · Precio: ${item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm">
              <p>Subtotal: ${order.subtotal}</p>
              <p>Envío: ${order.shipping_total}</p>
              <p>IVA: ${order.iva_total}</p>
              <p className="mt-2 text-xl font-black text-pink-600">
                Total: ${order.final_total}
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
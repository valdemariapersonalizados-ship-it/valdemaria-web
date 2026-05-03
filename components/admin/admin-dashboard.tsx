"use client";

import { useMemo, useState } from "react";
import { catalog } from "@/lib/data/catalog";

type Product = { id: string; name: string; price: number };

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(catalog.map((p) => ({ id: p.id, name: p.name, price: p.price })));
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const totalProducts = useMemo(() => products.length, [products]);

  function addProduct() {
    if (!name || price <= 0) return;
    setProducts((prev) => [...prev, { id: crypto.randomUUID(), name, price }]);
    setName("");
    setPrice(0);
  }

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="glass-card p-4">
        <h3 className="font-semibold">Productos ({totalProducts})</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {products.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded bg-fuchsia-50 p-2">
              <span>{p.name} - ${p.price.toLocaleString("es-CO")}</span>
              <button onClick={() => removeProduct(p.id)} className="rounded bg-red-500 px-2 py-1 text-xs text-white">Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass-card p-4">
        <h3 className="font-semibold">Crear producto rápido</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-3 w-full rounded border p-2" placeholder="Nombre" />
        <input value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-2 w-full rounded border p-2" type="number" placeholder="Precio" />
        <button onClick={addProduct} className="mt-3 w-full rounded bg-fuchsia-600 py-2 text-white">Guardar</button>
        <p className="mt-3 text-xs text-neutral-600">Siguiente paso: persistir CRUD en Supabase (tabla products + storage).</p>
      </div>
    </div>
  );
}

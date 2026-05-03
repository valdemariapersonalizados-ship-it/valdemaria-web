"use client";

import { catalog } from "@/lib/data/catalog";
import { useCart } from "@/components/providers/cart-provider";

export function ProductGrid() {
  const { addItem, items, total, whatsappCheckoutUrl, clearCart } = useCart();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-4 md:grid-cols-2">
        {catalog.map((product) => (
          <article key={product.id} className="glass-card p-4">
            <div className="mb-3 h-32 rounded-lg bg-fuchsia-100" />
            <p className="text-xs uppercase tracking-wide text-violet-700">{product.category}</p>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-neutral-600">{product.description}</p>
            <p className="mt-2 text-lg font-bold">${product.price.toLocaleString("es-CO")}</p>
            <button onClick={() => addItem(product)} className="mt-3 rounded bg-fuchsia-600 px-3 py-2 text-sm text-white">Agregar</button>
          </article>
        ))}
      </div>
      <aside className="glass-card h-fit p-4">
        <h3 className="font-semibold">Carrito</h3>
        <ul className="mt-2 space-y-2 text-sm">
          {items.length === 0 ? <li className="text-neutral-500">Tu carrito está vacío.</li> : items.map((item) => <li key={item.id}>{item.name} x{item.quantity}</li>)}
        </ul>
        <p className="mt-4 font-semibold">Total: ${total.toLocaleString("es-CO")}</p>
        <a href={items.length ? whatsappCheckoutUrl : "#"} className={`mt-3 inline-block w-full rounded px-3 py-2 text-center text-white ${items.length ? "bg-emerald-600" : "cursor-not-allowed bg-emerald-300"}`}>
          Finalizar por WhatsApp
        </a>
        <button onClick={clearCart} className="mt-2 w-full rounded border border-neutral-300 px-3 py-2 text-sm">Vaciar carrito</button>
      </aside>
    </div>
  );
}

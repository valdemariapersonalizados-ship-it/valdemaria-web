"use client";

import { useState } from "react";
import { removeBackgroundMock } from "@/lib/utils/remove-bg";

const leftSteps = ["Subir producto", "Recorte IA Pro", "Generar modelo 3D", "Subir diseño", "Personalizar"];
const finishes = ["Glitter", "Barniz UV", "Relieve", "Tornasol", "Metálico"];

export function StudioWorkspace() {
  const [status, setStatus] = useState("Listo para comenzar");

  async function handleMockIA() {
    setStatus("Procesando recorte IA...");
    await removeBackgroundMock("mock-image");
    setStatus("Recorte IA completado (modo mock)");
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[250px_1fr_280px]">
      <aside className="glass-card p-4">
        <h3 className="mb-3 font-semibold">Flujo Studio</h3>
        <ul className="space-y-2 text-sm">
          {leftSteps.map((step, idx) => <li key={step} className="rounded-lg bg-fuchsia-50 p-2">{idx + 1}. {step}</li>)}
        </ul>
        <button onClick={handleMockIA} className="mt-4 w-full rounded bg-violet-600 px-3 py-2 text-white">Ejecutar IA mock</button>
        <p className="mt-2 text-xs text-neutral-600">{status}</p>
      </aside>
      <main className="glass-card p-4">
        <h3 className="font-semibold">Vista 3D central</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_180px]">
          <div className="h-96 rounded-xl border border-dashed border-fuchsia-200 bg-white p-4">Vista grande producto + diseño editable (mover/escalar/rotar/curvar)</div>
          <div className="space-y-2 text-sm">
            <button className="w-full rounded bg-fuchsia-600 px-3 py-2 text-white">Vista 360°</button>
            <button className="w-full rounded bg-violet-600 px-3 py-2 text-white">Vista libre</button>
            <div className="grid grid-cols-2 gap-2">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-14 rounded bg-fuchsia-100" />)}</div>
          </div>
        </div>
      </main>
      <aside className="glass-card p-4 text-sm">
        <h3 className="mb-3 font-semibold">Panel de acabados</h3>
        <p>Color vaso, color tapa, brillo y fondo.</p>
        <div className="mt-3 space-y-2">{finishes.map((finish) => <label key={finish} className="flex items-center gap-2"><input type="checkbox" /> {finish}</label>)}</div>
        <div className="mt-4 space-y-2">
          <button className="w-full rounded bg-neutral-900 px-3 py-2 text-white">Descargar imagen</button>
          <button className="w-full rounded bg-neutral-700 px-3 py-2 text-white">Descargar MP4</button>
          <button className="w-full rounded bg-emerald-600 px-3 py-2 text-white">Enviar por WhatsApp</button>
          <button className="w-full rounded bg-fuchsia-600 px-3 py-2 text-white">Agregar al carrito</button>
        </div>
      </aside>
    </section>
  );
}

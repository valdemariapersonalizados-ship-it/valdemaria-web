import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const blocks = ["Regalos personalizados", "Empresas y marcas", "Emprendedoras creativas", "Cursos digitales", "Insumos Pro"];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl space-y-10 px-6 py-10">
        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-fuchsia-700">Valdemaria Studio Pro</p>
            <h1 className="mt-2 text-5xl font-bold leading-tight">Diseña, aprueba y vende personalizados con estilo <span className="gradient-text">premium</span>.</h1>
            <p className="mt-4 text-neutral-700">UV DTF, DTF textil, mockups 3D y cursos para escalar tu negocio creativo.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tienda" className="rounded-lg bg-fuchsia-600 px-4 py-2 text-white">Comprar ahora</Link>
              <Link href="/studio" className="rounded-lg bg-violet-600 px-4 py-2 text-white">Abrir Studio 3D</Link>
            </div>
          </div>
          <div className="glass-card p-4">
            <video controls className="w-full rounded-xl" poster="https://placehold.co/1200x675/fbcfe8/831843?text=Video+Promocional+Valdemaria" />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-5">
          {blocks.map((block) => <article key={block} className="glass-card p-4 text-center text-sm font-medium">{block}</article>)}
        </section>
      </main>
      <Footer />
    </>
  );
}

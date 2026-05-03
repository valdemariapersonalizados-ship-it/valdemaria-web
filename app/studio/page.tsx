import { Header } from "@/components/layout/header";
import { StudioWorkspace } from "@/components/studio/studio-workspace";

export default function StudioPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-3xl font-bold">Mockup 3D Studio</h1>
        <p className="mb-4 text-neutral-700">Flujo tipo software: carga de producto, IA de recorte, personalización y exportación.</p>
        <StudioWorkspace />
      </main>
    </>
  );
}

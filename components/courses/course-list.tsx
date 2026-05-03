export function CourseList() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="glass-card p-5">
        <h3 className="font-semibold">Curso DTF para emprendedores</h3>
        <p className="mt-2 text-sm text-neutral-600">Acceso privado tras login. Videos desde Supabase Storage.</p>
      </article>
      <article className="glass-card p-5">
        <h3 className="font-semibold">Masterclass Mockups 3D</h3>
        <p className="mt-2 text-sm text-neutral-600">Incluye plantillas, flujo de venta y aprobación por WhatsApp.</p>
      </article>
    </div>
  );
}

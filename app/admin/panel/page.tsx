export default function PanelAdmin() {
  return (
    <main className="min-h-screen bg-pink-50 p-10">
      <h1 className="text-4xl font-black text-pink-600 mb-8">
        Panel Administrador Valdemaria
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-xl border">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Productos</h2>
          <p className="text-slate-600">Agregar productos, fotos y precios.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl border">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Cursos</h2>
          <p className="text-slate-600">Subir videos y clases privadas.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl border">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Pedidos</h2>
          <p className="text-slate-600">Ver compras y clientes.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl border">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Editar Web</h2>
          <p className="text-slate-600">
            Modificar textos, banners y precios.
          </p>
        </div>
      </div>
    </main>
  );
}
import { Header } from "@/components/layout/header";
import { ProductGrid } from "@/components/shop/product-grid";

export default function TiendaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-4 text-3xl font-bold">Tienda personalizable</h1>
        <p className="mb-4">Checkout inicial por WhatsApp, preparado para Mercado Pago.</p>
        <ProductGrid />
      </main>
    </>
  );
}

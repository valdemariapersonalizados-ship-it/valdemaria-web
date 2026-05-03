export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "UV DTF" | "DTF Textil" | "Vasos" | "Cursos" | "Insumos";
};

export const catalog: CatalogProduct[] = [
  { id: "vaso-uv", name: "Vaso UV DTF Premium", description: "Impresión full color con acabado brillante.", price: 39000, category: "UV DTF" },
  { id: "tazon-love", name: "Tazón Love Collection", description: "Tazón personalizado para regalos y marcas.", price: 32000, category: "Vasos" },
  { id: "botella-pro", name: "Botella Deportiva Pro", description: "Botella térmica con diseño curvo editable.", price: 52000, category: "Vasos" },
  { id: "curso-dtf", name: "Curso DTF Emprendedoras", description: "Curso digital con acceso privado.", price: 149000, category: "Cursos" },
];

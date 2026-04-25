"use client";

import { useMemo, useRef, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  detail: string;
  quantity: number;
  total: number;
  fileName?: string;
  notes?: string;
};

type DesignFile = {
  id: string;
  fileName: string;
  preview: string;
  width: string;
  height: string;
  quantity: string;
};

type Placement = {
  id: string;
  preview: string;
  fileName: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  tag: string;
  description: string;
};

type Variant = {
  id: string;
  label: string;
  price: number;
};

type Extra = {
  id: string;
  label: string;
  price: number;
};

const LOGO_SOURCES = [
  "/valdemaira.png",
  "/logo-valdemaria.png",
  "/valdemaria.png",
  "/logo.png",
  "/publiclogo-valdemaria.png/valdemaira.png",
  "/publiclogo-valdemaria.png/valdemaria.png",
];

const PRODUCT_FALLBACKS: Record<string, string[]> = {
  "/productos/tazon1.jpg": ["/productos/tazon1.jpg", "/productos/tazon.jpg", "/tazon1.jpg", "/tazon.jpg"],
  "/productos/vaso1.jpg": ["/productos/vaso1.jpg", "/productos/vaso.jpg", "/vaso1.jpg", "/vaso.jpg"],
  "/productos/uvdtf1.jpg": ["/productos/uvdtf1.jpg", "/productos/uvdtf.jpg", "/uvdtf1.jpg", "/uvdtf.jpg"],
  "/productos/copas1.jpg": ["/productos/copas1.jpg", "/productos/copas.jpg", "/copas1.jpg", "/copas.jpg"],
};

const DEFAULT_SHEET_WIDTH_CM = 30;
const DPI = 300;
const CM_TO_INCH = 1 / 2.54;
const LAYOUT_SERVICE_PRICE = 5000;
const DOWNLOAD_ONLY_PRICE = 5000;
const IVA_RATE = 0.19;

const shippingBaseRates: Record<string, number> = {
  "Arica y Parinacota": 11990,
  Tarapacá: 11990,
  Antofagasta: 10990,
  Atacama: 9990,
  Coquimbo: 8990,
  Valparaíso: 6990,
  "Metropolitana de Santiago": 5990,
  "Libertador General Bernardo O'Higgins": 4034,
  Maule: 6990,
  Ñuble: 7990,
  Biobío: 7990,
  Araucanía: 8990,
  "Los Ríos": 9490,
  "Los Lagos": 9990,
  "Aysén del General Carlos Ibáñez del Campo": 12990,
  "Magallanes y de la Antártica Chilena": 14990,
};

const regionComunas: Record<string, string[]> = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  Tarapacá: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  Antofagasta: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  Atacama: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  Coquimbo: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  Valparaíso: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
  "Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
  "Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  Maule: ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  Ñuble: ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Quirihue", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ránquil", "Treguaco", "San Carlos", "Coihueco", "Ñiquén", "San Fabián", "San Nicolás"],
  Biobío: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
  Araucanía: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
  "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"],
};

const priorityOptions = [
  { id: "normal", label: "Producción normal", detail: "Impresión disponible en 3 a 4 días hábiles según agenda", price: 0 },
  { id: "8h", label: "Prioridad 8 hrs", detail: "Impresión y retiro en tienda dentro de 8 hrs", price: 6000 },
  { id: "12h", label: "Prioridad 12 hrs", detail: "Impresión y retiro en tienda dentro de 12 hrs", price: 5000 },
  { id: "24h", label: "Prioridad 24 hrs", detail: "Impresión y retiro en tienda dentro de 24 hrs", price: 4000 },
];

const printOptions = [
  { id: "uv-gold", label: "UV DTF Gold", price: 19990 },
  { id: "uv-premium", label: "UV DTF Premium", price: 29990 },
  { id: "dtf-textil", label: "DTF Textil", price: 14990 },
];

const mugVariants: Variant[] = [
  { id: "blanco", label: "Tazón blanco clásico", price: 5990 },
  { id: "magico", label: "Tazón mágico", price: 7990 },
  { id: "color", label: "Tazón color interior", price: 6990 },
  { id: "fluor", label: "Tazón flúor", price: 7490 },
  { id: "vidrio", label: "Taza de vidrio", price: 8490 },
];

const mugExtras: Extra[] = [
  { id: "simple", label: "Texto o nombre simple", price: 0 },
  { id: "foto", label: "Foto o diseño personalizado", price: 1500 },
  { id: "doble", label: "Impresión doble cara", price: 2500 },
];

const thermalVariants: Variant[] = [
  { id: "360", label: "Vaso térmico 360 ml", price: 9990 },
  { id: "500", label: "Vaso térmico 500 ml", price: 10490 },
  { id: "600", label: "Vaso térmico 600 ml", price: 11490 },
  { id: "900", label: "Vaso térmico 900 ml", price: 16990 },
  { id: "1200", label: "Vaso térmico 1.2 L", price: 19990 },
];

const thermalExtras: Extra[] = [
  { id: "simple", label: "Nombre o diseño simple", price: 0 },
  { id: "logo", label: "Logo empresa", price: 1500 },
  { id: "premium", label: "Diseño premium", price: 2500 },
  { id: "full", label: "Diseño completo", price: 3500 },
];

const products: Product[] = [
  {
    id: "p1",
    title: "Tazón personalizado",
    price: "$9.990",
    image: "/productos/tazon1.jpg",
    tag: "Regalo favorito",
    description: "Tazones para nombres, fotos, frases, fechas especiales y regalos únicos.",
  },
  {
    id: "p2",
    title: "Vaso térmico glitter",
    price: "$14.990",
    image: "/productos/vaso1.jpg",
    tag: "Top ventas",
    description: "Vasos térmicos premium para nombres, logos o diseños personalizados.",
  },
  {
    id: "p3",
    title: "Impresiones",
    price: "Desde $14.990",
    image: "/productos/uvdtf1.jpg",
    tag: "UV DTF · DTF Textil",
    description: "Impresión UV DTF, DTF Textil, stickers, lienzos, insumos y varias opciones para emprendedores.",
  },
  {
    id: "p4",
    title: "Copas personalizadas",
    price: "$8.990",
    image: "/productos/copas1.jpg",
    tag: "Eventos",
    description: "Copas, tequileros, vasos cortitos y detalles para celebraciones.",
  },
];

function formatCLP(value: number) {
  return `$${Math.round(value).toLocaleString("es-CL")}`;
}

function parseNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function SmartImage({ sources, alt, className, fallback }: { sources: string[]; alt: string; className?: string; fallback?: string }) {
  const [index, setIndex] = useState(0);
  const current = sources[index];

  if (!current) {
    return (
      <div className={`${className || ""} flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 text-center font-serif text-xl italic font-black text-pink-500`}>
        {fallback || "Valdemaria"}
      </div>
    );
  }

  return (
    <img
      key={current}
      src={`${current}?v=valdemaria-logo-1`}
      alt={alt}
      draggable={false}
      className={className}
      onError={() => setIndex((prev) => prev + 1)}
    />
  );
}

function productSources(path: string) {
  return PRODUCT_FALLBACKS[path] || [path];
}

function calculateLayout(files: DesignFile[], canvasWidth: number, minimumCanvasHeight: number, margin: number) {
  let x = 0;
  let y = 0;
  let rowHeight = 0;
  let totalPieces = 0;

  const placements: Placement[] = [];

  files.forEach((file) => {
    const originalW = parseNumber(file.width);
    const originalH = parseNumber(file.height);
    const quantity = Math.max(Number(file.quantity) || 0, 0);

    if (originalW <= 0 || originalH <= 0 || quantity <= 0) return;

    let w = originalW;
    let h = originalH;

    if (w > canvasWidth && h <= canvasWidth) {
      w = originalH;
      h = originalW;
    }

    if (w > canvasWidth) return;

    for (let i = 0; i < quantity; i += 1) {
      if (x + w > canvasWidth) {
        x = 0;
        y += rowHeight + margin;
        rowHeight = 0;
      }

      placements.push({ id: `${file.id}-${i}`, preview: file.preview, fileName: file.fileName, x, y, w, h });
      x += w + margin;
      rowHeight = Math.max(rowHeight, h);
      totalPieces += 1;
    }
  });

  const usedHeight = placements.length ? Math.max(...placements.map((item) => item.y + item.h)) : 0;
  const finalHeight = Math.max(minimumCanvasHeight, usedHeight);
  const usedArea = placements.reduce((sum, item) => sum + item.w * item.h, 0);
  const totalArea = canvasWidth * finalHeight;
  const utilization = totalArea > 0 ? (usedArea / totalArea) * 100 : 0;

  return {
    placements,
    totalPieces,
    usedHeight,
    finalHeight,
    utilization,
  };
}

export default function ValdemariaPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoVideoUrl, setPromoVideoUrl] = useState("");
  const [courseVideos, setCourseVideos] = useState<Array<{ id: string; title: string; url: string }>>([]);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerRut, setCustomerRut] = useState("");
  const [documentType, setDocumentType] = useState<"boleta" | "factura">("boleta");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessActivity, setBusinessActivity] = useState("");
  const [shippingMethod, setShippingMethod] = useState<"retiro" | "bluexpress">("retiro");
  const [shippingRegion, setShippingRegion] = useState("Libertador General Bernardo O'Higgins");
  const [shippingCity, setShippingCity] = useState("Rancagua");
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [createAccount, setCreateAccount] = useState(false);

  const [mugVariant, setMugVariant] = useState("blanco");
  const [mugExtra, setMugExtra] = useState("simple");
  const [mugQuantity, setMugQuantity] = useState(1);
  const [mugFile, setMugFile] = useState<File | null>(null);
  const [mugNotes, setMugNotes] = useState("");

  const [thermalVariant, setThermalVariant] = useState("360");
  const [thermalExtra, setThermalExtra] = useState("simple");
  const [thermalQuantity, setThermalQuantity] = useState(1);
  const [thermalFile, setThermalFile] = useState<File | null>(null);
  const [thermalNotes, setThermalNotes] = useState("");

  const [printType, setPrintType] = useState("uv-gold");
  const [workMode, setWorkMode] = useState("platform");
  const [canvasWidth, setCanvasWidth] = useState(String(DEFAULT_SHEET_WIDTH_CM));
  const [canvasHeight, setCanvasHeight] = useState("100");
  const [margin, setMargin] = useState("0.4");
  const [designFiles, setDesignFiles] = useState<DesignFile[]>([]);
  const [builderNotes, setBuilderNotes] = useState("");
  const [priorityOption, setPriorityOption] = useState("normal");
  const [downloadUnlocked, setDownloadUnlocked] = useState(false);
  const [placementEdits, setPlacementEdits] = useState<Record<string, { x: number; y: number; w: number; h: number }>>({});
  const [activePlacementId, setActivePlacementId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const selectedMug = mugVariants.find((item) => item.id === mugVariant) || mugVariants[0];
  const selectedMugExtra = mugExtras.find((item) => item.id === mugExtra) || mugExtras[0];
  const mugUnitPrice = selectedMug.price + selectedMugExtra.price;

  const selectedThermal = thermalVariants.find((item) => item.id === thermalVariant) || thermalVariants[0];
  const selectedThermalExtra = thermalExtras.find((item) => item.id === thermalExtra) || thermalExtras[0];
  const thermalUnitPrice = selectedThermal.price + selectedThermalExtra.price;

  const selectedPrint = printOptions.find((item) => item.id === printType) || printOptions[0];
  const selectedPriority = priorityOptions.find((item) => item.id === priorityOption) || priorityOptions[0];
  const numericCanvasWidth = Math.max(parseNumber(canvasWidth), 1);
  const numericCanvasHeight = Math.max(parseNumber(canvasHeight), 1);
  const numericMargin = Math.max(parseNumber(margin), 0);

  const layout = useMemo(() => calculateLayout(designFiles, numericCanvasWidth, numericCanvasHeight, numericMargin), [designFiles, numericCanvasWidth, numericCanvasHeight, numericMargin]);

  const effectivePlacements = useMemo<Placement[]>(
    () => layout.placements.map((piece) => ({ ...piece, ...(placementEdits[piece.id] || {}) })),
    [layout.placements, placementEdits]
  );

  const editedUsedHeight = effectivePlacements.length ? Math.max(...effectivePlacements.map((item) => item.y + item.h)) : 0;
  const finalCanvasHeight = Math.max(layout.finalHeight || numericCanvasHeight, editedUsedHeight);
  const chargedMeters = Math.max(1, Math.ceil(finalCanvasHeight / 100));
  const layoutFee = workMode === "we_build" ? LAYOUT_SERVICE_PRICE : 0;
  const builderTotal = chargedMeters * selectedPrint.price + layoutFee + selectedPriority.price;

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const availableComunas = regionComunas[shippingRegion] || [];
  const bluexpressRate = shippingBaseRates[shippingRegion] || 8990;
  const shippingTotal = shippingMethod === "bluexpress" ? bluexpressRate : 0;
  const netTotal = subtotal + shippingTotal;
  const ivaTotal = Math.round(netTotal * IVA_RATE);
  const finalTotal = netTotal + ivaTotal;

  function handlePromoVideoUpload(file: File | null) {
    if (!file) return;
    setPromoVideoUrl(URL.createObjectURL(file));
  }

  function handleCourseVideoUpload(file: File | null) {
    if (!file) return;
    setCourseVideos((prev) => [
      ...prev,
      {
        id: uid(),
        title: file.name,
        url: URL.createObjectURL(file),
      },
    ]);
  }

  function addCart(item: CartItem) {
    setCart((prev) => [...prev, item]);
    setCartOpen(true);
  }

  function addMug() {
    if (!mugFile) {
      alert("Debes subir un archivo para el tazón.");
      return;
    }

    addCart({
      id: uid(),
      title: "Tazón personalizado",
      detail: `${selectedMug.label} · ${selectedMugExtra.label}`,
      quantity: mugQuantity,
      total: mugUnitPrice * mugQuantity,
      fileName: mugFile.name,
      notes: mugNotes,
    });
  }

  function addThermal() {
    if (!thermalFile) {
      alert("Debes subir un archivo para el vaso térmico.");
      return;
    }

    addCart({
      id: uid(),
      title: "Vaso térmico personalizado",
      detail: `${selectedThermal.label} · ${selectedThermalExtra.label}`,
      quantity: thermalQuantity,
      total: thermalUnitPrice * thermalQuantity,
      fileName: thermalFile.name,
      notes: thermalNotes,
    });
  }

  function addBuilderToCart() {
    if (!designFiles.length || !effectivePlacements.length) {
      alert("Debes subir al menos un archivo y completar medidas/cantidad.");
      return;
    }

    addCart({
      id: uid(),
      title: selectedPrint.label,
      detail: `${effectivePlacements.length} unidades · lienzo ${numericCanvasWidth} x ${finalCanvasHeight.toFixed(1)} cm · ${selectedPriority.label}`,
      quantity: 1,
      total: builderTotal,
      fileName: designFiles.map((file) => file.fileName).join(", "),
      notes: `${workMode === "we_build" ? "Incluye armado de lienzo por Valdemaria. " : ""}${selectedPriority.id !== "normal" ? `${selectedPriority.detail}. No incluye tiempo de envío a otra ciudad. ` : ""}${builderNotes}`,
    });
  }

  function handleDesignUpload(files: FileList | null) {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setDesignFiles((prev) => [
          ...prev,
          {
            id: uid(),
            fileName: file.name,
            preview: String(reader.result || ""),
            width: "5",
            height: "5",
            quantity: "1",
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }

  function updateDesignFile(id: string, field: "width" | "height" | "quantity", value: string) {
    setDesignFiles((prev) => prev.map((file) => (file.id === id ? { ...file, [field]: value } : file)));
    setPlacementEdits({});
  }

  function removeDesignFile(id: string) {
    setDesignFiles((prev) => prev.filter((file) => file.id !== id));
    setPlacementEdits((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (key.startsWith(id)) delete next[key];
      });
      return next;
    });
  }

  function sendByEmail() {
    if (!designFiles.length) {
      alert("Primero sube tus archivos.");
      return;
    }

    const details = designFiles
      .map((file, index) => `${index + 1}. ${file.fileName} · ${file.width} x ${file.height} cm · cantidad ${file.quantity}`)
      .join("%0A");

    const body = [
      "Hola Valdemaria, quiero enviar mi lienzo para impresión.",
      "",
      `Tipo: ${selectedPrint.label}`,
      `Lienzo: ${numericCanvasWidth} x ${finalCanvasHeight.toFixed(1)} cm`,
      `Valor estimado: ${formatCLP(builderTotal)}`,
      `Modo: ${workMode}`,
      `Prioridad: ${selectedPriority.label} ${selectedPriority.price ? `(+${formatCLP(selectedPriority.price)})` : ""}`,
      "Importante: los tiempos de prioridad son para impresión y retiro en tienda; no consideran envío a otra ciudad.",
      "",
      "Archivos:",
      details,
      "",
      `Notas: ${builderNotes || "Sin notas"}`,
      "",
      "Adjunto los archivos originales en este correo.",
    ].join("%0A");

    window.location.href = `mailto:valdemaria.personalizados@gmail.com?subject=Solicitud%20de%20impresion%20Valdemaria&body=${body}`;
  }

  function unlockDownloadPurchase() {
    if (!effectivePlacements.length) {
      alert("Primero sube diseños y genera la vista previa.");
      return;
    }

    addCart({
      id: uid(),
      title: "Descarga de lienzo digital",
      detail: `Archivo digital ${numericCanvasWidth} x ${finalCanvasHeight.toFixed(1)} cm · PNG/PDF 300 DPI`,
      quantity: 1,
      total: DOWNLOAD_ONLY_PRICE,
      fileName: designFiles.map((file) => file.fileName).join(", "),
      notes: "Cliente quiere descargar el lienzo para imprimir en otro lugar.",
    });

    alert("Agregué la descarga al carrito por $5.000. Cuando conectemos Mercado Pago, se habilitará automáticamente después del pago.");
  }

  async function downloadPNG300() {
    if (!downloadUnlocked) {
      alert("Para descargar el lienzo en PNG 300 DPI debes pagar primero el valor del lienzo.");
      return;
    }

    if (!effectivePlacements.length) {
      alert("Primero sube diseños y genera la vista previa.");
      return;
    }

    const widthPx = Math.round(numericCanvasWidth * CM_TO_INCH * DPI);
    const heightPx = Math.round(finalCanvasHeight * CM_TO_INCH * DPI);
    const canvas = document.createElement("canvas");
    canvas.width = widthPx;
    canvas.height = heightPx;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    ctx.clearRect(0, 0, widthPx, heightPx);

    await Promise.all(
      effectivePlacements.map(
        (piece) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(
                img,
                Math.round(piece.x * CM_TO_INCH * DPI),
                Math.round(piece.y * CM_TO_INCH * DPI),
                Math.round(piece.w * CM_TO_INCH * DPI),
                Math.round(piece.h * CM_TO_INCH * DPI)
              );
              resolve();
            };
            img.onerror = () => resolve();
            img.src = piece.preview;
          })
      )
    );

    const link = document.createElement("a");
    link.download = `lienzo-valdemaria-${numericCanvasWidth}x${finalCanvasHeight.toFixed(0)}cm-300dpi.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function downloadPDFPrint() {
    if (!downloadUnlocked) {
      alert("Para descargar el PDF debes pagar primero el valor del lienzo.");
      return;
    }

    if (!effectivePlacements.length) {
      alert("Primero sube diseños y genera la vista previa.");
      return;
    }

    const htmlPieces = effectivePlacements
      .map(
        (piece) =>
          `<img src="${piece.preview}" style="position:absolute;left:${piece.x}cm;top:${piece.y}cm;width:${piece.w}cm;height:${piece.h}cm;object-fit:contain;" />`
      )
      .join("");

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!doctype html><html><head><title>Lienzo Valdemaria</title><style>@page{size:${numericCanvasWidth}cm ${finalCanvasHeight.toFixed(1)}cm;margin:0;}html,body{margin:0;padding:0;background:transparent;}#sheet{position:relative;width:${numericCanvasWidth}cm;height:${finalCanvasHeight.toFixed(1)}cm;background:transparent;}</style></head><body><div id="sheet">${htmlPieces}</div><script>window.onload=()=>window.print();</script></body></html>`);
    win.document.close();
  }

  function updatePlacement(id: string, patch: Partial<{ x: number; y: number; w: number; h: number }>) {
    const base = effectivePlacements.find((piece) => piece.id === id);
    setPlacementEdits((prev) => ({
      ...prev,
      [id]: {
        x: prev[id]?.x ?? base?.x ?? 0,
        y: prev[id]?.y ?? base?.y ?? 0,
        w: prev[id]?.w ?? base?.w ?? 0,
        h: prev[id]?.h ?? base?.h ?? 0,
        ...patch,
      },
    }));
  }

  function startDrag(event: React.MouseEvent<HTMLImageElement>, piece: Placement) {
    event.preventDefault();
    setActivePlacementId(piece.id);

    const startX = event.clientX;
    const startY = event.clientY;
    const startPieceX = piece.x;
    const startPieceY = piece.y;
    const box = previewRef.current?.getBoundingClientRect();
    if (!box) return;

    const onMove = (moveEvent: MouseEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / box.width) * numericCanvasWidth;
      const deltaY = ((moveEvent.clientY - startY) / box.height) * finalCanvasHeight;
      const nextX = Math.max(0, Math.min(numericCanvasWidth - piece.w, startPieceX + deltaX));
      const nextY = Math.max(0, startPieceY + deltaY);
      updatePlacement(piece.id, { x: Number(nextX.toFixed(2)), y: Number(nextY.toFixed(2)), w: piece.w, h: piece.h });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function startResize(event: React.MouseEvent<HTMLButtonElement>, piece: Placement) {
    event.preventDefault();
    event.stopPropagation();
    setActivePlacementId(piece.id);

    const startX = event.clientX;
    const startY = event.clientY;
    const startW = piece.w;
    const startH = piece.h;
    const box = previewRef.current?.getBoundingClientRect();
    if (!box) return;

    const onMove = (moveEvent: MouseEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / box.width) * numericCanvasWidth;
      const deltaY = ((moveEvent.clientY - startY) / box.height) * finalCanvasHeight;
      const nextW = Math.max(0.5, Math.min(numericCanvasWidth - piece.x, startW + deltaX));
      const nextH = Math.max(0.5, startH + deltaY);
      updatePlacement(piece.id, { x: piece.x, y: piece.y, w: Number(nextW.toFixed(2)), h: Number(nextH.toFixed(2)) });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function resetManualEdits() {
    setPlacementEdits({});
    setActivePlacementId(null);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-6 py-2 text-xs font-semibold md:text-sm">
          <span>✨ Diseños que enamoran y venden</span>
          <span>💜 Envíos a todo Chile</span>
          <span>🛡️ Productos de calidad premium</span>
          <span>📱 Atención personalizada por WhatsApp</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <SmartImage sources={LOGO_SOURCES} alt="Valdemaria" className="h-16 w-16 rounded-2xl object-contain md:h-20 md:w-20" fallback="V" />
            <div className="hidden sm:block">
              <p className="font-serif text-2xl italic tracking-wide text-pink-500">Valdemaria</p>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Personalizados</p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            <a href="#inicio" className="rounded-full px-4 py-2 text-sm font-bold text-pink-500 hover:bg-pink-50">Inicio</a>
            <a href="#areas" className="rounded-full px-4 py-2 text-sm font-bold text-slate-800 hover:bg-pink-50">Tienda</a>
            <a href="#lienzo" className="rounded-full px-4 py-2 text-sm font-bold text-slate-800 hover:bg-pink-50">Personaliza</a>
            <a href="#empresas" className="rounded-full px-4 py-2 text-sm font-bold text-slate-800 hover:bg-pink-50">Empresas</a>
            <a href="#insumos" className="rounded-full px-4 py-2 text-sm font-bold text-slate-800 hover:bg-pink-50">Insumos</a>
            <a href="#cursos" className="rounded-full px-4 py-2 text-sm font-bold text-slate-800 hover:bg-pink-50">Cursos</a>
            <a href="#contacto" className="rounded-full px-4 py-2 text-sm font-bold text-slate-800 hover:bg-pink-50">Contacto</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://wa.me/56932554129?text=Hola,%20quiero%20cotizar%20en%20Valdemaria" className="hidden h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-xl shadow-sm hover:bg-green-50 md:flex">☎</a>
            <button onClick={() => setCartOpen(true)} className="relative h-11 w-11 rounded-full border border-rose-100 bg-white text-xl shadow-sm hover:bg-pink-50">
              🛒
              {itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white">{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <main id="inicio">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(216,180,254,0.28),_transparent_32%),linear-gradient(180deg,#fff7fb_0%,#ffffff_75%)]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 lg:grid-cols-[0.75fr_1.35fr_0.75fr] lg:py-16">
            <div className="flex justify-center">
              <SmartImage sources={LOGO_SOURCES} alt="Logo Valdemaria" className="h-72 w-72 object-contain drop-shadow-2xl md:h-96 md:w-96" fallback="Valdemaria" />
            </div>

            <div className="text-center">
              <div className="mb-3 text-3xl text-amber-400">♡ ✨</div>
              <h1 className="font-serif text-6xl italic leading-tight text-pink-500 drop-shadow-sm md:text-8xl lg:text-9xl">Valdemaria</h1>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.35em] text-slate-900 md:text-lg">
                Creamos productos que <span className="text-pink-500">destacan</span>
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
                Regalos personalizados, branding empresarial, impresión <span className="font-bold text-pink-500">UV DTF y Textil</span>, insumos y más.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#areas" className="rounded-full bg-pink-500 px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-pink-200 hover:bg-pink-600">🛍 Comprar ahora</a>
                <a href="#lienzo" className="rounded-full bg-purple-500 px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-purple-200 hover:bg-purple-600">✎ Diseñar pedido</a>
                <a href="https://wa.me/56932554129?text=Hola,%20quiero%20cotizar" className="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-black uppercase tracking-wide text-slate-800 shadow-xl shadow-slate-100">🟢 WhatsApp</a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-[2rem] bg-white/80 p-4 text-center shadow-2xl shadow-pink-100 ring-1 ring-pink-100">
                <div className="overflow-hidden rounded-[1.5rem] bg-pink-50 ring-1 ring-pink-100">
                  {promoVideoUrl ? (
                    <video src={promoVideoUrl} controls className="h-48 w-full object-cover" />
                  ) : (
                    <div className="flex h-48 flex-col items-center justify-center p-5 text-center">
                      <p className="text-5xl">🎬</p>
                      <p className="mt-3 text-sm font-black text-slate-900">Video promocional</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Sube un video corto para mostrar productos, ofertas o el proceso de personalización.</p>
                    </div>
                  )}
                </div>
                <label className="mt-4 inline-flex cursor-pointer rounded-full bg-pink-500 px-5 py-3 text-xs font-black text-white shadow-lg shadow-pink-100 hover:bg-pink-600">
                  Subir video
                  <input type="file" accept="video/*" onChange={(e) => handlePromoVideoUpload(e.target.files?.[0] || null)} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section id="areas" className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-[2rem] bg-white p-3 shadow-2xl shadow-pink-100 ring-1 ring-rose-100">
            <div className="grid gap-6 items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <a href="#regalos" className="flex h-full min-h-[215px] flex-col justify-between rounded-[32px] bg-[#fdeff5] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div>
                  <div className="mb-4 text-3xl">🎁</div>
                  <h3 className="text-xl font-black leading-none text-slate-900">REGALOS</h3>
                  <p className="mt-5 text-[13px] leading-relaxed text-slate-700">Detalles únicos para cada ocasión.</p>
                </div>
                <span className="mt-5 w-fit rounded-full bg-white px-6 py-3 font-bold text-pink-500">Ver más →</span>
              </a>

              <a href="#lienzo" className="flex h-full min-h-[215px] flex-col justify-between rounded-[32px] bg-[#f4e8ff] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div>
                  <div className="mb-4 text-3xl">🚀</div>
                  <h3 className="text-[20px] font-black leading-[1] tracking-tight text-slate-900 xl:text-[22px]">EMPRENDEDOR</h3>
                  <p className="mt-5 text-[13px] leading-relaxed text-slate-700">UV DTF, DTF Textil,<br />stickers, lienzos e insumos.</p>
                </div>
                <span className="mt-5 w-fit rounded-full bg-white px-6 py-3 font-bold text-pink-500">Ver más →</span>
              </a>

              <a href="#empresas" className="flex h-full min-h-[215px] flex-col justify-between rounded-[32px] bg-[#eaf4ff] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div>
                  <div className="mb-4 text-3xl">🏢</div>
                  <h3 className="text-xl font-black leading-none text-slate-900">EMPRESAS</h3>
                  <p className="mt-5 text-[13px] leading-relaxed text-slate-700">Branding, merchandising y pedidos por volumen.</p>
                </div>
                <span className="mt-5 w-fit rounded-full bg-white px-6 py-3 font-bold text-pink-500">Ver más →</span>
              </a>

              <a href="#insumos" className="flex h-full min-h-[215px] flex-col justify-between rounded-[32px] bg-[#fff5ef] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div>
                  <div className="mb-4 text-3xl">💼</div>
                  <h3 className="text-xl font-black leading-none text-slate-900">INSUMOS</h3>
                  <p className="mt-5 text-[13px] leading-relaxed text-slate-700">Productos para emprender sin manejar inventario.</p>
                </div>
                <span className="mt-5 w-fit rounded-full bg-white px-6 py-3 font-bold text-pink-500">Ver más →</span>
              </a>

              <a href="#cursos" className="flex h-full min-h-[215px] flex-col justify-between rounded-[32px] bg-[#f2efff] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div>
                  <div className="mb-4 text-3xl">🎓</div>
                  <h3 className="text-xl font-black leading-none text-slate-900">CURSOS</h3>
                  <p className="mt-5 text-[13px] leading-relaxed text-slate-700">Aprende, emprende y crea sin límites.</p>
                </div>
                <span className="mt-5 w-fit rounded-full bg-white px-6 py-3 font-bold text-pink-500">Ver más →</span>
              </a>
            </div>
          </div>
        </section>

        <section id="productos" className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-black text-pink-500">♡ PRODUCTOS DESTACADOS</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-3xl">Los más cotizados</h2>
            </div>
            <a href="#regalos" className="hidden text-sm font-black uppercase tracking-wide text-slate-900 hover:text-pink-500 md:block">Ver todos →</a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-[1.7rem] bg-white shadow-xl shadow-rose-100 ring-1 ring-rose-100 transition hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden bg-pink-50">
                  <SmartImage sources={productSources(product.image)} alt={product.title} className="h-full w-full object-cover" fallback={product.title} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-pink-500 shadow-sm">{product.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-slate-900">{product.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-black text-slate-900">{product.price}</p>
                    <button onClick={() => setCartOpen(true)} className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-400 text-xl text-white shadow-lg shadow-pink-200 hover:bg-pink-500">🛒</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="regalos" className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 rounded-[2rem] bg-pink-50 p-8 ring-1 ring-pink-100">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-500">Área regalos personalizados</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Compra regalos con diseño personalizado</h2>
            <p className="mt-4 max-w-3xl text-slate-700">Elige producto, tipo de personalización, sube tu archivo y agrega indicaciones.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-rose-100 ring-1 ring-rose-100">
              <h3 className="text-2xl font-black text-slate-900">☕ Tazones personalizados</h3>
              <div className="mt-6 space-y-4 rounded-[1.5rem] bg-rose-50 p-5 ring-1 ring-rose-100">
                <select value={mugVariant} onChange={(e) => setMugVariant(e.target.value)} className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-pink-300">
                  {mugVariants.map((item) => <option key={item.id} value={item.id}>{item.label} - {formatCLP(item.price)}</option>)}
                </select>
                <select value={mugExtra} onChange={(e) => setMugExtra(e.target.value)} className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-pink-300">
                  {mugExtras.map((item) => <option key={item.id} value={item.id}>{item.label}{item.price ? ` (+${formatCLP(item.price)})` : ""}</option>)}
                </select>
                <input type="number" min={1} value={mugQuantity} onChange={(e) => setMugQuantity(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-pink-300" />
                <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={(e) => setMugFile(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-600" />
                <textarea value={mugNotes} onChange={(e) => setMugNotes(e.target.value)} placeholder="Nombre, frase, colores, detalles..." className="min-h-[90px] w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-pink-300" />
              </div>
              <div className="mt-5 flex items-center justify-between rounded-3xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <div><p className="text-xs font-black uppercase text-emerald-700">Precio actual</p><p className="text-2xl font-black">{formatCLP(mugUnitPrice)}</p></div>
                <button onClick={addMug} className="rounded-full bg-pink-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-pink-200 hover:bg-pink-600">Agregar</button>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-rose-100 ring-1 ring-rose-100">
              <h3 className="text-2xl font-black text-slate-900">🥤 Vasos térmicos</h3>
              <div className="mt-6 space-y-4 rounded-[1.5rem] bg-rose-50 p-5 ring-1 ring-rose-100">
                <select value={thermalVariant} onChange={(e) => setThermalVariant(e.target.value)} className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-pink-300">
                  {thermalVariants.map((item) => <option key={item.id} value={item.id}>{item.label} - {formatCLP(item.price)}</option>)}
                </select>
                <select value={thermalExtra} onChange={(e) => setThermalExtra(e.target.value)} className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-pink-300">
                  {thermalExtras.map((item) => <option key={item.id} value={item.id}>{item.label}{item.price ? ` (+${formatCLP(item.price)})` : ""}</option>)}
                </select>
                <input type="number" min={1} value={thermalQuantity} onChange={(e) => setThermalQuantity(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-pink-300" />
                <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={(e) => setThermalFile(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-600" />
                <textarea value={thermalNotes} onChange={(e) => setThermalNotes(e.target.value)} placeholder="Logo, color, nombre, detalles..." className="min-h-[90px] w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-pink-300" />
              </div>
              <div className="mt-5 flex items-center justify-between rounded-3xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <div><p className="text-xs font-black uppercase text-emerald-700">Precio actual</p><p className="text-2xl font-black">{formatCLP(thermalUnitPrice)}</p></div>
                <button onClick={addThermal} className="rounded-full bg-pink-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-pink-200 hover:bg-pink-600">Agregar</button>
              </div>
            </div>
          </div>
        </section>

        <section id="lienzo" className="mx-auto max-w-7xl px-6 py-12">
          <div className="overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 shadow-xl shadow-pink-100 ring-1 ring-pink-100">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-500">Diseña tu producto</p>
                <h2 className="mt-3 text-3xl font-black text-slate-900">Calculadora y lienzo para UV DTF / DTF Textil</h2>
                <p className="mt-4 max-w-2xl text-slate-700">Sube varios archivos, define ancho, alto y cantidad para cada uno, acomódalos directamente en el lienzo y envíalo a impresión.</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.15fr_0.8fr]">
              <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-rose-100">
                <h3 className="text-xl font-black">Introduce los datos</h3>
                <div className="mt-5 space-y-4">
                  <select value={printType} onChange={(e) => setPrintType(e.target.value)} className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-pink-300">
                    {printOptions.map((option) => <option key={option.id} value={option.id}>{option.label} - {formatCLP(option.price)}</option>)}
                  </select>
                  <select value={workMode} onChange={(e) => setWorkMode(e.target.value)} className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-pink-300">
                    <option value="ready">Subo lienzo listo: cobro solo impresión</option>
                    <option value="platform">Armo el lienzo aquí: cobro solo impresión</option>
                    <option value="we_build">Quiero que Valdemaria arme el lienzo (+$5.000)</option>
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <input value={canvasWidth} onChange={(e) => setCanvasWidth(e.target.value)} placeholder="Ancho lienzo cm" className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-pink-300" />
                    <input value={canvasHeight} onChange={(e) => setCanvasHeight(e.target.value)} placeholder="Largo mínimo cm" className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-pink-300" />
                    <input value={margin} onChange={(e) => setMargin(e.target.value)} placeholder="Margen cm" className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-pink-300" />
                    <div className="rounded-2xl bg-white px-4 py-3 text-xs font-bold text-slate-500 ring-1 ring-rose-100">Alto final: {finalCanvasHeight.toFixed(1)} cm</div>
                  </div>
                  <div className="rounded-2xl bg-pink-50 p-4 ring-1 ring-pink-100">
                    <label className="mb-2 block text-sm font-black text-slate-700">Prioridad de impresión</label>
                    <select value={priorityOption} onChange={(e) => setPriorityOption(e.target.value)} className="w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm outline-none focus:border-pink-300">
                      {priorityOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}{option.price ? ` (+${formatCLP(option.price)})` : ""}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs font-bold leading-5 text-slate-500">
                      Prioridad válida para impresión y retiro en tienda. No incluye tiempo de envío a otra ciudad.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-pink-50 p-4 ring-1 ring-pink-100">
                    <label className="mb-2 block text-sm font-black text-slate-700">Sube uno o más archivos</label>
                    <input multiple type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={(e) => handleDesignUpload(e.target.files)} className="block w-full text-sm text-slate-600" />
                  </div>

                  <div className="space-y-3">
                    {designFiles.length === 0 && <p className="rounded-2xl border border-dashed border-pink-200 bg-white p-4 text-sm text-slate-500">Aún no has subido archivos.</p>}
                    {designFiles.map((file, index) => (
                      <div key={file.id} className="rounded-2xl bg-white p-4 ring-1 ring-pink-100">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img src={file.preview} alt={file.fileName} className="h-12 w-12 rounded-xl object-contain ring-1 ring-pink-100" />
                            <div><p className="text-sm font-black text-slate-800">Diseño {index + 1}</p><p className="max-w-[180px] truncate text-xs text-slate-500">{file.fileName}</p></div>
                          </div>
                          <button onClick={() => removeDesignFile(file.id)} className="text-xs font-black text-pink-500">Quitar</button>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <input value={file.width} onChange={(e) => updateDesignFile(file.id, "width", e.target.value)} placeholder="Ancho" className="rounded-xl border border-rose-100 px-3 py-2 text-sm outline-none focus:border-pink-300" />
                          <input value={file.height} onChange={(e) => updateDesignFile(file.id, "height", e.target.value)} placeholder="Alto" className="rounded-xl border border-rose-100 px-3 py-2 text-sm outline-none focus:border-pink-300" />
                          <input value={file.quantity} onChange={(e) => updateDesignFile(file.id, "quantity", e.target.value)} placeholder="Cantidad" className="rounded-xl border border-rose-100 px-3 py-2 text-sm outline-none focus:border-pink-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <textarea value={builderNotes} onChange={(e) => setBuilderNotes(e.target.value)} placeholder="Observaciones, cortes o instrucciones..." className="min-h-[90px] w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-pink-300" />
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-rose-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black">Visualización del lienzo</h3>
                    <p className="mt-1 text-xs font-bold text-slate-500">Arrastra para mover. Usa la esquina rosada para cambiar tamaño.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={resetManualEdits} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-500 shadow-sm hover:bg-slate-50">Reiniciar</button>
                    <button onClick={downloadPNG300} className="rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-black text-pink-500 shadow-sm hover:bg-pink-50">PNG 300 DPI</button>
                    <button onClick={downloadPDFPrint} className="rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-black text-pink-500 shadow-sm hover:bg-pink-50">PDF</button>
                  </div>
                </div>

                <div className="mt-6 flex justify-center overflow-auto rounded-3xl bg-white p-4 ring-1 ring-pink-100">
                  <div ref={previewRef} className="relative rounded-xl border-2 border-pink-300 bg-pink-50" style={{ width: 260, height: Math.max(500, finalCanvasHeight * 8) }}>
                    {effectivePlacements.length > 0 ? (
                      effectivePlacements.map((piece) => {
                        const previewHeight = Math.max(500, finalCanvasHeight * 8);
                        const left = (piece.x / numericCanvasWidth) * 260;
                        const top = (piece.y / finalCanvasHeight) * previewHeight;
                        const width = (piece.w / numericCanvasWidth) * 260;
                        const height = (piece.h / finalCanvasHeight) * previewHeight;
                        const isActive = activePlacementId === piece.id;

                        return (
                          <div key={piece.id} className="group absolute" style={{ left, top, width, height }} onMouseEnter={() => setActivePlacementId(piece.id)}>
                            <div className={`pointer-events-none absolute -top-7 left-0 right-0 z-20 flex items-center justify-center transition ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                              <div className="h-[2px] flex-1 bg-pink-500" />
                              <span className="mx-1 rounded-full bg-pink-500 px-2 py-1 text-[10px] font-black text-white shadow">{piece.w.toFixed(1)} cm</span>
                              <div className="h-[2px] flex-1 bg-pink-500" />
                            </div>
                            <div className={`pointer-events-none absolute -right-14 top-0 bottom-0 z-20 flex flex-col items-center justify-center transition ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                              <div className="w-[2px] flex-1 bg-purple-500" />
                              <span className="my-1 rounded-full bg-purple-500 px-2 py-1 text-[10px] font-black text-white shadow">{piece.h.toFixed(1)} cm</span>
                              <div className="w-[2px] flex-1 bg-purple-500" />
                            </div>
                            <img src={piece.preview} alt={piece.fileName} onMouseDown={(event) => startDrag(event, piece)} className={`h-full w-full cursor-move rounded-[4px] border-2 bg-white object-contain shadow-sm transition ${isActive ? "border-pink-500 ring-2 ring-pink-300" : "border-white ring-2 ring-transparent group-hover:border-pink-400 group-hover:ring-pink-200"}`} />
                            <button onMouseDown={(event) => startResize(event, piece)} title="Arrastra para cambiar tamaño" className="absolute -bottom-3 -right-3 z-30 flex h-7 w-7 cursor-se-resize items-center justify-center rounded-full bg-pink-500 text-[12px] font-black text-white shadow-lg transition hover:scale-110 hover:bg-pink-600">↘</button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex h-full items-center justify-center p-6 text-center text-sm font-medium text-slate-500">Completa los datos para visualizar tu lienzo.</div>
                    )}
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-pink-50 p-4 text-xs font-bold leading-5 text-slate-600 ring-1 ring-pink-100">Las medidas aparecen sobre cada imagen al seleccionarla o pasar el mouse. Al agrandar o achicar desde la esquina, el ancho y alto se actualizan en centímetros.</div>
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-rose-100">
                <h3 className="text-xl font-black">Resultado</h3>
                <div className="mt-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-pink-50 p-4"><p className="text-xs font-bold text-slate-500">Piezas</p><p className="text-2xl font-black">{effectivePlacements.length}</p></div>
                    <div className="rounded-2xl bg-pink-50 p-4"><p className="text-xs font-bold text-slate-500">Metros</p><p className="text-2xl font-black">{chargedMeters}</p></div>
                    <div className="rounded-2xl bg-pink-50 p-4"><p className="text-xs font-bold text-slate-500">Alto usado</p><p className="text-2xl font-black">{editedUsedHeight.toFixed(1)}</p></div>
                    <div className="rounded-2xl bg-pink-50 p-4"><p className="text-xs font-bold text-slate-500">Uso</p><p className="text-2xl font-black">{layout.utilization.toFixed(1)}%</p></div>
                  </div>
                  <p className="rounded-2xl bg-pink-50 p-4 text-xs font-bold text-slate-600">Si los diseños superan el largo mínimo, el lienzo se extiende automáticamente y se cobra por metro.</p>
                  <div className="rounded-3xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
                    <p className="text-xs font-black uppercase text-emerald-700">Costo impresión</p>
                    <p className="mt-1 text-3xl font-black">{formatCLP(builderTotal)}</p>
                    {selectedPriority.id !== "normal" && (
                      <p className="mt-2 text-xs font-bold leading-5 text-emerald-700">
                        Incluye {selectedPriority.label.toLowerCase()}: {selectedPriority.detail}. No considera envío a otra ciudad.
                      </p>
                    )}
                  </div>
                  <button onClick={addBuilderToCart} className="w-full rounded-full bg-pink-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-pink-200 hover:bg-pink-600">Agregar impresión al carrito</button>
                  <button onClick={sendByEmail} className="w-full rounded-full border border-pink-200 bg-white px-5 py-3 text-sm font-black text-pink-500 hover:bg-pink-50">Enviar a impresión por correo</button>
                  <button onClick={unlockDownloadPurchase} className="w-full rounded-full border border-purple-200 bg-purple-50 px-5 py-3 text-sm font-black text-purple-600 hover:bg-purple-100">Comprar descarga PNG/PDF por $5.000</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="insumos" className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-[2rem] bg-gradient-to-br from-amber-50 via-white to-pink-50 p-8 shadow-xl shadow-pink-100 ring-1 ring-pink-100">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-500">Tienda de insumos</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Insumos para emprender sin inventario propio</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">Sección separada para trabajar estilo tienda: productos bajo pedido, catálogo proveedor, packs para emprendedores y materiales para personalización.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["☕", "Tazones e insumos sublimación", "Blancos, mágicos, flúor, color interior, cajas y accesorios."],
                ["🥤", "Vasos, termos y botellas", "Modelos por capacidad, color y material para personalizar."],
                ["🖨️", "Materiales de impresión", "Films, láminas, stickers, DTF, UV DTF y consumibles."],
                ["🎁", "Packs emprendedor", "Kits armados para quienes quieren iniciar o revender."],
              ].map(([icon, title, text]) => (
                <div key={title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-pink-100">
                  <p className="text-3xl">{icon}</p>
                  <h3 className="mt-3 font-black text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  <button className="mt-4 rounded-full bg-pink-500 px-4 py-2 text-xs font-black text-white shadow-lg shadow-pink-100">Próximamente</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="empresas" className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-200">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-200">Área Empresas</p>
              <h2 className="mt-3 text-3xl font-black">Branding y regalos corporativos</h2>
              <p className="mt-5 text-sm leading-7 text-slate-200">Regalos corporativos, merchandising, logos en productos, eventos corporativos, pedidos por volumen y convenios empresas.</p>
              <a href="https://wa.me/56932554129?text=Hola,%20quiero%20cotizar%20para%20empresa" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-slate-900 hover:bg-pink-50">Solicitar cotización</a>
            </div>
            <div id="cursos" className="rounded-[2rem] bg-pink-50 p-8 ring-1 ring-pink-100">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-500">Área Cursos Online</p>
              <h2 className="mt-3 text-4xl font-black">Aprende, emprende y crea sin límites</h2>
              <p className="mt-5 text-sm leading-7 text-slate-700">Cursos online para personalización, Canva, UV DTF, ventas y automatización.</p>

              <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-pink-100">
                <p className="text-sm font-black text-slate-900">Subir videos de cursos</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Puedes cargar videos de prueba para previsualizar cómo se verá la sección de cursos. En producción se deben guardar en almacenamiento externo.</p>
                <label className="mt-4 inline-flex cursor-pointer rounded-full bg-pink-500 px-5 py-3 text-xs font-black text-white shadow-lg shadow-pink-100 hover:bg-pink-600">
                  Subir video de curso
                  <input type="file" accept="video/*" onChange={(e) => handleCourseVideoUpload(e.target.files?.[0] || null)} className="hidden" />
                </label>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {courseVideos.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-pink-200 bg-pink-50 p-4 text-sm font-bold text-slate-500">Aún no hay videos cargados.</div>
                  )}
                  {courseVideos.map((video) => (
                    <div key={video.id} className="overflow-hidden rounded-2xl bg-pink-50 ring-1 ring-pink-100">
                      <video src={video.url} controls className="h-40 w-full object-cover" />
                      <p className="truncate p-3 text-xs font-black text-slate-700">{video.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto" className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div><p className="font-serif text-3xl italic">Valdemaria</p><p className="mt-1 text-sm">Hecho con amor para que tu marca y tus regalos destaquen.</p></div>
          <div className="flex justify-center gap-4 text-sm font-bold"><a href="https://instagram.com/Valdemaria_personalizados">Instagram</a><a href="https://wa.me/56932554129">WhatsApp</a></div>
        </div>
      </footer>

      <a href="https://wa.me/56932554129?text=Hola,%20quiero%20cotizar%20en%20Valdemaria" className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-2xl hover:scale-110">☎</a>

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40">
          <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between"><div><p className="text-sm font-black uppercase tracking-wide text-pink-500">Tu pedido</p><h2 className="text-2xl font-black text-slate-900">Carrito de compra</h2></div><button onClick={() => setCartOpen(false)} className="rounded-full border border-rose-200 px-3 py-1 text-sm font-black text-slate-700">Cerrar</button></div>
            <div className="mt-6 space-y-4">
              {!cart.length && <div className="rounded-3xl bg-pink-50 p-5 text-sm text-slate-600 ring-1 ring-pink-100">Tu carrito está vacío.</div>}
              {cart.map((item) => (
                <div key={item.id} className="rounded-3xl border border-rose-100 p-4">
                  <div className="flex items-start justify-between gap-3"><div><h3 className="font-black text-slate-900">{item.title}</h3><p className="mt-1 text-sm text-slate-600">{item.detail}</p><p className="mt-1 text-sm text-slate-600">Cantidad: {item.quantity}</p><p className="mt-1 font-black text-slate-900">{formatCLP(item.total)}</p>{item.fileName && <p className="mt-1 text-xs font-bold text-green-700">Archivo: {item.fileName}</p>}{item.notes && <p className="mt-2 text-xs text-slate-500">Nota: {item.notes}</p>}</div><button onClick={() => setCart((prev) => prev.filter((cartItem) => cartItem.id !== item.id))} className="text-xs font-black text-pink-500">Quitar</button></div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-[#f4f1f4] p-5 ring-1 ring-pink-100">
              <div className="grid gap-6">
                <div>
                  <p className="mb-2 text-center text-base font-semibold text-slate-900">Comuna de envío</p>
                  <select
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value as "retiro" | "bluexpress")}
                    className="mb-3 w-full border border-slate-800 bg-transparent px-4 py-3 text-sm outline-none"
                  >
                    <option value="retiro">Retiro en tienda</option>
                    <option value="bluexpress">Envío Blue Express</option>
                  </select>

                  {shippingMethod === "bluexpress" && (
                    <>
                      <select
                        value={shippingRegion}
                        onChange={(e) => {
                          setShippingRegion(e.target.value);
                          setShippingCity(regionComunas[e.target.value]?.[0] || "");
                        }}
                        className="mb-3 w-full border border-slate-800 bg-transparent px-4 py-3 text-sm outline-none"
                      >
                        {Object.keys(regionComunas).map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                      <select
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                        className="mb-3 w-full border border-slate-800 bg-transparent px-4 py-3 text-sm outline-none"
                      >
                        {availableComunas.map((comuna) => (
                          <option key={comuna} value={comuna}>{comuna}</option>
                        ))}
                      </select>
                      <input
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Dirección de envío"
                        className="mb-3 w-full border border-slate-800 bg-transparent px-4 py-3 text-sm outline-none"
                      />
                      <div className="mb-5 text-sm text-slate-800">
                        <p className="font-black">Tarifas disponibles</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span>Blue Express Express (Terrestre)</span>
                          <span>{formatCLP(shippingTotal)}</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">Valor estimado. Luego se puede conectar a la API real de Blue Express para cálculo automático por comuna, peso y medidas.</p>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <p className="mb-3 text-center text-base font-semibold text-slate-900">Indícanos si necesitas boleta o factura</p>
                  <div className="mb-5 flex items-center justify-center gap-12 text-sm">
                    <label className="flex items-center gap-2"><input type="radio" checked={documentType === "boleta"} onChange={() => setDocumentType("boleta")} /> Boleta</label>
                    <label className="flex items-center gap-2"><input type="radio" checked={documentType === "factura"} onChange={() => setDocumentType("factura")} /> Factura</label>
                  </div>

                  {documentType === "factura" && (
                    <div className="mb-5 space-y-3">
                      <p className="text-center text-sm text-slate-700">Necesitamos los siguientes datos para generar su factura</p>
                      <input value={customerRut} onChange={(e) => setCustomerRut(e.target.value)} placeholder="RUT" className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none" />
                      <input value={businessActivity} onChange={(e) => setBusinessActivity(e.target.value)} placeholder="Giro" className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none" />
                      <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Razón social" className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none" />
                      <input value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Dirección" className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none" />
                      <select value={shippingRegion} onChange={(e) => setShippingRegion(e.target.value)} className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none">
                        {Object.keys(regionComunas).map((region) => <option key={region} value={region}>{region}</option>)}
                      </select>
                      <input value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} placeholder="Comuna" className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none" />
                    </div>
                  )}

                  <div className="space-y-3">
                    <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Correo electrónico" className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none" />
                    <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Teléfono" className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none" />
                    <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Nombre de contacto" className="w-full border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none" />
                  </div>

                  <label className="mt-4 flex items-start gap-2 rounded-2xl bg-white/70 p-3 text-xs font-bold text-slate-600">
                    <input type="checkbox" checked={createAccount} onChange={(e) => setCreateAccount(e.target.checked)} />
                    <span>Crear cuenta para guardar datos personales, direcciones, historial de pedidos y descargar boletas/facturas.</span>
                  </label>
                </div>

                <div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center justify-between"><span>Productos</span><span>{itemCount}</span></div>
                    <div className="flex items-center justify-between"><span>Subtotal neto</span><span>{formatCLP(subtotal)}</span></div>
                    <div className="flex items-center justify-between"><span>Envío</span><span>{formatCLP(shippingTotal)}</span></div>
                    <div className="flex items-center justify-between"><span>IVA 19%</span><span>{formatCLP(ivaTotal)}</span></div>
                    <div className="flex items-center justify-between border-t border-slate-300 pt-3 text-2xl text-slate-900"><span>Subtotal</span><span>{formatCLP(finalTotal)}</span></div>
                  </div>

                  <label className="mt-6 block text-sm text-slate-800">Ordenar notas</label>
                  <textarea value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} className="mt-2 min-h-[120px] w-full border border-slate-800 bg-transparent p-3 text-sm outline-none" />

                  <button
                    onClick={() => {
                      if (!customerEmail) {
                        alert("Ingresa el correo del cliente antes de pagar.");
                        return;
                      }
                      if (documentType === "factura" && (!customerRut || !businessName || !businessActivity)) {
                        alert("Completa RUT, giro y razón social para emitir factura.");
                        return;
                      }
                      if (shippingMethod === "bluexpress" && (!shippingAddress || !shippingCity)) {
                        alert("Ingresa dirección y comuna para el envío Blue Express.");
                        return;
                      }
                      const hasDigitalDownload = cart.some((item) => item.title === "Descarga de lienzo digital");
                      if (hasDigitalDownload) {
                        setDownloadUnlocked(true);
                        alert(`Pago registrado por ${formatCLP(finalTotal)}. Tu descarga se habilitó y comenzará automáticamente.`);
                        setTimeout(() => downloadPNG300(), 300);
                        return;
                      }
                      alert(`Aquí conectaremos Mercado Pago por ${formatCLP(finalTotal)}, Blue Express y emisión automática de ${documentType}.`);
                    }}
                    className="mt-6 w-full bg-purple-300 px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white hover:bg-purple-400"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

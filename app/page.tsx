export default function ValdemariaPersonalizadosWeb() {
  const products = [
    {
      name: 'Vasos Térmicos',
      description:
        'Personalizados con logo, nombre o diseño exclusivo. Ideales para regalos, empresas y emprendimientos.',
      badge: 'Más vendidos',
    },
    {
      name: 'Tazones Personalizados',
      description:
        'Diseños para fechas especiales, empresas, cumpleaños, Día de la Madre y mucho más.',
      badge: 'Regalos',
    },
    {
      name: 'Stickers UV DTF',
      description:
        'Resistentes al agua, rayaduras y altas temperaturas. Perfectos para vidrio, plástico, acrílico, metal y más.',
      badge: 'Alta duración',
    },
    {
      name: 'Pedidos para Empresas',
      description:
        'Merchandising, regalos corporativos, branding y soluciones personalizadas para tu negocio.',
      badge: 'Cotización',
    },
    {
      name: 'Cursos Online',
      description:
        'Capacitaciones prácticas para aprender personalización, ventas, producción y uso de insumos.',
      badge: 'Aprende',
    },
    {
      name: 'Insumos para Personalizar',
      description:
        'Materiales y suministros para emprender o potenciar tus proyectos de personalización.',
      badge: 'Insumos',
    },
  ];

  const benefits = [
    'Diseños personalizados y listos para aprobar',
    'Terminaciones de alta calidad',
    'Atención para clientes particulares y empresas',
    'Pedidos por WhatsApp e Instagram',
    'Opciones ideales para regalos, eventos y marcas',
    'Producción visualmente atractiva y profesional',
  ];

  const services = [
    {
      title: 'DTF Textil',
      description:
        'Impresión por metros en tejidos: camisetas, uniformes, sudaderas. Ancho estándar 30 cm.',
      accent: 'text-rose-600',
      bg: 'from-rose-100 to-rose-200',
      message: 'Hola, quiero cotizar DTF Textil.',
    },
    {
      title: 'UV DTF (Superficies rígidas)',
      description:
        'Transferencia ultravioleta para botellas, madera, metal, cristal con acabado premium.',
      accent: 'text-sky-600',
      bg: 'from-sky-100 to-sky-200',
      message: 'Hola, quiero cotizar UV DTF.',
    },
    {
      title: 'Personalizados Marca Propia',
      description:
        'Línea blanca y empaques con tu branding (etiquetas, sleeves, stickers). Bajo pedido.',
      accent: 'text-purple-600',
      bg: 'from-purple-100 to-purple-200',
      message: 'Hola, quiero cotizar Personalizados Marca Propia.',
    },
    {
      title: 'Productos Personalizados',
      description:
        'Regalos corporativos, kits de bienvenida y merchandising. Bajo pedido.',
      accent: 'text-emerald-600',
      bg: 'from-emerald-100 to-emerald-200',
      message: 'Hola, quiero cotizar Productos Personalizados.',
    },
  ];

  const extraCategories = [
    {
      title: 'Cursos Online',
      description:
        'Aprende desde casa técnicas de personalización, uso de máquinas, materiales, diseño aplicado y estrategias para vender mejor.',
      items: [
        'Introducción a UV DTF',
        'Uso de insumos y materiales',
        'Ideas para vender más',
        'Capacitación paso a paso',
      ],
      cta: 'Quiero información de cursos',
      message: 'Hola, quiero información sobre los cursos online.',
    },
    {
      title: 'Insumos para Personalizar',
      description:
        'Encuentra materiales, consumibles y productos base para desarrollar tus ideas, pedidos y proyectos con mejor terminación.',
      items: [
        'Productos base',
        'Materiales para personalización',
        'Suministros para producción',
        'Venta bajo pedido',
      ],
      cta: 'Quiero cotizar insumos',
      message: 'Hola, quiero cotizar insumos para personalizar.',
    },
  ];

  const deliveryOptions = [
    {
      title: 'EXPRESS',
      time: '24–48 hrs hábiles',
      price: '$18.990',
      bg: 'bg-orange-100',
      message: 'Hola, quiero cotizar con entrega EXPRESS.',
    },
    {
      title: 'ESTÁNDAR',
      time: '3–4 días hábiles',
      price: '$15.990',
      bg: 'bg-green-100',
      message: 'Hola, quiero cotizar con entrega ESTÁNDAR.',
    },
    {
      title: 'ECONÓMICO',
      time: '5–6 días hábiles',
      price: '$13.990',
      bg: 'bg-lime-100',
      message: 'Hola, quiero cotizar con entrega ECONÓMICO.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-sky-50 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xl font-bold tracking-tight text-slate-900">
              Valdemaria Personalizados
            </p>
            <p className="text-sm text-slate-500">
              Detalles únicos para personas y empresas
            </p>
          </div>
          <div className="hidden gap-3 md:flex">
            <a
              href="#productos"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Productos
            </a>
            <a
              href="#nosotros"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
            >
              Cotizar
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="inline-flex rounded-full border border-rose-200 bg-white px-4 py-1 text-sm font-medium text-rose-600 shadow-sm">
              Personalizados con estilo y calidad
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Diseños que hacen destacar tu idea, regalo o marca.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Creamos vasos térmicos, tazones, stickers UV DTF y productos
              personalizados con acabados atractivos, resistentes y pensados para
              sorprender. Trabajamos pedidos para personas, emprendimientos y
              empresas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/56932554129"
                className="rounded-2xl bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5"
              >
                Pedir por WhatsApp
              </a>
              <a
                href="https://instagram.com/Valdemaria_personalizados"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Ver Instagram
              </a>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-2xl font-bold text-slate-900">+100</p>
                <p className="text-sm text-slate-500">Ideas personalizables</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-2xl font-bold text-slate-900">Alta</p>
                <p className="text-sm text-slate-500">Duración visual</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-2xl font-bold text-slate-900">Empresas</p>
                <p className="text-sm text-slate-500">Y clientes finales</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-4 shadow-xl shadow-rose-100 ring-1 ring-rose-100">
              <div className="h-72 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 p-4">
                <div className="flex h-full items-end rounded-2xl border border-white/60 bg-white/40 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-slate-700">
                    Mockup destacado para vasos, tazones o branding empresarial
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-sky-100 ring-1 ring-sky-100">
                <p className="text-sm font-semibold text-sky-600">UV DTF</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  Acabados resistentes
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Ideal para superficies rígidas como vidrio, plástico, metal,
                  acrílico, cerámica y más.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg shadow-slate-200">
                <p className="text-sm font-semibold text-rose-200">
                  Pedidos especiales
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  Regalos, eventos y empresas
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Trabajos personalizados para sorprender, vender o posicionar tu
                  marca con una presentación más profesional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-6 py-8 md:py-14">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                Servicios
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Nuestros servicios principales
              </h2>
            </div>
            <p className="max-w-xl text-slate-600">
              Soluciones de impresión y personalización para personas y empresas,
              con acabados profesionales y alta durabilidad.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <div className={`mb-4 h-36 rounded-2xl bg-gradient-to-br ${service.bg}`} />
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-600">
                  {service.description}
                </p>
                <a
                  href={`https://wa.me/56932554129?text=${encodeURIComponent(service.message)}`}
                  className={`mt-4 inline-block text-sm font-semibold ${service.accent}`}
                >
                  Ver servicio →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-black text-slate-900">Entrega estimada</h2>
            <p className="mt-2 text-sm text-slate-600">
              Selecciona el tiempo de entrega según tu urgencia. Precios
              referenciales en pesos chilenos.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {deliveryOptions.map((option) => (
                <a
                  key={option.title}
                  href={`https://wa.me/56932554129?text=${encodeURIComponent(option.message)}`}
                  className={`block rounded-2xl p-4 transition hover:shadow-md ${option.bg}`}
                >
                  <p className="text-sm font-semibold">{option.title}</p>
                  <p className="mt-1 text-lg font-bold">{option.time}</p>
                  <p className="mt-2 text-xl font-black text-slate-900">
                    {option.price}
                  </p>
                </a>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              *Valores sin despacho. Solo retiro o coordinación local.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 md:py-14">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                Nuevas categorías
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Cursos online e insumos para personalizar
              </h2>
            </div>
            <p className="max-w-xl text-slate-600">
              Además de productos personalizados, también ofrecemos formación e
              insumos para ayudarte a crear, producir y crecer.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {extraCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-100"
              >
                <div className="mb-5 h-40 rounded-3xl bg-gradient-to-br from-rose-100 via-white to-sky-100" />
                <h3 className="text-2xl font-black text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 ring-1 ring-slate-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/56932554129?text=${encodeURIComponent(category.message)}`}
                  className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5"
                >
                  {category.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="productos" className="mx-auto max-w-7xl px-6 py-8 md:py-14">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                Productos
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Lo que podemos personalizar para ti
              </h2>
            </div>
            <p className="max-w-xl text-slate-600">
              Cada pedido se adapta a tu idea, tu evento o tu marca. Diseñamos
              propuestas atractivas, funcionales y listas para lucirse.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.name}
                className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                  {product.badge}
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>
                <a
                  href={`https://wa.me/56932554129?text=${encodeURIComponent(`Hola, quiero cotizar ${product.name}`)}`}
                  className="mt-5 inline-block rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="nosotros" className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
              Nosotros
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
              Transformamos ideas en productos listos para regalar, vender o
              promocionar.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              En Valdemaria Personalizados trabajamos con dedicación para ofrecer
              productos visualmente lindos, funcionales y con terminaciones
              cuidadas. Nos encanta crear piezas que conecten con personas,
              marcas y momentos especiales.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
              >
                <div className="mb-3 h-10 w-10 rounded-2xl bg-gradient-to-br from-rose-100 to-sky-100" />
                <p className="text-sm font-medium leading-6 text-slate-700">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 md:py-14">
          <div className="rounded-[2rem] bg-slate-900 px-8 py-10 text-white shadow-2xl shadow-slate-200">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-200">
                  Opiniones de clientes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                  Lo que dicen quienes ya confiaron en nosotros
                </h2>
                <p className="mt-4 max-w-xl text-slate-300">
                  Tu opinión es muy importante. Aquí puedes dejar tu experiencia,
                  evaluar el servicio y ayudar a otros clientes a confiar en
                  nuestro trabajo.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm">⭐⭐⭐⭐⭐</p>
                    <p className="mt-2 text-sm">
                      "Excelente calidad, súper recomendados. Mis vasos quedaron
                      hermosos!"
                    </p>
                    <p className="mt-2 text-xs text-slate-300">— Cliente feliz</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm">⭐⭐⭐⭐⭐</p>
                    <p className="mt-2 text-sm">
                      "Muy buena atención y rapidez. Volveré a comprar!"
                    </p>
                    <p className="mt-2 text-xs text-slate-300">
                      — Cliente frecuente
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 text-slate-800">
                <h3 className="text-xl font-bold">Deja tu evaluación</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Cuéntanos tu experiencia con nuestro servicio
                </p>

                <div className="mt-4 space-y-3">
                  <input
                    className="w-full rounded-xl border border-slate-200 px-4 py-2"
                    placeholder="Tu nombre"
                  />
                  <select className="w-full rounded-xl border border-slate-200 px-4 py-2">
                    <option>⭐⭐⭐⭐⭐ Excelente</option>
                    <option>⭐⭐⭐⭐ Muy bueno</option>
                    <option>⭐⭐⭐ Bueno</option>
                    <option>⭐⭐ Regular</option>
                    <option>⭐ Malo</option>
                  </select>
                  <textarea
                    className="w-full rounded-xl border border-slate-200 px-4 py-2"
                    placeholder="Escribe tu comentario"
                  />
                  <button className="w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white">
                    Enviar evaluación
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                Contacto
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                Pide tu cotización y empecemos tu pedido.
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600">
                Escríbenos para cotizar productos personalizados, regalos,
                pedidos para empresas o stickers UV DTF. Cuéntanos qué necesitas
                y te orientamos con una propuesta atractiva y funcional.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                  placeholder="Tu nombre"
                />
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                  placeholder="Tu WhatsApp"
                />
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 sm:col-span-2"
                  placeholder="Correo electrónico"
                />
                <textarea
                  className="min-h-[140px] rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 sm:col-span-2"
                  placeholder="Cuéntanos qué producto quieres, cantidad, idea o fecha estimada"
                />
                <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 sm:col-span-2">
                  Enviar solicitud
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2rem] bg-rose-50 p-6 ring-1 ring-rose-100">
                <p className="text-sm font-semibold text-rose-600">Instagram</p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  @Valdemaria_personalizados
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Comparte tus ideas, revisa ejemplos y conoce nuevos productos
                  para regalar o vender.
                </p>
              </div>
              <div className="rounded-[2rem] bg-sky-50 p-6 ring-1 ring-sky-100">
                <p className="text-sm font-semibold text-sky-600">WhatsApp</p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  +56 9 3255 4129
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Canal ideal para cotizaciones rápidas, aprobación de diseños y
                  coordinación de pedidos.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <p className="text-sm font-semibold text-slate-500">
                  Horario de atención
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  Lunes a sábado
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Atención digital para responder consultas, cotizaciones y
                  seguimiento de pedidos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Valdemaria Personalizados. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/Valdemaria_personalizados"
              className="hover:text-slate-700"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/56932554129"
              className="hover:text-slate-700"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

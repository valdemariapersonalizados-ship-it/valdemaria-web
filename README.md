# Valdemaria Studio Pro

Sitio web para Valdemaria Personalizados con Next.js App Router, TypeScript, Tailwind, Supabase y flujo de compra por WhatsApp.

## ✅ Verla funcionando ya (modo demo)

Solo necesitas ejecutar:

```bash
npm run setup
npm run dev
```

Abrir en navegador: `http://localhost:3000`

> Si todavía no configuras Supabase, la app **igual funciona** en modo demo.

## Estado actual

- Home premium con CTA a tienda y studio.
- Studio 3D (MVP) con flujo visual + acción de IA mock.
- Tienda con carrito funcional (persistencia local) + checkout por WhatsApp.
- Login con fallback demo si no hay variables de Supabase.
- Panel admin MVP con CRUD local para productos.

## Activar Supabase real (opcional)

Copia `.env.example` a `.env.local` y completa:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `REMOVE_BG_API_KEY`

Luego:

1. Crea proyecto en Supabase.
2. Ejecuta `supabase/schema.sql` en SQL Editor.
3. Configura Auth email/password.
4. Crea buckets: `products`, `courses`, `mockups`, `media`.

## Deploy en Vercel

1. Sube la rama a GitHub.
2. Importa el proyecto en Vercel.
3. Agrega variables de entorno.
4. Deploy.

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valdemaria Personalizados",
  description: "Regalos personalizados, branding empresarial, impresión UV DTF y Textil, insumos y más. Envíos a todo Chile.",
  keywords: "personalizados, tazones, vasos térmicos, UV DTF, DTF Textil, regalos, Chile, Valdemaria",
  openGraph: {
    title: "Valdemaria Personalizados",
    description: "Diseños que enamoran y venden. Regalos personalizados y más.",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { CartProvider } from "@/components/providers/cart-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valdemaria Studio Pro",
  description: "Plataforma premium para personalizados, mockups 3D y cursos digitales.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

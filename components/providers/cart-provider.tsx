"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/data/catalog";

type CartItem = CatalogProduct & { quantity: number };

const STORAGE_KEY = "valdemaria_cart_v1";

type CartContextType = {
  items: CartItem[];
  total: number;
  addItem: (product: CatalogProduct) => void;
  clearCart: () => void;
  whatsappCheckoutUrl: string;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: CatalogProduct) => {
    setItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const whatsappCheckoutUrl = useMemo(() => {
    const lines = items.map((item) => `• ${item.name} x${item.quantity} = $${item.price * item.quantity}`);
    const message = encodeURIComponent(["Hola Valdemaria, quiero pedir:", ...lines, `Total: $${total}`].join("\n"));
    return `https://wa.me/573001112233?text=${message}`;
  }, [items, total]);

  return <CartContext.Provider value={{ items, total, addItem, clearCart, whatsappCheckoutUrl }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};

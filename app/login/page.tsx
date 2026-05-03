"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/layout/header";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Ingresa con tu cuenta para acceder a cursos y pedidos.");

  const demoMode = useMemo(
    () => !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    [],
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (demoMode) {
      setMessage("Modo demo activo: configura .env.local para login real con Supabase.");
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setMessage("Login exitoso. Ya puedes entrar al área privada.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión.");
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-6">
        <form onSubmit={handleLogin} className="glass-card w-full p-6">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="mt-2 text-xs text-neutral-600">{message}</p>
          {demoMode && <p className="mt-2 rounded bg-amber-100 p-2 text-xs text-amber-800">Estás en modo demo sin Supabase.</p>}
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-4 w-full rounded border p-2" type="email" placeholder="Correo" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-3 w-full rounded border p-2" type="password" placeholder="Contraseña" />
          <button className="mt-4 w-full rounded bg-fuchsia-600 py-2 text-white">Entrar</button>
        </form>
      </main>
    </>
  );
}

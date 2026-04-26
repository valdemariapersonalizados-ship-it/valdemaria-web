"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleAuth() {
    if (!email || !password) {
      alert("Ingresa correo y contraseña.");
      return;
    }

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Cuenta creada. Revisa tu correo si Supabase solicita confirmación.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/mi-cuenta";
  }

  return (
    <main className="min-h-screen bg-pink-50 p-6 flex items-center justify-center text-slate-900">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-black text-pink-600 text-center">
          Mi cuenta Valdemaria
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500">
          Ingresa para ver tus pedidos, cursos y descargas.
        </p>

        <div className="mt-6 flex rounded-full bg-pink-50 p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-2 text-sm font-black ${
              mode === "login"
                ? "bg-pink-500 text-white"
                : "text-pink-500"
            }`}
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => setMode("register")}
            className={`flex-1 rounded-full py-2 text-sm font-black ${
              mode === "register"
                ? "bg-pink-500 text-white"
                : "text-pink-500"
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-sm"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-sm"
          />

          <button
            onClick={handleAuth}
            className="w-full rounded-full bg-pink-500 px-5 py-3 font-black text-white"
          >
            {mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </div>
      </section>
    </main>
  );
}
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(e: React.FormEvent) {
    e.preventDefault();

    if (
      email === "valdemaria.personalizados@gmail.com" &&
      password === "Fran2026"
    ) {
      window.location.href = "/admin/panel";
    } else {
      alert("Datos incorrectos");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-black text-center text-pink-600">
          Panel Admin Valdemaria
        </h1>

        <form onSubmit={login} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Correo"
            className="w-full rounded-xl border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-xl border p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full rounded-xl bg-pink-500 p-3 font-bold text-white">
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}

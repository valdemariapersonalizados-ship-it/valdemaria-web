"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminProductos() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function guardarProducto() {
    let imageUrl = "";

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Error al subir la imagen");
        console.log(uploadError);
        return;
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        price,
        category,
        description,
        image: imageUrl,
      },
    ]);

    if (error) {
      alert("Error al guardar producto");
      console.log(error);
      return;
    }

    alert("Producto guardado 💖");

    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImageFile(null);
  }

  return (
    <main className="min-h-screen bg-pink-50 p-10 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-4xl font-black text-pink-600">
          Administrador Productos
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Nombre producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border p-3 text-slate-900"
          />

          <input
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border p-3 text-slate-900"
          />

          <input
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border p-3 text-slate-900"
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border p-3 text-slate-900"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border p-3 text-slate-900"
          />

          <button
            onClick={guardarProducto}
            className="w-full rounded-xl bg-pink-500 p-4 font-bold text-white"
          >
            Guardar Producto
          </button>
        </div>
      </div>
    </main>
  );
}
export async function removeBackgroundMock(imageUrl: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return imageUrl;
}

export async function removeBackgroundReal(imageBlob: Blob): Promise<Blob> {
  if (!process.env.REMOVE_BG_API_KEY) {
    throw new Error("Falta REMOVE_BG_API_KEY. Usa removeBackgroundMock hasta integrar API real.");
  }
  // Punto de integración real con remove.bg / Photoroom API.
  // 1) POST imageBlob al endpoint del proveedor.
  // 2) Recibir máscara/resultado segmentado.
  // 3) Retornar blob procesado.
  return imageBlob;
}

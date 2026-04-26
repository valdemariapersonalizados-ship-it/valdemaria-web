import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          items: [
            {
              title: "Compra tienda",
              quantity: 1,
              unit_price: Number(body.total || 1000),
            },
          ],
          payer: {
            name: body.nombre,
            email: body.email,
          },
          notification_url: `${body.url}/api/mercadopago/webhook`,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({ init_point: data.init_point });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
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
          items: body.items,
          payer: {
            name: body.name,
            email: body.email,
          },
          external_reference: body.order_number,

          back_urls: {
            success: "http://localhost:3000/mi-cuenta",
            failure: "http://localhost:3000/tienda",
            pending: "http://localhost:3000/mi-cuenta",
          },

          auto_return: "approved",
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      init_point: data.init_point,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error Mercado Pago" },
      { status: 500 }
    );
  }
}
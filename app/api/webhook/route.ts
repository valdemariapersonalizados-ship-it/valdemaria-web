import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const paymentId = body?.data?.id;

    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    const mp = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = await mp.json();

    const orderNumber = payment.external_reference;
    const status = payment.status;

    if (orderNumber && status === "approved") {
      await supabase
        .from("orders")
        .update({
          payment_status: "pagado",
        })
        .eq("order_number", orderNumber);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}
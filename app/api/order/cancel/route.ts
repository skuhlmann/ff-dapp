import { NextRequest, NextResponse } from "next/server";

// POST /api/order/cancel
// Body: { orderNumber: string }
//
// Cancels an order in Vinoshipper. Not wired to the frontend — intended for
// manual use when an order is stuck in PENDING.
//
// Vinoshipper docs: https://developer.vinoshipper.com/reference/cancelorder

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderNumber } = body;

    if (!orderNumber) {
      return NextResponse.json(
        { error: "Missing orderNumber" },
        { status: 400 },
      );
    }

    const apiKey = process.env.VINOSHIPPER_API_KEY;
    const apiSecret = process.env.VINOSHIPPER_API_SECRET;
    const apiUrl =
      process.env.VINOSHIPPER_API_URL || "https://vinoshipper.com/api/v3/p";

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Missing Vinoshipper API credentials" },
        { status: 500 },
      );
    }

    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const vinoRes = await fetch(
      `${apiUrl}/orders/${encodeURIComponent(orderNumber)}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
      },
    );

    const text = await vinoRes.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Non-JSON response from Vinoshipper", body: text },
        { status: 500 },
      );
    }

    if (!vinoRes.ok) {
      return NextResponse.json(
        { error: "Vinoshipper cancel failed", details: data },
        { status: vinoRes.status },
      );
    }

    return NextResponse.json({ success: true, orderNumber, vinoshipperResponse: data });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

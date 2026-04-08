import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber");

  if (!orderNumber) {
    return NextResponse.json(
      { error: "Missing orderNumber query parameter" },
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

  const url = `${apiUrl}/orders/${encodeURIComponent(orderNumber)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${authString}`,
    },
  });

  const text = await response.text();
  console.log("Vinoshipper get order raw response:", text);

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "Non-JSON response", url, status: response.status, body: text },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: response.status });
}

import { NextResponse } from "next/server";

export async function GET() {
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

  const url = `${apiUrl}/shipment/rate-codes`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${authString}`,
    },
  });

  const text = await response.text();
  console.log("Vinoshipper rates raw response:", text);

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

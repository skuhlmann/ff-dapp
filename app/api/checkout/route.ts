import { NextRequest, NextResponse } from "next/server";

// Proxy to the existing AWS Lambda checkout endpoint during transition
// TODO: Move the checkout logic in-house
const LAMBDA_CHECKOUT_URL = "https://bhe263f8bh.execute-api.us-east-1.amazonaws.com/prod/peach-checkout";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tokenId, account, checkoutId } = body;

    // Proxy the request to the existing Lambda function
    const response = await fetch(LAMBDA_CHECKOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId, account, checkoutId }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Checkout failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

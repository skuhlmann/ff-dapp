import { NextRequest, NextResponse } from "next/server";
import {
  createOrderRecord,
  findOrderByTokenId,
  updateOrderRecord,
} from "../../../src/lib/airtable";
import type { WineOrderProblem, WineOrderStatus } from "../../../src/utils/types";

// ─── POST /api/order — create a new wine order ────────────────────────────────

interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    street1: string;
    street2: string | null;
    city: string;
    postalCode: string;
    stateCode: string;
  };
  dateOfBirth: {
    day: number;
    month: number;
    year: number;
  };
}

interface OrderRequestBody {
  tokenId: string;
  customer: CustomerData;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequestBody = await request.json();
    const { tokenId, customer } = body;

    if (!tokenId) {
      return NextResponse.json({ error: "Missing tokenId" }, { status: 400 });
    }

    if (
      !customer?.email ||
      !customer.firstName ||
      !customer.lastName ||
      !customer.phone
    ) {
      return NextResponse.json(
        { error: "Missing required customer fields" },
        { status: 400 },
      );
    }

    if (
      !customer.address?.street1 ||
      !customer.address.city ||
      !customer.address.postalCode ||
      !customer.address.stateCode
    ) {
      return NextResponse.json(
        { error: "Missing required address fields" },
        { status: 400 },
      );
    }

    if (
      !customer.dateOfBirth?.day ||
      !customer.dateOfBirth.month ||
      !customer.dateOfBirth.year
    ) {
      return NextResponse.json(
        { error: "Missing required date of birth fields" },
        { status: 400 },
      );
    }

    const apiKey = process.env.VINOSHIPPER_API_KEY;
    const apiSecret = process.env.VINOSHIPPER_API_SECRET;
    const apiUrl =
      process.env.VINOSHIPPER_API_URL || "https://vinoshipper.com/api/v3/p";
    const productId = process.env.VINOSHIPPER_PRODUCT_ID;
    const productIdType = process.env.VINOSHIPPER_PRODUCT_ID_TYPE || "VS_ID";

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Missing Vinoshipper API credentials" },
        { status: 500 },
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Missing VINOSHIPPER_PRODUCT_ID" },
        { status: 500 },
      );
    }

    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    // TODO: Remove the TEST- prefix when going live and allow Vinoshipper to generate the order number.
    const vinoshipperPayload = {
      productIdType,
      customer: {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        dateOfBirth: {
          day: customer.dateOfBirth.day,
          month: customer.dateOfBirth.month,
          year: customer.dateOfBirth.year,
        },
        address: {
          street1: customer.address.street1,
          street2: customer.address.street2,
          city: customer.address.city,
          postalCode: customer.address.postalCode,
          stateCode: customer.address.stateCode,
          country: "US",
        },
      },
      products: [{ productId, quantity: 1 }],
      shipToAddress: {
        street1: customer.address.street1,
        street2: customer.address.street2,
        city: customer.address.city,
        stateCode: customer.address.stateCode,
        postalCode: customer.address.postalCode,
        country: "US",
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: { number: customer.phone, country: 1 },
      },
      shippingRate: {
        carrier: "UPS",
        rateCode: "03",
        rateDescription: "UPS Ground",
      },
      isPaid: true,
      orderNumber: `TEST-${Date.now()}`,
    };

    const vinoRes = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(vinoshipperPayload),
    });

    const vinoData = await vinoRes.json();

    if (!vinoRes.ok) {
      return NextResponse.json(
        { error: "Vinoshipper API error", details: vinoData },
        { status: vinoRes.status },
      );
    }

    const orderNumber: string =
      vinoData.orderNumber || vinoshipperPayload.orderNumber;
    const orderStatus: WineOrderStatus = vinoData.status || "PENDING";
    const orderProblems: WineOrderProblem[] = vinoData.orderProblems || [];

    await createOrderRecord({ tokenId, orderNumber, orderStatus, orderProblems });

    return NextResponse.json({
      success: true,
      orderNumber,
      orderStatus,
      orderProblems,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// ─── GET /api/order?tokenId=<id> — get order status for a token ───────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenId = searchParams.get("tokenId");

  if (!tokenId) {
    return NextResponse.json({ error: "Missing tokenId" }, { status: 400 });
  }

  try {
    const record = await findOrderByTokenId(tokenId);

    if (!record) {
      return NextResponse.json({ order: null });
    }

    // If PENDING, poll Vinoshipper for a status update and sync back to Airtable.
    if (record.orderStatus === "PENDING" && record.airtableId) {
      try {
        const apiKey = process.env.VINOSHIPPER_API_KEY;
        const apiSecret = process.env.VINOSHIPPER_API_SECRET;
        const apiUrl =
          process.env.VINOSHIPPER_API_URL ||
          "https://vinoshipper.com/api/v3/p";

        if (apiKey && apiSecret) {
          const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString(
            "base64",
          );
          const vinoRes = await fetch(
            `${apiUrl}/orders/${encodeURIComponent(record.orderNumber)}`,
            { headers: { Authorization: `Basic ${authString}` } },
          );

          if (vinoRes.ok) {
            const vinoData = await vinoRes.json();
            const freshStatus: WineOrderStatus = vinoData.status || record.orderStatus;
            const freshProblems: WineOrderProblem[] =
              vinoData.orderProblems || [];

            if (
              freshStatus !== record.orderStatus ||
              JSON.stringify(freshProblems) !==
                JSON.stringify(record.orderProblems)
            ) {
              await updateOrderRecord(record.airtableId, {
                orderStatus: freshStatus,
                orderProblems: freshProblems,
              });
              record.orderStatus = freshStatus;
              record.orderProblems = freshProblems;
            }
          }
        }
      } catch (pollError) {
        // Non-fatal: return stale record rather than failing the request.
        console.error("Vinoshipper poll failed:", pollError);
      }
    }

    return NextResponse.json({ order: record });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

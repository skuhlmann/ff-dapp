import { NextRequest, NextResponse } from "next/server";

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

interface VinoshipperOrderRequest {
  customer: CustomerData;
}

export async function POST(request: NextRequest) {
  try {
    const body: VinoshipperOrderRequest = await request.json();
    const { customer } = body;

    if (!customer.email || !customer.firstName || !customer.lastName || !customer.phone) {
      return NextResponse.json(
        { error: "Missing required customer fields" },
        { status: 400 },
      );
    }

    if (
      !customer.address.street1 ||
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
      !customer.dateOfBirth.day ||
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
        {
          error: "Missing Vinoshipper API credentials in environment variables",
        },
        { status: 500 },
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Missing VINOSHIPPER_PRODUCT_ID in environment variables" },
        { status: 500 },
      );
    }

    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const vinoshipperPayload = {
      productIdType: productIdType,
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
      products: [
        {
          productId: productId,
          quantity: 1,
        },
      ],
      shipToAddress: {
        street1: customer.address.street1,
        street2: customer.address.street2,
        city: customer.address.city,
        stateCode: customer.address.stateCode,
        postalCode: customer.address.postalCode,
        country: "US",
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: {
          number: customer.phone,
          country: 1,
        },
      },
      shippingRate: {
        carrier: "UPS",
        rateCode: "03",
        rateDescription: "UPS Ground",
      },
      isPaid: true,
      orderNumber: `TEST-${Date.now()}`,
    };

    console.log(
      "Sending order to Vinoshipper:",
      JSON.stringify(vinoshipperPayload, null, 2),
    );

    const vinoshipperResponse = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(vinoshipperPayload),
    });

    const vinoshipperData = await vinoshipperResponse.json();

    console.log(
      "Vinoshipper response:",
      JSON.stringify(vinoshipperData, null, 2),
    );

    if (!vinoshipperResponse.ok) {
      return NextResponse.json(
        {
          error: "Vinoshipper API error",
          details: vinoshipperData,
          statusCode: vinoshipperResponse.status,
        },
        { status: vinoshipperResponse.status },
      );
    }

    return NextResponse.json({
      success: true,
      orderId: vinoshipperData.orderId,
      orderNumber:
        vinoshipperData.orderNumber || vinoshipperPayload.orderNumber,
      status: vinoshipperData.status,
      ageVerification: vinoshipperData.ageVerification,
      vinoshipperResponse: vinoshipperData,
    });
  } catch (error) {
    console.error("Error creating Vinoshipper order:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

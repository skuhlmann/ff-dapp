# Vinoshipper Order Test Page - Implementation Spec

## Overview

Create a test page in Next.js app to manually test Vinoshipper order creation via API. This page will have a form matching the Vinoshipper customer object structure and an API route that calls Vinoshipper's Create Order endpoint.

---

## File Structure

```
app/
├── test/
│   └── vinoshipper/
│       └── page.tsx          # Test form page
└── api/
    └── test/
        └── vinoshipper-order/
            └── route.ts       # API route handler
```

---

## Environment Variables

Add to `.env.local`:

```env
# Vinoshipper API Credentials
VINOSHIPPER_API_KEY=your_api_key_here
VINOSHIPPER_API_SECRET=your_secret_here
VINOSHIPPER_API_URL=https://vinoshipper.com/api/v3/p

# Product Configuration
VINOSHIPPER_PRODUCT_ID=your_product_id_here
VINOSHIPPER_PRODUCT_ID_TYPE=VS_ID  # or "SKU" if using SKU
```

---

## 1. Frontend - Test Form Page

**File**: `app/test/vinoshipper/page.tsx`

### Form Fields (Based on Screenshot)

```typescript
interface CustomerFormData {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
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
  };
}
```

### Component Code

```tsx
"use client";

import { useState } from "react";

export default function VinoshipperTestPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    city: "",
    postalCode: "",
    stateCode: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
  });

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/test/vinoshipper-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: {
              street1: formData.street1,
              street2: formData.street2 || null,
              city: formData.city,
              postalCode: formData.postalCode,
              stateCode: formData.stateCode,
            },
            dateOfBirth: {
              day: parseInt(formData.dobDay),
              month: parseInt(formData.dobMonth),
              year: parseInt(formData.dobYear),
            },
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Vinoshipper Order Test</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Test the Vinoshipper API integration by creating a test order.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        {/* Customer Information */}
        <fieldset
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ddd",
          }}
        >
          <legend style={{ fontWeight: "bold", fontSize: "18px" }}>
            Customer Information
          </legend>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
              placeholder="customer@example.com"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <label
                htmlFor="firstName"
                style={{ display: "block", marginBottom: "5px" }}
              >
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="John"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="Doe"
              />
            </div>
          </div>
        </fieldset>

        {/* Address */}
        <fieldset
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ddd",
          }}
        >
          <legend style={{ fontWeight: "bold", fontSize: "18px" }}>
            Shipping Address
          </legend>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="street1"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Street Address *
            </label>
            <input
              id="street1"
              type="text"
              value={formData.street1}
              onChange={(e) => handleInputChange("street1", e.target.value)}
              required
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
              placeholder="123 Main St"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="street2"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Apartment, Suite, etc. (Optional)
            </label>
            <input
              id="street2"
              type="text"
              value={formData.street2}
              onChange={(e) => handleInputChange("street2", e.target.value)}
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
              placeholder="Apt 4B"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <label
                htmlFor="city"
                style={{ display: "block", marginBottom: "5px" }}
              >
                City *
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="Napa"
              />
            </div>

            <div>
              <label
                htmlFor="stateCode"
                style={{ display: "block", marginBottom: "5px" }}
              >
                State *
              </label>
              <input
                id="stateCode"
                type="text"
                value={formData.stateCode}
                onChange={(e) =>
                  handleInputChange("stateCode", e.target.value.toUpperCase())
                }
                required
                maxLength={2}
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="CA"
              />
            </div>

            <div>
              <label
                htmlFor="postalCode"
                style={{ display: "block", marginBottom: "5px" }}
              >
                ZIP *
              </label>
              <input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="94559"
              />
            </div>
          </div>
        </fieldset>

        {/* Date of Birth */}
        <fieldset
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ddd",
          }}
        >
          <legend style={{ fontWeight: "bold", fontSize: "18px" }}>
            Date of Birth
          </legend>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 2fr",
              gap: "15px",
            }}
          >
            <div>
              <label
                htmlFor="dobMonth"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Month *
              </label>
              <input
                id="dobMonth"
                type="number"
                min="1"
                max="12"
                value={formData.dobMonth}
                onChange={(e) => handleInputChange("dobMonth", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="1-12"
              />
            </div>

            <div>
              <label
                htmlFor="dobDay"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Day *
              </label>
              <input
                id="dobDay"
                type="number"
                min="1"
                max="31"
                value={formData.dobDay}
                onChange={(e) => handleInputChange("dobDay", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="1-31"
              />
            </div>

            <div>
              <label
                htmlFor="dobYear"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Year *
              </label>
              <input
                id="dobYear"
                type="number"
                min="1900"
                max={new Date().getFullYear() - 21}
                value={formData.dobYear}
                onChange={(e) => handleInputChange("dobYear", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="1990"
              />
            </div>
          </div>
          <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
            Customer must be 21+ years old
          </small>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: loading ? "#ccc" : "#8B0000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating Order..." : "Create Test Order"}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#c00", margin: "0 0 10px 0" }}>Error</h3>
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {error}
          </pre>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#efe",
            border: "1px solid #cfc",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ color: "#060", margin: "0 0 10px 0" }}>Success!</h3>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
```

---

## 2. Backend - API Route

**File**: `app/api/test/vinoshipper-order/route.ts`

### API Route Code

```typescript
import { NextRequest, NextResponse } from "next/server";

interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
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
    // Parse request body
    const body: VinoshipperOrderRequest = await request.json();
    const { customer } = body;

    // Validate required fields
    if (!customer.email || !customer.firstName || !customer.lastName) {
      return NextResponse.json(
        { error: "Missing required customer fields" },
        { status: 400 },
      );
    }

    // Validate address
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

    // Validate date of birth
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

    // Get environment variables
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

    // Create Basic Auth header
    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    // Format date of birth for Vinoshipper (YYYY-MM-DD)
    const dobString = `${customer.dateOfBirth.year}-${String(customer.dateOfBirth.month).padStart(2, "0")}-${String(customer.dateOfBirth.day).padStart(2, "0")}`;

    // Construct Vinoshipper order payload
    const vinoshipperPayload = {
      productIdType: productIdType,
      customer: {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        dateOfBirth: dobString,
        address: {
          street1: customer.address.street1,
          street2: customer.address.street2,
          city: customer.address.city,
          postalCode: customer.address.postalCode,
          stateCode: customer.address.stateCode,
          country: "US",
        },
      },
      items: [
        {
          id: productId,
          quantity: 1,
        },
      ],
      isPaid: true, // NFT redemption is the payment
      orderNumber: `TEST-${Date.now()}`, // Generate unique test order number
    };

    console.log(
      "Sending order to Vinoshipper:",
      JSON.stringify(vinoshipperPayload, null, 2),
    );

    // Call Vinoshipper API
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

    // Return success response
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
```

---

## 3. Expected API Responses

### Success Response (Order Approved)

```json
{
  "success": true,
  "orderId": "VS-12345",
  "orderNumber": "TEST-1234567890",
  "status": "APPROVED",
  "ageVerification": null,
  "vinoshipperResponse": {
    "orderId": "VS-12345",
    "orderNumber": "TEST-1234567890",
    "status": "APPROVED",
    "customer": { ... },
    "items": [ ... ]
  }
}
```

### Age Verification Required Response

```json
{
  "success": true,
  "orderId": "VS-12345",
  "orderNumber": "TEST-1234567890",
  "status": "PENDING",
  "ageVerification": {
    "status": "FAILED",
    "idScanUrl": "https://vinoshipper.com/id-scan/xyz123"
  },
  "vinoshipperResponse": { ... }
}
```

### Error Response (Compliance Failure)

```json
{
  "error": "Vinoshipper API error",
  "statusCode": 400,
  "details": {
    "message": "Order cannot be shipped to this address",
    "complianceIssues": ["Shipping to this state is not permitted"]
  }
}
```

---

## 4. Testing Checklist

### Test Cases

- [ ] **Valid Order - California Address**
  - Email: test@example.com
  - Name: John Doe
  - Address: 123 Main St, Napa, CA 94559
  - DOB: 01/15/1990
  - Expected: Order approved

- [ ] **Age Verification Failure**
  - Use address/DOB that triggers age verification
  - Expected: Returns `idScanUrl`

- [ ] **Invalid State - Restricted Shipping**
  - Use a state where wine shipping is restricted
  - Expected: Compliance error

- [ ] **Missing Required Fields**
  - Submit form with missing email
  - Expected: Validation error

- [ ] **Invalid Date of Birth**
  - Use DOB less than 21 years old
  - Expected: Age verification or rejection

- [ ] **Duplicate Order Number**
  - Try to create two orders with same order number
  - Expected: Error on second attempt

---

## 5. Vinoshipper Dashboard Verification

After creating test orders, verify in Vinoshipper dashboard:

1. Log into Vinoshipper account
2. Go to Orders section
3. Search for test order number (e.g., `TEST-1234567890`)
4. Verify:
   - Customer details are correct
   - Product is correct
   - Order status matches API response
   - If age verification required, ID scan link works

---

## 6. Environment Setup Instructions

### For Developers

1. **Get Vinoshipper credentials** from winery admin:
   - API Key
   - API Secret

2. **Get Product ID** from Vinoshipper dashboard:
   - Go to Products → Product List
   - Find your wine product
   - Copy either the SKU or Vinoshipper Product ID

3. **Create `.env.local` file**:

   ```env
   VINOSHIPPER_API_KEY=your_key_here
   VINOSHIPPER_API_SECRET=your_secret_here
   VINOSHIPPER_PRODUCT_ID=your_product_id_here
   VINOSHIPPER_PRODUCT_ID_TYPE=VS_ID
   ```

4. **Run the app**:

   ```bash
   npm run dev
   ```

5. **Navigate to test page**:
   ```
   http://localhost:3000/test/vinoshipper
   ```

---

## 7. Coding LLM Prompt

Use this prompt with your coding LLM:

```
Please implement a Vinoshipper order test page for our Next.js app based on the following spec:

1. Create a test page at `app/test/vinoshipper/page.tsx` with a form that collects:
   - Customer: email, firstName, lastName
   - Address: street1, street2, city, stateCode, postalCode
   - Date of Birth: day, month, year (as separate integer fields)

2. Create an API route at `app/api/test/vinoshipper-order/route.ts` that:
   - Accepts the form data as JSON
   - Validates all required fields
   - Formats the data for Vinoshipper API
   - Calls POST https://vinoshipper.com/api/v3/p/orders with Basic Auth
   - Returns the Vinoshipper response or error

3. Use these environment variables:
   - VINOSHIPPER_API_KEY
   - VINOSHIPPER_API_SECRET
   - VINOSHIPPER_PRODUCT_ID
   - VINOSHIPPER_PRODUCT_ID_TYPE (default: "VS_ID")

4. The form should display the API response (success or error) in a formatted way.

5. Use TypeScript and include proper type definitions.

Please implement both files with full error handling and validation.
```

---

## 8. Additional Notes

- **Order Numbers**: Test orders use prefix `TEST-` + timestamp to avoid collisions
- **isPaid**: Always set to `true` since NFT redemption is the payment method
- **Country**: Hardcoded to `US` for now
- **Phone**: Optional field, not included in test form
- **Quantity**: Hardcoded to 1 bottle per order

---

This spec provides everything needed to implement and test the Vinoshipper integration!

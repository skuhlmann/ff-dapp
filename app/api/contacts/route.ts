/**
 * /api/contacts
 *
 * GET  ?wallet=0x...  — Look up contact by wallet, return { hasEmail }
 * POST { wallet, email } — Create a new contact with source = 'updateSignup'
 */

import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";

import { findContactByWallet, createContact } from "@/lib/airtable";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactLookupResponse =
  | { hasEmail: true }
  | { hasEmail: false }
  | { error: string };

type ContactCreateResponse =
  | { status: "success" }
  | { status: "error"; message: string };

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");

    if (!wallet || !isAddress(wallet)) {
      return NextResponse.json<ContactLookupResponse>(
        { error: "Invalid or missing wallet address." },
        { status: 400 },
      );
    }

    const contact = await findContactByWallet(wallet);

    if (contact && contact.email) {
      return NextResponse.json<ContactLookupResponse>({ hasEmail: true });
    }

    return NextResponse.json<ContactLookupResponse>({ hasEmail: false });
  } catch (err) {
    console.error("Contact lookup error:", err);
    return NextResponse.json<ContactLookupResponse>(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wallet, email } = body as {
      wallet?: string;
      email?: string;
    };

    if (!wallet || !isAddress(wallet)) {
      return NextResponse.json<ContactCreateResponse>(
        { status: "error", message: "Invalid or missing wallet address." },
        { status: 400 },
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json<ContactCreateResponse>(
        { status: "error", message: "Invalid or missing email address." },
        { status: 400 },
      );
    }

    await createContact({
      email,
      wallet: wallet.toLowerCase(),
      source: "updateSignup",
    });

    return NextResponse.json<ContactCreateResponse>({ status: "success" });
  } catch (err) {
    console.error("Contact create error:", err);
    return NextResponse.json<ContactCreateResponse>(
      { status: "error", message: "Failed to save contact." },
      { status: 500 },
    );
  }
}

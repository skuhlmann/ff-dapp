/**
 * POST /api/claim
 *
 * Orchestrates the QR discount claim flow:
 *   1. Validate inputs
 *   2. Check subgraph for existing loot (anti-duplicate)
 *   3. Mint loot token if not already held
 *   4. Write record to Airtable
 *   5. Return typed ClaimResponse
 */

import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";

import { walletHasLoot } from "@/lib/subgraph";
import { writeCampaignClaim } from "@/lib/airtable";
import { mintLootToAddress } from "@/lib/mintLoot";
import {
  TARGET_NETWORK,
  DISCOUNT_DAO_ADDRESS,
  CAMPAIGN_AIRTABLE_RECORD_ID,
  CAMPAIGN_EXPIRY_DATE,
} from "@/utils/constants";
import { ClaimResponse } from "@/utils/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wallet, email, campaign } = body as {
      wallet?: string;
      email?: string;
      campaign?: string;
    };

    // ── Step 1: Validate ──────────────────────────────────────────────────────

    if (!wallet || !isAddress(wallet)) {
      return NextResponse.json<ClaimResponse>(
        { status: "error", message: "Invalid or missing wallet address." },
        { status: 400 },
      );
    }

    const expectedCampaign = CAMPAIGN_AIRTABLE_RECORD_ID;
    if (!campaign || campaign !== expectedCampaign) {
      return NextResponse.json<ClaimResponse>(
        { status: "error", message: "Invalid or missing campaign." },
        { status: 400 },
      );
    }

    if (email && !EMAIL_REGEX.test(email)) {
      return NextResponse.json<ClaimResponse>(
        { status: "error", message: "Invalid email address." },
        { status: 400 },
      );
    }

    const chainid = TARGET_NETWORK;
    const daoid = DISCOUNT_DAO_ADDRESS[chainid];
    const normalizedWallet = wallet.toLowerCase() as `0x${string}`;

    // ── Step 2: Check subgraph for existing loot ──────────────────────────────

    let hasLoot: boolean;
    try {
      hasLoot = await walletHasLoot({
        chainid,
        daoid,
        memberAddress: normalizedWallet,
      });
    } catch (err) {
      console.error("Subgraph check failed:", err);
      return NextResponse.json<ClaimResponse>(
        {
          status: "error",
          message: "Unable to verify membership status. Please try again.",
        },
        { status: 502 },
      );
    }

    // ── Step 3: Already has loot — record it and return early ─────────────────

    if (hasLoot) {
      try {
        await writeCampaignClaim({
          wallet: normalizedWallet,
          email: email ?? null,
          campaignRecordId: CAMPAIGN_AIRTABLE_RECORD_ID,
          mint_tx: null,
          source: "peachLoot",
        });
      } catch (err) {
        // Log but don't fail the response — the user still has their discount
        console.error("Airtable write failed (already_claimed):", err);
      }

      return NextResponse.json<ClaimResponse>({
        status: "already_claimed",
        expires: CAMPAIGN_EXPIRY_DATE,
      });
    }

    // ── Step 4: Mint loot token ───────────────────────────────────────────────

    let txHash: `0x${string}`;
    try {
      txHash = await mintLootToAddress(wallet as `0x${string}`, chainid);
    } catch (err) {
      console.error("Mint failed:", err);
      return NextResponse.json<ClaimResponse>(
        {
          status: "error",
          message: "Mint transaction failed. Please try again.",
        },
        { status: 500 },
      );
    }

    // ── Step 5: Write Airtable record ─────────────────────────────────────────

    try {
      await writeCampaignClaim({
        wallet: normalizedWallet,
        email: email ?? null,
        campaignRecordId: CAMPAIGN_AIRTABLE_RECORD_ID,
        mint_tx: txHash,
        source: "ethDenverQR",
      });
    } catch (err) {
      // Log but don't fail — the mint succeeded, which is the critical step
      console.error("Airtable write failed (success):", err);
    }

    // ── Step 6: Return success ────────────────────────────────────────────────

    return NextResponse.json<ClaimResponse>({
      status: "success",
      tx: txHash,
      expires: CAMPAIGN_EXPIRY_DATE,
    });
  } catch (err) {
    console.error("Claim route unhandled error:", err);
    return NextResponse.json<ClaimResponse>(
      { status: "error", message: "Internal server error." },
      { status: 500 },
    );
  }
}

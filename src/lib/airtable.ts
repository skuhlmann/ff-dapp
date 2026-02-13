/**
 * Airtable REST client for writing campaign claim records.
 * Uses the Airtable Web API directly — no SDK dependency required.
 */

const AIRTABLE_API_URL = "https://api.airtable.com/v0";
const CAMPAIGN_CLAIMS_TABLE = "tblxr47CduTHBEHdn";

export type ClaimSource = "ethDenverQR" | "peachLoot";

export type CampaignClaimRecord = {
  wallet: string;
  email?: string | null;
  /** Airtable record ID of the linked Campaign row */
  campaignRecordId: string;
  mint_tx?: string | null;
  source: ClaimSource;
};

/**
 * Writes a new claim row to the CampaignClaims Airtable table.
 * Throws on network error or non-2xx response.
 */
export async function writeCampaignClaim(
  claim: CampaignClaimRecord,
): Promise<void> {
  const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!accessToken) throw new Error("AIRTABLE_ACCESS_TOKEN is not set");
  if (!baseId) throw new Error("AIRTABLE_BASE_ID is not set");

  const fields: Record<string, unknown> = {
    wallet: claim.wallet,
    source: claim.source,
    // Link to the Campaign record by its Airtable record ID
    campaign: [claim.campaignRecordId],
  };

  if (claim.email) fields.email = claim.email;
  if (claim.mint_tx) fields.mint_tx = claim.mint_tx;

  const response = await fetch(
    `${AIRTABLE_API_URL}/${baseId}/${CAMPAIGN_CLAIMS_TABLE}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Airtable write failed (${response.status}): ${errorBody}`);
  }
}

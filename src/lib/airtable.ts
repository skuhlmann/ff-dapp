/**
 * Airtable REST client — no SDK dependency required.
 * Uses the Airtable Web API directly.
 */

const AIRTABLE_API_URL = "https://api.airtable.com/v0";
const CONTACTS_TABLE = "tblxr47CduTHBEHdn";
const FF_ORDERS_TABLE = "tblMi44LGLjeAfJlr";

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
    `${AIRTABLE_API_URL}/${baseId}/${CONTACTS_TABLE}`,
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

export type CreateContactRecord = {
  email: string;
  wallet: string;
  source: string;
};

/**
 * Looks up a contact row by wallet address.
 * Returns the first matching record's email, or null if none found.
 */
export async function findContactByWallet(
  wallet: string,
): Promise<{ email: string | null } | null> {
  const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!accessToken) throw new Error("AIRTABLE_ACCESS_TOKEN is not set");
  if (!baseId) throw new Error("AIRTABLE_BASE_ID is not set");

  const formula = encodeURIComponent(
    `LOWER({wallet}) = "${wallet.toLowerCase()}"`,
  );

  const response = await fetch(
    `${AIRTABLE_API_URL}/${baseId}/${CONTACTS_TABLE}?filterByFormula=${formula}&maxRecords=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Airtable read failed (${response.status}): ${errorBody}`,
    );
  }

  const data = await response.json();

  if (!data.records || data.records.length === 0) {
    return null;
  }

  return {
    email: data.records[0].fields.email ?? null,
  };
}

// ─── FFOrders table ──────────────────────────────────────────────────────────

import type { WineOrderStatus, WineOrderProblem, WineOrderRecord } from "../utils/types";

export type CreateOrderRecord = {
  tokenId: string;
  orderNumber: string;
  orderStatus: WineOrderStatus;
  orderProblems?: WineOrderProblem[];
};

/**
 * Writes a new row to the FFOrders Airtable table.
 * Returns the Airtable record ID of the new row.
 */
export async function createOrderRecord(
  record: CreateOrderRecord,
): Promise<{ id: string }> {
  const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!accessToken) throw new Error("AIRTABLE_ACCESS_TOKEN is not set");
  if (!baseId) throw new Error("AIRTABLE_BASE_ID is not set");

  const fields: Record<string, unknown> = {
    tokenId: record.tokenId,
    orderNumber: record.orderNumber,
    orderStatus: record.orderStatus,
    orderProblems: record.orderProblems
      ? JSON.stringify(record.orderProblems)
      : "",
  };

  const response = await fetch(
    `${AIRTABLE_API_URL}/${baseId}/${FF_ORDERS_TABLE}`,
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
    throw new Error(
      `Airtable order write failed (${response.status}): ${errorBody}`,
    );
  }

  const data = await response.json();
  return { id: data.id };
}

/**
 * Looks up the most recent FFOrders row by tokenId.
 * Returns null if no record found.
 */
export async function findOrderByTokenId(
  tokenId: string,
): Promise<WineOrderRecord | null> {
  const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!accessToken) throw new Error("AIRTABLE_ACCESS_TOKEN is not set");
  if (!baseId) throw new Error("AIRTABLE_BASE_ID is not set");

  const formula = encodeURIComponent(`{tokenId} = "${tokenId}"`);

  const response = await fetch(
    `${AIRTABLE_API_URL}/${baseId}/${FF_ORDERS_TABLE}?filterByFormula=${formula}&maxRecords=1&sort[0][field]=createdAt&sort[0][direction]=desc`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Airtable order read failed (${response.status}): ${errorBody}`,
    );
  }

  const data = await response.json();

  if (!data.records || data.records.length === 0) return null;

  const row = data.records[0];
  const f = row.fields;

  let orderProblems: WineOrderProblem[] = [];
  if (f.orderProblems) {
    try {
      orderProblems = JSON.parse(f.orderProblems);
    } catch {
      orderProblems = [];
    }
  }

  return {
    airtableId: row.id,
    tokenId: f.tokenId,
    orderNumber: f.orderNumber,
    orderStatus: f.orderStatus as WineOrderStatus,
    orderProblems,
    createdAt: row.createdTime,
  };
}

/**
 * Updates fields on an existing FFOrders row by its Airtable record ID.
 */
export async function updateOrderRecord(
  airtableId: string,
  updates: { orderStatus?: WineOrderStatus; orderProblems?: WineOrderProblem[] },
): Promise<void> {
  const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!accessToken) throw new Error("AIRTABLE_ACCESS_TOKEN is not set");
  if (!baseId) throw new Error("AIRTABLE_BASE_ID is not set");

  const fields: Record<string, unknown> = {};
  if (updates.orderStatus !== undefined) fields.orderStatus = updates.orderStatus;
  if (updates.orderProblems !== undefined)
    fields.orderProblems = JSON.stringify(updates.orderProblems);

  const response = await fetch(
    `${AIRTABLE_API_URL}/${baseId}/${FF_ORDERS_TABLE}/${airtableId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Airtable order update failed (${response.status}): ${errorBody}`,
    );
  }
}

// ─── Contacts table ───────────────────────────────────────────────────────────

/**
 * Creates a new contact row in the contacts Airtable table.
 * No campaign is linked; source is provided by caller.
 */
export async function createContact(
  contact: CreateContactRecord,
): Promise<void> {
  const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!accessToken) throw new Error("AIRTABLE_ACCESS_TOKEN is not set");
  if (!baseId) throw new Error("AIRTABLE_BASE_ID is not set");

  const fields: Record<string, unknown> = {
    email: contact.email,
    wallet: contact.wallet,
    source: contact.source,
  };

  const response = await fetch(
    `${AIRTABLE_API_URL}/${baseId}/${CONTACTS_TABLE}`,
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
    throw new Error(
      `Airtable contact write failed (${response.status}): ${errorBody}`,
    );
  }
}

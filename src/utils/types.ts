export type TreeNft = {
  tokenID: string;
  contractAddress: string;
  tokenMetadata?: {
    image?: string;
    name: string;
    description?: string;
  };
};

export type NftItem = {
  tokenID: string;
  contractAddress: string;
  tokenMetadata?: {
    image?: string;
    name: string;
    description?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: { [key: string]: any }[];
  };
};

export type WateringRes = {
  count: number;
  waterings: {
    createdAt: number;
    tokenId: string;
    createdBy: string;
    wateringDay: string;
  };
  today: boolean;
};

export type EnsData = {
  ensName: string | null;
  ensText: string | undefined;
};

export type LeadersRes = Array<Array<string | number | EnsData>>;

export type PeachOrderData = {
  webUrl: string;
  checkoutId: string;
  orderId: string;
  createdAt: string;
};

export type MemberItem = {
  id: string;
  createdAt: string;
  txHash: string;
  memberAddress: string;
  shares: string;
  loot: string;
  sharesLootDelegateShares: string;
  delegatingTo: string;
  delegateShares: string;
  delegateOfCount: string;
  lastDelegateUpdateTxHash: string;
  votes: {
    txHash: string;
    createdAt: string;
    approved: boolean;
    balance: string;
  };
};

// Contact record
export type Contact = {
  id: number;
  email: string | null;
  wallet: string | null;
  Created: string; // ISO date string
  campaign: string[]; // Array of linked campaign record IDs
  campaignName: string | null; // Lookup field
  mint_tx: string | null;
  source: string | null;
};

// Campaign record
export type Campaign = {
  id: number;
  name: string | null;
  status: "Closed" | "Active" | "Upcoming" | null;
  Created: string; // ISO date string
  expirationTime: string | null; // ISO date string
  contacts: string[]; // Array of linked contact record IDs
};

// Base schema
export type ForgottenCRMBase = { contacts: Contact[]; campaigns: Campaign[] };

// /api/claim response discriminated union
export type ClaimResponse =
  | { status: "success"; tx: string; expires: string }
  | { status: "already_claimed"; expires: string }
  | { status: "error"; message: string };

export type WineOrderStatus = "SUCCESS" | "PENDING" | "CANCELLED" | "FAILED";

export type WineOrderProblem = {
  code: string;
  description: string;
  type: string;
};

export type WineOrderRecord = {
  airtableId?: string;
  tokenId: string;
  orderNumber: string;
  orderStatus: WineOrderStatus;
  orderProblems: WineOrderProblem[];
  createdAt: string;
};

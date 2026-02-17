import { base, sepolia } from "viem/chains";

export const TARGET_NETWORK = process.env.NEXT_PUBLIC_TARGET_NETWORK as string;

export const CHAIN_OBJ = TARGET_NETWORK === "0x2105" ? base : sepolia;
export const RARIBLE_PREFIX = TARGET_NETWORK === "0x2105" ? "BASE" : "ETHEREUM";
export const RARIBLE_STAGE = TARGET_NETWORK === "0x2105" ? "prod" : "testnet";

// export const SALE_STATE = "upcoming";
// export const SALE_STATE = "ongoing";
export const SALE_STATE: "presale" | "upcoming" | "ongoing" | "closed" =
  "presale";

// export const ALCHEMY_RPC =
//   TARGET_NETWORK === "0x2105"
//     ? `https://base-mainnet.g.alchemy.com/v2/${
//         process.env.NEXT_PUBLIC_ALCHEMY_KEY
//       }`
//     : `https://eth-sepolia.g.alchemy.com/v2/${
//         process.env.NEXT_PUBLIC_ALCHEMY_KEY
//       }`;

export const ALCHEMY_RPC =
  TARGET_NETWORK === "0x2105"
    ? `https://base-rpc.publicnode.com`
    : `https://eth-sepolia.g.alchemy.com/v2/${
        process.env.NEXT_PUBLIC_ALCHEMY_KEY
      }`;

export const ALCHEMY_RPC_MAINNET = `https://eth-mainnet.g.alchemy.com/v2/${
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
}`;

export const NFT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0x929453Cde694f21d192d921FEcEE2555a2464984",
  "0x2105": "0x1b8d8139772599a636410245bd4E1e6ab304558e",
};
// https://basescan.org/address/0x1b8d8139772599a636410245bd4E1e6ab304558e#code
export const ERC20_PAYMENT_TOKEN: Record<string, string> = {
  "0xaa36a7": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "0x2105": "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
};

export const PEACH_NFT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xC0552Fd7131D8cC74b77dDaF8E43C006A31adCdA",
  "0x2105": "0x5eAE1344f40f25b827782AfF0B3651b2DCD2259E",
};

export const TOKEN_IMG_IPFS_HASH: Record<number, string> = {
  0: "bafybeidgbsnvgiih5spo6rbjraj7p4nivjvmr3jqggbfrz4ssil5wdjufi",
  1: "bafybeigpd2hikamzi75hbhk4huv7vbrfemt62u36pcgdh2crex555nlnqa",
};

export const BLOCK_EXPLORER_URL: Record<string, string> = {
  "0xaa36a7": "https://sepolia.etherscan.io/",
  "0x2105": "https://basescan.org/",
};

export const SEQUENCE_ENDPOINT: Record<string, string> = {
  "0xaa36a7": "https://sepolia-indexer.sequence.app",
  "0x2105": "https://base-indexer.sequence.app",
};

export const CHECKOUT_URL = "/api/checkout";

export const SEASON_OVER_TEXT =
  " The 2024 Peach Season has come to an end. See you next Spring!";

export const DISCOUNT_DAO_ADDRESS: Record<string, string> = {
  "0xaa36a7": "0x4101c4fddb53370ad7fe2d589655b74a242f10ac",
  "0x2105": "0x4101c4fddb53370ad7fe2d589655b74a242f10ac",
};

// Airtable record ID (recXXX format) for the linked Campaign row
export const CAMPAIGN_AIRTABLE_RECORD_ID = "rec0cqHBDOV8RRuqO";

// ISO date string for when the current discount campaign expires
export const CAMPAIGN_EXPIRY_DATE = "2026-04-01T00:00:00.000Z";

// Full URL the QR code resolves to — configurable per environment
export const QR_CLAIM_URL = `${process.env.NEXT_PUBLIC_URL}/claim?campaign=${CAMPAIGN_AIRTABLE_RECORD_ID}`;

import { base, sepolia } from "viem/chains";

export const TARGET_NETWORK = import.meta.env.VITE_TARGET_NETWORK as string;

export const CHAIN_OBJ = TARGET_NETWORK === "0x2105" ? base : sepolia;
export const RARIBLE_PREFIX = TARGET_NETWORK === "0x2105" ? "BASE" : "ETHEREUM";
export const RARIBLE_STAGE = TARGET_NETWORK === "0x2105" ? "prod" : "testnet";

// export const SALE_STATE = "upcoming";
// export const SALE_STATE = "ongoing";
export const SALE_STATE: "presale" | "upcoming" | "ongoing" | "closed" =
  "upcoming";

export const ALCHEMY_RPC =
  TARGET_NETWORK === "0x2105"
    ? `https://base-mainnet.g.alchemy.com/v2/${
        import.meta.env.VITE_ALCHEMY_KEY
      }`
    : `https://eth-sepolia.g.alchemy.com/v2/${
        import.meta.env.VITE_ALCHEMY_KEY
      }`;

export const NFT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0x3c505E0dD90053c3472c053BE021B11Efc40afF1",
  "0x2105": "0xA9d3c833df8415233e1626F29E33ccBA37d2A187",
};

export const ERC20_PAYMENT_TOKEN: Record<string, string> = {
  "0xaa36a7": "0x53c8156592A64E949A4736c6D3309002fa0b2Aba",
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

export const CHECKOUT_URL =
  "https://bhe263f8bh.execute-api.us-east-1.amazonaws.com/prod/peach-checkout";

export const SEASON_OVER_TEXT =
  " The 2024 Peach Season has come to an end. See you next Spring!";

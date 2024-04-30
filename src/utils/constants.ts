import { base, sepolia } from "viem/chains";
import treeOne from "../assets/Tree-1.png";
import treeTwo from "../assets/Tree-2.png";
import treeThree from "../assets/Tree-3.png";

export const TARGET_NETWORK = import.meta.env.VITE_TARGET_NETWORK as string;

export const CHAIN_OBJ = TARGET_NETWORK === "0x2105" ? base : sepolia;

export const ALCHEMY_RPC =
  TARGET_NETWORK === "0x2105"
    ? `https://base-mainnet.g.alchemy.com/v2/${
        import.meta.env.VITE_ALCHEMY_KEY
      }`
    : `https://eth-sepolia.g.alchemy.com/v2/${
        import.meta.env.VITE_ALCHEMY_KEY
      }`;

export const NFT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xB49a877D82c1f0133B0293dfd20eB54BEd07a290",
  "0x2105": "0xA9d3c833df8415233e1626F29E33ccBA37d2A187",
};

export const NFT_MINT_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(88800000000000000),
};

export const ERC20_PAYMENT_TOKEN: Record<string, string> = {
  "0xaa36a7": "0x53c8156592A64E949A4736c6D3309002fa0b2Aba",
  "0x2105": "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
};

export const PRUNE_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xE26f5ef42636155b8299A67063450792537d71EB",
  "0x2105": "0xEEcAAe1d9061f0ae1813e41A47179e06844ac0Ec",
};

export const PRUNE_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(22000000000000000),
};

export const PRUNE_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(10000000000000000),
  "0x2105": BigInt(5200000000000000000000),
};

export const FERT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xEb8ED63d034b3235372028755CbeCb0CC978AdE1",
  "0x2105": "0x0",
};

export const FERT_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(0),
};

export const FERT_DISCOUNT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0x8FAE2f5B1eD1a73ee7c96703AeaCc735Fbe82Ed0",
  "0x2105": "0x0",
};

export const FERT_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(0),
};

export const FERT_DISCOUNT_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(900000000000000),
  "0x2105": BigInt(0),
};

export const FERT_DISCOUNT_ERC20_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(900000000000000),
  "0x2105": BigInt(0),
};

export const SPRAY_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xe709a9C0412393C3C3a6906b052A57cf86b1Cc81",
  "0x2105": "0x0",
};

export const SPRAY_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(0),
};

export const SPRAY_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(0),
};

export const SPRAYS_PER_TOKEN = 2;

export const BLOCK_EXPLORER_URL: Record<string, string> = {
  "0xaa36a7": "https://sepolia.etherscan.io/",
  "0x2105": "https://basescan.org/",
};

export const SEQUENCE_ENDPOINT: Record<string, string> = {
  "0xaa36a7": "https://sepolia-indexer.sequence.app",
  "0x2105": "https://base-indexer.sequence.app",
};

export const WATERING_ENDPOINT: Record<string, string> = {
  "0xaa36a7":
    "https://esxop67lpg.execute-api.us-east-1.amazonaws.com/dev/waterings",
  "0x2105":
    "https://bhe263f8bh.execute-api.us-east-1.amazonaws.com/prod/waterings",
};

export const LEADER_ENDPOINT =
  "https://bhe263f8bh.execute-api.us-east-1.amazonaws.com/prod/leaders";

export type NftTreeMeta = { name: string; img: string; value: number };

export const CRITTER_COUNT_PLUS_ONE = 7;

export const TREE_NFT_DATA: NftTreeMeta[] = [
  {
    name: "The Proud Peacher",
    img: treeOne,
    value: 0,
  },
  {
    name: "Peachicus Magnificus",
    img: treeTwo,
    value: 1,
  },
  {
    name: "Big ol` Peachy",
    img: treeThree,
    value: 2,
  },
];

export const BOOST_POINTS = {
  PRUNE: 75,
  WATERING: 1,
  FERT: 100,
  SPRAY: 33,
};

export const BOOST_BONUS = {
  PRUNE: 1,
  FERT: 1,
  SPRAY: 1,
};

export const WATERING_MESSAGE =
  "PEACH TYCOON: YOU BUY TREE. TREE GROWS PEACH. YOU EAT PEACH. YOU ALSO SIGN THIS MESSAGE TO WATER YOUR TREE.";

export const SPRAY_FERT_DISABLED = true;
export const PRUNE_ENDED = true;

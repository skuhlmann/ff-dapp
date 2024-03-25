import { base, sepolia } from "viem/chains";
import treeOne from "../assets/Tree-1.png";
import treeTwo from "../assets/Tree-2.png";
import treeThree from "../assets/Tree-3.png";

export const TARGET_NETWORK = import.meta.env.VITE_TARGET_NETWORK as string;

export const CHAIN_OBJ = TARGET_NETWORK === "0x2105" ? base : sepolia;

export const ALCHEMY_RPC =
  TARGET_NETWORK === "0x2105"
    ? `https://base.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`
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

export const PRUNE_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0x7D09941B1C81a39F73615A7D41ac066D3a82da25",
  "0x2105": "0x0",
};

export const PRUNE_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(1000000000000000),
};

export const PRUNE_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(10000000000000000),
  "0x2105": BigInt(10000000000000000),
};

export const PRUNE_ERC20: Record<string, string> = {
  "0xaa36a7": "0x53c8156592A64E949A4736c6D3309002fa0b2Aba",
  "0x2105": "0x0",
};

export const BLOCK_EXPLORER_URL: Record<string, string> = {
  "0xaa36a7": "https://sepolia.etherscan.io",
  "0x2105": "https://basescan.org/",
};

export const SEQUENCE_ENDPOINT: Record<string, string> = {
  "0xaa36a7": "https://sepolia-indexer.sequence.app",
  "0x2105": "https://base-indexer.sequence.app",
};

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
};

export const BOOST_BONUS = {
  PRUNE: 1,
};

import treeOne from "../assets/Tree-1.png";
import treeTwo from "../assets/Tree-2.png";
import treeThree from "../assets/Tree-3.png";

export const TARGET_NETWORK = import.meta.env.VITE_TARGET_NETWORK as string;

export const NFT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xB49a877D82c1f0133B0293dfd20eB54BEd07a290",
  "0x2105": "0xA9d3c833df8415233e1626F29E33ccBA37d2A187",
};

export const NFT_MINT_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(88800000000000000),
};

export const PRUNE_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xe635944C58F5a6c5b425e024e3716f76eeC83b0c",
  "0x2105": "0x0",
};

export const PRUNE_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(1000000000000000),
};

export const BLOCK_EXPLORER_URL: Record<string, string> = {
  "0xaa36a7": "sepolia.etherscan.io",
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

export const COMING_SOON = false;

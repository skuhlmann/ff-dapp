import treeOne from "../assets/Tree-1.png";
import treeTwo from "../assets/Tree-2.png";
import treeThree from "../assets/Tree-3.png";

export const NFT_CONTRACT_ADDRESS =
  "0xA9d3c833df8415233e1626F29E33ccBA37d2A187";
export const NFT_MINT_PRICE = BigInt(88800000000000000);

export const BLOCK_EXPLORER_URL = "https://basescan.org/";

export const SEQUENCE_ENDPOINT = "https://base-indexer.sequence.app";

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

// test

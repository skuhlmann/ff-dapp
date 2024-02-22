import treeOne from "../assets/Tree-1.png";
import treeTwo from "../assets/Tree-2.png";
import treeThree from "../assets/Tree-3.png";

export const NFT_CONTRACT_ADDRESS =
  "0xf19db47f7cca0c3aa501ce61c158cbae1830a3e7";
export const NFT_MINT_PRICE = BigInt(1000000000000000);

export const BLOCK_EXPLORER_URL = "https://sepolia.etherscan.io/";

export const SEQUENCE_ENDPOINT = "https://sepolia-indexer.sequence.app";
// "https://base-indexer.sequence.app"

export type NftTreeMeta = { name: string; img: string };

export const TREE_NFT_DATA: NftTreeMeta[] = [
  {
    name: "The Proud Peacher",
    img: treeOne,
  },
  {
    name: "Peachicus Magnificus",
    img: treeTwo,
  },
  {
    name: "Big ol’ Peachy",
    img: treeThree,
  },
];

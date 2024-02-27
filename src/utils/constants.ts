import treeOne from "../assets/Tree-1.png";
import treeTwo from "../assets/Tree-2.png";
import treeThree from "../assets/Tree-3.png";

export const NFT_CONTRACT_ADDRESS =
  "0x0facf9f9ca77744b8a3a972253e8124149d1d753";
export const NFT_MINT_PRICE = BigInt(1000000000000000);

export const BLOCK_EXPLORER_URL = "https://sepolia.etherscan.io/";

export const SEQUENCE_ENDPOINT = "https://sepolia-indexer.sequence.app";
// "https://base-indexer.sequence.app"

export type NftTreeMeta = { name: string; img: string; value: number };

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

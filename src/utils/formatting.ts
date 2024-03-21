import { formatEther } from "viem";
import { NFT_MINT_PRICE, TARGET_NETWORK } from "./constants";

export type Noun = {
  singular: string;
  plural: string;
};

export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;
export const charLimit = (str: string | undefined, limit: number) =>
  str && str.length > limit ? `${str.slice(0, limit)}...` : str;
export const handlePluralNoun = (noun: Noun, count: number) =>
  count === 1 ? noun.singular : noun.plural;
export const fromWei = (amt: string): string => {
  return formatEther(BigInt(amt)).toString();
};
export const toBigInt = (
  amt?: string | number | boolean | bigint
): bigint | undefined => {
  if (amt) {
    return BigInt(amt as string | number | boolean | bigint);
  }
};
export const isJSON = (obj: unknown) => {
  try {
    JSON.parse(obj as string);
    return true;
  } catch (e) {
    return false;
  }
};
export const getDisplayPrice = () => {
  return `${fromWei(NFT_MINT_PRICE[TARGET_NETWORK].toString())} ETH`;
};

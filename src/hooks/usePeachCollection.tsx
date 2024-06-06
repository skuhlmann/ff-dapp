import { useQuery } from "@tanstack/react-query";
import { createRaribleSdk } from "@rarible/sdk";
import type { Items } from "@rarible/api-client";
import {
  PEACH_NFT_CONTRACT_ADDRESS,
  RARIBLE_PREFIX,
  RARIBLE_STAGE,
  TARGET_NETWORK,
} from "../utils/constants";

const fetchPeachCollection = async () => {
  const contractAddress = PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK];

  const sdk = createRaribleSdk(undefined, RARIBLE_STAGE, {
    apiKey: import.meta.env.VITE_RARIBLE_KEY,
  });

  // ETHEREUM:${token}:${tokenId}
  const items = (await sdk.apis.item.getItemsByCollection({
    collection: `${RARIBLE_PREFIX}:${contractAddress}`,
  })) as Items;

  return { items };
};

export const usePeachCollection = () => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`rarible-peaches`],
    queryFn: () => fetchPeachCollection(),
  });

  return { ...data, error, ...rest };
};

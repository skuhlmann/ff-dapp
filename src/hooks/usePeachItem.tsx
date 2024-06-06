import { useQuery } from "@tanstack/react-query";
import { createRaribleSdk } from "@rarible/sdk";
import type { Item } from "@rarible/api-client";
import {
  PEACH_NFT_CONTRACT_ADDRESS,
  RARIBLE_PREFIX,
  RARIBLE_STAGE,
  TARGET_NETWORK,
} from "../utils/constants";
import { toItemId } from "@rarible/types";

const fetchItem = async ({ tokenId }: { tokenId: string }) => {
  const contractAddress = PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK];

  const sdk = createRaribleSdk(undefined, RARIBLE_STAGE, {
    apiKey: import.meta.env.VITE_RARIBLE_KEY,
  });

  console.log("feetch", tokenId);
  const item = (await sdk.apis.item.getItemById({
    itemId: toItemId(`${RARIBLE_PREFIX}:${contractAddress}:${tokenId}`),
  })) as Item;

  return { item };
};

export const usePeachItem = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`rarible-peach`, [tokenId]],
    queryFn: () => fetchItem({ tokenId }),
    // enabled: !!tokenId,
  });

  return { ...data, error, ...rest };
};

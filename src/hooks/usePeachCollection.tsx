import { useQuery } from "@tanstack/react-query";
import { createRaribleSdk } from "@rarible/sdk";
// import { Item } from "@rarible/api-client"
// import { LeadersRes } from "../utils/types";
import {
  NFT_CONTRACT_ADDRESS,
  RARIBLE_PREFIX,
  RARIBLE_STAGE,
  TARGET_NETWORK,
} from "../utils/constants";
// import { CollectionId } from "@rarible/types";

const fetchPeachCollection = async () => {
  const contractAddress = NFT_CONTRACT_ADDRESS[TARGET_NETWORK];

  const sdk = createRaribleSdk(undefined, RARIBLE_STAGE, {
    apiKey: import.meta.env.VITE_RARIBLE_KEY,
  });

  // ETHEREUM:${token}:${tokenId}
  const items = await sdk.apis.item.getItemsByCollection({
    collection: `${RARIBLE_PREFIX}:${contractAddress}`,
  });

  console.log("items", items);

  const item = await sdk.apis.item.getItemById({
    itemId: `${RARIBLE_PREFIX}:${contractAddress}:8`,
  });

  console.log("item", item);

  const collection = await sdk.apis.collection.getCollectionById({
    collection: `${RARIBLE_PREFIX}:${contractAddress}`,
  });

  console.log("collection", collection);

  return { collection: collection };
};

export const usePeachCollection = () => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`rarible-peaches`],
    queryFn: () => fetchPeachCollection(),
  });

  return { ...data, error, ...rest };
};

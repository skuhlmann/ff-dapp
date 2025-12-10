import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  CHAIN_OBJ,
  TOKEN_IMG_IPFS_HASH,
  NFT_CONTRACT_ADDRESS,
  // RARIBLE_PREFIX,
  // RARIBLE_STAGE,
  TARGET_NETWORK,
} from "../utils/constants";
import nftAbi from "../abis/GrapeERC721.json";

import { dhImagePathFromIpfs, getTokenStatus } from "../utils/formatting";
// import { createRaribleSdk } from "@rarible/sdk";

const fetchTokenStatus = async ({
  tokenId,
  contractAddress,
}: {
  tokenId: string;
  contractAddress: string;
}) => {
  if (!tokenId || !contractAddress) {
    throw new Error("Missing Args");
  }

  const publicClient = createPublicClient({
    chain: CHAIN_OBJ,
    transport: http(),
  });

  const tokenState = (await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: nftAbi,
    functionName: "tokenState",
    args: [tokenId],
  })) as number;

  const imgIpfs = TOKEN_IMG_IPFS_HASH[tokenState];

  // const sdk = createRaribleSdk(undefined, RARIBLE_STAGE, {
  //   apiKey: import.meta.env.VITE_RARIBLE_KEY,
  // });

  // // ETHEREUM:${token}:${tokenId}
  // // BASE:${token}:${tokenId}
  // const orders = await sdk.apis.order.getSellOrdersByItem({
  //   itemId: `${RARIBLE_PREFIX}:${contractAddress}:${tokenId}`,
  //   // @ts-expect-error rarible sdk trippin
  //   status: ["ACTIVE"],
  // });

  return {
    tokenState,
    tokenStatus: getTokenStatus(tokenState),
    img: `${dhImagePathFromIpfs(imgIpfs)}/${tokenId}.png`,
    // orders: orders?.orders || [],
  };
};

export const useTokenStatus = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`tokenStatus-${tokenId}`],
    queryFn: () =>
      fetchTokenStatus({
        tokenId,
        contractAddress: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      }),
  });

  return { error, ...data, ...rest };
};

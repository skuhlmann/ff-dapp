import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  CHAIN_OBJ,
  PEACH_IMG_IPFS_HASH,
  PEACH_NFT_CONTRACT_ADDRESS,
  // RARIBLE_PREFIX,
  // RARIBLE_STAGE,
  TARGET_NETWORK,
} from "../utils/constants";
import peachAbi from "../abis/PeachERC712.json";

import { dhImagePathFromIpfs, getPeachStatus } from "../utils/formatting";
// import { createRaribleSdk } from "@rarible/sdk";

const fetchPeachStatus = async ({
  tokenId,
  peachAddress,
}: {
  tokenId: string;
  peachAddress: string;
}) => {
  if (!tokenId || !peachAddress) {
    throw new Error("Missing Args");
  }

  const publicClient = createPublicClient({
    chain: CHAIN_OBJ,
    transport: http(),
  });

  const tokenState = (await publicClient.readContract({
    address: peachAddress as `0x${string}`,
    abi: peachAbi,
    functionName: "tokenState",
    args: [tokenId],
  })) as number;

  const imgIpfs = PEACH_IMG_IPFS_HASH[tokenState];

  // const sdk = createRaribleSdk(undefined, RARIBLE_STAGE, {
  //   apiKey: import.meta.env.VITE_RARIBLE_KEY,
  // });

  // // ETHEREUM:${token}:${tokenId}
  // // BASE:${token}:${tokenId}
  // const orders = await sdk.apis.order.getSellOrdersByItem({
  //   itemId: `${RARIBLE_PREFIX}:${peachAddress}:${tokenId}`,
  //   // @ts-expect-error rarible sdk trippin
  //   status: ["ACTIVE"],
  // });

  return {
    tokenState,
    peachStatus: getPeachStatus(tokenState),
    img: `${dhImagePathFromIpfs(imgIpfs)}${
      Number(tokenState) > 0 ? `/${tokenId}.png` : ""
    }`,
    // orders: orders?.orders || [],
  };
};

export const usePeachStatus = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`peachStatus-${tokenId}`],
    queryFn: () =>
      fetchPeachStatus({
        tokenId,
        peachAddress: PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      }),
  });

  return { error, ...data, ...rest };
};

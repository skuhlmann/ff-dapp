import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  CHAIN_OBJ,
  PEACH_NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import peachAbi from "../abis/PeachERC712.json";

import { getPeachStatus } from "../utils/formatting";

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

  console.log("tokenState", tokenState);

  return {
    tokenState,
    peachStatus: getPeachStatus(tokenState),
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

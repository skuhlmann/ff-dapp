import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  ALCHEMY_RPC,
  CHAIN_OBJ,
  NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import nftAbi from "../abis/GrapeERC721.json";

const fetchRedemptionWindow = async (contractAddress: `0x${string}`) => {
  const publicClient = createPublicClient({
    chain: CHAIN_OBJ,
    transport: http(ALCHEMY_RPC),
  });

  const [redemptionStart, redemptionEnd] = await Promise.all([
    publicClient.readContract({
      address: contractAddress,
      abi: nftAbi,
      functionName: "redemptionStart",
      args: [],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: contractAddress,
      abi: nftAbi,
      functionName: "redemptionEnd",
      args: [],
    }) as Promise<bigint>,
  ]);

  const now = BigInt(Math.floor(Date.now() / 1000));
  const isRedemptionOpen = now >= redemptionStart && now <= redemptionEnd;

  return {
    redemptionStart: Number(redemptionStart),
    redemptionEnd: Number(redemptionEnd),
    isRedemptionOpen,
  };
};

export const useRedemptionWindow = () => {
  const { data, error, ...rest } = useQuery({
    queryKey: ["redemptionWindow"],
    queryFn: () =>
      fetchRedemptionWindow(NFT_CONTRACT_ADDRESS[TARGET_NETWORK]),
    enabled: !!NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
  });

  return { error, ...data, ...rest };
};

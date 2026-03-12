import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  ALCHEMY_RPC,
  CHAIN_OBJ,
  NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import nftAbi from "../abis/GrapeERC721.json";

const fetchNftSupply = async (contractAddress: `0x${string}`) => {
  const publicClient = createPublicClient({
    chain: CHAIN_OBJ,
    transport: http(ALCHEMY_RPC),
  });

  const [maxSupply, totalSupply] = await Promise.all([
    publicClient.readContract({
      address: contractAddress,
      abi: nftAbi,
      functionName: "maxSupply",
      args: [],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: contractAddress,
      abi: nftAbi,
      functionName: "totalSupply",
      args: [],
    }) as Promise<bigint>,
  ]);

  return {
    maxSupply: Number(maxSupply),
    totalSupply: Number(totalSupply),
    remaining: Number(maxSupply) - Number(totalSupply),
  };
};

export const useNftSupply = () => {
  const { data, error, ...rest } = useQuery({
    queryKey: ["nftSupply"],
    queryFn: () => fetchNftSupply(NFT_CONTRACT_ADDRESS[TARGET_NETWORK]),
    enabled: !!NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
  });

  return { error, ...data, ...rest };
};

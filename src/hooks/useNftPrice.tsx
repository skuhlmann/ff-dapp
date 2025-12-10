import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  CHAIN_OBJ,
  NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import nftAbi from "../abis/GrapeERC721.json";

const fetchNftPrice = async ({
  userAddress,
  contractAddress,
}: {
  userAddress?: `0x${string}`;
  contractAddress: `0x${string}`;
}) => {
  const publicClient = createPublicClient({
    chain: CHAIN_OBJ,
    transport: http(),
  });

  // Read baseline prices
  const baselineMintPrice = (await publicClient.readContract({
    address: contractAddress,
    abi: nftAbi,
    functionName: "mintPrice",
    args: [],
  })) as bigint;

  const baselineErc20MintPrice = (await publicClient.readContract({
    address: contractAddress,
    abi: nftAbi,
    functionName: "erc20MintPrice",
    args: [],
  })) as bigint;

  // Read user-specific prices if address is provided
  let userMintPrice: bigint | undefined;
  let userErc20MintPrice: bigint | undefined;
  let hasDiscount = false;

  if (userAddress) {
    userMintPrice = (await publicClient.readContract({
      address: contractAddress,
      abi: nftAbi,
      functionName: "getMintPrice",
      args: [userAddress, false],
    })) as bigint;

    userErc20MintPrice = (await publicClient.readContract({
      address: contractAddress,
      abi: nftAbi,
      functionName: "getMintPrice",
      args: [userAddress, true],
    })) as bigint;

    // Check if user has discount (user price is less than baseline)
    hasDiscount =
      userMintPrice < baselineMintPrice ||
      userErc20MintPrice < baselineErc20MintPrice;
  }

  return {
    baselineMintPrice,
    baselineErc20MintPrice,
    userMintPrice,
    userErc20MintPrice,
    hasDiscount,
  };
};

export const useNftPrice = ({
  userAddress,
}: {
  userAddress?: `0x${string}`;
}) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`nftPrice-${userAddress || "no-address"}`],
    queryFn: () =>
      fetchNftPrice({
        userAddress,
        contractAddress: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      }),
    enabled: !!NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
  });

  return { error, ...data, ...rest };
};


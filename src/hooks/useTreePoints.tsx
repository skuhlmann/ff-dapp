import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  BOOST_BONUS,
  BOOST_POINTS,
  CHAIN_OBJ,
  PRUNE_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import prunAbi from "../abis/Prune.json";

const addPoints = ({ prune }: { prune: boolean }): number => {
  let totalPoints = 0;
  if (prune) totalPoints += BOOST_POINTS.PRUNE;

  return totalPoints;
};

const addPeachBoxes = ({ prune }: { prune: boolean }): number => {
  let peachBoxes = 2;
  if (prune) peachBoxes += BOOST_BONUS.PRUNE;

  return peachBoxes;
};

const fetchPointsForTree = async ({
  tokenId,
  contractAddress,
}: {
  tokenId: string;
  contractAddress?: string;
}) => {
  if (!tokenId || !contractAddress) {
    throw new Error("Missing Args");
  }

  const publicClient = createPublicClient({
    chain: CHAIN_OBJ,
    transport: http(),
  });

  const data = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: prunAbi,
    functionName: "prunings",
    args: [tokenId],
  });
  const prune = data == 1;
  const totalPoints = addPoints({ prune });

  const peachBoxes = addPeachBoxes({ prune });

  return {
    totalPoints,
    prune,
    spray: false,
    waterings: "0",
    fertilizings: "0",
    peachBoxes,
  };
};

export const useTreePoints = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`treePoints-${tokenId}`],
    queryFn: () =>
      fetchPointsForTree({
        tokenId,
        contractAddress: PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK],
      }),
  });

  return { error, ...data, ...rest };
};

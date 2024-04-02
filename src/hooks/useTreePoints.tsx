import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  BOOST_BONUS,
  BOOST_POINTS,
  CHAIN_OBJ,
  PRUNE_CONTRACT_ADDRESS,
  TARGET_NETWORK,
  WATERING_ENDPOINT,
} from "../utils/constants";
import prunAbi from "../abis/Prune.json";
import { get } from "../utils/fetch";
import { WateringRes } from "../utils/types";

const addPoints = ({
  prune,
  waterings,
}: {
  prune: boolean;
  waterings: number;
}): number => {
  let totalPoints = 0;
  if (prune) totalPoints += BOOST_POINTS.PRUNE;
  totalPoints += waterings;

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

  const pruneData = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: prunAbi,
    functionName: "prunings",
    args: [tokenId],
  });

  const prune = pruneData == 1;

  const waterings = (await get(
    `${WATERING_ENDPOINT[TARGET_NETWORK]}?tokenId=${tokenId}`
  )) as WateringRes;

  const totalPoints = addPoints({ prune, waterings: waterings.count });

  const peachBoxes = addPeachBoxes({ prune });

  return {
    waterings: waterings.count,
    watererdToday: waterings.today,
    totalPoints,
    prune,
    spray: false,
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

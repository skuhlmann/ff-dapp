import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  BOOST_BONUS,
  BOOST_POINTS,
  CHAIN_OBJ,
  FERT_CONTRACT_ADDRESS,
  PRUNE_CONTRACT_ADDRESS,
  TARGET_NETWORK,
  WATERING_ENDPOINT,
} from "../utils/constants";
import prunAbi from "../abis/Prune.json";
import fertAbi from "../abis/Fert.json";
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
  pruneAddress,
  fertAddress,
}: {
  tokenId: string;
  pruneAddress?: string;
  fertAddress?: string;
}) => {
  if (!tokenId || !pruneAddress || !fertAddress) {
    throw new Error("Missing Args");
  }

  const publicClient = createPublicClient({
    chain: CHAIN_OBJ,
    transport: http(),
  });

  const pruneData = await publicClient.readContract({
    address: pruneAddress as `0x${string}`,
    abi: prunAbi,
    functionName: "prunings",
    args: [tokenId],
  });

  const prune = pruneData == 1;

  const fertData = await publicClient.readContract({
    address: fertAddress as `0x${string}`,
    abi: fertAbi,
    functionName: "fertlizations",
    args: [tokenId],
  });

  const fert = fertData == 1;

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
    fert,
    sprays: "1",
    peachBoxes,
  };
};

export const useTreePoints = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`treePoints-${tokenId}`],
    queryFn: () =>
      fetchPointsForTree({
        tokenId,
        pruneAddress: PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK],
        fertAddress: FERT_CONTRACT_ADDRESS[TARGET_NETWORK],
      }),
  });

  return { error, ...data, ...rest };
};

import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  BOOST_BONUS,
  BOOST_POINTS,
  CHAIN_OBJ,
  FERT_CONTRACT_ADDRESS,
  PRUNE_CONTRACT_ADDRESS,
  // SPRAYS_PER_TOKEN,
  SPRAY_CONTRACT_ADDRESS,
  TARGET_NETWORK,
  WATERING_ENDPOINT,
} from "../utils/constants";
import prunAbi from "../abis/Prune.json";
// import fertAbi from "../abis/Fert.json";
// import sprayAbi from "../abis/Spray.json";

import { get } from "../utils/fetch";
import { WateringRes } from "../utils/types";

const addPoints = ({
  prune,
  // fert,
  waterings,
}: // sprays,
{
  prune: boolean;
  // fert: boolean;
  waterings: number;
  // sprays: number;
}): number => {
  let totalPoints = 0;
  if (prune) totalPoints += BOOST_POINTS.PRUNE;
  // if (fert) totalPoints += BOOST_POINTS.FERT;
  // const sprayPoints = sprays * BOOST_POINTS.SPRAY;
  const sprayPoints = 0 * BOOST_POINTS.SPRAY;

  totalPoints += sprayPoints;
  totalPoints += waterings;

  return totalPoints;
};

const addPeachBoxes = ({
  prune,
}: // fert,
// sprayWins,
{
  prune: boolean;
  // fert: boolean;
  // sprayWins: number;
}): number => {
  let peachBoxes = 2;
  if (prune) peachBoxes += BOOST_BONUS.PRUNE;
  // if (fert) peachBoxes += BOOST_BONUS.FERT;
  // const sprayBoxes = sprayWins * BOOST_POINTS.SPRAY;
  const sprayBoxes = 0 * BOOST_POINTS.SPRAY;

  peachBoxes += sprayBoxes;

  return peachBoxes;
};

const fetchPointsForTree = async ({
  tokenId,
  pruneAddress,
  fertAddress,
  sprayAddress,
}: {
  tokenId: string;
  pruneAddress?: string;
  fertAddress?: string;
  sprayAddress?: string;
}) => {
  if (!tokenId || !pruneAddress || !fertAddress || !sprayAddress) {
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

  // const fertData = await publicClient.readContract({
  //   address: fertAddress as `0x${string}`,
  //   abi: fertAbi,
  //   functionName: "fertlizations",
  //   args: [tokenId],
  // });

  // const fert = fertData == 1;

  // const sprays = (await publicClient.readContract({
  //   address: sprayAddress as `0x${string}`,
  //   abi: sprayAbi,
  //   functionName: "sprayAttempts",
  //   args: [tokenId],
  // })) as number;

  // const canSpray = sprays < SPRAYS_PER_TOKEN;

  // const sprayWins = (await publicClient.readContract({
  //   address: sprayAddress as `0x${string}`,
  //   abi: sprayAbi,
  //   functionName: "sprayWins",
  //   args: [tokenId],
  // })) as number;

  const waterings = (await get(
    `${WATERING_ENDPOINT[TARGET_NETWORK]}?tokenId=${tokenId}`
  )) as WateringRes;

  const totalPoints = addPoints({
    prune,
    // fert,
    waterings: waterings.count,
    // sprays,
  });

  // const peachBoxes = addPeachBoxes({ prune, fert, sprayWins });
  const peachBoxes = addPeachBoxes({ prune });

  return {
    waterings: waterings.count,
    watererdToday: waterings.today,
    totalPoints,
    prune,
    // fert,
    // sprays,
    // sprayWins,
    // canSpray,
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
        sprayAddress: SPRAY_CONTRACT_ADDRESS[TARGET_NETWORK],
      }),
  });

  return { error, ...data, ...rest };
};

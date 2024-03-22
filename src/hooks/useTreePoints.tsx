import { useQuery } from "react-query";
import { createPublicClient, http } from "viem";

import {
  CHAIN_OBJ,
  PRUNE_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import prunAbi from "../abis/Prune.json";

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

  console.log("data", data);

  return {
    totalPoints: "75",
    prune: false,
    spray: false,
    waterings: "0",
    fertilizings: "0",
    peachBoxes: "3",
  };
};

export const useTreePoints = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery(
    [`treePoints-${tokenId}`],
    () =>
      fetchPointsForTree({
        tokenId,
        contractAddress: PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK],
      })
    // { enabled: !!wallet }
  );

  return { error, ...data, ...rest };
};

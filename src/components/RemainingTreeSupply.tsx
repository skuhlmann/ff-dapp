import { useReadContract } from "wagmi";
import { Box, Heading } from "@chakra-ui/react";

import { NFT_CONTRACT_ADDRESS, TARGET_NETWORK } from "../utils/constants";
import erc721Abi from "../abis/ERC721.json";
import { fromBigNumber } from "../utils/formatting";

export const RemainingTreeSupply = () => {
  const { data: totalSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
    abi: erc721Abi,
    functionName: "totalSupply",
  });

  if (!totalSupply)
    return (
      <Box mb="2rem" textAlign="center">
        <Heading size="lg">Only 200 Trees Available</Heading>
      </Box>
    );

  const total = totalSupply as bigint;
  const count = fromBigNumber(BigInt(200) - total);

  return (
    <Box mb="2rem" textAlign="center">
      <Heading size="lg">Only {count} Trees Left!</Heading>
    </Box>
  );
};

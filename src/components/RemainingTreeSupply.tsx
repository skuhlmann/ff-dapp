import { useContractRead } from "wagmi";
import { Box, Heading } from "@chakra-ui/react";

import { NFT_CONTRACT_ADDRESS, TARGET_NETWORK } from "../utils/constants";
import erc721Abi from "../abis/ERC721.json";
import { fromBigNumber } from "../utils/formaters";

export const RemainingTreeSupply = () => {
  console.log(
    "NFT_CONTRACT_ADDRESS[TARGET_NETWORK]",
    NFT_CONTRACT_ADDRESS[TARGET_NETWORK]
  );
  const totalSupply = useContractRead({
    address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
    abi: erc721Abi,
    functionName: "totalSupply",
    watch: true,
  });

  if (!totalSupply.data)
    return (
      <Box mb="2rem" textAlign="center">
        <Heading size="lg">Only 200 Trees Available</Heading>
      </Box>
    );

  console.log("totalSupply.data", totalSupply.data);

  const total = totalSupply.data as bigint;
  const count = fromBigNumber(BigInt(200) - total);

  return (
    <Box mb="2rem" textAlign="center">
      <Heading size="lg">Only {count} Trees Left!</Heading>
    </Box>
  );
};

// import { useReadContract } from "wagmi";
import { Box, Heading } from "@chakra-ui/react";

// import { NFT_CONTRACT_ADDRESS, TARGET_NETWORK } from "../utils/constants";
// import erc721Abi from "../abis/ERC721.json";
import { fromBigNumber } from "../utils/formatting";

const TOTAL_SUPPLY = 420;

export const RemainingSupply = () => {
  // const { data: totalSupply } = useReadContract({
  //   address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
  //   abi: erc721Abi,
  //   functionName: "totalSupply",
  // });
  const totalSupply = 351n;

  if (!totalSupply)
    return (
      <Box mb="2rem" textAlign="center">
        <Heading size="lg">Only {TOTAL_SUPPLY} Bottle Available</Heading>
      </Box>
    );

  const total = totalSupply as bigint;
  const count = fromBigNumber(BigInt(TOTAL_SUPPLY) - total);

  return (
    <Box mb="2rem" textAlign="center">
      <Heading size="lg" color="brand.orange">
        Only {count} Bottles Left!
      </Heading>
    </Box>
  );
};

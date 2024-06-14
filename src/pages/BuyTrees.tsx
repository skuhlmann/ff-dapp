import { usePrivy } from "@privy-io/react-auth";
import { NftTreeMeta, TREE_NFT_DATA } from "../utils/constants";
import { TreeMintCard } from "../components/TreeMintCard";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
// import { RemainingTreeSupply } from "../components/RemainingTreeSupply";
import { BoostContent } from "../components/BoostContent";

function BuyTrees() {
  const { ready, user } = usePrivy();

  return (
    <>
      {!ready && null}
      {/* <RemainingTreeSupply /> */}

      <Box mb="2rem" textAlign="center">
        <Heading size="xl">Tree Sales Have Ended</Heading>
      </Box>

      <Flex
        gap="1rem"
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        mb="3rem"
      >
        {TREE_NFT_DATA.map((tree: NftTreeMeta) => {
          return (
            <TreeMintCard
              tree={tree}
              key={tree.name}
              account={user?.wallet?.address}
            />
          );
        })}
      </Flex>

      <Box mb={20} px="10px" textAlign="center">
        <Text fontSize="md">
          3% of tree sales will be added to the ‘Farmer’s Pot’. The better you
          farm, the more points you earn and a larger percentage of the pot you
          can win!
        </Text>
      </Box>

      <Flex
        w="full"
        border="none"
        direction="row"
        alignItems="center"
        justifyContent="start"
        my={10}
      >
        <Divider
          mt={4}
          mr={4}
          width="100vw"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        mb="15rem"
        w="full"
      >
        <BoostContent />
      </Flex>
    </>
  );
}

export default BuyTrees;

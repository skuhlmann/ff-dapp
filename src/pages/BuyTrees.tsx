import { usePrivy } from "@privy-io/react-auth";
import { NftTreeMeta, TREE_NFT_DATA } from "../utils/constants";
import { TreeMintCard } from "../components/TreeMintCard";
import { Flex } from "@chakra-ui/react";

function BuyTrees() {
  const { ready, user } = usePrivy();

  return (
    <>
      {!ready && null}

      <Flex
        gap="1rem"
        direction={{ base: "column", md: "row" }}
        align="center"
        mb="15rem"
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
    </>
  );
}

export default BuyTrees;

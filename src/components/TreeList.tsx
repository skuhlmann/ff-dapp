import { Flex, Spinner, Text, Box } from "@chakra-ui/react";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { TreeNft } from "../utils/types";
import { TreeCard } from "./TreeCard";

export const TreeList = ({ address }: { address: string }) => {
  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
  });

  console.log("accountNfts", accountNfts);

  return (
    <Box mb="5rem">
      {isLoading && <Spinner />}

      {accountNfts?.balances && accountNfts?.balances.length > 0 && (
        <Flex
          gap="1rem"
          wrap="wrap"
          direction={{ base: "column", md: "row" }}
          align="center"
        >
          {accountNfts.balances.map((token: TreeNft) => {
            return <TreeCard tree={token} key={token.tokenID} />;
          })}
        </Flex>
      )}

      {!accountNfts?.balances ||
        (!accountNfts?.balances.length && (
          <Text color="brand.orange">You don’t own any trees yet!</Text>
        ))}
    </Box>
  );
};

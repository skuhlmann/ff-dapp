import { Flex, Spinner, Text, Box, Button } from "@chakra-ui/react";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { TreeNft } from "../utils/types";
import { TreeCard } from "./TreeCard";
import { Link } from "react-router-dom";

export const TreeList = ({ account }: { account: string }) => {
  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: account,
  });

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
            return (
              <TreeCard tree={token} key={token.tokenID} account={account} />
            );
          })}
        </Flex>
      )}
    </Box>
  );
};

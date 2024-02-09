import { Flex, Heading, Spinner, Text, Box } from "@chakra-ui/react";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { TreeNftItem } from "./TreeNftItem";
import { TreeNft } from "../utils/types";

export const TreeList = ({ address }: { address: string }) => {
  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
  });

  return (
    <Box>
      <Heading fontSize="20px" mb="1rem">
        Your Trees
      </Heading>

      {isLoading && <Spinner />}

      {accountNfts?.balances && accountNfts?.balances.length > 0 && (
        <Flex direction="column" gap="1rem">
          {accountNfts.balances.map((token: TreeNft) => {
            return <TreeNftItem tree={token} key={token.tokenID} />;
          })}
        </Flex>
      )}

      {!accountNfts?.balances ||
        (!accountNfts?.balances.length && (
          <Text>You don't have any trees</Text>
        ))}
    </Box>
  );
};

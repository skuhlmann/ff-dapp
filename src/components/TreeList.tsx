import { Flex, Spinner, Text, Box, Button } from "@chakra-ui/react";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { TreeNft } from "../utils/types";
import { TreeCard } from "./TreeCard";
import { Link } from "react-router-dom";

export const TreeList = ({ address }: { address: string }) => {
  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
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
            return <TreeCard tree={token} key={token.tokenID} />;
          })}
        </Flex>
      )}

      {!accountNfts?.balances ||
        (!accountNfts?.balances.length && (
          <>
            <Text color="brand.orange" mb="2rem">
              You don’t own any trees yet!
            </Text>
            <Button
              as={Link}
              to="/buy-trees"
              variant="outline"
              fontFamily="heading"
              fontSize="xl"
              fontStyle="italic"
              fontWeight="700"
              border="1px"
              borderColor="brand.green"
              borderRadius="200px;"
              color="brand.orange"
              size="lg"
              height="60px"
              width="220px"
              my="1rem"
              _hover={{ bg: "transparent", color: "brand.white" }}
            >
              BUY TREES
            </Button>
          </>
        ))}
    </Box>
  );
};

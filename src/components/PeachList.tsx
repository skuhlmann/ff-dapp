import { Flex, Spinner, Text, Box, Button } from "@chakra-ui/react";
import { PeachNft } from "../utils/types";
import { Link } from "react-router-dom";
import { useAccountPeaches } from "../hooks/useAccountPeaches";
import { PeachNftCard } from "./PeachNftCard";

export const PeachList = ({ account }: { account: string }) => {
  const { accountNfts, isLoading } = useAccountPeaches({
    accountAddress: account,
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
          {accountNfts.balances.map((token: PeachNft) => {
            return (
              <PeachNftCard
                peach={token}
                key={token.tokenID}
                account={account}
              />
            );
          })}
        </Flex>
      )}

      {!accountNfts?.balances ||
        (!accountNfts?.balances.length && (
          <>
            <Text color="brand.orange" mb="2rem">
              You don’t own any peaches yet!
            </Text>
            <Button
              as={Link}
              to="/market"
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
              BUY PEACHES
            </Button>
          </>
        ))}
    </Box>
  );
};

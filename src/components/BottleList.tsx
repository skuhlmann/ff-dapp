import { Flex, Spinner, Box, Button, Heading } from "@chakra-ui/react";
import { PeachNft } from "../utils/types";
import { Link } from "react-router-dom";
import { useAccountPeaches } from "../hooks/useAccountPeaches";
import { PeachNftCard } from "./PeachNftCard";

export const BottleList = ({ account }: { account: string }) => {
  const { accountNfts, isLoading } = useAccountPeaches({
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
          justify="center"
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
          <Flex gap="1rem" direction="column" align="center" justify="center">
            <Heading color="brand.tan" mb="2rem">
              You don’t own any bottles yet!
            </Heading>
          </Flex>
        ))}
    </Box>
  );
};

import { Flex, Box, Heading } from "@chakra-ui/react";
import type { Item } from "@rarible/api-client";
import { ListingCard } from "./ListingCard";

export const ListingList = ({ listings }: { listings: Item[] }) => {
  return (
    <Box mb="5rem">
      <Flex
        gap="1rem"
        wrap="wrap"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
      >
        {listings.length < 1 && (
          <Flex gap="1rem" direction="column" align="center" justify="center">
            <Heading color="brand.orange">Market Sold Out</Heading>
            <Heading color="brand.orange">Check back soon</Heading>
          </Flex>
        )}
        {listings.map((item: Item) => {
          return (
            <ListingCard
              tokenId={item.tokenId as string}
              peach={item}
              key={item.tokenId}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

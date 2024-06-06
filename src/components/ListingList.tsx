import { Flex, Box } from "@chakra-ui/react";
import type { Item } from "@rarible/api-client";
import { ListingCard } from "./ListingCard";

export const ListingList = ({ listings }: { listings: Item[] }) => {
  console.log("listings", listings);
  return (
    <Box mb="5rem">
      <Flex
        gap="1rem"
        wrap="wrap"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
      >
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

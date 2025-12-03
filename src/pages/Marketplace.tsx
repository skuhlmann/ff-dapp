// import { useEffect, useState } from "react";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { SectionHeader } from "../components/SectionHeader";

function Marketplace() {
  // const { items } = usePeachCollection();

  // const [sort, setSort] = useState("new");
  // const [itemList, setItemList] = useState<Item[] | undefined>();

  // useEffect(() => {
  //   if (items) {
  //     if (sort === "low") {
  //       setItemList(
  //         items.sort((a, b) => {
  //           return (
  //             Number(a.bestSellOrder?.makePriceUsd || 0) -
  //             Number(b.bestSellOrder?.makePriceUsd || 0)
  //           );
  //         })
  //       );
  //     } else if (sort === "high") {
  //       setItemList(
  //         items.sort((a, b) => {
  //           return (
  //             Number(b.bestSellOrder?.makePriceUsd || 0) -
  //             Number(a.bestSellOrder?.makePriceUsd || 0)
  //           );
  //         })
  //       );
  //     } else {
  //       setItemList(items);
  //     }
  //   }
  // }, [sort, items]);

  // const handleSortChange = (event) => setSort(event.target.value);

  return (
    <>
      <Box w="100%" textAlign="center" my="3rem" color="brand.blue">
        <SectionHeader title="Wine Market" />

        <Text
          fontSize="md"
          mt="2rem"
          width={{ base: "90%", lg: "50%" }}
          mx="auto"
        >
          Welcome to the Forgotten Fruit Marketplace. The only place to snag a
          bottle if you missed the first drop.
        </Text>

        <Text
          fontSize="sm"
          mt="1rem"
          width={{ base: "90%", lg: "50%" }}
          mx="auto"
        >
          Buy Tickets / Bottles: Hunt for rare skele-grapes, each one tied to a
          real-life bottle.
        </Text>

        <Text
          fontSize="sm"
          mt="1rem"
          width={{ base: "90%", lg: "50%" }}
          mx="auto"
        >
          Set your price, list your bottle, and share the love (or profit) of
          misfit grapes.
        </Text>

        <Text
          fontSize="sm"
          mt="1rem"
          width={{ base: "90%", lg: "50%" }}
          mx="auto"
        >
          Every transaction is handled on-chain, but don’t worry — blockchain
          doesn’t bite.
        </Text>
      </Box>
      <Flex
        w="full"
        border="none"
        direction="row"
        alignItems="center"
        justifyContent="start"
        mt={10}
      >
        <Divider
          mt={4}
          mr={4}
          width="10vw"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
        <Text color="brand.white" fontSize="20px" fontWeight="bold">
          On Sale
        </Text>
        <Divider
          mt={4}
          ml={4}
          flex="1"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
      </Flex>
      {/* <Flex mt={5} ml={3} mb={8}>
        <Box width="10vw" />
        <Box width="17vw">
          <Select
            color="brand.orange"
            borderBottomStyle="none"
            variant="unstyled"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="new">Newest</option>
            <option value="low">Price (Low to High)</option>
            <option value="high">Price (High to Low)</option>
          </Select>
        </Box>
    
      </Flex>

      <Flex
        w="100%"
        gap="1rem"
        direction="column"
        align="center"
        justify="center"
        mb="3rem"
      >
        {itemList && <ListingList listings={itemList} />}
      </Flex> */}
      <Flex
        as="nav"
        align="center"
        justify="center"
        w="100%"
        textAlign="center"
        // backgroundColor="brand.green"
        px={8}
        my={8}
      >
        <Text fontSize="2xl" py="1rem" fontWeight="700">
          {/* {SEASON_OVER_TEXT}
           */}
          Marketplace is coming soon!
        </Text>
      </Flex>
    </>
  );
}

export default Marketplace;

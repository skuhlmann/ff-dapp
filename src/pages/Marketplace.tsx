import { useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, Select, Text } from "@chakra-ui/react";
import { usePeachCollection } from "../hooks/usePeachCollection";
import type { Item } from "@rarible/api-client";
import { ListingList } from "../components/ListingList";

function Marketplace() {
  const { items } = usePeachCollection();

  const [sort, setSort] = useState("new");
  const [itemList, setItemList] = useState<Item[] | undefined>();

  useEffect(() => {
    if (items) {
      const filtered = items.items.filter((item: Item) => {
        return !!item.bestSellOrder;
      });

      if (sort === "low") {
        setItemList(
          filtered.sort((a, b) => {
            return (
              Number(a.bestSellOrder?.makePriceUsd || 0) -
              Number(b.bestSellOrder?.makePriceUsd || 0)
            );
          })
        );
      } else if (sort === "high") {
        setItemList(
          filtered.sort((a, b) => {
            return (
              Number(b.bestSellOrder?.makePriceUsd || 0) -
              Number(a.bestSellOrder?.makePriceUsd || 0)
            );
          })
        );
      } else {
        setItemList(filtered);
      }
    }
  }, [sort, items]);

  // @ts-expect-error react types
  const handleSortChange = (event) => setSort(event.target.value);

  return (
    <>
      <Box w="100%" textAlign="center" my="3rem">
        <Heading size="3xl">Farmer's Market</Heading>
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
        <Text
          fontFamily="auster"
          color="brand.white"
          fontSize="20px"
          fontWeight="bold"
        >
          Peach Sale
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
      <Flex mt={5} ml={3} mb={8}>
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
        {/* <Box ml={4} mr={4} width={{ base: "80%", lg: "20vw" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdOutlineSearch color="gray.300" />
            </InputLeftElement>
            <Input />
          </InputGroup>
        </Box> */}
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
      </Flex>
    </>
  );
}

export default Marketplace;

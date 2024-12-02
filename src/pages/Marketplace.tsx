// import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  // Select,
  Text,
  Image,
} from "@chakra-ui/react";
import styled from "styled-components";
// import { usePeachCollection } from "../hooks/usePeachCollection";
// import type { Item } from "@rarible/api-client";
// import { ListingList } from "../components/ListingList";

import PeachCrate from "../assets/Crate.png";
import PeachUnredeemed from "../assets/10-peach-trans.png";
import PeachRedeemed from "../assets/10-bite-trans.png";

import Arrow1 from "../assets/Arrow1.png";
import { brandColors } from "../theme";
import { SEASON_OVER_TEXT } from "../utils/constants";
import { SectionHeader } from "../components/SectionHeader";

const BoxCard = styled(Box)`
  width: 300px;
  height: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${brandColors.gray};
  border-radius: 20px;
  padding: 26px 14px 26px 29px;
`;

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
      <Box w="100%" textAlign="center" my="3rem">
        <SectionHeader title="Wine Market" />

        <Text
          fontSize="md"
          mt="2rem"
          width={{ base: "90%", lg: "50%" }}
          mx="auto"
        >
          Welcome to the Peach Tycoon Marketplace. In the dedicated marketplace
          below, you can purchase peach boxes directly from the Peach Tycoon
          farmers at a price point they have set. Every peach box is represented
          by a unique NFT designed by Waxbones and is redeemable for a box of
          fresh peaches in the continental US or a bag of freeze dried peaches
          for international buyers.
        </Text>
      </Box>
      <Flex
        my="2rem"
        border="none"
        direction="row"
        align="center"
        justify="center"
        wrap="wrap"
        gap="1rem"
      >
        <BoxCard>
          <Image src={PeachCrate} />
          <Heading size="lg" color="brand.green" my=".5rem">
            Open
          </Heading>
          <Text fontSize="sm">
            Boxed NFTs have not yet been opened and individual buyers will be
            able to open and reveal their unique Peach NFT.
          </Text>
        </BoxCard>
        <Image display={{ base: "none", md: "block" }} mx="8" src={Arrow1} />

        <BoxCard>
          <Image src={PeachUnredeemed} />
          <Heading size="lg" color="brand.green" my=".5rem">
            Reveal
          </Heading>
          <Text fontSize="sm">
            After opening, your specific Peach NFT will be revealed. In some
            cases, the farmers have already chosen to unbox, so you can choose
            one that you like.
          </Text>
        </BoxCard>
        <Image display={{ base: "none", md: "block" }} mx="8" src={Arrow1} />

        <BoxCard>
          <Image src={PeachRedeemed} />
          <Heading size="lg" color="brand.green" my=".5rem">
            Redeem
          </Heading>
          <Text fontSize="sm">
            Later this summer, every NFT will be redeemable for a box of real
            peaches or freeze dried equivalent. Upon redemption, your Peach NFT
            will evolve to show it has been redeemed and reveal its unique peach
            pit.
          </Text>
        </BoxCard>
      </Flex>
      <Box w="100%" textAlign="center" my="3rem">
        <Text
          fontSize="md"
          mt="2rem"
          width={{ base: "90%", lg: "50%" }}
          mx="auto"
        >
          When redeeming, you will be asked to input your shipping information
          and your peach boxes will be shipped free of charge via two-day air so
          they arrive fresh.
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
          {SEASON_OVER_TEXT}
        </Text>
      </Flex>
    </>
  );
}

export default Marketplace;

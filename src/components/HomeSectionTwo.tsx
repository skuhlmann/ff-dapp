import { Flex, Text, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { LabelBadge } from "./SharedLayout";

import GrapeNft from "../assets/ff_nft_example_1.jpg";

export const HomeSectionTwo = () => {
  return (
    <Flex
      mt={{ base: "0", md: "140px" }}
      direction={{ base: "column", md: "row-reverse" }}
      justifyContent="start"
      alignItems="center"
      px="10vw"
      color="brand.blue"
    >
      <Flex
        direction="column"
        alignItems={{ base: "start", md: "end" }}
        flex="1"
        mb="2rem"
        ml={{ base: "0px", md: "50px" }}
      >
        <Flex gap="1rem" align="center" mb="1rem">
          <LabelBadge
            bg="brand.lightPurple"
            color="brand.blue"
            size="lg"
            height="50px"
            style={{
              lineHeight: "1.75",
            }}
          >
            • MINT SOME FRUIT •
          </LabelBadge>
        </Flex>

        <Text maxW="500px" textAlign={{ base: "left", md: "right" }} mb="2rem">
          Forgotten Fruit are generative NFTs redeemable for a bottle of
          artisanal wine.
        </Text>
        <Text maxW="500px" textAlign={{ base: "left", md: "right" }} mb="2rem">
          Mint some Fruit to reveal your unique grape bundle design.
        </Text>
      </Flex>
      <Image src={GrapeNft} w={{ base: "400px", xl: "537px" }} />
    </Flex>
  );
};

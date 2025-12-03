import { Flex, Text, Image, Divider, Box } from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import GrapeNft from "../assets/ff_nft_example_1.jpg";

export const HomeSectionTwo = () => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%">
      <Flex
        w="full"
        border="none"
        direction="row"
        align="center"
        justify="center"
        mb={10}
      >
        <Divider
          mt={8}
          mr={8}
          flex="1"
          borderTop="solid 2px"
          borderColor={"brand.orange"}
          borderBottom="none"
          background="none"
        />
        <Text
          fontFamily="AntiqueStories"
          color="brand.orange"
          fontSize="50px"
          fontWeight="bold"
        >
          How It Works
        </Text>
        <Divider
          mt={8}
          ml={8}
          flex="1"
          borderTop="solid 2px"
          borderColor={"brand.orange"}
          borderBottom="none"
          background="none"
        />
      </Flex>

      <Flex
        mt={{ base: "0", md: "2rem" }}
        direction={{ base: "column", md: "row" }}
        justifyContent="start"
        alignItems="center"
        px={{ base: "5vw", md: "15vw" }}
        color="brand.blue"
        gap="1rem"
      >
        <Box flex="1" mb="2rem" minW={{ base: "none", md: "250px" }}>
          <Flex gap="1rem" align="center" mb="1rem">
            <LabelBadge
              bg="brand.orange"
              color="brand.tan"
              size="lg"
              minH={{ base: "30px", md: "50px" }}
              lineHeight={{ base: "1.55", md: "1.85" }}
            >
              • 1. BUY A BOTTLE •
            </LabelBadge>
          </Flex>

          <Text maxW="500px" mb="1rem">
            Grab a bottle and instantly unlock a ticket with unique skele-grape
            artwork. Each grape has traits as wild as the wine it represents.
          </Text>

          <Flex gap="1rem" align="center" mb="1rem">
            <LabelBadge
              bg="brand.orange"
              color="brand.tan"
              size="lg"
              minH={{ base: "30px", md: "50px" }}
              lineHeight={{ base: "1.55", md: "1.85" }}
            >
              • 2. GIFT, RESELL OR AGE •
            </LabelBadge>
          </Flex>

          <Text maxW="500px" mb="1rem">
            Keep your bottle in your digital cellar for up to a year to let it
            mature.
          </Text>

          <Text maxW="500px" mb="1rem">
            Not feeling attached? Sell your ticket in the marketplace. Prices
            are up to you.
          </Text>

          <Text maxW="500px" mb="1rem">
            Share the joy of misfit grapes with someone else.
          </Text>

          <Flex gap="1rem" align="center" mb="1rem">
            <LabelBadge
              bg="brand.orange"
              color="brand.tan"
              size="lg"
              minH={{ base: "30px", md: "50px" }}
              lineHeight={{ base: "1.55", md: "1.85" }}
            >
              • 3. EXPLORE AND COLLECT •
            </LabelBadge>
          </Flex>

          <Text maxW="500px">
            Browse the marketplace for rare skele-grapes and bottles that didn’t
            make the first cut. Every sip comes with a story.
          </Text>
        </Box>

        <Image src={GrapeNft} w={{ base: "400px", xl: "537px" }} />
      </Flex>
    </Flex>
  );
};

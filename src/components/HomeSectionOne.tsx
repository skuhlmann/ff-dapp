import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Text, Link, Image } from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import BottleMock from "../assets/ff_bottle_temp.png";

export const HomeSectionOne = () => {
  return (
    <Flex
      mt={{ base: "0", md: "100px" }}
      direction={{ base: "column", md: "row" }}
      justifyContent="start"
      alignItems="center"
      px="10vw"
      color="brand.blue"
    >
      <Box flex="1" mb="2rem" minW={{ base: "none", md: "250px" }}>
        <Flex gap="1rem" align="center" mb="1.5rem">
          <LabelBadge
            bg="brand.lightPurple"
            color="brand.blue"
            size="lg"
            height="50px"
            style={{
              lineHeight: "1.85",
            }}
          >
            • THE WINE •
          </LabelBadge>
        </Flex>
        <Text maxW="375px" mb="2rem">
          This wine is like the love child of a fruit basket and your grandma’s
          purse.
        </Text>
        <Text maxW="375px" mb="2rem" fontWeight="700">
          This medium-to-full-bodied masterpiece is the wine equivalent of a
          mullet: business on the nose, party in the glass. Pair it with
          anything from a charcuterie board to leftover pizza, because honestly,
          this wine is here for a good time, not a long time.
        </Text>
        <Text maxW="375px">
          Check out the
          <Link as={RouterLink} to="/about" color="brand.orange" mx=".5rem">
            about page
          </Link>
          to learn more.
        </Text>
      </Box>

      <Image src={BottleMock} w={{ base: "290px", xl: "360px" }} />
    </Flex>
  );
};

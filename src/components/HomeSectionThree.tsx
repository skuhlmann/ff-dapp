import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Text, Image, Link } from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import WineStamp from "../assets/ff_logo_stamp_orange.png";

export const HomeSectionThree = () => {
  return (
    <Flex
      mt={{ base: "0", md: "3rem" }}
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
            size="xl"
            minH={{ base: "50px", md: "65px" }}
            lineHeight={{ base: "1.75", md: "1.85" }}
          >
            • ENJOY YOUR WINE •
          </LabelBadge>
        </Flex>
        <Text maxW="500px" mb="2rem">
          Redeem your ticket for real wine delivered to your door
        </Text>
        <Text maxW="375px" fontSize="sm">
          We are only able to ship wine to addresses in certain locations in
          United States.
          <Link as={RouterLink} to="/shipping" color="brand.orange" mx=".5rem">
            Valid shipping locations
          </Link>
        </Text>
      </Box>

      <Image src={WineStamp} w={{ base: "290px", xl: "360px" }} />
    </Flex>
  );
};

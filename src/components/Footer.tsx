import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { BsTwitterX } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { SiFarcaster } from "react-icons/si";

import GrapeAvatar from "../assets/ff_logo_outline_black.png";

export const Footer = () => {
  return (
    <Box
      minH="200px"
      bg="brand.blue"
      color="brand.black"
      p={{ base: "20px", md: "60px" }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        justify={{ base: "center", md: "flex-start" }}
        align="center"
        gap={{ base: "0srem", md: "2rem" }}
      >
        <Flex align="center" justify="center" gap="3rem" wrap="wrap">
          <Image src={GrapeAvatar} w={{ base: "150px", md: "250px" }} />
          <Flex direction="column" gap=".5rem">
            <RouterLink to="/">
              <Heading color="brand.black" size="md">
                Home
              </Heading>
            </RouterLink>
            <RouterLink to="/buy-wine">
              <Heading color="brand.black" size="md">
                Buy Bottles
              </Heading>
            </RouterLink>
            <RouterLink to="/market">
              <Heading color="brand.black" size="md">
                Wine Market
              </Heading>
            </RouterLink>
            <RouterLink to="/cellar">
              <Heading color="brand.black" size="md">
                My Cellar
              </Heading>
            </RouterLink>
            {/* <RouterLink to="/account">
              <Heading color="brand.black" size="md">
                My Account
              </Heading>
            </RouterLink> */}
            <RouterLink to="/about">
              <Heading color="brand.black" size="md">
                About
              </Heading>
            </RouterLink>
            <RouterLink to="/faq">
              <Heading color="brand.black" size="md">
                FAQ & Shipping Info
              </Heading>
            </RouterLink>
          </Flex>
          <Flex direction="column" gap="0.5rem">
            <Flex gap="0.5rem" fontSize="24px">
              <Link href="https://twitter.com/PeachDropNFT" isExternal>
                <BsTwitterX />
              </Link>
              <Link href="https://warpcast.com/peachtycoon" isExternal>
                <SiFarcaster />
              </Link>
              <Link href="https://t.me/PeachDropNFT" isExternal>
                <BsTelegram />
              </Link>
            </Flex>
            <Link href="https://sauvagespectrum.com/" isExternal>
              <Heading color="brand.black" size="md">
                Sauvage Spectrum Wines
              </Heading>
            </Link>
            {/* <Link
              href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}address/${PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}`}
              isExternal
            >
              <Heading color="brand.black" size="md">
                Grapes on Basescan
              </Heading>
            </Link>
            <Link
              href="https://rarible.com/collection/base/0xa9d3c833df8415233e1626f29e33ccba37d2a187/items"
              isExternal
            >
              <Heading color="brand.black" size="md">
                Grapes on Rarible
              </Heading>
            </Link> */}
            {/* <Text fontSize="xs">Copyright 2024 PΞACH TYCOON</Text> */}
            <Text fontSize="sm">
              Made with ❤️ by{" "}
              <Link isExternal href="https://www.metacartel.org/">
                🌶️
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

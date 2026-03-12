"use client";

import NextLink from "next/link";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { BsTwitterX } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { SiFarcaster } from "react-icons/si";

import GrapeAvatar from "../assets/ff_logo_outline_black.png";
import {
  BLOCK_EXPLORER_URL,
  NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "@/utils/constants";

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
          <Image
            src={GrapeAvatar.src}
            w={{ base: "150px", md: "250px" }}
            alt="grape"
          />
          <Flex direction="column" gap=".5rem">
            <NextLink href="/">
              <Heading color="brand.black" size="md">
                Home
              </Heading>
            </NextLink>
            <NextLink href="/buy-wine">
              <Heading color="brand.black" size="md">
                Reserve Your Bottle
              </Heading>
            </NextLink>
            <NextLink href="/cellar">
              <Heading color="brand.black" size="md">
                Your Cellar
              </Heading>
            </NextLink>
            <NextLink href="/market">
              <Heading color="brand.black" size="md">
                Wine Market
              </Heading>
            </NextLink>
            {/* <NextLink href="/account">
              <Heading color="brand.black" size="md">
                My Account
              </Heading>
            </NextLink> */}
            <NextLink href="/about">
              <Heading color="brand.black" size="md">
                About
              </Heading>
            </NextLink>
            <NextLink href="/faq">
              <Heading color="brand.black" size="md">
                FAQ & Shipping Info
              </Heading>
            </NextLink>
            <NextLink href="/for-agents">
              <Heading color="brand.black" size="md">
                For Agents
              </Heading>
            </NextLink>
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
            <Link
              href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}address/${NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}`}
              isExternal
            >
              <Heading color="brand.black" size="sm">
                Grapes on Basescan
              </Heading>
            </Link>
            {/*
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

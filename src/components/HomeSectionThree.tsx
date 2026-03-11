"use client";
import NextLink from "next/link";
import { Box, Flex, Text, Image, Grid, Link } from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import SkullGrapes from "../assets/ff_skull_grapes.png";
import GrapeNft from "../assets/ff_nft_example_1.jpg";
import Waxbones from "../assets/waxbones.jpg";

const cellarActions = [
  { icon: "⏳", label: "Age It", desc: "Let time work its magic. Bottles appreciate in your cellar." },
  { icon: "↔️", label: "Trade It", desc: "List on the marketplace. Set your price. Find your buyer." },
  { icon: "🎁", label: "Gift It", desc: "Transfer ownership to anyone. Wine makes a great gift." },
  { icon: "🍷", label: "Redeem It", desc: "Claim your bottle and have it shipped to your door." },
];

export const HomeSectionThree = () => {
  return (
    <Box
      bg="brand.purple"
      py={{ base: "4rem", md: "6rem" }}
      px={{ base: "6vw", md: "10vw" }}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative background texture */}
      <Box
        position="absolute"
        top="0"
        right="-60px"
        opacity={0.04}
        pointerEvents="none"
      >
        <Image
          src={SkullGrapes.src}
          w={{ base: "300px", md: "500px" }}
          alt=""
          aria-hidden
        />
      </Box>

      {/* Header */}
      <Box textAlign="center" mb={{ base: "2.5rem", md: "4rem" }}>
        <LabelBadge
          bg="brand.tan"
          color="brand.black"
          size="lg"
          minH={{ base: "30px", md: "50px" }}
          lineHeight={{ base: "1.55", md: "1.85" }}
          display="inline-flex"
          mb="1rem"
        >
          • YOUR DIGITAL CELLAR •
        </LabelBadge>
        <Text
          fontFamily="AntiqueStories"
          fontSize={{ base: "48px", md: "72px" }}
          color="brand.tan"
          lineHeight="1"
          mb="1rem"
        >
          Every bottle lives here.
        </Text>
        <Text color="brand.blue" maxW="480px" mx="auto">
          Your cellar tracks the story of every bottle — where it came from,
          how long it&apos;s been aging, and what it&apos;s worth today.
        </Text>
      </Box>

      {/* Action grid */}
      <Grid
        templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
        gap={{ base: "1rem", md: "1.5rem" }}
        mb={{ base: "3rem", md: "5rem" }}
      >
        {cellarActions.map((action) => (
          <Box
            key={action.label}
            bg="brand.black"
            border="1px solid"
            borderColor="brand.lightPurple"
            borderRadius="2px"
            p={{ base: "1.25rem", md: "1.75rem" }}
            textAlign="center"
            _hover={{
              borderColor: "brand.orange",
              transform: "translateY(-2px)",
              transition: "all 0.2s",
            }}
          >
            <Text fontSize="2xl" mb="0.5rem">{action.icon}</Text>
            <Text
              color="brand.tan"
              fontWeight="700"
              fontSize={{ base: "md", md: "lg" }}
              mb="0.5rem"
            >
              {action.label}
            </Text>
            <Text color="brand.blue" fontSize="sm">
              {action.desc}
            </Text>
          </Box>
        ))}
      </Grid>

      {/* Skel-Grape callout */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        gap={{ base: "2rem", md: "4rem" }}
        bg="brand.black"
        border="1px solid"
        borderColor="brand.orange"
        borderRadius="2px"
        p={{ base: "2rem", md: "3rem" }}
      >
        {/* NFT image */}
        <Box flexShrink={0} position="relative">
          <Box
            position="absolute"
            inset="-6px"
            border="2px solid"
            borderColor="brand.tan"
            transform="rotate(-2deg)"
            borderRadius="2px"
            zIndex={0}
          />
          <Image
            src={GrapeNft.src}
            w={{ base: "180px", md: "220px" }}
            alt="Skel-Grape collectible example"
            position="relative"
            zIndex={1}
          />
        </Box>

        {/* Copy */}
        <Box flex="1" color="brand.blue">
          <Text
            fontFamily="AntiqueStories"
            fontSize={{ base: "32px", md: "48px" }}
            color="brand.tan"
            lineHeight="1.1"
            mb="1rem"
          >
            Collect the Misfits
          </Text>
          <Text mb="1rem">
            Each bottle comes with a{" "}
            <Text as="span" color="brand.orange" fontWeight="700">
              Skel-Grape collectible
            </Text>{" "}
            designed by{" "}
            <Link
              href="#"
              color="brand.tan"
              textDecoration="underline"
              textUnderlineOffset="3px"
            >
              Waxbones
            </Link>
            . These digital misfits represent the grapes that didn&apos;t follow
            the rules.
          </Text>
          <Text mb="1.5rem">
            Each bottle has a unique Skel-Grape. Some traits are rarer than
            others. Collectors trade them on the marketplace.
          </Text>
          <Link
            as={NextLink}
            href="/marketplace"
            color="brand.orange"
            fontSize="sm"
            fontWeight="700"
            textDecoration="underline"
            textUnderlineOffset="3px"
            _hover={{ color: "brand.tan" }}
          >
            Browse the Marketplace →
          </Link>
        </Box>

        {/* Waxbones credit */}
        <Flex
          direction="column"
          align="center"
          flexShrink={0}
          display={{ base: "none", md: "flex" }}
        >
          <Image
            src={Waxbones.src}
            w="100px"
            h="100px"
            objectFit="cover"
            borderRadius="full"
            border="2px solid"
            borderColor="brand.lightPurple"
            alt="Waxbones artist"
            mb="0.5rem"
          />
          <Text fontSize="xs" color="brand.blue" textAlign="center">
            Art by
          </Text>
          <Text fontSize="xs" color="brand.tan" fontWeight="700">
            Waxbones
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

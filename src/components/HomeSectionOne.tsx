import { Box, Flex, Text, Link, Image, Grid, Tag } from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import BottleMock from "../assets/alpha_red_1.jpg";
import FarmSunset from "../assets/pali_vineyard.jpg";
import Sauvage from "../assets/sauvage.png";
import SsLogo from "../assets/ss_logo.png";

const grapeVarietals = ["Merlot", "Mourvèdre", "Malbec", "Zweigelt"];
const tastingNotes = ["Blueberry", "Currant", "Dried Fig", "Spice"];
const terriorBullets = [
  "Concentrated flavor",
  "Vibrant acidity",
  "Complex aromatics",
];

export const HomeSectionOne = () => {
  return (
    <Box>
      {/* ── Alpha Red ─────────────────────────────────────── */}
      <Flex
        mt={{ base: "0", md: "80px" }}
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        px={{ base: "6vw", md: "12vw" }}
        gap={{ base: "2rem", md: "4rem" }}
      >
        {/* Bottle image */}
        <Box position="relative" flexShrink={0}>
          <Box
            position="absolute"
            inset="-8px"
            border="2px solid"
            borderColor="brand.lightPurple"
            transform="rotate(-1.5deg)"
            borderRadius="2px"
            zIndex={0}
          />
          <Image
            src={BottleMock.src}
            w={{ base: "260px", md: "300px", xl: "340px" }}
            alt="Alpha Red bottle"
            position="relative"
            zIndex={1}
          />
        </Box>

        {/* Content */}
        <Box flex="1" maxW="520px" color="brand.blue">
          <LabelBadge
            bg="brand.lightPurple"
            color="brand.blue"
            size="lg"
            minH={{ base: "30px", md: "50px" }}
            lineHeight={{ base: "1.55", md: "1.85" }}
            mb="1.5rem"
          >
            • THE WINE •
          </LabelBadge>

          <Text
            fontFamily="AntiqueStories"
            fontSize={{ base: "48px", md: "64px" }}
            lineHeight="1"
            color="brand.tan"
            mb="0.5rem"
          >
            Alpha Red
          </Text>
          <Text
            color="brand.orange"
            fontSize="lg"
            mb="1.5rem"
            fontStyle="italic"
          >
            A bold dry blend rescued from overlooked grapes.
          </Text>

          {/* Varietals */}
          <Flex gap="0.5rem" flexWrap="wrap" mb="1.5rem">
            {grapeVarietals.map((v) => (
              <Tag
                key={v}
                bg="brand.purple"
                color="brand.tan"
                fontSize="sm"
                px="0.75rem"
                py="0.35rem"
                borderRadius="2px"
                fontFamily="body"
              >
                {v}
              </Tag>
            ))}
          </Flex>

          <Text
            fontSize="sm"
            color="brand.blue"
            mb="0.75rem"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Tasting Notes
          </Text>
          <Grid
            templateColumns="1fr 1fr"
            gap="0.4rem"
            mb="1.75rem"
            maxW="280px"
          >
            {tastingNotes.map((note) => (
              <Flex key={note} align="center" gap="0.4rem">
                <Box
                  w="6px"
                  h="6px"
                  bg="brand.orange"
                  borderRadius="full"
                  flexShrink={0}
                />
                <Text fontSize="sm">{note}</Text>
              </Flex>
            ))}
          </Grid>

          <Text fontSize="sm" color="brand.tan" fontStyle="italic">
            Drink now or age for complexity.
          </Text>
        </Box>
      </Flex>

      {/* ── Grand Valley AVA ──────────────────────────────── */}
      <Flex
        mt={{ base: "5rem", md: "8rem" }}
        direction={{ base: "column", md: "row-reverse" }}
        justifyContent="center"
        alignItems="center"
        px={{ base: "6vw", md: "12vw" }}
        gap={{ base: "2rem", md: "4rem" }}
      >
        {/* Vineyard image */}
        <Box position="relative" flexShrink={0}>
          <Box
            position="absolute"
            inset="-8px"
            border="2px solid"
            borderColor="brand.orange"
            transform="rotate(1.5deg)"
            borderRadius="2px"
            zIndex={0}
          />
          <Image
            src={FarmSunset.src}
            w={{ base: "300px", md: "380px", xl: "440px" }}
            h={{ base: "220px", md: "280px", xl: "320px" }}
            objectFit="cover"
            alt="Grand Valley vineyard — placeholder for vineyard rows shot"
            position="relative"
            zIndex={1}
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            bg="blackAlpha.600"
            p="0.5rem 0.75rem"
            zIndex={2}
          ></Box>
        </Box>

        {/* Content */}
        <Box flex="1" maxW="480px" color="brand.blue">
          <LabelBadge
            bg="brand.lightPurple"
            color="brand.blue"
            size="lg"
            minH={{ base: "30px", md: "50px" }}
            lineHeight={{ base: "1.55", md: "1.85" }}
            mb="1.5rem"
          >
            • THE GRAPES •
          </LabelBadge>

          <Text
            fontFamily="AntiqueStories"
            fontSize={{ base: "36px", md: "52px" }}
            lineHeight="1.1"
            color="brand.tan"
            mb="0.5rem"
          >
            The Grand Valley AVA
          </Text>
          <Text
            color="brand.orange"
            fontSize="lg"
            mb="1.5rem"
            fontStyle="italic"
          >
            Colorado&apos;s hidden wine region.
          </Text>

          {/* Stat chips */}
          <Flex gap="0.5rem" flexWrap="wrap" mb="1.5rem">
            {[
              "4,500–4,900 ft elevation",
              "Hot desert days",
              "Cool mountain nights",
            ].map((stat) => (
              <Tag
                key={stat}
                bg="transparent"
                color="brand.tan"
                border="1px solid"
                borderColor="brand.tan"
                fontSize="sm"
                px="0.75rem"
                py="0.35rem"
                borderRadius="2px"
              >
                {stat}
              </Tag>
            ))}
          </Flex>

          <Text mb="1rem">
            These conditions push grapes to their limits — and that tension
            creates something special.
          </Text>

          <Box borderLeft="3px solid" borderColor="brand.lightPurple" pl="1rem">
            {terriorBullets.map((b) => (
              <Text key={b} fontSize="sm" mb="0.35rem">
                — {b}
              </Text>
            ))}
          </Box>
        </Box>
      </Flex>

      {/* ── Sauvage Spectrum ──────────────────────────────── */}
      <Flex
        mt={{ base: "5rem", md: "8rem" }}
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        px={{ base: "6vw", md: "12vw" }}
        gap={{ base: "2rem", md: "4rem" }}
      >
        {/* Images */}
        <Flex direction="column" gap="1rem" flexShrink={0} alignItems="center">
          <Image
            src={Sauvage.src}
            w={{ base: "240px", md: "300px", xl: "340px" }}
            alt="Sauvage Spectrum winery"
          />
          <Image
            src={SsLogo.src}
            w={{ base: "120px", md: "150px" }}
            alt="Sauvage Spectrum logo"
            opacity={0.85}
          />
        </Flex>

        {/* Content */}
        <Box flex="1" maxW="480px" color="brand.blue">
          <LabelBadge
            bg="brand.lightPurple"
            color="brand.blue"
            size="lg"
            minH={{ base: "30px", md: "50px" }}
            lineHeight={{ base: "1.55", md: "1.85" }}
            mb="1.5rem"
          >
            • THE WINEMAKERS •
          </LabelBadge>

          <Text
            fontFamily="AntiqueStories"
            fontSize={{ base: "36px", md: "52px" }}
            lineHeight="1.1"
            color="brand.tan"
            mb="1.5rem"
          >
            Sauvage Spectrum
          </Text>

          <Box
            borderLeft="3px solid"
            borderColor="brand.orange"
            pl="1.25rem"
            mb="1.5rem"
          >
            <Text fontStyle="italic" color="brand.tan" mb="0.75rem">
              &ldquo;Sauvage Spectrum isn&apos;t afraid to experiment.&rdquo;
            </Text>
            <Text>
              They specialize in bold blends and unconventional grapes — which
              made them the perfect partner for Forgotten Fruit.
            </Text>
          </Box>

          <Link
            href="https://sauvagespectrum.com/"
            target="_blank"
            color="brand.orange"
            fontSize="sm"
            fontWeight="700"
            textDecoration="underline"
            textUnderlineOffset="3px"
            _hover={{ color: "brand.tan" }}
          >
            sauvagespectrum.com →
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

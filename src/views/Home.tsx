"use client";
import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import BottleHero from "../assets/alpha_red_2.jpg";
import SkelegrapeNftAlt from "../assets/69.png";
import SkelegrapeNft from "../assets/100_unredeemed.png";
import OrchardBg from "../assets/palisades_orchard.jpeg";

import { HomeSectionOne } from "../components/HomeSectionOne";
import { HomeSectionTwo } from "../components/HomeSectionTwo";
import { HomeSectionThree } from "../components/HomeSectionThree";
// import { HomeSectionFour } from "../components/HomeSectionFour";
import { SALE_STATE } from "../utils/constants";
import { useNftSupply } from "../hooks/useNftSupply";

function Home() {
  const { maxSupply, remaining } = useNftSupply();

  const bottlesTotal = maxSupply ?? 0;
  const bottlesRemaining = remaining ?? 0;

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <Box position="relative" overflow="hidden" mb="5rem">
        {/* Background vineyard image — very subtle */}
        <Box position="absolute" inset="0" zIndex={0} pointerEvents="none">
          <Image
            src={OrchardBg.src}
            alt=""
            aria-hidden
            w="full"
            h="full"
            objectFit="cover"
            filter="brightness(0.12) saturate(0.4)"
          />
        </Box>

        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="center"
          align="center"
          px={{ base: "6vw", md: "10vw", xl: "12vw" }}
          pt={{ base: "4rem", md: "6rem" }}
          pb={{ base: "3rem", md: "5rem" }}
          gap={{ base: "3rem", lg: "5rem" }}
          position="relative"
          zIndex={1}
        >
          {/* Left — Copy */}
          <Flex
            direction="column"
            flex="1"
            maxW={{ base: "100%", lg: "580px" }}
          >
            <Heading
              fontSize={{ base: "56px", md: "80px", xl: "100px" }}
              lineHeight={{ base: "1", md: "0.95" }}
              mb="1.5rem"
            >
              Misfit Grapes.
              <br />
              Exceptional Wine.
            </Heading>

            <Text
              color="brand.blue"
              fontSize={{ base: "lg", md: "xl" }}
              mb="0.75rem"
              maxW="480px"
            >
              Boutique wines crafted from grapes that weren&apos;t supposed to
              matter — until they did.
            </Text>
            <Text
              color="brand.blue"
              fontSize={{ base: "md", md: "lg" }}
              mb="2rem"
              maxW="460px"
            >
              Each bottle comes with a{" "}
              <Text as="span" color="brand.tan" fontWeight="700">
                digital collectible
              </Text>{" "}
              and can be{" "}
              <Text as="span" color="brand.tan" fontWeight="700">
                aged, traded, or redeemed.
              </Text>
            </Text>

            {/* Sale state messaging */}
            {SALE_STATE === "presale" && (
              <Box mb="1.5rem">
                <Text
                  color="brand.orange"
                  fontSize="xl"
                  fontWeight="700"
                  lineHeight="1.4"
                >
                  PRESALE IS OPEN!
                </Text>
                <Text color="brand.orange" fontSize="md" fontWeight="700">
                  Lock in presale pricing — prices go up soon.
                </Text>
              </Box>
            )}
            {SALE_STATE === "upcoming" && (
              <Text
                color="brand.orange"
                fontSize="xl"
                fontWeight="700"
                mb="1.5rem"
                lineHeight="1.4"
              >
                PRESALE IS OPENING SOON!
              </Text>
            )}

            {/* CTAs */}
            <Flex gap="1rem" wrap="wrap" mb="1.25rem">
              <Button
                as={Link}
                href="/buy-wine"
                variant="solid"
                fontSize="xl"
                borderRadius=".125rem"
                color="brand.orange"
                bg="brand.purple"
                _hover={{ transform: "translate(0px, 2px)" }}
                size="lg"
                height="60px"
                px="2.5rem"
                pt=".5rem"
              >
                Reserve a Bottle
              </Button>
              <Button
                as={Link}
                href="#how-it-works"
                variant="outline"
                fontSize="xl"
                borderRadius=".125rem"
                color="brand.blue"
                borderColor="brand.blue"
                _hover={{
                  bg: "brand.purple",
                  borderColor: "brand.purple",
                  color: "brand.tan",
                }}
                size="lg"
                height="60px"
                px="2.5rem"
                pt=".5rem"
              >
                How It Works
              </Button>
            </Flex>

            <Text color="brand.orange" fontSize="sm" fontStyle="italic">
              &gt; Limited presale. Bottles age in your digital cellar.
            </Text>
          </Flex>

          {/* Right — Bottle + collectible composition */}
          <Box
            flexShrink={0}
            position="relative"
            w={{ base: "320px", md: "470px", xl: "580px" }}
            h={{ base: "420px", md: "570px", xl: "690px" }}
          >
            <Box
              position="absolute"
              top={{ base: "14px", md: "22px", xl: "28px" }}
              right={{ base: "18px", md: "26px", xl: "34px" }}
              left={{ base: "18px", md: "26px", xl: "34px" }}
              h={{ base: "252px", md: "340px", xl: "404px" }}
              border="2px solid"
              borderColor="brand.orange"
              transform="rotate(2deg)"
              transformOrigin="center"
              borderRadius="2px"
              zIndex={0}
            />
            <Box
              position="absolute"
              top={{ base: "4px", md: "12px", xl: "18px" }}
              right={{ base: "8px", md: "14px", xl: "20px" }}
              left={{ base: "8px", md: "14px", xl: "20px" }}
              h={{ base: "252px", md: "340px", xl: "404px" }}
              border="1px solid"
              borderColor="brand.lightPurple"
              transform="rotate(-1deg)"
              transformOrigin="center"
              borderRadius="2px"
              zIndex={0}
              opacity={0.5}
            />
            <Image
              src={BottleHero.src}
              w={{ base: "284px", md: "400px", xl: "486px" }}
              alt="Alpha Red bottle"
              position="absolute"
              left="50%"
              top={{ base: "22px", md: "30px", xl: "38px" }}
              transform="translateX(-50%) rotate(2deg)"
              transformOrigin="center"
              zIndex={2}
            />
            <Box
              position="absolute"
              left={{ base: "24px", md: "36px", xl: "56px" }}
              bottom={{ base: "78px", md: "106px", xl: "126px" }}
              w={{ base: "138px", md: "176px", xl: "208px" }}
              p={{ base: "8px", md: "10px" }}
              bg="rgba(16, 10, 18, 0.92)"
              border="1px solid"
              borderColor="brand.blue"
              boxShadow="0 18px 40px rgba(0, 0, 0, 0.35)"
              transform={{ base: "rotate(-9deg)", md: "rotate(-10deg)" }}
              zIndex={10}
            >
              <Image
                src={SkelegrapeNft.src}
                alt="Skelegrape NFT collectible"
                w="full"
                h="auto"
              />
            </Box>
            <Box
              position="absolute"
              right={{ base: "24px", md: "36px", xl: "56px" }}
              bottom={{ base: "70px", md: "96px", xl: "116px" }}
              w={{ base: "132px", md: "170px", xl: "200px" }}
              p={{ base: "8px", md: "10px" }}
              bg="rgba(16, 10, 18, 0.88)"
              border="1px solid"
              borderColor="brand.orange"
              boxShadow="0 16px 34px rgba(0, 0, 0, 0.28)"
              transform={{ base: "rotate(8deg)", md: "rotate(9deg)" }}
              zIndex={10}
            >
              <Image
                src={SkelegrapeNftAlt.src}
                alt="Alternate Skelegrape NFT collectible"
                w="full"
                h="auto"
              />
            </Box>
          </Box>
        </Flex>

        <Divider
          position="relative"
          zIndex={1}
          borderTop="solid 2px"
          borderColor="brand.blue"
          borderBottom="none"
          background="none"
        />
      </Box>

      {/* ═══════════════════════════════════════════════════
          WINE / GRAPES / WINEMAKERS
      ═══════════════════════════════════════════════════ */}
      <Box mb="6rem">
        <HomeSectionOne />
      </Box>

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════ */}
      <Box mb="6rem" id="how-it-works">
        <HomeSectionTwo />
      </Box>

      {/* ═══════════════════════════════════════════════════
          YOUR DIGITAL CELLAR
      ═══════════════════════════════════════════════════ */}
      <Box mb="6rem">
        <HomeSectionThree />
      </Box>

      {/* ═══════════════════════════════════════════════════
          THE MISFIT GRAPES STORY
      ═══════════════════════════════════════════════════ 
      <Box mb="6rem">
        <HomeSectionFour />
      </Box>
*/}
      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        mb="5rem"
        px={{ base: "6vw", md: "10vw" }}
        py={{ base: "4rem", md: "5rem" }}
        position="relative"
        overflow="hidden"
      >
        {/* Decorative border lines */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="2px"
          bg="brand.orange"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="2px"
          bg="brand.orange"
        />

        <Text
          fontSize="xs"
          fontWeight="700"
          letterSpacing="widest"
          textTransform="uppercase"
          color="brand.orange"
          mb="0.75rem"
        >
          Alpha Red Release
        </Text>

        <Heading
          fontSize={{ base: "56px", md: "80px", xl: "100px" }}
          lineHeight={{ base: "1", md: "0.95" }}
          textAlign="center"
          mb="1.5rem"
        >
          Reserve Your Bottle Today
        </Heading>

        <Text color="brand.blue" textAlign="center" maxW="420px" mb="2rem">
          Secure your bottle before the release sells out.
        </Text>

        {/* Scarcity counters */}
        <Flex gap="2rem" mb="2.5rem" align="center">
          <Flex direction="column" align="center">
            <Text
              fontFamily="AntiqueStories"
              fontSize="48px"
              color="brand.tan"
              lineHeight="1"
            >
              {bottlesTotal}
            </Text>
            <Text
              fontSize="xs"
              color="brand.blue"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Total Bottles
            </Text>
          </Flex>
          <Box w="1px" h="50px" bg="brand.lightPurple" />
          <Flex direction="column" align="center">
            <Text
              fontFamily="AntiqueStories"
              fontSize="48px"
              color="brand.orange"
              lineHeight="1"
            >
              {bottlesRemaining}
            </Text>
            <Text
              fontSize="xs"
              color="brand.blue"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Remaining
            </Text>
          </Flex>
        </Flex>

        {/* Progress bar */}
        <Box
          w={{ base: "280px", md: "400px" }}
          h="6px"
          bg="brand.purple"
          borderRadius="full"
          mb="2.5rem"
          overflow="hidden"
        >
          <Box
            h="full"
            bg="brand.orange"
            w={`${bottlesTotal > 0 ? ((bottlesTotal - bottlesRemaining) / bottlesTotal) * 100 : 0}%`}
            borderRadius="full"
          />
        </Box>

        {/* Sale state messages */}
        {SALE_STATE === "presale" && (
          <Box mb="1.5rem" textAlign="center">
            <Text color="brand.orange" fontSize="xl" fontWeight="700">
              PRESALE IS OPEN!
            </Text>
            <Text color="brand.orange" fontSize="md" fontWeight="700">
              Lock in presale pricing — prices go up soon.
            </Text>
          </Box>
        )}
        {SALE_STATE === "upcoming" && (
          <Text color="brand.orange" fontSize="xl" fontWeight="700" mb="1.5rem">
            PRESALE IS OPENING SOON!
          </Text>
        )}

        {SALE_STATE !== "upcoming" && (
          <Button
            as={Link}
            href="/buy-wine"
            variant="solid"
            fontSize="2xl"
            borderRadius=".125rem"
            color="brand.orange"
            bg="brand.purple"
            _hover={{ transform: "translate(0px, 2px)" }}
            size="lg"
            height="72px"
            px="4rem"
            pt=".75rem"
          >
            Reserve Your Bottle
          </Button>
        )}
      </Flex>
    </>
  );
}

export default Home;

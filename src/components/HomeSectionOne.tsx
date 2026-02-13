import { Box, Flex, Text, Link, Image } from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import BottleMock from "../assets/ff_bottle_temp.png";
import Sauvage from "../assets/sauvage.png";

export const HomeSectionOne = () => {
  return (
    <>
      <Flex
        mt={{ base: "0", md: "100px" }}
        direction={{ base: "column", md: "row" }}
        justifyContent="start"
        alignItems="center"
        px={{ base: "5vw", md: "15vw" }}
        color="brand.blue"
        gap="1rem"
      >
        <Box flex="1" minW={{ base: "none", md: "250px" }}>
          <Flex gap="1rem" align="center" mb="1.5rem">
            <LabelBadge
              bg="brand.lightPurple"
              color="brand.blue"
              size="lg"
              minH={{ base: "30px", md: "50px" }}
              lineHeight={{ base: "1.55", md: "1.85" }}
            >
              • THE WINE •
            </LabelBadge>
          </Flex>
          <Text maxW="475px" mb="2rem">
            Alpha Red is our debut misfit masterpiece — a bold, dry red blend
            rescued from the grapes that weren’t supposed to become anything
            special… until they did. It’s delicious.
          </Text>
          <Text maxW="475px" mb="2rem">
            A mysterious blend of Merlot, Mourvedre, Malbec, Zweigelt and
            rebellious spirit.
          </Text>
          <Text maxW="475px" mb="2rem">
            On the nose, you’ll catch blueberry and currant. On the palate,
            expect rich dried fruit, fig, spices, and just a whisper of
            cherry-laced nostalgia.
          </Text>
          <Text maxW="475px" mb="2rem">
            This dry red is bold and complex. It’s the wine equivalent of a
            mullet: business on the nose, party in the glass. Here&apos;s to
            taking life’s rejects and turning them into something worth
            toasting.
          </Text>
        </Box>

        <Image
          src={BottleMock.src}
          w={{ base: "290px", xl: "360px" }}
          alt="bottle"
        />
      </Flex>
      <Flex
        mt={{ base: "3rem", md: "5rem" }}
        direction={{ base: "column", md: "row-reverse" }}
        justifyContent="start"
        alignItems="center"
        px={{ base: "5vw", md: "15vw" }}
        color="brand.blue"
      >
        <Flex
          direction="column"
          alignItems={{ base: "start", md: "end" }}
          flex="1"
          ml={{ base: "0px", md: "50px" }}
        >
          <Flex gap="1rem" align="center" mb="1rem">
            <LabelBadge
              bg="brand.lightPurple"
              color="brand.blue"
              size="lg"
              minH={{ base: "30px", md: "50px" }}
              lineHeight={{ base: "1.55", md: "1.85" }}
            >
              • THE GRAPES •
            </LabelBadge>
          </Flex>

          <Text
            maxW="475px"
            textAlign={{ base: "left", md: "right" }}
            mb="2rem"
          >
            This bottle is born in the Grand Valley AVA — Colorado’s rising wine
            star — where high-desert heat, cool nights, fertile soils, and a
            legendary canyon breeze create the perfect home for grapes with
            something to prove.
          </Text>

          <Text
            maxW="475px"
            textAlign={{ base: "left", md: "right" }}
            mb="2rem"
          >
            We source grapes directly from the growers, rescue the grapes
            destined for the ground and turn them into bold, complex wines —
            wines that are dry, chewy, and impossible to ignore.
          </Text>
          <Text
            maxW="475px"
            textAlign={{ base: "left", md: "right" }}
            mb="2rem"
          >
            Alpha Red is crafted in partnership with our friends at{" "}
            <Link
              href="https://sauvagespectrum.com/"
              target="_blank"
              color="brand.orange"
            >
              Sauvage Spectrum
            </Link>
            , one of the Grand Valley’s most exciting and innovative wineries.
            They’ve built a reputation for bold blends, meticulous winemaking,
            and a knack for coaxing big personality out of Colorado-grown fruit.
          </Text>
        </Flex>
        <Image
          src={Sauvage.src}
          w={{ base: "400px", xl: "500px" }}
          alt="sauvage"
        />
      </Flex>
    </>
  );
};

import { Box, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";

import farmSunset from "../assets/farm_sunset.jpg";
import waxbones from "../assets/waxbones.jpg";
import palisade from "../assets/palisades_orchard.jpeg";
import { SectionHeader } from "../components/SectionHeader";

function About() {
  return (
    <>
      <SectionHeader title="About" />

      <Box px={{ base: "1rem", sm: "2rem" }} color="brand.blue">
        <Flex wrap="wrap" justify="space-between" align="center">
          <Box w={{ base: "100%", md: "50%" }} mb="2rem">
            <Heading size="2xl" mb="2rem" color="brand.orange">
              Meet The Grand Valley AVA
            </Heading>
            <Text mb="2rem" fontSize="14px">
              A bottle of Cabernet Sauvignon capsule with corkscrews and
              characteristics. Glass of Chardonnay stem on vineyards from the
              valley quality. Sip quality estate fruit made with grapes grown
              unique vine. Farmed locations planted sustainability winemakers
              grow harvest before aged to ensure each varietal. Premium
              selection notable craft wines, collection small lots are elegant
              and distinctive.
            </Text>
            <Text mb="2rem" fontSize="14px">
              Taste labels and notes with flavors of brand. Tasting room visit
              package design cold-climate whole cluster fermentation in the
              mountain range. Winemaking facility crush activity Pinot Noir food
              and wine pairing then producers accolade score. Vintners prefer
              cool climate popular vinous offerings can ripen world-famous
              traditional method for tastings.
            </Text>
            <Text mb="2rem" fontSize="14px">
              Appellation of origin brand name and the wine type with a vineyard
              designation are mandatory. Aromas of pear green region and flavors
              of toasted oak ripen a hint of dark berries.
            </Text>
          </Box>
          <Flex
            w={{ base: "100%", md: "45%" }}
            direction="column"
            alignItems={{ base: "center", md: "flex-end" }}
            mb="1rem"
          >
            <Flex direction="column" align="center">
              <Image src={palisade} />
            </Flex>
          </Flex>
        </Flex>

        <Flex wrap="wrap" justify="space-between" align="center">
          <Flex
            w={{ base: "100%", md: "45%" }}
            direction="column"
            alignItems={{ base: "center", md: "flex-end" }}
          >
            <Flex direction="column" align="center">
              <Image src={farmSunset} />
            </Flex>
          </Flex>
          <Box w={{ base: "100%", md: "50%" }} mb="2rem">
            <Heading size="2xl" mb="2rem" color="brand.tan">
              Meet the Wine Makers
            </Heading>
            <Text mb="2rem" fontSize="14px">
              A bottle of Cabernet Sauvignon capsule with corkscrews and
              characteristics. Glass of Chardonnay stem on vineyards from the
              valley quality. Sip quality estate fruit made with grapes grown
              unique vine. Farmed locations planted sustainability winemakers
              grow harvest before aged to ensure each varietal. Premium
              selection notable craft wines, collection small lots are elegant
              and distinctive.
            </Text>
            <Text mb="2rem" fontSize="14px">
              Taste labels and notes with flavors of brand. Tasting room visit
              package design cold-climate whole cluster fermentation in the
              mountain range. Winemaking facility crush activity Pinot Noir food
              and wine pairing then producers accolade score. Vintners prefer
              cool climate popular vinous offerings can ripen world-famous
              traditional method for tastings.
            </Text>
            <Text mb="2rem" fontSize="14px">
              Appellation of origin brand name and the wine type with a vineyard
              designation are mandatory. Aromas of pear green region and flavors
              of toasted oak ripen a hint of dark berries.
            </Text>
          </Box>
        </Flex>

        <Flex wrap="wrap" justify="space-between" align="center">
          <Box w={{ base: "100%", md: "50%" }} mb="2rem">
            <Heading size="2xl" mb="2rem" color="brand.orange">
              Meet the Artist
            </Heading>
            <Text mb="2rem" fontSize="14px">
              We’ve partnered with{" "}
              <Link
                href="https://waxbones.xyz/"
                isExternal
                color="brand.orange"
              >
                Waxbones
              </Link>{" "}
              to design our artwork. Waxbones is an illustrator and graphic
              designer based in Bristol, UK. After spending a decade designing
              wayfinding systems for cities all over the world, in 2021 he made
              the leap to pursue NFT art full-time, creating numerous sell-out
              collections, editions, 1/1s and his innovative narrative-focussed
              project Prometheus Lab, as well as collaborating with some of the
              biggest names in the scene.
            </Text>
            <Text mb="2rem" fontSize="14px">
              His style juxtaposes the whimsical with the macabre, taking
              inspiration from struggles with mental health, sci-fi and horror,
              punk, hardcore and related genres of music, as well as tattoo
              culture.
            </Text>
            <Text mb="2rem" fontSize="14px">
              His work has been exhibited all over the world and even sent to
              the International Space Station, and has recently worked with
              commercial clients integrating web3 elements - The Masked Singer
              (Fox), Barbie (Mattel) and KnownOrigin (eBay).
            </Text>
          </Box>
          <Flex
            w={{ base: "100%", md: "45%" }}
            direction="column"
            alignItems={{ base: "center", md: "flex-end" }}
            mb="1rem"
          >
            <Flex direction="column" align="center">
              <Image src={waxbones} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default About;

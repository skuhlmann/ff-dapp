import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

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
              When people list legendary wine regions, you usually hear Napa
              Valley, Willamette Valley, Bordeaux, Tuscany, Sonoma… But there’s
              a new name worth learning — and it’s right here in Colorado.
            </Text>
            <Text mb="2rem" fontSize="14px">
              Welcome to the **Grand Valley American Viticultural Area**, home
              to over 80% of Colorado’s grape production and one of the
              fastest-rising wine regions in the country. Set in the high desert
              of Grand Junction and Palisade, the region’s magic comes from a
              surprising combination of elements:
            </Text>

            <UnorderedList fontSize="14px">
              <ListItem>
                High elevation (4,500 – 4,900 ft) that concentrates flavors and
                keeps acidity lively
              </ListItem>
              <ListItem>
                Hot, sunny days that ripen grapes with intensity
              </ListItem>
              <ListItem>
                Cool nights that lock in structure and aromatics
              </ListItem>
              <ListItem>
                Nutrient-rich soils shaped by ancient riverbeds
              </ListItem>
              <ListItem>Reliable water access from the Colorado River</ListItem>
            </UnorderedList>
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
          <Box w={{ base: "100%", md: "50%" }} mb="2rem">
            <Heading size="2xl" mb="2rem" color="brand.tan">
              Meet the Wine Makers
            </Heading>
            <Text mb="2rem" fontSize="14px">
              Great wine starts with great people, and **Sauvage Spectrum** is
              the real deal.
            </Text>
            <Text mb="2rem" fontSize="14px">
              Based in Palisade, they blend traditional winemaking knowledge
              with experimental curiosity — an approach that fits Forgotten
              Fruit like a glove. Sauvage Spectrum is known for:
            </Text>
            <UnorderedList fontSize="14px">
              <ListItem>Big, expressive blends</ListItem>
              <ListItem>
                Estate-grown grapes from Colorado’s best parcels
              </ListItem>
              <ListItem>A commitment to high-elevation viticulture</ListItem>
              <ListItem>
                A passion for showcasing what Grand Valley fruit can truly do
              </ListItem>
            </UnorderedList>

            <Text mb="2rem" fontSize="14px">
              They’re not afraid to break the mold, bend some rules, or get a
              little weird in the pursuit of great wine. Which is perfect,
              because we had a bunch of misfit grapes with something to prove —
              and they knew exactly how to help them shine.
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

import { Box, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";

import farmSunset from "../assets/farm_sunset.jpg";
import waxbones from "../assets/waxbones.jpg";
import palisade from "../assets/palisades_orchard.jpeg";

function About() {
  return (
    <>
      <Box w="100%" textAlign="center" my="3rem">
        <Heading size="4xl">ABOUT</Heading>
      </Box>

      <Box px={{ base: "1rem", sm: "2rem" }}>
        <Flex wrap="wrap" justify="space-between" align="center">
          <Box w={{ base: "100%", md: "50%" }} mb="2rem">
            <Heading size="2xl" mb="2rem" color="brand.orange">
              Meet Palisade
            </Heading>
            <Text mb="2rem" fontSize="14px">
              Palisade is a small town located in western Colorado, United
              States. It is situated on the western slope of the Rocky
              Mountains, and is known for its scenic beauty, outdoor recreation,
              and agriculture. Palisade sits in a valley surrounded by rugged
              mountains and mesas, with the Colorado River flowing through the
              town. It is a charming and picturesque town, known for its
              friendly community and laid-back lifestyle.
            </Text>
            <Text mb="2rem" fontSize="14px">
              However, what most people don’t know is that Palisade is know for
              producing the best peaches in the world (yup) due to its unique
              combination of location and climate. The town sits at high
              elevation, which provides warm sunny days and cool nights during
              the growing season. This diurnal shift helps to develop the sugars
              in the peaches, resulting in a sweeter and more flavorful fruit.
            </Text>
            <Text mb="2rem" fontSize="14px">
              Its unique geologic location combined with the ‘million dollar
              winds’ from Debeque Canyon provide important protection from
              Spring frost damage. The semi-arid climate with low humidity also
              helps reduce the risk of disease/pests that can affect peach
              trees. Many farmers will allow their peaches to ripen on tree,
              which ensures that they are juicy, sweet, and bursting with
              flavor. Biting into a Palisade peach is truly a one-of-a-kind
              experience. And we want to share that experience with you and your
              loved ones!
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
            <Heading size="2xl" mb="2rem" color="brand.green">
              Meet the Farms
            </Heading>
            <Text mb="2rem" fontSize="14px">
              For 2024, we’re pleased to partner with Mesa Park Fruit Company
              and The Davis Family Farms.
            </Text>
            <Text mb="2rem" fontSize="14px">
              Mesa Park Fruit Co. is a partnership between Brandon and Laura
              Black and Laurie Priddy – friends and neighbors farming in
              beautiful Palisade, CO. They farm ~25 acres on the mesa above
              downtown Palisade and specialize in Palisade peaches, cherries,
              plums, pluots and wine grapes!
            </Text>
            <Text mb="2rem" fontSize="14px">
              The Davis Family Farms story started in 2000, when they bought a
              truckload of Palisade peaches and drove them back to their
              hometowns to sell. The peaches were such a big hit, it inspired
              them to start growing their own. They offer their peaches at
              various farmer’s markets and roadside stands throughout Colorado,
              as well as at their own market, Nana’s Fruit & Jam Shack, in the
              heart of downtown Palisade.
            </Text>
            <Text mb="2rem" fontSize="14px">
              <i>
                “There is something so special about doing the hard work of
                growing peaches and knowing they will be enjoyed at gatherings
                of friends and family all summer. We take pride in carefully
                curating the best selection of delicious, Colorado-grown
                peaches, for others to experience.”
              </i>{" "}
              - Becky Davis
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

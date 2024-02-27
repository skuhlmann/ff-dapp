import { Box, Flex, Heading, Text, Image, SimpleGrid } from "@chakra-ui/react";

import { LabelBadge, PeachCard } from "./SharedLayout";

import waterIcon from "../assets/icon_water.png";
import pruneIcon from "../assets/icon_prune.png";
import sprayIcon from "../assets/icon_spray.png";
import fertIcon from "../assets/icon_fert.png";

export const HomeSectionTwo = () => {
  return (
    <Flex mt={{ base: "0", md: "140px"}} direction={{ base: "column", md: "row-reverse" }} justifyContent="start" alignItems="start" px="10vw">
      <Flex direction="column" alignItems={{ base: "start", md: "end" }} justifyContent="end" flex="1" mb="2rem">
        <Flex gap="1rem" align="center" mb="1rem">
          <Heading color="brand.orange">2.</Heading>
          <LabelBadge
            bg="brand.darkOrange"
            color="brand.orange"
            size="md"
            style={{
              lineHeight: "1.75",
            }}
          >
            Available Soon
          </LabelBadge>
        </Flex>
        <Text fontFamily="auster" maxWidth="597px" fontWeight="bold" fontSize={{base:"56px", xl:"80px"}} lineHeight={{base:"60px", xl:"96px"}} mb={4}>
          Get Growing!
        </Text>
        <Text maxW="500px" textAlign={{ base: "left", md: "right" }} mb="2rem">
          Nurture your trees from winter dormancy through spring blossom until
          harvest season in late summer. Water, prune, fertilize and protect
          your trees from pests in order to earn additional peach boxes. You are
          in control of how many peaches you produce.
          <br/><br />
          In addition, a portion of all transactions will be added to the
          ‘Farmer’s Pot’ to be split amongst all farmers (tree owners). The
          better you farm, the more points you earn and a larger percentage of
          the pot you can win!
        </Text>
      </Flex>
      <SimpleGrid columns={2} spacing="1rem" mb="1rem">
        <PeachCard
          w={{ base: "148ppx", md: "192px" }}
          h={{ base: "148ppx", md: "192px" }}
        >
          <Image src={waterIcon} />
          <Text textAlign="center" fontSize="sm">water</Text>
        </PeachCard>
        <PeachCard
          w={{ base: "148ppx", md: "192px" }}
          h={{ base: "148ppx", md: "192px" }}
        >
          <Image src={pruneIcon} />
          <Text textAlign="center" fontSize="sm">prune</Text>
        </PeachCard>
        <PeachCard
          w={{ base: "148ppx", md: "192px" }}
          h={{ base: "148ppx", md: "192px" }}
        >
          <Image src={fertIcon} />
          <Text textAlign="center" fontSize="sm">fertilize</Text>
        </PeachCard>
        <PeachCard
          w={{ base: "148ppx", md: "192px" }}
          h={{ base: "148ppx", md: "192px" }}
        >
          <Image src={sprayIcon} />
          <Text textAlign="center" fontSize="sm">spray</Text>
        </PeachCard>
      </SimpleGrid>
    </Flex>
  );
};

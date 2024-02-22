import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";

import { LabelBadge, PeachCard } from "./SharedLayout";

import waterIcon from "../assets/icon_water.png";
import pruneIcon from "../assets/icon_prune.png";
import sprayIcon from "../assets/icon_spray.png";
import fertIcon from "../assets/icon_fert.png";

export const HomeSectionTwo = () => {
  return (
    <Flex wrap="wrap" justify="space-between" align="center">
      <Flex
        w={{ base: "100%", md: "50%" }}
        direction="column"
        alignItems={{ base: "center" }}
        textAlign="center"
      >
        <Flex gap="1rem" mb="1rem">
          <PeachCard
            w={{ base: "148ppx", md: "192px" }}
            h={{ base: "148ppx", md: "192px" }}
          >
            <Image src={waterIcon} />
            <Text fontSize="sm">water</Text>
          </PeachCard>
          <PeachCard
            w={{ base: "148ppx", md: "192px" }}
            h={{ base: "148ppx", md: "192px" }}
          >
            <Image src={pruneIcon} />
            <Text fontSize="sm">prune</Text>
          </PeachCard>
        </Flex>
        <Flex gap="1rem">
          <PeachCard
            w={{ base: "148ppx", md: "192px" }}
            h={{ base: "148ppx", md: "192px" }}
          >
            <Image src={fertIcon} />
            <Text fontSize="sm">fertilize</Text>
          </PeachCard>
          <PeachCard
            w={{ base: "148ppx", md: "192px" }}
            h={{ base: "148ppx", md: "192px" }}
          >
            <Image src={sprayIcon} />
            <Text fontSize="sm">spray</Text>
          </PeachCard>
        </Flex>
      </Flex>
      <Box w={{ base: "100%", md: "50%" }} mb="2rem">
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
        <Heading size="4xl" mb="2rem">
          Get Growing!
        </Heading>
        <Text mb="2rem">
          Nurture your trees from winter dormancy through spring blossom until
          harvest season in late summer. Water, prune, fertilize and protect
          your trees from pests in order to earn additional peach boxes. You are
          in control of how many peaches you produce.
        </Text>
        <Text mb="2rem">
          In addition, a portion of all transactions will be added to the
          ‘Farmer’s Pot’ to be split amongst all farmers (tree owners). The
          better you farm, the more points you earn and a larger percentage of
          the pot you can win!
        </Text>
      </Box>
    </Flex>
  );
};

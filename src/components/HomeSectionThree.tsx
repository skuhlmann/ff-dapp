import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Button,
  Image,
} from "@chakra-ui/react";

import { LabelBadge, PeachCard } from "./SharedLayout";

import unredeemedImg from "../assets/10-peach-trans.png";
import redeemedImg from "../assets/10-bite-trans.png";

export const HomeSectionThree = () => {
  return (
    <Flex wrap="wrap" justify="space-between">
      <Box w={{ base: "100%", md: "50%" }} mb="2rem">
        <Flex gap="1rem" align="center" mb="1rem">
          <Heading color="brand.orange">3.</Heading>
          <LabelBadge
            bg="brand.darkOrange"
            color="brand.orange"
            size="md"
            style={{
              lineHeight: "1.75",
            }}
          >
            Available soon
          </LabelBadge>
        </Flex>
        <Heading size="4xl" mb="2rem">
          Get peaches!
        </Heading>
        <Text mb="2rem">
          Upon harvest, you will be able to redeem your peach boxes to enjoy
          yourself, send to a friend or sell them at the Farmers Marketplace at
          a price you set. Peach lovers will be invited to purchase peach boxes
          from the marketplace. Every peach box includes a unique, generative
          PΞACH NFT.
        </Text>
        <Text mb="2rem">
          Upon redemption, your PΞACH will evolve to reveal a juicy bite and
          your unique PΞACH pit design. All buyers within the continental US
          will receive a box of fresh, juicy peaches. International orders will
          receive freeze-dried peaches (suitable for overseas shipping)
          equivalent to a peach box, but don’t worry, they are just as
          delicious!
        </Text>
        <Button
          as={Link}
          isExternal={true}
          href="https://peachdrop.xyz/"
          variant="outline"
          fontFamily="heading"
          fontSize="2xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.white"
          borderRadius="200px;"
          color="brand.white"
          size="lg"
          height="72px"
          width="398px"
          _hover={{ bg: "transparent", color: "brand.white" }}
        >
          SEE 2023 PΞACH DROP
        </Button>
      </Box>
      <Flex
        w={{ base: "100%", md: "50%" }}
        direction="column"
        alignItems={{ base: "center", md: "flex-end" }}
      >
        <PeachCard w={{ base: "293px", md: "399px" }} h="539px" mb="1rem">
          <Flex direction="column" align="center">
            <Image src={unredeemedImg} h="210px" />
            <Image src={redeemedImg} h="210px" />
          </Flex>
        </PeachCard>
        <Box textAlign="center" w={{ base: "293px", md: "426px" }}>
          <Text fontSize="xs" color="brand.orange">
            * 1 tree garanties 2 boxes of peaches. You can increase this number
            by doing grow-actions.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

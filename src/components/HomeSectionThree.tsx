import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import PeachCards from "../assets/peach-cards.png";

export const HomeSectionThree = () => {
  return (
    <Flex
      mt={{ base: "0", md: "140px" }}
      direction={{ base: "column", md: "row" }}
      justifyContent="start"
      alignItems="start"
      px="10vw"
    >
      <Box flex="1" mb="2rem">
        <Flex gap="1rem" align="center" mb="1rem">
          <Heading color="brand.orange">3.</Heading>
          <LabelBadge
            bg="brand.green"
            color="brand.black"
            size="md"
            style={{
              lineHeight: "1.75",
            }}
          >
            • Available Now •
          </LabelBadge>
        </Flex>
        <Text
          fontFamily="auster"
          maxWidth="597px"
          fontWeight="bold"
          fontSize={{ base: "56px", xl: "80px" }}
          lineHeight={{ base: "60px", xl: "96px" }}
          mb={4}
          textAlign="left"
        >
          Get peaches!
        </Text>
        <Text maxW="460px" mb="2rem">
          Upon harvest, you will be able to redeem your peach boxes to enjoy
          yourself, send to a friend or sell them at the{" "}
          <Link as={RouterLink} color="brand.orange" to="/market">
            Peach Market
          </Link>{" "}
          at a price you set. Peach lovers will be invited to purchase peach
          boxes from the marketplace. Every peach box includes a unique,
          generative PΞACH NFT.
          <br />
          <br />
          Upon redemption, your PΞACH will evolve to reveal a juicy bite and
          your unique PΞACH pit design. All buyers within the continental US
          will receive a box of fresh, juicy peaches. International orders will
          receive freeze-dried peaches (suitable for overseas shipping)
          equivalent to a peach box, but don’t worry, they are just as
          delicious!
        </Text>
        <Button
          as={RouterLink}
          to="/market"
          variant="outline"
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.white"
          borderRadius="200px;"
          color="brand.white"
          size="sm"
          height="64px"
          width="250px"
          _hover={{ bg: "transparent", color: "brand.white" }}
        >
          BUY PEACHES
        </Button>
      </Box>
      <Image width={{ base: "full", md: "40vw" }} src={PeachCards} />
    </Flex>
  );
};

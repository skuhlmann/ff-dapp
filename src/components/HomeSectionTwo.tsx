import { Flex, Text, Image } from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import GrapeAvatar from "../assets/grape_logo.png";

export const HomeSectionTwo = () => {
  return (
    <Flex
      mt={{ base: "0", md: "140px" }}
      direction={{ base: "column", md: "row-reverse" }}
      justifyContent="start"
      alignItems="start"
      px="10vw"
    >
      <Flex
        direction="column"
        alignItems={{ base: "start", md: "end" }}
        justifyContent="end"
        flex="1"
        mb="2rem"
        ml={{ base: "0px", md: "50px" }}
      >
        <Flex gap="1rem" align="center" mb="1rem">
          <LabelBadge
            bg="brand.red"
            color="brand.black"
            size="md"
            style={{
              lineHeight: "1.75",
            }}
          >
            • HOW IT WORKS •
          </LabelBadge>
        </Flex>

        <Text maxW="500px" textAlign={{ base: "left", md: "right" }} mb="2rem">
          1. Premium selection notable craft wines, collection small lots are
          elegant and distinctive.
        </Text>
        <Text maxW="500px" textAlign={{ base: "left", md: "right" }} mb="2rem">
          2. Premium selection notable craft wines, collection small lots are
          elegant and distinctive.
        </Text>
        <Text maxW="500px" textAlign={{ base: "left", md: "right" }} mb="2rem">
          3. Premium selection notable craft wines, collection small lots are
          elegant and distinctive.
        </Text>
      </Flex>
      <Image src={GrapeAvatar} w={{ base: "400px", xl: "537px" }} />
    </Flex>
  );
};

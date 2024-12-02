import { Divider, Flex, Image, Text } from "@chakra-ui/react";

import peachFive from "../assets/box-1.jpg";
import peachSix from "../assets/box-2.jpg";

export const HomeSectionFour = () => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%">
      <Flex
        w="full"
        border="none"
        direction="row"
        align="center"
        justify="center"
        mb={20}
      >
        <Divider
          mt={8}
          mr={8}
          flex="1"
          borderTop="solid 2px"
          borderColor={"brand.orange"}
          borderBottom="none"
          background="none"
        />
        <Text
          fontFamily="AntiqueStories"
          color="brand.orange"
          fontSize="50px"
          fontWeight="bold"
        >
          Proof-of-pour
        </Text>
        <Divider
          mt={8}
          ml={8}
          flex="1"
          borderTop="solid 2px"
          borderColor={"brand.orange"}
          borderBottom="none"
          background="none"
        />
      </Flex>
      <Flex wrap="wrap" gap="1rem" align="center" justify="center">
        <Image src={peachSix} w={{ base: "300px", md: "420px" }} />
        <Image src={peachFive} w={{ base: "300px", md: "420px" }} />
      </Flex>
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        my={20}
        gap="1rem"
      >
        <Text fontSize="sm" w={{ base: "100%", md: "70%" }}>
          Do we want to have something about peaches here? Discounts for peach
          holders?
        </Text>
      </Flex>
    </Flex>
  );
};

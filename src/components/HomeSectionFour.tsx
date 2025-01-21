import { Divider, Flex, Image, Text } from "@chakra-ui/react";

import peach from "../assets/10-peach-trans.png";
import peachBite from "../assets/10-bite-trans.png";

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
          Proof-of-fruit
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
      <Flex direction="column" align="center" textAlign="center" gap="1rem">
        <Text fontSize="lg" w={{ base: "100%", md: "70%" }} color="brand.blue">
          Another DigiEdible from your frens at Peach Tycoon.
        </Text>
      </Flex>
      <Flex wrap="wrap" gap="1rem" align="center" justify="center" mb="1rem">
        <Image src={peach} w={{ base: "200px", md: "300px" }} />
        <Image src={peachBite} w={{ base: "200px", md: "300px" }} />
      </Flex>
      <Flex wrap="wrap" gap="1rem" align="center" justify="center">
        <Image src={peachSix} w={{ base: "200px", md: "300px" }} />
        <Image src={peachFive} w={{ base: "200px", md: "300px" }} />
      </Flex>
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        my={20}
        gap="1rem"
      >
        <Text fontSize="sm" w={{ base: "100%", md: "70%" }} color="brand.blue">
          Discount for tree holders?
        </Text>
      </Flex>
    </Flex>
  );
};

import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

import peachOne from "../assets//peach-box-11.png";
import peachTwo from "../assets//peach-box-12.png";
import peachThree from "../assets//peach-box-13.png";

export const HomeSectionFour = () => {
  return (
    <Flex direction="column" align="center" justify="center" gap="3rem">
      <Heading color="brand.orange" size="xl">
        Proof-of-peach 2023
      </Heading>
      <Flex wrap="wrap" gap="1rem">
        <Image src={peachOne} w="221px" />
        <Image src={peachTwo} w="221px" />
        <Image src={peachThree} w="221px" />
      </Flex>
      <Box textAlign="center">
        <Text fontSize="sm">Something something how nice it was in 2023!</Text>
        <Text fontSize="sm" fontWeight="700">
          Get ready for season 2!
        </Text>
      </Box>
    </Flex>
  );
};

import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";

import peachOne from "../assets//peach-box-11.png";
import peachTwo from "../assets//peach-box-12.png";
import peachThree from "../assets//peach-box-13.png";

export const HomeSectionFour = () => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Flex w="full" border="none" direction="row" alignItems="center" justifyContent="center" mb={20}>
        <Divider mt={8} mr={8} flex="1" borderTop="dotted 1px" borderColor={'brand.orange'} borderBottom="none" background="none" />
        <Text fontFamily="auster" color="brand.orange" fontSize="50px" fontWeight="bold">
          Proof-of-peach 2023
        </Text>
        <Divider mt={8} ml={8} flex="1" borderTop="dotted 1px" borderColor={'brand.orange'} borderBottom="none" background="none" />
      </Flex>
      <Flex wrap="wrap" gap="1rem">
        <Image src={peachOne} w="420px" />
        <Image src={peachTwo} w="420px" />
        <Image src={peachThree} w="420px" />
      </Flex>
      <Box textAlign="center" my={20}>
        <Text fontSize="sm">Something something how nice it was in 2023!</Text>
        <Text fontSize="sm" fontWeight="700">
          Get ready for season 2!
        </Text>
      </Box>
    </Flex>
  );
};

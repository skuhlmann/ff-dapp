import { Divider, Flex, Image, Text } from "@chakra-ui/react";

import peachOne from "../assets/peach-box-11.png";
import peachFour from "../assets/freeze-dried.jpg";
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
          borderTop="dotted 1px"
          borderColor={"brand.orange"}
          borderBottom="none"
          background="none"
        />
        <Text
          fontFamily="auster"
          color="brand.orange"
          fontSize="50px"
          fontWeight="bold"
        >
          Proof-of-peach 2023
        </Text>
        <Divider
          mt={8}
          ml={8}
          flex="1"
          borderTop="dotted 1px"
          borderColor={"brand.orange"}
          borderBottom="none"
          background="none"
        />
      </Flex>
      <Flex wrap="wrap" gap="1rem" align="center" justify="center">
        <Image src={peachOne} w={{ base: "300px", md: "420px" }} />
        <Image src={peachSix} w={{ base: "300px", md: "420px" }} />
        <Image src={peachFive} w={{ base: "300px", md: "420px" }} />
        <Image src={peachFour} w={{ base: "300px", md: "420px" }} />
      </Flex>
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        my={20}
        gap="1rem"
      >
        <Text fontSize="sm" w={{ base: "100%", md: "70%" }}>
          A special thanks to all the peach enjoyers that supported us last year
          for our genesis season. We shipped out 100+ fresh peach boxes
          domestically and 20+ freeze-dried bags to our international friends.
        </Text>
        <Text fontSize="sm" fontWeight="700">
          Get ready for season 2!
        </Text>
      </Flex>
    </Flex>
  );
};

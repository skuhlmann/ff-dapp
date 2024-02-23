import { Image, Text, Flex, Button, Box } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

import waterIcon from "../assets/icon_water.png";
import fertIcon from "../assets/icon_fert.png";

export const TreeActions = () => {
  return (
    <Flex direction="column" align="center" opacity="30%">
      <Button
        variant="outline"
        fontFamily="heading"
        fontSize="xl"
        fontStyle="italic"
        fontWeight="700"
        border="1px"
        borderColor="brand.blue"
        borderRadius="200px;"
        color="brand.blue"
        size="lg"
        height="60px"
        width="220px"
        my=".5rem"
        disabled={true}
        _hover={{
          bg: "transparent",
          color: "brand.blue",
          cursor: "not-allowed",
        }}
      >
        <Image src={waterIcon} w="44px" mr=".5rem" />
        WATER
      </Button>

      <Button
        variant="outline"
        fontFamily="heading"
        fontSize="xl"
        fontStyle="italic"
        fontWeight="700"
        border="1px"
        borderColor="brand.orange"
        borderRadius="200px;"
        color="brand.orange"
        size="lg"
        height="60px"
        width="220px"
        my=".5rem"
        disabled={true}
        _hover={{
          bg: "transparent",
          color: "brand.orange",
          cursor: "not-allowed",
        }}
      >
        <Image src={fertIcon} w="44px" mr=".5rem" />
        FERTILIZE
      </Button>

      <Button
        variant="outline"
        fontFamily="heading"
        fontSize="xl"
        fontStyle="italic"
        fontWeight="700"
        border="1px"
        borderColor="brand.green"
        borderRadius="200px;"
        color="brand.green"
        size="lg"
        height="60px"
        width="220px"
        my=".5rem"
        disabled={true}
        _hover={{
          bg: "transparent",
          color: "brand.green",
          cursor: "not-allowed",
        }}
      >
        <Box mr=".5rem" color="brand.white" fontWeight="700">
          <FaPlus />
        </Box>
        BOOST
      </Button>
      <Text fontSize="xs" color="brand.orange">
        (Coming soon!)
      </Text>
    </Flex>
  );
};

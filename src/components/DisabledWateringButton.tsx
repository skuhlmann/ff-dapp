import { Button, Image } from "@chakra-ui/react";

import waterIcon from "../assets/icon_water.png";

export const DisabledWaterTreeButton = () => {
  return (
    <>
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
        opacity="30%"
      >
        <Image src={waterIcon} w="44px" mr=".5rem" />
        WATER
      </Button>
    </>
  );
};

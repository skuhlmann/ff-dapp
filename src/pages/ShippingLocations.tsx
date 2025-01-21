import { Box, Heading, Text } from "@chakra-ui/react";

import { SectionHeader } from "../components/SectionHeader";

function ShippingLocations() {
  return (
    <>
      <SectionHeader title="Shipping" />

      <Box px={{ base: "1rem", sm: "2rem" }} color="brand.blue">
        <Box w={{ base: "100%", md: "50%" }} mb="2rem">
          <Heading size="2xl" mb="2rem" color="brand.orange">
            Valid Shipping Locations
          </Heading>
          <Text mb="2rem" fontSize="14px">
            We are only able to ship wine to addresses in certain locations in
            United States.
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default ShippingLocations;

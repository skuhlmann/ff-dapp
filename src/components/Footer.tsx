import { Box, Flex, Image } from "@chakra-ui/react";

import FooterLogo from "../assets/Footer-Logo.png";

export const Footer = () => {
  return (
    <Box minH="200px" bg="brand.orange" color="brand.black">
      <Flex>
        <Image src={FooterLogo} />
      </Flex>
    </Box>
  );
};

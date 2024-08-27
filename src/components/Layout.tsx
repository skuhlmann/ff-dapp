import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="center"
        w="100%"
        textAlign="center"
        backgroundColor="brand.green"
        position="fixed"
        zIndex={10}
        px={8}
      >
        <Text fontSize="md" py="1rem" fontWeight="700">
          The 2024 Peach Season is coming to an end. Get your orders in now, the
          redemption window will close at 9am MDT/3pm UTC on August 31st.
        </Text>
      </Flex>
      <NavBar />
      <Box pt="180px">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

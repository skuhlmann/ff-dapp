import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { SEASON_OVER_TEXT } from "../utils/constants";

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
        <Text fontSize={{ base: "sm", sm: "md" }} py="1rem" fontWeight="700">
          {SEASON_OVER_TEXT}
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

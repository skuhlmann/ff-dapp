import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Box } from "@chakra-ui/react";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Box p={8} w={["100%", "100%", "100%", "1080px"]} mx="auto">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

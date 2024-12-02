import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Box } from "@chakra-ui/react";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Box pt="180px">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

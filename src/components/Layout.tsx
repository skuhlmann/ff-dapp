import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Box } from "@chakra-ui/react";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Box p={8} w={["100%", "100%", "980px"]} mx="auto">
        <Outlet />
      </Box>
    </>
  );
};

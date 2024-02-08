import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Box } from "@chakra-ui/react";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Box p={8}>
        <Outlet />
      </Box>
    </>
  );
};

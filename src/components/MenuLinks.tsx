import { Box, Heading, Stack } from "@chakra-ui/react";

import { MenuItem } from "./MenuItem";
import { usePrivy } from "@privy-io/react-auth";

export const MenuLinks = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  const { ready, authenticated, logout, login } = usePrivy();

  const handleLogout = () => {
    logout();
    toggle();
  };

  if (!ready) {
    return null;
  }

  return (
    <Box
      display={{ base: isOpen ? "block" : "none" }}
      borderBottom="1px solid"
      borderColor="brand.orange"
      pb="3rem"
      position="fixed"
      zIndex="12"
      mt={{ base: "104px" }}
      w="full"
      background={"brand.purple"}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "center", "flex-end", "flex-end"]}
        direction={["column", "column", "column", "column"]}
        pt={[4, 4, 0, 0]}
        textTransform="uppercase"
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/buy-wine">Reserve Your Bottle</MenuItem>
        <MenuItem to="/cellar">Your Cellar</MenuItem>
        <MenuItem to="/market">Wine Market</MenuItem>
        {/* <MenuItem to="/account">My Account</MenuItem> */}
        <MenuItem to="/about">About</MenuItem>
        <MenuItem to="/faq">FAQ</MenuItem>
        {ready && authenticated && (
          <Heading
            onClick={handleLogout}
            color="brand.red"
            _hover={{ cursor: "pointer" }}
          >
            Log Out
          </Heading>
        )}
        {ready && !authenticated && (
          <Heading
            onClick={login}
            color="brand.red"
            _hover={{ cursor: "pointer" }}
          >
            Log In
          </Heading>
        )}
      </Stack>
    </Box>
  );
};

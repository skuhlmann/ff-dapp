import { Box, Stack } from "@chakra-ui/react";

import { MenuItem } from "./MenuItem";

export const MenuLinks = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none" }}
      borderBottom="1px solid white"
      pb="3rem"
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "center", "flex-end", "flex-end"]}
        direction={["column", "column", "column", "column"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/buy-trees">Buy Trees</MenuItem>
        <MenuItem to="/farm">Farm</MenuItem>
        <MenuItem to="/about">About</MenuItem>
      </Stack>
    </Box>
  );
};

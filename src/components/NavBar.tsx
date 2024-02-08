import { useState } from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { RiMenu5Fill } from "react-icons/ri";

import { MenuLinks } from "./MenuLinks";

import PeachAvatar from "../assets/peaches_avatar.png";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["orange.500", "orange.500", "orange.500", "orange.500"]}
      color={["white", "white", "primary.700", "primary.700"]}
    >
      <Flex
        alignItems="center"
        gap="0.5rem;"
        w={["205px", "300px"]}
        color={["white", "white", "primary.500", "primary.500"]}
      >
        <Image src={PeachAvatar} width="35px" />

        <Heading fontSize="20px" color="white">
          PEACH TYCOON
        </Heading>
      </Flex>
      <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        {isOpen ? <RiCloseFill /> : <RiMenu5Fill />}
      </Box>
      <MenuLinks isOpen={isOpen} />
    </Flex>
  );
};

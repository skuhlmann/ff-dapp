import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { RiMenu5Fill } from "react-icons/ri";

import { MenuLinks } from "./MenuLinks";
import { Connect } from "./Connect";
import GrapeAvatar from "../assets/grape_logo.png";

export const NavBar = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "1rem", sm: "0" }}
        w="100%"
        mb={8}
        mt={{ base: "0rem" }}
        py={8}
        px={{ base: 3, md: 10 }}
        color="brand.tan"
        position="fixed"
        zIndex={9}
        background="brand.black"
      >
        <Link to="/">
          <>
            <Flex
              direction="row"
              alignItems="end"
              justifyContent="start"
              display={{ base: "none", md: "flex" }}
            >
              <Image width="56px" src={GrapeAvatar} />
              <Heading>FORGOTTEN FRUIT</Heading>
            </Flex>
            <Flex
              direction="row"
              alignItems="center"
              gap="0.5rem"
              display={{ base: "flex", md: "none" }}
              w="100%"
            >
              <Image src={GrapeAvatar} w="36px" />
              <Heading>FORGOTTEN FRUIT</Heading>
            </Flex>
          </>
        </Link>
        <Flex alignItems="center" justifyContent="center" gap="1rem">
          <Connect />
          <Box cursor="pointer" onClick={toggle} fontSize="30px">
            {isOpen ? <RiCloseFill /> : <RiMenu5Fill />}
          </Box>
        </Flex>
      </Flex>
      <MenuLinks isOpen={isOpen} toggle={toggle} />
    </>
  );
};

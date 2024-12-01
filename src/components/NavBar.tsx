import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { RiMenu5Fill } from "react-icons/ri";

import { MenuLinks } from "./MenuLinks";

import { Connect } from "./Connect";

import MobileLogo from "../assets/Mobile-Logo.png";
import PeachAvatar from "../assets/Peach_logo.png";
import PeachWordmark from "../assets/Peach_wordmark.png";
import TycoonWordmark from "../assets/Tycoon_wordmark.png";

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
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        mt={{ base: "4rem", sm: "2rem", md: "3rem" }}
        py={8}
        px={{ base: 3, md: 10 }}
        color="brand.orange"
        position="fixed"
        zIndex={9}
        background="brand.black"
      >
        <Link to="/">
          <>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="start"
              display={{ base: "none", md: "flex" }}
            >
              <Image width="56px" src={PeachAvatar} />
              <Image width="97px" m="10px 10px 0 20px" src={PeachWordmark} />
              <Image width="210px" mt="10px" src={TycoonWordmark} />
            </Flex>
            <Flex
              direction="row"
              alignItems="center"
              gap="0.5rem;"
              display={{ base: "flex", md: "none" }}
              w="100%"
            >
              <Image src={PeachAvatar} w="36px" />
              <Image src={MobileLogo} />
            </Flex>
          </>
        </Link>
        <Flex align="center" gap="1rem">
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

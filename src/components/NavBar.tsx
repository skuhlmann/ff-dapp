import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { Box, Flex, Image } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { RiMenu5Fill } from "react-icons/ri";

import { MenuLinks } from "./MenuLinks";

import { MenuItem } from "./MenuItem";
import { AccountIcon } from "./AccountButton";
import { Connect } from "./Connect";

import HeaderLogo from "../assets/Header-Logo.png";
import MobileLogo from "../assets/Mobile-Logo.png";
import PeachAvatar from "../assets/peaches_avatar.png";

export const NavBar = () => {
  const location = useLocation();
  const { ready, authenticated, user } = usePrivy();

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
        p={8}
        color="brand.orange"
      >
        <Link to="/">
          <>
            <Flex
              alignItems="center"
              gap="0.5rem;"
              display={{ base: "none", sm: "block" }}
              w={{ base: "250px", md: "400px" }}
            >
              <Image src={HeaderLogo} />
            </Flex>
            <Flex
              direction="row"
              alignItems="center"
              gap="0.5rem;"
              display={{ base: "flex", sm: "none" }}
              w="100%"
            >
              <Image src={PeachAvatar} w="36px" />
              <Image src={MobileLogo} />
            </Flex>
          </>
        </Link>
        <Flex align="center" justify="space-between" gap="1rem">
          <Connect />
          <Box onClick={toggle} fontSize="30px">
            {isOpen ? <RiCloseFill /> : <RiMenu5Fill />}
          </Box>
        </Flex>
      </Flex>
      <MenuLinks isOpen={isOpen} />
    </>
  );
};

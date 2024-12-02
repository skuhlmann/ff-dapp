import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Text, Link, Image } from "@chakra-ui/react";

import { LabelBadge } from "./SharedLayout";

import HomeLogoStamp from "../assets/ff_logo_stamp_orange.png";

export const HomeSectionOne = () => {
  return (
    <Flex
      mt={{ base: "0", md: "160px" }}
      direction={{ base: "column", md: "row" }}
      justifyContent="start"
      alignItems="start"
      px="10vw"
      color="brand.blue"
    >
      <Box flex="1" mb="2rem" minW={{ base: "none", md: "250px" }}>
        <Flex gap="1rem" align="center" mb="1.5rem">
          <LabelBadge
            bg="brand.lightPurple"
            color="brand.blue"
            size="lg"
            height="50px"
            style={{
              lineHeight: "1.85",
            }}
          >
            • THE WINE •
          </LabelBadge>
        </Flex>
        <Text maxW="460px" mb="2rem">
          Premium selection notable craft wines, collection small lots are
          elegant and distinctive.
        </Text>
        <Text maxW="460px" mb="2rem" fontWeight="700">
          Premium selection notable craft wines, collection small lots are
          elegant and distinctive.
        </Text>
        <Text maxW="460px">
          Check out the
          <Link as={RouterLink} to="/about" color="brand.orange" mx=".5rem">
            about page
          </Link>
          to learn more.
        </Text>
      </Box>
      <Flex direction="column" alignItems={{ base: "center", md: "flex-end" }}>
        <Image src={HomeLogoStamp} w={{ base: "245px", xl: "337px" }} />
      </Flex>
    </Flex>
  );
};

import { Link } from "react-router-dom";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import HomePeach from "../assets/Home-Peach.png";
import HomeTree from "../assets/Home-Tree.png";
import HeaderLogo from "../assets/Header-Logo.png";
import { HomeSectionOne } from "../components/HomeSectionOne";

function Home() {
  return (
    <>
      <Box mb="5rem">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={{ base: "1.5rem", md: "0.5rem" }}
        >
          <Box>
            <Heading size="4xl">YOU BUY TREE.</Heading>
          </Box>
          <Box>
            <Heading size="4xl">TREE GROWS PEACH.</Heading>
          </Box>
          <Box>
            <Heading size="4xl">YOU EAT* PEACH.</Heading>
            <Text style={{ fontSize: "14px" }}>
              *or sell to the marketplace for others to enjoy.
            </Text>
          </Box>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={{ base: "1.5rem", md: "0.5rem" }}
          mt="3rem"
        >
          <Image src={HomeTree} w={{ base: "300px" }} />
          <Flex direction="column" align="center">
            <Image src={HeaderLogo} />
            <Text color="brand.orange">Buy now, munch later.</Text>

            <Button
              as={Link}
              to="/buy-trees"
              variant="outline"
              fontFamily="heading"
              fontSize="2xl"
              fontStyle="italic"
              fontWeight="700"
              border="1px"
              borderColor="brand.orange"
              borderRadius="200px;"
              color="brand.red"
              size="lg"
              height="72px"
              width="398px"
              my="3rem"
              _hover={{ bg: "transparent", color: "brand.white" }}
            >
              GET STARTED
            </Button>
          </Flex>
          <Image src={HomePeach} w={{ base: "300px" }} />
        </Flex>
      </Box>
      <Box mb="3rem">
        <HomeSectionOne />
      </Box>
    </>
  );
}

export default Home;

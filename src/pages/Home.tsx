import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import HomePeach from "../assets/Home-Peach.png";
import HomeTree from "../assets/Home-Tree.png";
import PeachWordmark from "../assets/Peach_wordmark.png";
import TycoonWordmark from "../assets/Tycoon_wordmark.png";
import Arrow1 from "../assets/Arrow1.png";
import PeachTreeMobile from "../assets/Peach_Tree_mobile.png";

import { HomeSectionOne } from "../components/HomeSectionOne";
import { HomeSectionTwo } from "../components/HomeSectionTwo";
import { HomeSectionThree } from "../components/HomeSectionThree";
import { HomeSectionFour } from "../components/HomeSectionFour";

function Home() {
  return (
    <>
      <Box mb="5rem">
        <Flex direction="row">
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "start", lg: "center" }}
            justifyContent="center"
            pt={{ base: "0px", md: "27px", lg: "36px", xl: "67px" }}
            pl={{ base: 6, md: 16, xl: 32 }}
            pr={{ base: 6, md: 16, xl: 36 }}
            mb={{ base: 8, md: "0" }}
            zIndex={"2"}
          >
            <Box w="auto">
              <Heading
                fontSize={{ base: "50px", md: "64px", lg: "80px", xl: "110px" }}
                lineHeight={{
                  base: "50px",
                  md: "60px",
                  lg: "76px",
                  xl: "100px",
                }}
              >
                YOU BUY TREE.
              </Heading>
            </Box>
            <Image
              display={{ base: "none", md: "block" }}
              mx="8"
              src={Arrow1}
            />
            <Box>
              <Heading
                fontSize={{ base: "50px", md: "64px", lg: "80px", xl: "110px" }}
                lineHeight={{
                  base: "50px",
                  md: "60px",
                  lg: "76px",
                  xl: "100px",
                }}
              >
                TREE GROWS PEACH.
              </Heading>
            </Box>
            <Image
              display={{ base: "none", md: "block" }}
              mx="8"
              src={Arrow1}
            />
            <Box>
              <Heading
                fontSize={{ base: "50px", md: "64px", lg: "80px", xl: "110px" }}
                lineHeight={{
                  base: "50px",
                  md: "60px",
                  lg: "76px",
                  xl: "100px",
                }}
              >
                YOU EAT
                <Text
                  fontSize={{ base: "40px", md: "55px", xl: "95px" }}
                  lineHeight={{ base: "40px", md: "55px", xl: "100px" }}
                  fontFamily="auster"
                  as="span"
                >
                  *
                </Text>{" "}
                PEACH.
              </Heading>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                lineHeight="20px"
                maxW={{ base: "209px", md: "none" }}
                mt={{ base: "20px", md: "0px" }}
              >
                *or sell to the marketplace for others to enjoy.
              </Text>
            </Box>
          </Flex>
          <Flex
            direction={"column"}
            position="absolute"
            right="0"
            display={{ base: "flex", md: "none" }}
          >
            <Image mt="-40px" src={PeachTreeMobile} w="160px" />
          </Flex>
        </Flex>
        <Flex direction="column" justifyContent="start" alignItems="center">
          <Flex
            direction="row"
            justifyContent="center"
            alignItems="start"
            zIndex={"2"}
            mt={{ base: 4, md: 8 }}
          >
            <Image
              src={HomeTree}
              display={{ base: "none", md: "block" }}
              w={{ base: "245px", xl: "337px" }}
            />
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              mt={{ base: "0", md: 8 }}
              mx={{ base: "0", md: 20 }}
            >
              <Flex direction="row" align="center">
                <Image
                  width={{ base: "66px", xl: "96px" }}
                  src={PeachWordmark}
                  mr="2"
                />
                <Image
                  width={{ base: "145px", xl: "210px" }}
                  src={TycoonWordmark}
                />
              </Flex>
              <Text color="brand.orange" mb={{ base: 8, md: 8, xl: 12 }}>
                Buy now, munch later.
              </Text>
              <Box w="full" position="relative" mt="12px">
                <Button
                  as={Link}
                  to="/buy-trees"
                  variant="outline"
                  fontFamily="Helsinki"
                  fontSize="2xl"
                  border="2px"
                  borderColor="brand.orange"
                  borderRadius="200px;"
                  color="brand.red"
                  size="lg"
                  height="72px"
                  w="full"
                  _hover={{
                    transform: "translate(0px, -10px)",
                    color: "brand.white",
                  }}
                  _focus={{
                    transform: "translate(0px, 0px)",
                    bg: "brand.black",
                  }}
                  position="absolute"
                  bg="brand.black"
                  zIndex="2"
                  transform="translate(0px, -12px)"
                >
                  GET STARTED
                </Button>
                <Box
                  w="full"
                  height="72px"
                  position="absolute"
                  border="2px"
                  borderColor="brand.orange"
                  borderRadius="200px;"
                ></Box>
              </Box>
            </Flex>
            <Image
              display={{ base: "none", md: "block" }}
              src={HomePeach}
              mt={{ base: 6, xl: "0" }}
              w={{ base: "270px", xl: "460px" }}
            />
          </Flex>
          <Divider
            zIndex={"1"}
            mt={{ base: 10, md: "-30px", xl: "-60px" }}
            borderTop="dotted 1px"
            borderColor={"white"}
            borderBottom="none"
            background="none"
          />
        </Flex>
      </Box>
      <Box mb="5rem">
        <HomeSectionOne />
      </Box>
      <Box mb="5rem">
        <HomeSectionTwo />
      </Box>

      <Box mb="5rem">
        <HomeSectionThree />
      </Box>
      <Box mb="5rem">
        <HomeSectionFour />
      </Box>
    </>
  );
}

export default Home;

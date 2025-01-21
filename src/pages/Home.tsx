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

import SkullGrapeBundle from "../assets/ff_skull_grapes.png";

import { HomeSectionOne } from "../components/HomeSectionOne";
import { HomeSectionTwo } from "../components/HomeSectionTwo";
import { HomeSectionFour } from "../components/HomeSectionFour";
import { HomeSectionThree } from "../components/HomeSectionThree";

function Home() {
  return (
    <>
      <Box mb="5rem">
        <Flex direction="row" justify="center">
          <Box w="auto">
            <Heading
              fontSize={{ base: "64px", md: "90px", lg: "150px" }}
              lineHeight={{
                base: "64px",
                md: "90px",
                lg: "150px",
              }}
              textAlign="center"
            >
              FROM TRASH TO TIPSY
            </Heading>
          </Box>
        </Flex>
        <Flex direction="column" justifyContent="start" alignItems="center">
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems={{ base: "center", md: "start" }}
            zIndex={"2"}
            mt={{ base: 4, md: 8 }}
            gap={{ base: 4, md: 0 }}
          >
            <Image src={SkullGrapeBundle} w={{ base: "300px", xl: "500px" }} />
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              mt={{ base: "0", md: 8 }}
              mx={{ base: "0", md: 20 }}
            >
              <Text
                color="brand.blue"
                mb={{ base: 8, md: 8, xl: 12 }}
                w={{ base: "300px" }}
              >
                Introducing the Genesis Red Blend. Get your DigiDrinkable NFT,
                sell it on the marketplace or redeem for a bottle!
              </Text>
              <Box w="full" position="relative" mt="12px">
                <Button
                  as={Link}
                  to="/buy-wine"
                  variant="solid"
                  fontSize="3xl"
                  borderRadius=".125rem"
                  color="brand.orange"
                  bg="brand.purple"
                  _hover={{
                    transform: "translate(0px, 2px)",
                  }}
                  size="lg"
                  height="72px"
                  w="full"
                  px="3rem"
                  pt=".75rem"
                >
                  GET WINE
                </Button>
              </Box>
            </Flex>
          </Flex>
          <Divider
            zIndex={"1"}
            mt={{ base: 10, md: "-30px", xl: "-60px" }}
            borderTop="solid 2px"
            borderColor="brand.blue"
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

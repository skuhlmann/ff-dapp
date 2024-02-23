import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Text, Link, Button } from "@chakra-ui/react";

import { LabelBadge, PeachCard } from "./SharedLayout";

export const HomeSectionOne = () => {
  return (
    <Flex wrap="wrap" justify="space-between">
      <Box w={{ base: "100%", md: "50%" }} mb="2rem">
        <Flex gap="1rem" align="center" mb="1rem">
          <Heading color="brand.orange">1.</Heading>
          <LabelBadge
            bg="brand.green"
            color="brand.black"
            size="md"
            style={{
              lineHeight: "1.75",
            }}
          >
            • Available now •
          </LabelBadge>
        </Flex>
        <Heading size="4xl" mb="2rem">
          Get Trees!
        </Heading>
        <Text mb="2rem">
          Welcome to PΞACHES Season Two - PΞACH Tycoon! For this season, we are
          inviting all humble farmers to try their hand at growing peaches.
        </Text>
        <Text mb="2rem" fontWeight="700">
          Every tree NFT purchased is guaranteed to produce two (2) peach boxes
          that each include a farmer’s dozen (13) delicious, Palisade peaches.
        </Text>
        <Text>
          Palisade peaches are amongst the best in the world due to the unique
          climate that produces high sugars and tender fruit. Check out the
          <Link as={RouterLink} to="/about" color="brand.orange" mx=".5rem">
            about page
          </Link>
          to learn more.
        </Text>
      </Box>
      <Flex
        w={{ base: "100%", md: "50%" }}
        direction="column"
        alignItems={{ base: "center", md: "flex-end" }}
      >
        <PeachCard w={{ base: "293px", md: "426px" }} h="504px" mb="1rem">
          <Flex direction="column" align="center">
            <Box
              w="268px"
              height="268px"
              style={{
                borderRadius: "50%",
                border: "7px solid black",

                textAlign: "center",
              }}
            >
              <Heading
                size="sm"
                color="brand.orange"
                style={{ lineHeight: "268px" }}
              >
                1 Tree = 2 boxes of peaches*
              </Heading>
            </Box>
            <Button
              as={RouterLink}
              to="/buy-trees"
              variant="outline"
              fontFamily="heading"
              fontSize="2xl"
              fontStyle="italic"
              fontWeight="700"
              border="1px"
              borderColor="brand.green"
              borderRadius="200px;"
              color="brand.orange"
              size="lg"
              height="72px"
              w={{ base: "223px", md: "320px" }}
              my="3rem"
              _hover={{ bg: "transparent", color: "brand.white" }}
            >
              BUY TREE
            </Button>
          </Flex>
        </PeachCard>
        <Box textAlign="center" w={{ base: "293px", md: "426px" }}>
          <Text fontSize="xs" color="brand.orange">
            * One tree guarantees two boxes of peaches. Water, prune, fertilize
            and protect your trees from pests in order to earn additional peach
            boxes.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

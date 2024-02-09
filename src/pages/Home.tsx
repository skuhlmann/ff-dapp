import {
  Button,
  Card,
  Flex,
  Heading,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

import peachImg from "../assets/10-peach-trans.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";

const HowCard = styled(Card)`
  border-radius: 8px;
  padding: 1rem;
  height: 160px;
`;

function Home() {
  return (
    <>
      <PageHeader title="PΞACH TYCOON" superTitle="PΞACHES SEASON 2">
        <Flex>
          <Image src={peachImg} w={{ base: "300px" }} />
        </Flex>
        <Button
          as={Link}
          to="/play"
          variant="outline"
          colorScheme="orange"
          fontFamily="heading"
          fontSize="2xl"
          fontStyle="italic"
          fontWeight="900"
          border="2px"
          borderColor="orange.500"
          size="lg"
          height="64px"
          width="300px"
          my="3rem"
          _hover={{ bg: "transparent", color: "orange.300" }}
        >
          Get Started
        </Button>
      </PageHeader>

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fit, minmax(320px, 1fr))"
      >
        <HowCard backgroundColor="#000">
          <Heading size="lg">1. Buy Trees</Heading>
        </HowCard>
        <HowCard backgroundColor="#000">
          <Heading size="lg">2. Grow Peaches</Heading>
        </HowCard>
        <HowCard backgroundColor="#000">
          <Heading size="lg">3. Sell Peaches</Heading>
        </HowCard>
        <HowCard backgroundColor="#000">
          <Heading size="lg">4. Eat Peaches</Heading>
        </HowCard>
      </SimpleGrid>
    </>
  );
}

export default Home;

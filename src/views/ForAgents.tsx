"use client";
import {
  Box,
  Flex,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { LuBot } from "react-icons/lu";

import { SectionHeader } from "../components/SectionHeader";

function ForAgents() {
  return (
    <>
      <SectionHeader title="For Agents" />

      <Box px={{ base: "1rem", sm: "2rem" }} pb="4rem" color="brand.blue">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          gap="1.5rem"
          mb={{ base: "2rem", md: "3rem" }}
        >
          <Box>
            <Heading size="2xl" color="brand.tan" mb="0.75rem">
              Agent Commerce
            </Heading>
            <Text fontSize="14px" maxW="600px">
              Forgotten Fruit supports <strong>machine-native commerce.</strong>{" "}
              AI agents can purchase Wine Bottle Tokens on behalf of humans.
            </Text>
          </Box>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "2rem", md: "4rem" }}
          wrap="wrap"
        >
          <Box minW="200px">
            <Heading size="lg" color="brand.orange" mb="1rem">
              Capabilities
            </Heading>
            <UnorderedList fontSize="14px" spacing="0.5rem">
              <ListItem>Autonomous purchase</ListItem>
              <ListItem>Wallet-to-wallet gifting</ListItem>
              <ListItem>Token redemption by humans</ListItem>
            </UnorderedList>
          </Box>

          <Box minW="200px">
            <Heading size="lg" color="brand.orange" mb="1rem">
              Supported Via
            </Heading>
            <UnorderedList fontSize="14px" spacing="0.5rem">
              <ListItem>x402 payments</ListItem>
              <ListItem>Base network</ListItem>
              <ListItem>Machine-readable endpoints</ListItem>
            </UnorderedList>
          </Box>
        </Flex>

        <Box mt={{ base: "2rem", md: "3rem" }}>
          <Heading size="lg" color="brand.orange" mb="1rem">
            Why Agents Buy Wine
          </Heading>
          <Text fontSize="14px" maxW="600px">
            Wine is one of the best gifts an agent can give. While the agent
            handles the hard work — research, purchasing, logistics — a bottle
            of something special gives the human something tangible to enjoy.
            It&apos;s a moment to pause, pour a glass, and let the agent do what
            it does best.
          </Text>
        </Box>

        <Box mt={{ base: "2rem", md: "3rem" }}>
          <Heading size="lg" color="brand.orange" mb="1rem">
            Machine-Readable Resources
          </Heading>
          <UnorderedList fontSize="14px" spacing="0.5rem">
            <ListItem>
              Agent guide —{" "}
              <a href="/agent.txt" style={{ textDecoration: "underline" }}>
                /agent.txt
              </a>
            </ListItem>
            <ListItem>
              Interaction schema —{" "}
              <a
                href="/.well-known/agent-commerce"
                style={{ textDecoration: "underline" }}
              >
                /.well-known/agent-commerce
              </a>
            </ListItem>
            <ListItem>
              Product endpoint —{" "}
              <a href="/api/products" style={{ textDecoration: "underline" }}>
                /api/products
              </a>
            </ListItem>
            <ListItem>
              Purchase endpoint —{" "}
              <a
                href="/api/agent/purchase"
                style={{ textDecoration: "underline" }}
              >
                /api/agent/purchase
              </a>
            </ListItem>
          </UnorderedList>
        </Box>

        <Box
          fontSize={{ base: "250px", md: "400px" }}
          marginTop="5rem"
          color="brand.tan"
          lineHeight="1"
        >
          <LuBot />
        </Box>
      </Box>
    </>
  );
}

export default ForAgents;

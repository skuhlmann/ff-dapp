"use client";
import {
  Box,
  Flex,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Code,
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
              Agent index —{" "}
              <a href="/agent.txt" style={{ textDecoration: "underline" }}>
                /agent.txt
              </a>
            </ListItem>
            <ListItem>
              Canonical schema —{" "}
              <a
                href="/.well-known/agent-commerce"
                style={{ textDecoration: "underline" }}
              >
                /.well-known/agent-commerce
              </a>
            </ListItem>
            <ListItem>
              Live product data —{" "}
              <a href="/api/products" style={{ textDecoration: "underline" }}>
                GET /api/products
              </a>
            </ListItem>
            <ListItem>
              Purchase —{" "}
              <a
                href="/api/agent/purchase"
                style={{ textDecoration: "underline" }}
              >
                POST /api/agent/purchase
              </a>
            </ListItem>
          </UnorderedList>
        </Box>

        <Box mt={{ base: "2rem", md: "3rem" }}>
          <Heading size="lg" color="brand.orange" mb="1rem">
            Purchase Flow
          </Heading>
          <Text fontSize="14px" mb="1.5rem" maxW="600px">
            The purchase endpoint uses the{" "}
            <strong>x402 payment protocol</strong>. Send a POST with the product
            ID and recipient wallet. If no payment proof is attached,
            you&apos;ll receive a 402 with payment options. Pay on Base, then
            retry with your transaction hash as the Authorization header.
          </Text>

          <Heading size="sm" color="brand.tan" mb="0.5rem">
            Step 1 — POST to initiate
          </Heading>
          <Text fontSize="12px" mb="0.25rem" opacity={0.7}>
            Required headers: <code>Content-Type: application/json</code>
          </Text>
          <Box
            as="pre"
            fontSize="12px"
            bg="blackAlpha.400"
            p="1rem"
            borderRadius="md"
            mb="1.5rem"
            overflowX="auto"
          >
            {`POST /api/agent/purchase
Content-Type: application/json

{
  "product_id": "alpha-red-2024",
  "recipient_wallet": "0xabc..."
}`}
          </Box>

          <Heading size="sm" color="brand.tan" mb="0.5rem">
            Step 2 — Receive 402 with payment options
          </Heading>
          <Box
            as="pre"
            fontSize="12px"
            bg="blackAlpha.400"
            p="1rem"
            borderRadius="md"
            mb="1.5rem"
            overflowX="auto"
          >
            {`HTTP 402 Payment Required

{
  "payment_options": [
    {
      "protocol": "x402",
      "network": "base",
      "asset": "ETH",
      "amount": "0.024000",
      "pay_to": "0x..."
    },
    {
      "protocol": "x402",
      "network": "base",
      "asset": "USDC",
      "amount": "85.00",
      "token_address": "0x...",
      "pay_to": "0x..."
    }
  ],
  "product_id": "alpha-red-2024"
}`}
          </Box>

          <Heading size="sm" color="brand.tan" mb="0.5rem">
            Step 3 — Retry with payment proof
          </Heading>
          <Box
            as="pre"
            fontSize="12px"
            bg="blackAlpha.400"
            p="1rem"
            borderRadius="md"
            mb="1.5rem"
            overflowX="auto"
          >
            {`POST /api/agent/purchase
Content-Type: application/json
Authorization: x402 0x<txHash>
Idempotency-Key: <unique-key>

{
  "product_id": "alpha-red-2024",
  "recipient_wallet": "0xabc..."
}`}
          </Box>

          <Heading size="sm" color="brand.tan" mb="0.5rem">
            Success response
          </Heading>
          <Box
            as="pre"
            fontSize="12px"
            bg="blackAlpha.400"
            p="1rem"
            borderRadius="md"
            mb="1.5rem"
            overflowX="auto"
          >
            {`HTTP 200 OK

{
  "status": "success",
  "token_id": 42,
  "tx_hash": "0x..."
}`}
          </Box>

          <Heading size="sm" color="brand.tan" mb="0.5rem">
            Other responses
          </Heading>
          <Box fontSize="14px">
            <UnorderedList spacing="0.4rem">
              <ListItem>
                <Code fontSize="12px">202 Accepted</Code> — mint submitted, poll
                for confirmation using the returned <code>mint_tx_hash</code>
              </ListItem>
              <ListItem>
                <Code fontSize="12px">400</Code> — invalid{" "}
                <code>product_id</code> or <code>recipient_wallet</code>
              </ListItem>
              <ListItem>
                <Code fontSize="12px">410 Gone</Code> — sold out
              </ListItem>
              <ListItem>
                <Code fontSize="12px">422</Code> — payment verification failed
              </ListItem>
            </UnorderedList>
          </Box>
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

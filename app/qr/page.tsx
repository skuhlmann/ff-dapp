"use client";

import { QRCodeSVG } from "qrcode.react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { QR_CLAIM_URL } from "@/utils/constants";
import { brandColors } from "@/theme";
import Link from "next/link";

export default function QrPage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="brand.black"
      px={4}
    >
      <Heading
        fontSize={{ base: "36px", md: "56px" }}
        mb={{ base: 6, md: 10 }}
        textAlign="center"
      >
        Scan for Discount
      </Heading>

      <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="xl">
        <QRCodeSVG
          value={QR_CLAIM_URL}
          size={360}
          fgColor={brandColors.purple}
          bgColor="#ffffff"
          level="H"
        />
      </Box>

      {QR_CLAIM_URL && (
        <Link href={QR_CLAIM_URL}>
          <Text
            mt={{ base: 4, md: 6 }}
            fontSize="sm"
            color="whiteAlpha.500"
            fontFamily="monospace"
            textAlign="center"
            wordBreak="break-all"
            maxW="400px"
          >
            {QR_CLAIM_URL}
          </Text>
        </Link>
      )}
    </Flex>
  );
}

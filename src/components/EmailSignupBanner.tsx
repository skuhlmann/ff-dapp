"use client";

import { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";

type EmailSignupBannerProps = {
  isSubmitting: boolean;
  submitError: string | null;
  isSubmitted: boolean;
  onSubmit: (email: string) => Promise<void>;
};

export const EmailSignupBanner = ({
  isSubmitting,
  submitError,
  isSubmitted,
  onSubmit,
}: EmailSignupBannerProps) => {
  const [email, setEmail] = useState("");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (isSubmitted) {
    return (
      <Box
        bg="brand.purple"
        borderRadius="8px"
        p="1rem 1.5rem"
        mb="1.5rem"
        w="100%"
        maxW="600px"
      >
        <Text color="brand.green" fontSize="sm" fontWeight="700">
          You&apos;re signed up! We&apos;ll keep you posted on redemption
          alerts, new wines, and exclusive discounts.
        </Text>
      </Box>
    );
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail) return;
    await onSubmit(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box
      bg="brand.purple"
      borderRadius="8px"
      p="1.5rem"
      mb="1.5rem"
      w="100%"
      maxW="600px"
      position="relative"
    >
      <CloseButton
        size="sm"
        color="brand.tan"
        position="absolute"
        top="8px"
        right="8px"
        onClick={() => setDismissed(true)}
      />

      <Text color="brand.tan" fontSize="sm" fontWeight="700" mb=".5rem">
        Stay in the loop
      </Text>
      <Text color="brand.blue" fontSize="xs" mb="1rem">
        Sign up for email updates &mdash; redemption alerts, new wines, and
        exclusive discounts.
      </Text>

      <Flex gap=".5rem" direction={{ base: "column", md: "row" }}>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          focusBorderColor="brand.orange"
          size="sm"
          flex="1"
          disabled={isSubmitting}
        />
        <Button
          onClick={handleSubmit}
          disabled={!isValidEmail || isSubmitting}
          variant="solid"
          fontFamily="heading"
          borderRadius=".125rem"
          color="brand.purple"
          bg="brand.orange"
          size="sm"
          px="1.5rem"
          pt=".25rem"
          _hover={{
            transform: "translate(0px, 2px)",
          }}
          opacity={!isValidEmail || isSubmitting ? "50%" : "100%"}
        >
          {isSubmitting ? <Spinner size="xs" /> : "SIGN UP"}
        </Button>
      </Flex>

      {submitError && (
        <Text color="red.300" fontSize="xs" mt=".5rem">
          {submitError}
        </Text>
      )}
    </Box>
  );
};

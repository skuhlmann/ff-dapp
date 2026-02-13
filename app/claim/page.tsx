"use client";

/**
 * /claim — QR-driven discount landing page.
 *
 * Flow:
 *   1. User scans QR → arrives at /claim?campaign=<id>
 *   2. Enters wallet address (or ENS, resolved client-side via viem mainnet)
 *   3. Optionally enters email
 *   4. Submits → POST /api/claim
 *   5. Displays success / already_claimed / error state
 */

import { Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createPublicClient, http, isAddress } from "viem";
import { mainnet } from "viem/chains";
import { format } from "date-fns";

import {
  TARGET_NETWORK,
  BLOCK_EXPLORER_URL,
  CAMPAIGN_AIRTABLE_RECORD_ID,
  ALCHEMY_RPC_MAINNET,
  SALE_STATE,
} from "@/utils/constants";
import { ClaimResponse } from "@/utils/types";

// Mainnet-only client used solely for ENS resolution
const ensClient = createPublicClient({
  chain: mainnet,
  transport: http(ALCHEMY_RPC_MAINNET),
});

type FormState = "idle" | "loading" | "success" | "already_claimed" | "error";

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function formatExpiry(isoDate: string): string {
  return format(new Date(isoDate), "MMMM d, yyyy");
}

// useSearchParams requires a Suspense boundary in Next.js App Router
export default function ClaimPage() {
  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" minH="80vh">
          <Spinner size="xl" color="brand.tan" />
        </Flex>
      }
    >
      <ClaimForm />
    </Suspense>
  );
}

function ClaimForm() {
  const searchParams = useSearchParams();
  const campaignParam = searchParams?.get("campaign") ?? "";

  const [walletInput, setWalletInput] = useState("");
  const [resolvedWallet, setResolvedWallet] = useState<string | null>(null);
  const [isResolvingEns, setIsResolvingEns] = useState(false);
  const [ensError, setEnsError] = useState<string | null>(null);

  const [email, setEmail] = useState("");

  const [formState, setFormState] = useState<FormState>("idle");
  const [claimResult, setClaimResult] = useState<ClaimResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ensDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── ENS resolution on wallet input change ─────────────────────────────────

  function handleWalletChange(value: string) {
    setWalletInput(value);
    setResolvedWallet(null);
    setEnsError(null);

    if (ensDebounceRef.current) clearTimeout(ensDebounceRef.current);

    const trimmed = value.trim();

    if (trimmed.endsWith(".eth")) {
      ensDebounceRef.current = setTimeout(async () => {
        setIsResolvingEns(true);
        setEnsError(null);

        console.log("trimmed", trimmed);
        try {
          const address = await ensClient.getEnsAddress({ name: trimmed });
          if (address) {
            setResolvedWallet(address);
          } else {
            setEnsError("ENS name not found.");
          }
        } catch {
          setEnsError("ENS lookup failed. Enter address manually.");
        } finally {
          setIsResolvingEns(false);
        }
      }, 600);
    }
  }

  // The effective wallet address: resolved ENS → raw 0x input
  const effectiveWallet =
    resolvedWallet ??
    (isAddress(walletInput.trim()) ? walletInput.trim() : null);

  const walletInputError =
    walletInput &&
    !walletInput.trim().endsWith(".eth") &&
    !isAddress(walletInput.trim())
      ? "Enter a valid Ethereum address or ENS name."
      : (ensError ?? null);

  // ── Form submission ───────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!effectiveWallet) return;

    setFormState("loading");
    setSubmitError(null);

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: effectiveWallet,
          email: email.trim() || undefined,
          campaign: campaignParam || CAMPAIGN_AIRTABLE_RECORD_ID,
        }),
      });

      const data: ClaimResponse = await res.json();
      setClaimResult(data);

      if (data.status === "error") {
        setFormState("error");
        setSubmitError(data.message);
      } else {
        setFormState(data.status);
      }
    } catch {
      setFormState("error");
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  // ── Success screen ────────────────────────────────────────────────────────

  if (formState === "success" && claimResult?.status === "success") {
    const explorerUrl = `${BLOCK_EXPLORER_URL[TARGET_NETWORK]}tx/${claimResult.tx}`;
    return (
      <SuccessScreen
        wallet={effectiveWallet!}
        txHash={claimResult.tx}
        explorerUrl={explorerUrl}
        expires={claimResult.expires}
        alreadyHeld={false}
      />
    );
  }

  if (
    formState === "already_claimed" &&
    claimResult?.status === "already_claimed"
  ) {
    return (
      <SuccessScreen
        wallet={effectiveWallet!}
        txHash={null}
        explorerUrl={null}
        expires={claimResult.expires}
        alreadyHeld={true}
      />
    );
  }

  // ── Claim form ────────────────────────────────────────────────────────────

  const isClaimClosed = SALE_STATE === "upcoming" || SALE_STATE === "closed";

  const isSubmitDisabled =
    isClaimClosed ||
    !effectiveWallet ||
    isResolvingEns ||
    formState === "loading";

  return (
    <Flex direction="column" align="center" justify="center" minH="80vh" px={4}>
      <Box
        w={{ base: "100%", sm: "460px" }}
        bg="brand.black"
        border="1px solid"
        borderColor="brand.purple"
        borderRadius="lg"
        p={{ base: 6, md: 10 }}
      >
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading fontSize={{ base: "32px", md: "42px" }} mb={2}>
              Claim Your Discount
            </Heading>
            <Text color="brand.tan" fontSize="md">
              Scan this QR to unlock your wine discount.
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              {isClaimClosed && (
                <Box
                  bg="brand.gray"
                  color="whiteAlpha.700"
                  px={4}
                  py={3}
                  borderRadius="md"
                  fontSize="sm"
                  textAlign="center"
                >
                  {SALE_STATE === "upcoming"
                    ? "Claims will open once the sale begins."
                    : "The claim period has ended."}
                </Box>
              )}

              {/* Wallet / ENS input */}
              <FormControl
                isInvalid={!!walletInputError}
                isRequired
                isDisabled={isClaimClosed}
              >
                <FormLabel color="brand.tan" fontSize="sm">
                  Ethereum Wallet Address
                </FormLabel>
                <Input
                  placeholder="0x… or yourname.eth"
                  value={walletInput}
                  onChange={(e) => handleWalletChange(e.target.value)}
                  bg="brand.gray"
                  border="1px solid"
                  borderColor="brand.purple"
                  color="white"
                  _placeholder={{ color: "whiteAlpha.400" }}
                  _focus={{ borderColor: "brand.blue" }}
                />
                {isResolvingEns && (
                  <Flex align="center" gap={2} mt={1}>
                    <Spinner size="xs" color="brand.blue" />
                    <Text fontSize="xs" color="brand.blue">
                      Resolving ENS…
                    </Text>
                  </Flex>
                )}
                {resolvedWallet && !isResolvingEns && (
                  <Text fontSize="xs" color="brand.green" mt={1}>
                    Resolved: {shortenAddress(resolvedWallet)}
                  </Text>
                )}
                <FormErrorMessage>{walletInputError}</FormErrorMessage>
              </FormControl>

              {/* Email input */}
              <FormControl isDisabled={isClaimClosed}>
                <FormLabel color="brand.tan" fontSize="sm">
                  Email{" "}
                  <Text
                    color="whiteAlpha.600"
                    fontWeight="normal"
                    fontSize="xs"
                  >
                    (to get updated on new wine drops and discounts)
                  </Text>
                </FormLabel>

                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="brand.gray"
                  border="1px solid"
                  borderColor="brand.purple"
                  color="white"
                  _placeholder={{ color: "whiteAlpha.400" }}
                  _focus={{ borderColor: "brand.blue" }}
                />
              </FormControl>

              {/* Error banner */}
              {formState === "error" && submitError && (
                <Box
                  bg="brand.red"
                  color="white"
                  px={4}
                  py={3}
                  borderRadius="md"
                  fontSize="sm"
                >
                  {submitError}
                </Box>
              )}

              <Button
                type="submit"
                isLoading={formState === "loading"}
                loadingText="Claiming…"
                isDisabled={isSubmitDisabled}
                bg="brand.purple"
                color="brand.tan"
                _hover={{ bg: "brand.lightPurple" }}
                size="lg"
                mt={2}
              >
                Claim Discount
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Flex>
  );
}

// ── Success / already_claimed screen ─────────────────────────────────────────

type SuccessScreenProps = {
  wallet: string;
  txHash: string | null;
  explorerUrl: string | null;
  expires: string;
  alreadyHeld: boolean;
};

function SuccessScreen({
  wallet,
  txHash,
  explorerUrl,
  expires,
  alreadyHeld,
}: SuccessScreenProps) {
  return (
    <Flex direction="column" align="center" justify="center" minH="80vh" px={4}>
      <Box
        w={{ base: "100%", sm: "460px" }}
        bg="brand.black"
        border="1px solid"
        borderColor="brand.green"
        borderRadius="lg"
        p={{ base: 6, md: 10 }}
      >
        <VStack spacing={6} align="stretch" textAlign="center">
          <Heading fontSize={{ base: "28px", md: "38px" }} color="brand.green">
            {"Discount Claimed!"}
          </Heading>

          <Text color="brand.tan" fontSize="md">
            {alreadyHeld
              ? "Your wallet is holding the discount token."
              : "Your discount token has been minted to your wallet."}
          </Text>

          {/* Wallet display */}
          <Box
            bg="brand.gray"
            borderRadius="md"
            px={4}
            py={3}
            fontSize="sm"
            color="whiteAlpha.800"
            fontFamily="monospace"
          >
            {shortenAddress(wallet)}
          </Box>

          {/* Expiry */}
          <Text color="brand.tan" fontSize="sm">
            Discount active until:{" "}
            <Text as="span" fontWeight="bold" color="white">
              {formatExpiry(expires)}
            </Text>
          </Text>

          {/* Tx hash link — only shown for fresh mints */}
          {txHash && explorerUrl && (
            <Link
              href={explorerUrl}
              isExternal
              fontSize="xs"
              color="brand.blue"
              textDecoration="underline"
            >
              View transaction ↗
            </Link>
          )}

          {/* CTAs */}
          <VStack spacing={3}>
            <Button
              as={Link}
              href="/buy-wine"
              w="100%"
              bg="brand.purple"
              color="brand.tan"
              _hover={{ bg: "brand.lightPurple", textDecoration: "none" }}
              size="lg"
            >
              Buy Wine
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
}

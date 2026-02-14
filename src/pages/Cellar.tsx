"use client";
import { usePrivy } from "@privy-io/react-auth";
import { Button, Flex, Text } from "@chakra-ui/react";

import Link from "next/link";
import { BottleList } from "../components/BottleList";
import { EmailSignupBanner } from "../components/EmailSignupBanner";
import { SectionHeader } from "../components/SectionHeader";
import { useEmailSignup } from "../hooks/useEmailSignup";
import { SALE_STATE } from "../utils/constants";

/**
 * Renders the email signup banner + hook.
 * Extracted into its own component so the useQuery/useQueryClient calls
 * only run client-side (this component is conditionally rendered when
 * loggedIn is true, which is always false during SSR).
 */
function EmailSignupSection({
  walletAddress,
  privyHasEmail,
}: {
  walletAddress: string;
  privyHasEmail: boolean;
}) {
  const { showBanner, isSubmitting, submitError, isSubmitted, submitEmail } =
    useEmailSignup({ walletAddress, privyHasEmail });

  if (!showBanner && !isSubmitted) return null;

  return (
    <EmailSignupBanner
      isSubmitting={isSubmitting}
      submitError={submitError}
      isSubmitted={isSubmitted}
      onSubmit={submitEmail}
    />
  );
}

function Cellar() {
  const { ready, authenticated, user } = usePrivy();

  const loggedIn = ready && authenticated && user?.wallet?.address;

  return (
    <>
      <SectionHeader title="My Cellar" />

      <Flex
        direction="column"
        textAlign="center"
        gap="1rem"
        px={{ base: "5vw", md: "15vw" }}
        color="brand.blue"
        mb="2rem"
      >
        <Text fontSize="sm">
          Meet your skele-grapes, digital misfits as bold as the wine they
          represents.
        </Text>

        <Text fontSize="sm">
          Every grape is one-of-a-kind with unique features, accessories and
          buddies. Each is redeemable for a real bottle, ageable in your cellar,
          resellable on our marketplace.
        </Text>
      </Flex>

      <Flex
        w="100%"
        gap="1rem"
        direction="column"
        align="center"
        mb="3rem"
        justify="center"
      >
        {SALE_STATE === "upcoming" && (
          <Text
            color="brand.orange"
            fontSize="2xl"
            fontWeight="700"
            textAlign="center"
            mb="2rem"
            lineHeight="1.5"
            w={{ base: "300px" }}
          >
            PRESALE IS OPENING SOON!
          </Text>
        )}
        {loggedIn && user?.wallet?.address && (
          <EmailSignupSection
            walletAddress={user.wallet.address}
            privyHasEmail={!!user?.email?.address}
          />
        )}
        {loggedIn && user?.wallet?.address && (
          <BottleList account={user.wallet.address} />
        )}
      </Flex>

      <Flex w="100%" pt={8} pb={20} px={20} justify="flex-end">
        {SALE_STATE !== "upcoming" && (
          <Button
            as={Link}
            href="/buy-wine"
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
            px="3rem"
            pt=".75rem"
          >
            BUY A BOTTLE
          </Button>
        )}
      </Flex>
    </>
  );
}

export default Cellar;

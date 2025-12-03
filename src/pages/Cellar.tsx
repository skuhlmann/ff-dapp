import { usePrivy } from "@privy-io/react-auth";
import { Button, Flex, Text } from "@chakra-ui/react";

import { LogIn } from "../components/LogIn";
import { Link } from "react-router-dom";
import { BottleList } from "../components/BottleList";
import { SectionHeader } from "../components/SectionHeader";

function Cellar() {
  const { ready, authenticated, user } = usePrivy();

  const loggedIn = ready && authenticated && user?.wallet?.address;

  return (
    <>
      <SectionHeader title="My Cellar" />

      <Flex
        direction="column"
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

        <Text fontSize="sm">
          Because even grapes deserve a second chance at greatness.
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
        {ready && !authenticated && <LogIn />}

        {loggedIn && user?.wallet?.address && (
          <BottleList account={user.wallet.address} />
        )}
      </Flex>

      <Flex w="100%" pt={8} pb={20} px={20} justify="flex-end">
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
          px="3rem"
          pt=".75rem"
        >
          BUY BOTTLES
        </Button>
      </Flex>
    </>
  );
}

export default Cellar;

import { usePrivy } from "@privy-io/react-auth";
import { Button, Flex } from "@chakra-ui/react";

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
          color="brand.red"
          _hover={{
            transform: "translate(0px, 2px)",
          }}
          bg="brand.purple"
          size="lg"
          height="72px"
          px="3rem"
          pt=".75rem"
        >
          BUY WINE
        </Button>
      </Flex>
    </>
  );
}

export default Cellar;

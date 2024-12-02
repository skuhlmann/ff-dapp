import { Box, Button, Flex, useToast, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { AccountAvatar } from "../components/AccountAvatar";
import { LogIn } from "../components/LogIn";
import { LuClipboardCopy } from "react-icons/lu";
import { truncateAddress } from "../utils/formatting";
import { SectionHeader } from "../components/SectionHeader";
import { FundWallet } from "../components/FundWallet";

function Account() {
  const toast = useToast();

  const { ready, authenticated, user, logout } = usePrivy();

  if (!ready) {
    return null;
  }

  const handleCopy = () => {
    if (!user?.wallet?.address) return;
    navigator.clipboard.writeText(user.wallet.address);
    toast({
      title: `${truncateAddress(user.wallet.address)} copied to clipboard.`,
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <SectionHeader title="Account" />

      <Flex w="100%" justify="center">
        {authenticated && user && user.wallet ? (
          <Flex
            direction="column"
            alignItems="flex-start"
            w={["100%", "50%"]}
            mb="15rem"
          >
            <AccountAvatar
              address={user?.wallet.address}
              email={user?.email?.address}
              handleCopy={handleCopy}
            />
            <FundWallet />

            <Text fontSize="xs" mt="1.5rem" mb="0rem">
              To manually fund your wallet send Base Eth to this address:{" "}
              {user?.wallet.address}
            </Text>

            <Button
              size="xs"
              variant="secondary"
              _hover={{ cursor: "pointer" }}
              onClick={handleCopy}
            >
              Copy to your clipboard
              <LuClipboardCopy
                style={{ fontSize: "12px", marginLeft: ".5rem" }}
              />
            </Button>

            <Button
              onClick={logout}
              variant="solid"
              fontFamily="Rockwell"
              borderRadius=".125rem"
              color="brand.blue"
              _hover={{
                transform: "translate(0px, 2px)",
              }}
              bg="brand.purple"
              size="lg"
              px="2rem"
              pt=".5rem"
              mt="3rem"
            >
              Logout
            </Button>
          </Flex>
        ) : (
          <Box mb="15rem">
            '
            <LogIn />
          </Box>
        )}
      </Flex>
    </>
  );
}

export default Account;

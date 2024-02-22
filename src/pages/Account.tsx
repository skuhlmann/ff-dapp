import { Box, Button, Flex, Heading, useToast, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { AccountAvatar } from "../components/AccountAvatar";
import { LogIn } from "../components/LogIn";
import { LuClipboardCopy } from "react-icons/lu";
import { truncateAddress } from "../utils/formatting";

function Account() {
  const toast = useToast();

  const { ready, authenticated, user, logout } = usePrivy();

  if (!ready) {
    return null;
  }

  console.log("user", user);

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
      <Box w="100%" textAlign="center" mb="3rem">
        <Heading size="4xl">ACCOUNT</Heading>
      </Box>
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

            <Text mb="1rem">
              To fund your wallet send Base Eth to this address:{" "}
              {user?.wallet.address}
            </Text>
            <Button _hover={{ cursor: "pointer" }} onClick={handleCopy}>
              Copy to your clipboard
              <LuClipboardCopy
                style={{ fontSize: "18px", marginLeft: ".5rem" }}
              />
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              fontFamily="heading"
              fontSize="xl"
              fontStyle="italic"
              fontWeight="700"
              border="1px"
              borderColor="brand.orange"
              borderRadius="200px;"
              color="brand.red"
              size="lg"
              height="60px"
              width="272px"
              my="3rem"
              _hover={{ bg: "transparent", color: "brand.white" }}
            >
              Logout
            </Button>
          </Flex>
        ) : (
          <LogIn />
        )}
      </Flex>
    </>
  );
}

export default Account;

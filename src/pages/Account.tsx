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
            <Box w="272px" position="relative" mt="3rem">
              <Button
                onClick={logout}
                variant="outline"
                fontFamily="heading"
                fontSize="xl"
                fontStyle="italic"
                fontWeight="700"
                border="2px"
                borderColor="brand.orange"
                borderRadius="200px;"
                color="brand.red"
                size="lg"
                height="72px"
                width="full"
                _hover={{
                  transform: "translate(0px, -10px)",
                  color: "brand.white",
                }}
                _focus={{ transform: "translate(0px, 0px)", bg: "brand.black" }}
                position="absolute"
                bg="brand.black"
                zIndex="2"
                transform="translate(0px, -12px)"
              >
                Logout
              </Button>
              <Box
                w="full"
                height="72px"
                position="absolute"
                border="2px"
                borderColor="brand.orange"
                borderRadius="200px;"
              ></Box>
            </Box>
          </Flex>
        ) : (
          <LogIn />
        )}
      </Flex>
    </>
  );
}

export default Account;

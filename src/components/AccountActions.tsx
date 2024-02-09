import { Text, Button, Flex } from "@chakra-ui/react";

export const AccountActions = () => {
  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      w={["100%", "50%"]}
      mt="5rem"
    >
      <Text fontSize="xl" mb="1rem">
        Fund your wallet from
      </Text>
      <Flex direction="column" gap="1rem">
        <Button size="lg" height="48px" width="300px" border="2px">
          BASE
        </Button>
        <Button size="lg" height="48px" width="300px" border="2px">
          CC
        </Button>
      </Flex>

      <Text fontSize="xl" mb="1rem" mt="3rem">
        Manage wallet
      </Text>
      <Flex direction="column" gap="1rem">
        <Button size="lg" height="48px" width="300px" border="2px">
          Unlink Email Account
        </Button>
        <Button size="lg" height="48px" width="300px" border="2px">
          Add a Password
        </Button>
        <Button size="lg" height="48px" width="300px" border="2px">
          Export Wallet
        </Button>
        <Button size="lg" height="48px" width="300px" border="2px">
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
};

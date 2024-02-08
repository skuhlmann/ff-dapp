import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { Wallets } from "../components/Wallets";

function Account() {
  const { ready, authenticated, user } = usePrivy();

  if (!ready) {
    return null;
  }

  return (
    <>
      <Heading>Account</Heading>

      {ready && authenticated && (
        <textarea
          readOnly
          value={JSON.stringify(user, null, 2)}
          style={{ width: "600px", height: "250px", borderRadius: "6px" }}
        />
      )}

      <Wallets />

      <Text>Actions</Text>
      <Box border="1px solid white">
        <UnorderedList>
          <ListItem>Fund your wallet...</ListItem>
          <ListItem>Export wallet...</ListItem>
          <ListItem>Update settings...</ListItem>
          <ListItem>Unlink email...</ListItem>
          <ListItem>Add a password...</ListItem>
        </UnorderedList>
      </Box>
    </>
  );
}

export default Account;

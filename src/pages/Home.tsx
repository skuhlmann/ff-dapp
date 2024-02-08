import { Flex, Heading } from "@chakra-ui/react";
import { Mint } from "../components/Mint";
import { usePrivy } from "@privy-io/react-auth";
import { AccountNfts } from "../components/AccountNfts";

function Home() {
  const { ready, authenticated, user } = usePrivy();

  return (
    <>
      <Heading>PEACH TYCOON</Heading>
      {ready && authenticated && user?.wallet && (
        <Flex direction="column" gap="4rem" mt="5rem">
          <Mint />
          <AccountNfts address={user?.wallet.address} />
        </Flex>
      )}
    </>
  );
}

export default Home;

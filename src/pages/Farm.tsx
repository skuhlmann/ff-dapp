import { usePrivy } from "@privy-io/react-auth";
import { Button, Flex, Text } from "@chakra-ui/react";

import { LogIn } from "../components/LogIn";
import { TreeList } from "../components/TreeList";
import { Link } from "react-router-dom";

function Farm() {
  const { ready, authenticated, user } = usePrivy();

  return (
    <>
      <Text mb="3rem">My trees</Text>
      {/* <Box borderBottom="1px dotted white" width="100%" /> */}
      <Flex w="100%" gap="1rem" direction="column" align="center" mb="3rem">
        {!ready && null}

        {ready && !authenticated && <LogIn />}

        {ready && authenticated && user?.wallet?.address && (
          <TreeList address={user.wallet.address} />
        )}
      </Flex>

      <Flex w="100%" justify="flex-end">
        <Button
          as={Link}
          to="/buy-trees"
          variant="outline"
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.green"
          borderRadius="200px;"
          color="brand.orange"
          size="lg"
          height="60px"
          width="220px"
          my="1rem"
          _hover={{ bg: "transparent", color: "brand.white" }}
        >
          BUY TREES
        </Button>
      </Flex>
    </>
  );
}

export default Farm;

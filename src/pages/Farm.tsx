import { usePrivy } from "@privy-io/react-auth";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";

import { LogIn } from "../components/LogIn";
import { TreeList } from "../components/TreeList";
import { Link } from "react-router-dom";
import { BoostContent } from "../components/BoostContent";
import { PeachList } from "../components/PeachList";

function Farm() {
  const { ready, authenticated, user } = usePrivy();

  return (
    <>
      <Flex
        w="full"
        border="none"
        direction="row"
        alignItems="center"
        justifyContent="start"
        mt={10}
        mb={20}
      >
        <Divider
          mt={4}
          mr={4}
          width="10vw"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
        <Text
          fontFamily="auster"
          color="brand.white"
          fontSize="20px"
          fontWeight="bold"
        >
          My peaches
        </Text>
        <Divider
          mt={4}
          ml={4}
          flex="1"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
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

        {ready && authenticated && user?.wallet?.address && (
          <PeachList account={user.wallet.address} />
        )}
      </Flex>
      <Flex
        w="full"
        border="none"
        direction="row"
        alignItems="center"
        justifyContent="start"
        mt={10}
        mb={20}
      >
        <Divider
          mt={4}
          mr={4}
          width="10vw"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
        <Text
          fontFamily="auster"
          color="brand.white"
          fontSize="20px"
          fontWeight="bold"
        >
          My trees
        </Text>
        <Divider
          mt={4}
          ml={4}
          flex="1"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
      </Flex>
      <Flex
        w="100%"
        gap="1rem"
        direction="column"
        align="center"
        justify="center"
        mb="3rem"
      >
        {ready && authenticated && user?.wallet?.address && (
          <TreeList account={user.wallet.address} />
        )}
      </Flex>
      <Divider
        flex="1"
        borderTop="dotted 1px"
        borderColor={"brand.white"}
        borderBottom="none"
        background="none"
      />

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w="full"
        my="3rem"
      >
        <BoostContent />
      </Flex>

      <Divider
        ml={4}
        flex="1"
        borderTop="dotted 1px"
        borderColor={"brand.white"}
        borderBottom="none"
        background="none"
      />

      <Flex w="100%" pt={8} pb={20} px={20} justify="flex-end">
        <Button
          as={Link}
          to="/market"
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
          BUY PEACHES
        </Button>
      </Flex>
    </>
  );
}

export default Farm;

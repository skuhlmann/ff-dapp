import { Button } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";

export const LogIn = () => {
  const { ready, authenticated, login } = usePrivy();

  if (!ready) {
    return null;
  }

  return (
    <>
      {ready && !authenticated && (
        <Button
          onClick={login}
          variant="outline"
          colorScheme="orange"
          fontFamily="heading"
          fontSize="2xl"
          fontStyle="italic"
          fontWeight="900"
          border="2px"
          borderColor="orange.500"
          size="lg"
          height="64px"
          width="300px"
          my="3rem"
          _hover={{ bg: "transparent", color: "orange.300" }}
        >
          Log in/Sign Up
        </Button>
      )}
    </>
  );
};

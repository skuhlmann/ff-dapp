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
        >
          Buy Now
        </Button>
      )}
    </>
  );
};

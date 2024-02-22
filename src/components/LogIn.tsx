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
          fontFamily="heading"
          fontSize="2xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.orange"
          borderRadius="200px;"
          color="brand.red"
          size="lg"
          height="72px"
          width="398px"
          my="3rem"
          _hover={{ bg: "transparent", color: "brand.white" }}
        >
          Log in
        </Button>
      )}
    </>
  );
};

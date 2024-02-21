import { Button } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";

export const Connect = () => {
  const { ready, authenticated, login, logout } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <>
      {ready && authenticated ? (
        <div>
          <Button
            size="sm"
            onClick={logout}
            variant="outline"
            border="1px"
            borderColor="brand.orange"
            borderRadius="200px;"
            color="brand.red"
            _hover={{ bg: "transparent", color: "brand.white" }}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <Button
          onClick={login}
          size="sm"
          variant="outline"
          border="1px"
          borderColor="brand.orange"
          borderRadius="200px;"
          color="brand.red"
          _hover={{ bg: "transparent", color: "brand.white" }}
        >
          Log In
        </Button>
      )}
    </>
  );
};

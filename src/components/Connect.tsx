import { Button } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";

export const Connect = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <>
      {ready && authenticated ? (
        <div>
          <Button size="sm" onClick={logout}>
            Log Out
          </Button>
        </div>
      ) : (
        <Button onClick={login} size="sm">
          Log In
        </Button>
      )}
    </>
  );
};

import { Button, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { truncateAddress } from "../utils/formatting";

export const Connect = () => {
  const { ready, authenticated, login, user } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <>
      {ready && authenticated ? (
        <div>
          <Button
            as={Link}
            to="/account"
            size="sm"
            variant="outline"
            border="1px"
            borderColor="brand.orange"
            borderRadius="200px;"
            color="brand.red"
            _hover={{ bg: "transparent", color: "brand.white" }}
          >
            <RiAccountPinCircleLine color="white" />
            {user?.wallet?.address && (
              <Text ml=".24rem" fontSize="xs">
                {truncateAddress(user?.wallet.address)}
              </Text>
            )}
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

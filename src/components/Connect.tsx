import { Box, Button, Image, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { truncateAddress } from "../utils/formatting";
import User from "../assets/user.png";

export const Connect = () => {
  const { ready, authenticated, login, user } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <Box w="156px" mt="12px" h="48px" position="relative">
    {ready && authenticated ? (
          <Button
            as={Link}
            to="/account"
            size="md"
            variant="outline"
            fontFamily="Helsinki"
            border="2px"
            borderColor="brand.orange"
            borderRadius="200px;"
            color="brand.red"
            _hover={{transform:"translate(0px, -7px)", color: "brand.white" }}
            position="absolute"
            bg="brand.black"
            zIndex="2"
            transform="translate(0px, -8px)"
            px="20px"
          >
              <Image
                  width="18px"
                  src={User}
                />
            {user?.wallet?.address && (
              <Text ml=".24rem" fontSize="14px">
                {truncateAddress(user?.wallet.address)}
              </Text>
            )}
          </Button>
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
    <Box w="full" height="40px" position="absolute" border="2px" borderColor="brand.orange" borderRadius="200px;"></Box>
    </Box>
  );
};

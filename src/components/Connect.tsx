import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useSwitchChain } from "wagmi";
import { Link } from "react-router-dom";
import { truncateAddress } from "../utils/formatting";
import { CHAIN_OBJ } from "../utils/constants";
import GrapeAvatar from "../assets/grape_logo.png";

export const Connect = () => {
  const { ready, authenticated, login, user } = usePrivy();
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleSwitch = () => {
    switchChain({ chainId: CHAIN_OBJ.id });
  };

  if (!ready) {
    return null;
  }

  return (
    <>
      {ready && authenticated ? (
        <>
          {!chain && (
            <Button
              variant="solid"
              fontFamily="Rockwell"
              borderRadius=".125rem"
              color="brand.blue"
              _hover={{
                transform: "translate(0px, 2px)",
              }}
              bg="brand.purple"
              size="md"
              px="2rem"
              pt=".5rem"
              onClick={handleSwitch}
            >
              Switch To {CHAIN_OBJ.name}
            </Button>
          )}
          <Button
            as={Link}
            to="/account"
            variant="solid"
            fontFamily="Rockwell"
            borderRadius=".125rem"
            color="brand.blue"
            _hover={{
              transform: "translate(0px, 2px)",
            }}
            bg="brand.purple"
            size={{ base: "sm", sm: "md" }}
          >
            <Flex align="end">
              <Image width="24px" src={GrapeAvatar} />
              {user?.wallet?.address && (
                <Text
                  ml=".24rem"
                  fontSize="14px"
                  display={{ base: "none", sm: "block" }}
                >
                  {truncateAddress(user?.wallet.address)}
                </Text>
              )}
            </Flex>
          </Button>
        </>
      ) : (
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
          size="md"
          px="2rem"
          pt=".5rem"
        >
          Log In
        </Button>
      )}
    </>
  );
};

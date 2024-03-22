import { ReactNode, useMemo } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBalance } from "wagmi";

export const BalanceCheck = ({
  address,
  targetBalance,
  message,
  children,
}: {
  address: string;
  message?: string;
  targetBalance: bigint;
  children: ReactNode;
}) => {
  const result = useBalance({
    address: address as `0x${string}`,
  });

  const hasBalance = useMemo(() => {
    if (!result || !result.data) return false;

    return result.data.value > targetBalance;
  }, [targetBalance, result]);

  if (!hasBalance) {
    return (
      <Box w="full" h="72px" mt="2rem" position="relative">
        {message && <Text>{message}</Text>}
        <Button
          as={Link}
          to="/account"
          variant="outline"
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="2px"
          borderColor="brand.green"
          borderRadius="200px;"
          color="brand.orange"
          size="lg"
          height="60px"
          width="full"
          _hover={{ transform: "translate(0px, -10px)", color: "brand.white" }}
          _focus={{ transform: "translate(0px, 0px)", bg: "#1f1f1f" }}
          position="absolute"
          bg="#1f1f1f"
          zIndex="2"
          transform="translate(0px, -12px)"
        >
          Fund Your Account
        </Button>
        <Box
          w="full"
          height="60px"
          position="absolute"
          border="2px"
          borderColor="brand.green"
          borderRadius="200px;"
        ></Box>
      </Box>
    );
  }

  return children;
};

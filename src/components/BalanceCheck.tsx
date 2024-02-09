import { ReactNode, useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
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
      <>
        {message && <Text>{message}</Text>}
        <Button
          as={Link}
          to="/account"
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
          my="0.5rem"
          _hover={{ bg: "transparent", color: "orange.300" }}
        >
          Add Funds
        </Button>
      </>
    );
  }

  return children;
};

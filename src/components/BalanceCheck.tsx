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
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.green"
          borderRadius="200px;"
          color="brand.orange"
          size="lg"
          height="60px"
          width="220px"
          my="0.5rem"
          _hover={{ bg: "transparent", color: "orange.300" }}
        >
          Add Funds To Mint
        </Button>
      </>
    );
  }

  return children;
};

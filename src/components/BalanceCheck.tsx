import { ReactNode, useMemo } from "react";
import { useBalance } from "wagmi";

export const BalanceCheck = ({
  address,
  targetBalance,
  children,
}: {
  address: string;
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
    return <p>fund wallet</p>;
  }

  return children;
};

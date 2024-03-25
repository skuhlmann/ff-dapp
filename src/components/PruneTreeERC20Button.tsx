import { Button } from "@chakra-ui/react";
import { useReadContract } from "wagmi";
import {
  PRUNE_ERC20,
  TARGET_NETWORK,
  PRUNE_PRICE_ERC20,
  PRUNE_CONTRACT_ADDRESS,
} from "../utils/constants";

import erc20Abi from "../abis/ERC20.json";
import { ApproveERC20 } from "./ApproveERC20Button";

const buttonText = (hasBalance: boolean, hasAllowance: boolean) => {
  if (!hasBalance) {
    return "NEED MORE $DEGEN";
  }

  if (!hasAllowance) {
    return "APPROVE $DEGEN";
  }

  return "PURCHASE WITH $DEGEN";
};

export const PruneTreeERC20Button = ({
  address,
  isDisabled,
  handlePruneERC20,
}: {
  address?: string;
  isDisabled: boolean;
  handlePruneERC20: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { data: balance } = useReadContract({
    address: PRUNE_ERC20[TARGET_NETWORK] as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  }) as { data: bigint };

  const { data: allowance, refetch } = useReadContract({
    address: PRUNE_ERC20[TARGET_NETWORK] as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK]],
  });

  const hasBalance = PRUNE_PRICE_ERC20[TARGET_NETWORK] < balance;
  const hasAllowance =
    PRUNE_PRICE_ERC20[TARGET_NETWORK] <= (allowance as bigint);

  console.log("allowance", allowance);

  if (!address) return null;

  if (!hasAllowance) {
    return <ApproveERC20 refetch={refetch} />;
  }

  return (
    <Button
      variant="outline"
      fontFamily="heading"
      fontSize="xl"
      fontStyle="italic"
      fontWeight="700"
      border="1px"
      borderColor="brand.green"
      borderRadius="200px"
      color="brand.orange"
      size="lg"
      height="60px"
      width="260px"
      isDisabled={isDisabled || !hasBalance || !hasAllowance}
      _hover={{
        bg: "transparent",
        color: "brand.orange",
      }}
      onClick={handlePruneERC20}
    >
      {buttonText(hasBalance, hasAllowance)}
    </Button>
  );
};

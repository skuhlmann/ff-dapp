import { Button, Spinner, Text } from "@chakra-ui/react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import {
  PRUNE_ERC20,
  TARGET_NETWORK,
  PRUNE_CONTRACT_ADDRESS,
} from "../utils/constants";

import erc20Abi from "../abis/ERC20.json";
import { useEffect } from "react";
import { maxUint104 } from "viem";

export const ApproveERC20 = ({ refetch }: { refetch: () => void }) => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleApprove = async () => {
    writeContract({
      address: PRUNE_ERC20[TARGET_NETWORK] as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK], maxUint104],
    });
  };

  useEffect(() => {
    refetch();
  }, [isConfirmed, refetch]);

  return (
    <>
      {isConfirming && (
        <Spinner size="xl" color="brand.green" thickness="8px" />
      )}

      {error && (
        <Text fontSize="sm">
          Error: {(error as BaseError).shortMessage || error.message}
        </Text>
      )}

      {!hash && (
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
          isDisabled={isPending || isConfirming}
          _hover={{
            bg: "transparent",
            color: "brand.orange",
          }}
          onClick={handleApprove}
        >
          APPROVE $DEGEN
        </Button>
      )}
    </>
  );
};

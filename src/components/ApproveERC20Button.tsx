import { Button, Spinner, Text } from "@chakra-ui/react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import { ERC20_PAYMENT_TOKEN, TARGET_NETWORK } from "../utils/constants";

import erc20Abi from "../abis/ERC20.json";
import { useEffect } from "react";
import { maxUint104 } from "viem";

export const ApproveERC20 = ({
  refetch,
  spender,
}: {
  refetch: () => void;
  spender: string;
}) => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleApprove = async () => {
    writeContract({
      address: ERC20_PAYMENT_TOKEN[TARGET_NETWORK] as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, maxUint104],
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

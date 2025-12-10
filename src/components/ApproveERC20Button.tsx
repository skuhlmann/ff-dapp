import { Button, Spinner, Text } from "@chakra-ui/react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import { ERC20_PAYMENT_TOKEN, TARGET_NETWORK } from "../utils/constants";

import erc20Abi from "../abis/ERC20.json";
import { useEffect } from "react";
// import { maxUint104 } from "viem";

export const ApproveERC20 = ({
  refetch,
  spender,
  amount,
}: {
  refetch: () => void;
  spender: string;
  amount: bigint;
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
      args: [spender, amount],
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
          fontWeight="700"
          my="1rem"
          variant="solid"
          borderRadius=".125rem"
          _hover={{
            transform: "translate(0px, 2px)",
          }}
          color="brand.orange"
          bg="brand.purple"
          size="lg"
          fontSize={{ base: "sm", sm: "2xl", md: "3xl" }}
          height="72px"
          w="full"
          px="3rem"
          pt=".75rem"
          isDisabled={isPending || isConfirming}
          onClick={handleApprove}
        >
          Purchase (Step 1)
        </Button>
      )}
    </>
  );
};

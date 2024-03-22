import styled from "styled-components";
import { useWaitForTransactionReceipt } from "wagmi";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const SuccessContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const PruneTx = ({
  txHash,
  setTxComplete,
}: {
  txHash: `0x${string}`;
  setTxComplete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isError, isLoading, data } = useWaitForTransactionReceipt({
    hash: txHash,
    confirmations: 5,
  });

  useEffect(() => {
    if (data) {
      console.log("success", data);
      setTxComplete(true);
    }
  }, [data, setTxComplete]);

  if (isLoading) return null;
  if (isError) return <div>Transaction error</div>;

  return (
    <SuccessContainer>
      <Heading size="xl">Pruning is Done!</Heading>
    </SuccessContainer>
  );
};

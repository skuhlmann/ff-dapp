import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { useWaitForTransaction } from "wagmi";
import { Box, Button } from "@chakra-ui/react";

const SuccessContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const MintTx = ({
  txHash,
  setTxComplete,
}: {
  txHash: `0x${string}`;
  setTxComplete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isError, isLoading } = useWaitForTransaction({
    hash: txHash,
    confirmations: 1,
    onSuccess(data) {
      console.log("Success", data);

      setTxComplete(true);
    },
  });

  if (isLoading) return null;
  if (isError) return <div>Transaction error</div>;
  return (
    <SuccessContainer>
      <RouterLink to="/farm">
        <Button
          variant="outline"
          fontFamily="Helsinki"
          fontSize="2xl"
          border="1px"
          borderColor="brand.green"
          borderRadius="200px;"
          color="brand.orange"
          size="lg"
          height="72px"
        >
          Checkout Your New Tree
        </Button>
      </RouterLink>
    </SuccessContainer>
  );
};

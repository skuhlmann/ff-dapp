import { Flex, Text } from "@chakra-ui/react";
import { UnboxButton } from "./UnboxButton";
import { usePeachStatus } from "../hooks/usePeachStatus";
// import { ListPeachButton } from "./ListPeachButtton";
import { UnListPeachButton } from "./UnListPeachButtton";
// import { RedeemPeachButton } from "./RedeemPeachButton";
// import { OrderPeachButton } from "./OrderPeachButton";

export const PeachActions = ({
  tokenId,
  tokenImage,
  account,
  tokenState,
}: {
  tokenId: string;
  tokenImage?: string;
  account: string;
  tokenState: number;
}) => {
  const { orders } = usePeachStatus({
    tokenId,
  });

  const isListed = orders && orders.length > 0;

  return (
    <Flex direction="column" align="center">
      {/* {!isListed && tokenState != 2 && <ListPeachButton tokenId={tokenId} />} */}

      {isListed && (
        <UnListPeachButton tokenId={tokenId} orderId={orders[0].id} />
      )}

      {tokenState === 0 && (
        <>
          <UnboxButton
            tokenId={tokenId}
            tokenImage={tokenImage}
            account={account}
          />
          <Text fontSize="xs" color="brand.orange" opacity="100%" mt="-0.5rem">
            Reveal your PΞACH
          </Text>
        </>
      )}

      {/* {tokenState === 1 && (
        <>
          <RedeemPeachButton
            tokenId={tokenId}
            tokenImage={tokenImage}
            account={account}
          />
        </>
      )} */}

      {/* {tokenState === 2 && (
        <>
          <OrderPeachButton tokenId={tokenId} account={account} />
        </>
      )} */}
    </Flex>
  );
};

import { Flex, Text } from "@chakra-ui/react";
// import { useTokenStatus } from "../hooks/useTokenStatus";
// import { ListPeachButton } from "./ListPeachButtton";
// import { UnListPeachButton } from "./UnListPeachButtton";
// import { RedeemPeachButton } from "./RedeemPeachButton";
// import { OrderPeachButton } from "./OrderPeachButton";

export const TokenActions = ({
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
  console.log(tokenId, tokenImage, account);
  // const { orders } = useTokenStatus({
  //   tokenId,
  // });

  // const isListed = orders && orders.length > 0;

  return (
    <Flex direction="column" align="center">
      {/* {!isListed && tokenState != 2 && <ListPeachButton tokenId={tokenId} />} */}

      {/* {isListed && (
        <UnListPeachButton tokenId={tokenId} orderId={orders[0].id} />
      )} */}

      {tokenState === 0 && (
        <>
          {/* <RedeemPeachButton
            tokenId={tokenId}
            tokenImage={tokenImage}
            account={account}
          /> */}
          <Text
            fontSize="xs"
            color="brand.orange"
            opacity="100%"
            mt="-0.5rem"
            fontWeight="700"
            textAlign="center"
          >
            Redemption and resell will open after the presale closes.
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

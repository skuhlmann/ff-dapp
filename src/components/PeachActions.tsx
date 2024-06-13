import { Flex, Button, Text } from "@chakra-ui/react";
import { UnboxButton } from "./UnboxButton";
import { usePeachStatus } from "../hooks/usePeachStatus";
import { ListPeachButton } from "./ListPeachButtton";
import { UnListPeachButton } from "./UnListPeachButtton";

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
      {!isListed && <ListPeachButton tokenId={tokenId} />}

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

      {tokenState === 1 && (
        <>
          <Button
            variant="outline"
            fontFamily="heading"
            fontSize="xl"
            fontStyle="italic"
            fontWeight="700"
            border="1px"
            borderColor="brand.blue"
            borderRadius="200px;"
            color="brand.blue"
            size="lg"
            height="60px"
            width="220px"
            my=".5rem"
            disabled={true}
            opacity="30%"
            _hover={{
              bg: "transparent",
              color: "brand.blue",
              cursor: "not-allowed",
            }}
          >
            REDEEM
          </Button>
          <Text fontSize="xs" color="brand.blue" opacity="40%" mt="-0.5rem">
            (Redemption Coming Soon)
          </Text>
        </>
      )}
    </Flex>
  );
};

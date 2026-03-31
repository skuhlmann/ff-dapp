import { useState } from "react";
import { Flex, Spinner, Text, Button, useDisclosure } from "@chakra-ui/react";
import { RedeemPeachButton } from "./RedeemPeachButton";
import { OrderWineModal } from "./OrderWineModal";
import { OrderStatusDisplay } from "./OrderStatusDisplay";
import { useOrderStatus } from "../hooks/useOrderStatus";
import type { WineOrderRecord } from "../utils/types";

export const TokenActions = ({
  tokenId,
  tokenImage,
  account,
  tokenState,
  isRedemptionOpen,
}: {
  tokenId: string;
  tokenImage?: string;
  account: string;
  tokenState: number;
  isRedemptionOpen: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { order, isLoading: orderLoading, refetch } = useOrderStatus({ tokenId });

  // After a successful order placement the modal calls onSuccess, which gives
  // us the record immediately so we don't need to wait for a refetch.
  const [localOrder, setLocalOrder] = useState<WineOrderRecord | null>(null);

  const resolvedOrder = localOrder ?? order;

  const handleOrderSuccess = (record: WineOrderRecord) => {
    setLocalOrder(record);
    onClose();
  };

  const handleRetry = () => {
    setLocalOrder(null);
    refetch();
    onOpen();
  };

  // ── tokenState 0 = Unredeemed ─────────────────────────────────────────────
  if (tokenState === 0) {
    if (!isRedemptionOpen) {
      return (
        <Flex direction="column" align="center">
          <Text
            fontSize="xs"
            color="brand.orange"
            fontWeight="700"
            textAlign="center"
            mt="-0.5rem"
          >
            Redemption window is not open yet.
          </Text>
        </Flex>
      );
    }

    return (
      <Flex direction="column" align="center">
        <RedeemPeachButton
          tokenId={tokenId}
          tokenImage={tokenImage}
          account={account}
        />
      </Flex>
    );
  }

  // ── tokenState 1 = Redeemed ───────────────────────────────────────────────
  if (tokenState === 1) {
    if (orderLoading) {
      return (
        <Flex direction="column" align="center" py="1rem">
          <Spinner size="sm" color="brand.orange" />
        </Flex>
      );
    }

    if (!resolvedOrder) {
      return (
        <Flex direction="column" align="center">
          <Button
            bg="brand.orange"
            color="white"
            fontWeight="700"
            borderRadius="8px"
            _hover={{ opacity: 0.9 }}
            onClick={onOpen}
          >
            Order Your Bottle
          </Button>

          <OrderWineModal
            tokenId={tokenId}
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={handleOrderSuccess}
          />
        </Flex>
      );
    }

    return (
      <Flex direction="column" align="center" w="100%">
        <OrderStatusDisplay order={resolvedOrder} onRetry={handleRetry} />

        <OrderWineModal
          tokenId={tokenId}
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={handleOrderSuccess}
        />
      </Flex>
    );
  }

  return null;
};

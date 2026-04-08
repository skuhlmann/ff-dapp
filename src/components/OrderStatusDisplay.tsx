"use client";

import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import type { WineOrderRecord } from "../utils/types";

const TELEGRAM_URL = "https://t.me/PeachDropNFT";
const SUPPORT_EMAIL = "mailto:Peachdropnft@gmail.com";

interface OrderStatusDisplayProps {
  order: WineOrderRecord;
  onRetry: () => void;
}

export const OrderStatusDisplay = ({
  order,
  onRetry,
}: OrderStatusDisplayProps) => {
  const hasComplianceViolation = order.orderProblems.some(
    (p) => p.type === "COMPLIANCE_VIOLATION",
  );

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // SUCCESS or PENDING with no compliance issues — show order info.
  if (
    order.orderStatus === "SUCCESS" ||
    (order.orderStatus === "PENDING" && !hasComplianceViolation)
  ) {
    return (
      <Box textAlign="center">
        <Text fontSize="xs" fontWeight="700" color="brand.orange" mb="0.25rem">
          {order.orderStatus === "SUCCESS" ? "Order Placed" : "Order Pending"}
        </Text>
        <Text fontSize="xs" color="whiteAlpha.800">
          Order #{order.orderNumber}
        </Text>
        {formattedDate && (
          <Text fontSize="xs" color="whiteAlpha.600">
            {formattedDate}
          </Text>
        )}
      </Box>
    );
  }

  // PENDING / CANCELLED / FAILED with a COMPLIANCE_VIOLATION — cannot ship to state.
  if (hasComplianceViolation) {
    const problem = order.orderProblems.find(
      (p) => p.type === "COMPLIANCE_VIOLATION",
    );
    return (
      <Box textAlign="center">
        <Text fontSize="xs" fontWeight="700" color="red.300" mb="0.5rem">
          Cannot ship to your state
        </Text>
        {problem && (
          <Text fontSize="xs" color="whiteAlpha.700" mb="0.75rem">
            {problem.description}
          </Text>
        )}
        <Text fontSize="xs" color="whiteAlpha.600" mb="0.75rem">
          Try ordering to a different address.
        </Text>
        <Button
          size="sm"
          bg="brand.orange"
          color="white"
          fontWeight="700"
          borderRadius="8px"
          _hover={{ opacity: 0.9 }}
          onClick={onRetry}
        >
          Try a Different Address
        </Button>
      </Box>
    );
  }

  // CANCELLED or FAILED — show problem details + contact links.
  return (
    <Box textAlign="center">
      <Text fontSize="xs" fontWeight="700" color="red.300" mb="0.5rem">
        {order.orderStatus === "CANCELLED" ? "Order Cancelled" : "Order Failed"}
      </Text>

      {order.orderProblems.length > 0 && (
        <Flex direction="column" gap="0.25rem" mb="0.75rem">
          {order.orderProblems.map((p, i) => (
            <Text key={i} fontSize="xs" color="whiteAlpha.700">
              {p.description}
            </Text>
          ))}
        </Flex>
      )}

      <Button
        size="sm"
        bg="brand.orange"
        color="white"
        fontWeight="700"
        borderRadius="8px"
        _hover={{ opacity: 0.9 }}
        onClick={onRetry}
        mb="0.75rem"
      >
        Try Again
      </Button>

      <Flex justify="center" gap="1rem">
        <Link
          href={TELEGRAM_URL}
          isExternal
          fontSize="xs"
          color="brand.orange"
          fontWeight="700"
        >
          Telegram
        </Link>
        <Link
          href={SUPPORT_EMAIL}
          fontSize="xs"
          color="brand.orange"
          fontWeight="700"
        >
          Email Us
        </Link>
      </Flex>
    </Box>
  );
};

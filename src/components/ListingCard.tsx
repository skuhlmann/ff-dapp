import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import type { Item } from "@rarible/api-client";

import { truncateAddress } from "../utils/formatting";

import { useTokenStatus } from "../hooks/useTokenStatus";
// import { TokenActions } from "./TokenActions";

// import peachAvatar from "../assets/peach-avatar-trans.png";
// import { BuyPeachButton } from "./BuyPeachButtton";
// import { CastLink } from "./CastLink";

export const ListingCard = ({
  peach,
  tokenId,
}: {
  peach: Item;
  tokenId: string;
}) => {
  // const { peachStatus, img, orders } = useTokenStatus({
  const { peachStatus, img } = useTokenStatus({
    tokenId,
  });

  // const isListed = orders && orders.length > 0;

  return (
    <Flex direction="column" align="center" gap="1rem">
      <Box
        w={{ base: "320px" }}
        bg="brand.gray"
        borderRadius="20px"
        p="26px 29px 26px 29px"
      >
        <Flex direction="column" align="center">
          <Flex w="100%" justify="flex-start" mb="1rem">
            {peach.contract && (
              <RouterLink to={`/market/${tokenId}`} color="brand.orange">
                <Text fontSize="xs" color="brand.orange">
                  {`${truncateAddress(
                    peach.contract?.split(":")[1]
                  )}/${tokenId}`}
                </Text>
              </RouterLink>
            )}
          </Flex>
          <Image mb=".5rem" src={img} />
          <Text fontSize="xs">{peach.meta?.name}</Text>
          <Text fontSize="sm" my="1rem" fontWeight="700">
            {peachStatus}
          </Text>

          {/* {isListed && (
            <>
              <Text fontSize="xs">Price</Text>
              <Heading
                size="lg"
                textAlign="center"
                color="brand.green"
                mb="1rem"
              >
                {`${orders[0].take.value} ${getPriceText(
                  orders[0].take.type["@type"]
                )}`}
              </Heading>
              {orders[0].makePriceUsd && (
                <Text color="brand.green" mt="-1rem" fontSize="xs">{`${Number(
                  orders[0].makePriceUsd
                ).toFixed(2)} USD`}</Text>
              )}

              {peachStatus !== "redeemed" && (
                <>
                  <Flex align="end" gap=".5rem">
                    <Heading size="sm" color="brand.orange">
                      Redeemable for 1 box of
                    </Heading>
                    <Image src={peachAvatar} w="32px" />
                  </Flex>
                  <Text fontSize="xs" lineHeight="1" mt="0.5rem" width="220px">
                    <i>
                      * Fresh peach shipping limited to continental US. Freeze
                      dried peaches or equivalent outside of US{" "}
                    </i>
                  </Text>

                  <Box my="1rem">
                    <BuyPeachButton
                      tokenId={tokenId}
                      orderId={orders[0].id}
                      price={`${orders[0].take.value} ${getPriceText(
                        orders[0].take.type["@type"]
                      )}`}
                    />
                  </Box>

                  <CastLink tokenId={tokenId} />
                </>
              )}
            </>
          )} */}

          {/* {tokenState !== undefined && (
            <TokenActions
              tokenId={peach.tokenID}
              tokenImage={img}
              account={account}
              tokenState={tokenState}
            />
          )} */}
        </Flex>
      </Box>
    </Flex>
  );
};

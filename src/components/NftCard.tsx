"use client";

import { useState } from "react";
// import NextLink from "next/link";
import { Box, Flex, Image, Link, Text, Collapse } from "@chakra-ui/react";
import { NftItem } from "../utils/types";
import {
  blockExplorerNftLink,
  // getPriceText,
  truncateAddress,
} from "../utils/formatting";

import { useTokenStatus } from "../hooks/useTokenStatus";
import { TokenActions } from "./TokenActions";
// import { CastLink } from "./CastLink";

export const NftCard = ({
  token,
  account,
}: {
  token: NftItem;
  account: string;
}) => {
  // const { tokenStatus, tokenState, img, orders } = useTokenStatus({
  const { tokenStatus, tokenState, img } = useTokenStatus({
    tokenId: token.tokenID,
  });
  const [detailsOpen, setDetailsOpen] = useState(false);
  console.log("token", token);

  const attributes = token.tokenMetadata?.attributes;
  const imageUrl = token.tokenMetadata?.image;

  // const isListed = orders && orders.length > 0;

  return (
    <Flex direction="column" align="center" gap="1rem">
      <Box
        w={{ base: "90%", sm: "560px" }}
        // maxW="480px"
        bg="brand.lightPurple"
        borderRadius="20px"
        p="26px 29px 26px 29px"
      >
        <Flex direction="column" align="center">
          <Flex w="100%" justify="flex-start" mb="1rem">
            <Link
              href={blockExplorerNftLink(token.tokenID)}
              isExternal
              fontSize="xs"
              color="brand.orange"
              fontWeight="700"
            >
              {`${truncateAddress(token.contractAddress)}/${token.tokenID}`}
            </Link>
          </Flex>
          <Image mb=".5rem" src={img} alt="nft" borderRadius="12px" w="100%" />
          <Text fontSize="sm" mt=".5rem">
            {token.tokenMetadata?.name}
          </Text>
          <Text fontSize="md" my="1rem" fontWeight="700">
            {tokenStatus}
          </Text>

          {/* Collectible Details collapsible section */}
          {(attributes?.length || imageUrl) && (
            <Box w="90%" mt="0.5rem" mb="3rem">
              <Flex
                w="100%"
                justify="space-between"
                align="center"
                cursor="pointer"
                onClick={() => setDetailsOpen(!detailsOpen)}
                borderTop="1px solid"
                borderColor="whiteAlpha.300"
                pt="0.75rem"
              >
                <Text fontSize="sm" fontWeight="600">
                  Collectible Details
                </Text>
                <Text fontSize="xs">{detailsOpen ? "▲" : "▼"}</Text>
              </Flex>
              <Collapse in={detailsOpen} animateOpacity>
                <Box pt="0.75rem" pb="0.25rem">
                  {attributes && attributes.length > 0 && (
                    <Flex direction="column" gap="0.4rem" mb="0.75rem">
                      {attributes.map((attr, i) => (
                        <Flex key={i} justify="space-between" fontSize="xs">
                          <Text
                            color="whiteAlpha.700"
                            textTransform="capitalize"
                          >
                            {attr.trait_type ??
                              attr.key ??
                              Object.keys(attr)[0]}
                          </Text>
                          <Text fontWeight="600">
                            {attr.value ?? Object.values(attr)[1]}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  )}
                  {imageUrl && (
                    <Link
                      href={imageUrl}
                      isExternal
                      download
                      fontSize="xs"
                      color="brand.orange"
                      fontWeight="700"
                      display="flex"
                      alignItems="center"
                      gap="0.35rem"
                    >
                      ↓ Download Artwork
                    </Link>
                  )}
                </Box>
              </Collapse>
            </Box>
          )}

          {tokenState !== undefined && (
            <TokenActions
              tokenId={token.tokenID}
              tokenImage={img}
              account={account}
              tokenState={tokenState}
            />
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

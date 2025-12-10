// import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
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

  console.log("img", img);

  // const isListed = orders && orders.length > 0;

  return (
    <Flex direction="column" align="center" gap="1rem">
      <Box
        w={{ base: "320px" }}
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
          <Image mb=".5rem" src={img} />
          <Text fontSize="xs">{token.tokenMetadata?.name}</Text>
          <Text fontSize="sm" my="1rem" fontWeight="700">
            {tokenStatus}
          </Text>
          {/* 
          {isListed && (
            <>
              <RouterLink to="/market">
                <Text
                  fontSize="xs"
                  textAlign="center"
                  color="brand.orange"
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  {`Listed for ${orders[0].take.value} ${getPriceText(
                    orders[0].take.type["@type"]
                  )}`}
                </Text>
              </RouterLink>
              <Box mb="1rem">
                <CastLink tokenId={token.tokenID} />
              </Box>
            </>
          )}

          {!isListed && (
            <RouterLink to="/market">
              <Text
                fontSize="xs"
                color="brand.orange"
                mb="1rem"
                _hover={{
                  textDecoration: "underline",
                }}
              >
                View Other Listings in the Peach Market
              </Text>
            </RouterLink>
          )} */}

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

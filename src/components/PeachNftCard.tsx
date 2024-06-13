import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { PeachNft } from "../utils/types";
import {
  blockExplorerPeachNftLink,
  truncateAddress,
} from "../utils/formatting";

import { usePeachStatus } from "../hooks/usePeachStatus";
import { PeachActions } from "./PeachActions";

export const PeachNftCard = ({
  peach,
  account,
}: {
  peach: PeachNft;
  account: string;
}) => {
  const { peachStatus, tokenState, img, orders } = usePeachStatus({
    tokenId: peach.tokenID,
  });

  const isListed = orders && orders.length > 0;

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
            <Link
              href={blockExplorerPeachNftLink(peach.tokenID)}
              isExternal
              fontSize="xs"
              color="brand.orange"
            >
              {`${truncateAddress(peach.contractAddress)}/${peach.tokenID}`}
            </Link>
          </Flex>
          <Image mb=".5rem" src={img} />
          <Text fontSize="xs">{peach.tokenMetadata?.name}</Text>
          <Text fontSize="sm" my="1rem" fontWeight="700">
            {peachStatus}
          </Text>

          {isListed && (
            <RouterLink to="/market">
              <Text
                fontSize="xs"
                textAlign="center"
                color="brand.orange"
                mb="1rem"
                _hover={{
                  textDecoration: "underline",
                }}
              >
                {`Listed for ${orders[0].take.value} ${orders[0].take.type["@type"]}`}
              </Text>
            </RouterLink>
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
                View Other Listings in the Farmer's Market
              </Text>
            </RouterLink>
          )}

          {tokenState !== undefined && (
            <PeachActions
              tokenId={peach.tokenID}
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

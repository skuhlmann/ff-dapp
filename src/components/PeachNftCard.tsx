import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { PeachNft } from "../utils/types";
import { blockExplorerNftLink, truncateAddress } from "../utils/formatting";

import { TreeActions } from "./TreeActions";
import { usePeachStatus } from "../hooks/usePeachStatus";
import { PeachActions } from "./PeachActions";

const dhImagePath = (path?: string) => {
  if (!path) return;
  return `https://daohaus.mypinata.cloud/ipfs/${path.split("/ipfs/")[1]}`;
};

export const PeachNftCard = ({
  peach,
  account,
}: {
  peach: PeachNft;
  account: string;
}) => {
  const { peachStatus, tokenState } = usePeachStatus({
    tokenId: peach.tokenID,
  });

  const isListed = true;
  const listPrice = "10000 $DEGEN";

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
              href={blockExplorerNftLink(peach.tokenID)}
              isExternal
              fontSize="xs"
              color="brand.orange"
            >
              {truncateAddress(peach.contractAddress)}
            </Link>
          </Flex>
          <Image mb=".5rem" src={dhImagePath(peach.tokenMetadata?.image)} />
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
                Listed for {listPrice}
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
                View Listings on Marketplace
              </Text>
            </RouterLink>
          )}

          {tokenState !== undefined && (
            <PeachActions
              tokenId={peach.tokenID}
              account={account}
              tokenState={tokenState}
            />
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { TreeNft } from "../utils/types";
import { truncateAddress } from "../utils/formatting";
import {
  BLOCK_EXPLORER_URL,
  NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import { TreeStats } from "./TreeStats";

import peachAvatar from "../assets/peach-avatar-trans.png";
import { TreeActions } from "./TreeActions";

const dhImagePath = (path?: string) => {
  if (!path) return;
  return `https://daohaus.mypinata.cloud/ipfs/${path.split("/ipfs/")[1]}`;
};

export const TreeCard = ({ tree }: { tree: TreeNft; account?: string }) => {
  return (
    <Flex direction="column" align="center" gap="1rem">
      <Box
        w={{ base: "320px" }}
        bg="brand.gray"
        borderRadius="20px"
        p="26px 14px 26px 29px"
      >
        <Flex direction="row" gap="1rem">
          <Flex direction="column" align="center">
            <Flex w="100%" justify="flex-start" mb="1rem">
              <Link
                href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}nft/${NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}/${tree.tokenID}`}
                isExternal
                fontSize="xs"
                color="brand.orange"
              >
                {truncateAddress(tree.contractAddress)}
              </Link>
            </Flex>
            <Image mb=".5rem" src={dhImagePath(tree.tokenMetadata?.image)} />
            <Text fontSize="xs">{tree.tokenMetadata?.name}</Text>
            <Text fontSize="sm" mb="1rem" fontWeight="700">
              {tree.tokenMetadata?.description}
            </Text>
            <TreeActions />
            <Box
              w="100%"
              textAlign="center"
              borderBottom="1px dotted black"
              paddingBottom="2rem"
            />

            <Flex w="100%" justify="space-between" align="center" mt="1.5rem">
              <Text fontSize="xs" color="brand.green">
                Current yield:
              </Text>
              <Flex align="center" gap=".5rem">
                <Heading size="md" color="brand.green">
                  2 X
                </Heading>
                <Image src={peachAvatar} w="32px" />
              </Flex>
            </Flex>
            {/* <BuyTreeButton /> */}
          </Flex>
          <Box w="40px">
            <TreeStats />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

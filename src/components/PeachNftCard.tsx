import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { PeachNft } from "../utils/types";
import { blockExplorerNftLink, truncateAddress } from "../utils/formatting";

import peachAvatar from "../assets/peach-avatar-trans.png";
import { TreeActions } from "./TreeActions";

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
  console.log("peach", peach);
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

          <TreeActions tokenId={peach.tokenID} account={account} />
          <Box
            w="100%"
            textAlign="center"
            borderBottom="1px dotted black"
            paddingBottom="2rem"
          />
        </Flex>
      </Box>
    </Flex>
  );
};

import { Box, Button, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { TreeNft } from "../utils/types";
import styled from "styled-components";
import { brandColors } from "../theme";

const NftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 2px solid ${brandColors.olive};
  border-radius: 8px;
  padding: 1rem 3rem;
`;

const ButtonRow = styled(Flex)`
  padding: 1rem;
  border-radius: 8px;
  background-color: #000000;
`;

export const TreeNftItem = ({ tree }: { tree?: TreeNft }) => {
  if (!tree) return null;
  return (
    <NftContainer>
      <Text fontSize="xl" as="b">
        PΞACH TRΞΞ #{tree.tokenID}
      </Text>
      <Text>{tree.tokenMetadata?.name}</Text>
      <Image src={tree.tokenMetadata?.image} width="100px" />
      <Tooltip label="Coming next season">
        <ButtonRow gap="0.25rem">
          <Button colorScheme="gray" size="xs" isDisabled={true}>
            Water
          </Button>
          <Button colorScheme="gray" size="xs" isDisabled={true}>
            Fertilize
          </Button>
          <Button colorScheme="gray" size="xs" isDisabled={true}>
            Prune
          </Button>
        </ButtonRow>
      </Tooltip>
    </NftContainer>
  );
};

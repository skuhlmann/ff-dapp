import { Flex, Text } from "@chakra-ui/react";
import { RiAccountPinCircleLine } from "react-icons/ri";
import styled from "styled-components";
import { useBalance } from "wagmi";
import { SiEthereum } from "react-icons/si";

import { truncateAddress } from "../utils/formatting";

const AvatarWrapper = styled(Flex)`
  font-size: 2rem;
`;

export const AccountAvatar = ({ address }: { address?: string }) => {
  const result = useBalance({
    address: address as `0x${string}`,
  });

  if (!address) return null;

  return (
    <Flex direction="column" alignItems="flex-start" w={["100%", "50%"]}>
      <AvatarWrapper alignItems="center" gap="1rem">
        <RiAccountPinCircleLine />
        <p>{truncateAddress(address)}</p>
      </AvatarWrapper>
      <Flex align="center">
        <SiEthereum />
        <Text fontSize="lg">{Number(result.data?.formatted).toFixed(3)}</Text>
      </Flex>
    </Flex>
  );
};

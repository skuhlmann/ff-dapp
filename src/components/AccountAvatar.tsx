import { Flex, Text, Box } from "@chakra-ui/react";
// import { mainnet } from "wagmi/chains";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { LuClipboardCopy } from "react-icons/lu";

import styled from "styled-components";
import { useBalance } from "wagmi";
import { SiEthereum } from "react-icons/si";

import { truncateAddress } from "../utils/formatting";

const AvatarWrapper = styled(Flex)`
  font-size: 2rem;
`;

export const AccountAvatar = ({
  address,
  email,
  handleCopy,
}: {
  address?: string;
  email?: string;
  handleCopy: () => void;
}) => {
  const result = useBalance({
    address: address as `0x${string}`,
  });

  if (!address) return null;

  return (
    <>
      <AvatarWrapper alignItems="center" gap="1rem" mb="1rem">
        <RiAccountPinCircleLine />
        {email ? (
          <Text fontSize="3xl">{email}</Text>
        ) : (
          <>
            <Text fontSize="3xl">{truncateAddress(address)}</Text>
            <Box _hover={{ cursor: "pointer" }}>
              <LuClipboardCopy
                style={{ fontSize: "18px" }}
                onClick={handleCopy}
              />
            </Box>
          </>
        )}
      </AvatarWrapper>
      <Flex align="center" fontSize="2xl" gap="1rem" mb="3rem">
        <SiEthereum />
        <Text>{Number(result.data?.formatted).toFixed(3)}</Text>
      </Flex>
    </>
  );
};

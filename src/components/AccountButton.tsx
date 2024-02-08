import { Flex, Text } from "@chakra-ui/react";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { SiEthereum } from "react-icons/si";
import { useBalance } from "wagmi";

export const AccountIcon = ({ address }: { address: string }) => {
  const result = useBalance({
    address: address as `0x${string}`,
  });

  return (
    <Flex>
      <RiAccountPinCircleLine />
      <SiEthereum />
      <Text fontSize="xs">{Number(result.data?.formatted).toFixed(3)}</Text>
    </Flex>
  );
};

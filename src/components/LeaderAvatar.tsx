import { Flex, Image, Text } from "@chakra-ui/react";
import { truncateAddress } from "../utils/formatting";
import { EnsData } from "../utils/types";
import User from "../assets/user.png";

export const LeaderAvatar = ({
  address,
  ens,
  rank,
}: {
  rank: number;
  address: string;
  ens: EnsData;
}) => {
  return (
    <Flex direction="row" align="center" gap="0.5rem">
      <Text fontSize={{ base: "16px", md: "35px" }}>{rank}.</Text>
      {ens.ensText && <Image width="25px" src={ens.ensText} />}
      {!ens.ensText && <Image width="25px" src={User} />}

      {ens.ensName && (
        <Text fontSize={{ base: "16px", md: "28px" }}>{ens.ensName}</Text>
      )}
      {!ens.ensName && (
        <Text fontSize={{ base: "16px", md: "30px" }}>
          {truncateAddress(address)}
        </Text>
      )}
    </Flex>
  );
};

import { Text } from "@chakra-ui/react";
import { useAccountNfts } from "../hooks/useAccountNfts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const holdingCount = (name: string, nfts?: any[]) => {
  if (!nfts) return 0;
  return nfts.filter((nft) => nft.tokenMetadata?.description === name).length;
};

export const AccountNftCount = ({
  account,
  name,
}: {
  account: string;
  name: string;
}) => {
  const { accountNfts } = useAccountNfts({ accountAddress: account });

  return (
    <Text color="brand.blue" fontSize="xs">
      You own {`${holdingCount(name, accountNfts?.balances)} ${name}`}
    </Text>
  );
};

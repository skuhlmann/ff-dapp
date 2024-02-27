import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { NFT_MINT_PRICE, NftTreeMeta } from "../utils/constants";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { BuyTreeButton } from "./BuyTreeButton";
import { fromWei } from "../utils/formatting";
import { LogIn } from "./LogIn";
import { BalanceCheck } from "./BalanceCheck";
import { TokenBalance } from "0xsequence/dist/declarations/src/indexer";

const holdingCount = (name: string, nfts?: TokenBalance[]) => {
  if (!nfts) return 0;
  return nfts.filter((nft) => nft.tokenMetadata?.description === name).length;
};

const AccountNftCount = ({
  account,
  name,
}: {
  account: string;
  name: string;
}) => {
  const { accountNfts } = useAccountNfts({ accountAddress: account });

  console.log("accountNfts", accountNfts);
  return (
    <Text color="brand.white" fontSize="xs">
      You own {`${holdingCount(name, accountNfts?.balances)} ${name}`}
    </Text>
  );
};

export const TreeMintCard = ({
  tree,
  account,
}: {
  tree: NftTreeMeta;
  account?: string;
}) => {
  return (
    <Flex direction="column" align="center" gap="1rem">
      <Flex
        direction="column"
        align="center"
        w={{ base: "320px" }}
        bg="brand.gray"
        borderRadius="20px"
        p="29px 36px"
      >
        <Image src={tree.img} />
        <Box
          w="100%"
          textAlign="center"
          borderBottom="1px dotted black"
          paddingBottom="2rem"
        >
          <p>{tree.name}</p>
          <Heading size="md" color="brand.blue">
            {`${fromWei(NFT_MINT_PRICE.toString())} BASE ETH`}
          </Heading>
        </Box>
        {account && (
          <BalanceCheck address={account} targetBalance={NFT_MINT_PRICE}>
            <BuyTreeButton trunkId={tree.value} account={account} />
          </BalanceCheck>
        )}
        {!account && (
          <>
            <Text>Login to Mint</Text>
            <LogIn />
          </>
        )}
      </Flex>
      {account && <AccountNftCount account={account} name={tree.name} />}
    </Flex>
  );
};

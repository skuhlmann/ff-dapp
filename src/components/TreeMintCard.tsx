import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import {
  NFT_MINT_PRICE,
  NftTreeMeta,
  TARGET_NETWORK,
} from "../utils/constants";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { fromWei } from "../utils/formatting";
import { LogIn } from "./LogIn";
// import { MintTreeButton } from "./MintTreeButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const holdingCount = (name: string, nfts?: any[]) => {
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
            {`${fromWei(NFT_MINT_PRICE[TARGET_NETWORK].toString())} BASE ETH`}
          </Heading>
        </Box>
        {account && (
          // <MintTreeButton
          //   trunkId={tree.value}
          //   name={tree.name}
          //   img={tree.img}
          // />

          <Button
            variant="outline"
            fontFamily="heading"
            fontSize="xl"
            fontStyle="italic"
            fontWeight="700"
            border="1px"
            borderColor="brand.green"
            borderRadius="200px;"
            color="brand.orange"
            size="lg"
            height="60px"
            width="220px"
            my="1rem"
            isDisabled={true}
            _hover={{
              bg: "transparent",
              color: "brand.orange",
            }}
          >
            MINT
          </Button>
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

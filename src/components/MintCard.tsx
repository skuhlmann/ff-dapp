import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import {
  NFT_MINT_PRICE,
  NftTreeMeta,
  TARGET_NETWORK,
} from "../utils/constants";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { fromWei } from "../utils/formatting";
import { LogIn } from "./LogIn";
import GrapeAvatar from "../assets/grape_logo.png";

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

export const MintCard = ({ account }: { account?: string }) => {
  return (
    <Flex direction="column" align="center" gap="1rem">
      <Flex
        direction="column"
        align="center"
        w={{ base: "320px" }}
        bg="brand.lightPurple"
        borderRadius="20px"
        p="29px 36px"
      >
        <Image src={GrapeAvatar} />
        <Box
          w="100%"
          textAlign="center"
          borderBottom="1px dotted black"
          paddingBottom="2rem"
        >
          <p>
            1 Skull Grape NFT redeemable for 1 Bottle of Forgotten Fruit Genesis
            Red
          </p>
          <Heading size="lg" color="brand.blue" mt="1rem">
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
            fontWeight="700"
            my="1rem"
            variant="solid"
            fontSize="3xl"
            borderRadius=".125rem"
            _hover={{
              transform: "translate(0px, 2px)",
            }}
            color="brand.red"
            bg="brand.black"
            size="lg"
            height="72px"
            w="full"
            px="3rem"
            pt=".75rem"
            isDisabled={true}
          >
            BUY
          </Button>
        )}
        {!account && (
          <>
            <Text>Login to Mint</Text>
            <LogIn />
          </>
        )}
      </Flex>
      {account && <AccountNftCount account={account} name={"Bottles"} />}
    </Flex>
  );
};

import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { NFT_MINT_PRICE, TARGET_NETWORK } from "../utils/constants";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { fromWei } from "../utils/formatting";
import { LogIn } from "./LogIn";
import GrapeAvatar from "../assets/grape_logo.png";
import { MintButton } from "./MintButton";

// logged in and has funds - go to mint
// logged in and no funds - funding prompt
// not logged in - signup flow

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
    <Text color="brand.blue" fontSize="xs">
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
          paddingBottom="1rem"
        >
          <p>
            Pruchase a ticket (NFT) redeemable for 1 Bottle of Forgotten Fruit
            Alpha Red
          </p>
          <Heading size="lg" color="brand.blue" mt="1rem">
            {`$${fromWei(NFT_MINT_PRICE[TARGET_NETWORK].toString())}`}
          </Heading>
        </Box>
        {account && <MintButton />}
        {!account && (
          <Box my="1rem" textAlign="center">
            <Text mb="1rem">Signup or Login to Purchase</Text>
            <LogIn />
          </Box>
        )}
      </Flex>
      {account && <AccountNftCount account={account} name={"Bottles"} />}
    </Flex>
  );
};

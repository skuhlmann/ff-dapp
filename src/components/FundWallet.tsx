import { Box, Button } from "@chakra-ui/react";
import { usePrivy, useFundWallet } from "@privy-io/react-auth";

import { useBalance } from "wagmi";

export const FundWallet = () => {
  const { ready, authenticated, user } = usePrivy();
  const { fundWallet } = useFundWallet();
  const { data, isFetched } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  // https://docs.privy.io/guide/react/wallets/usage/funding/prompting#callbacks
  // other wallet addresses for cb, farcaster, email?
  const handleFunding = async () => {
    if (user?.wallet?.address) {
      await fundWallet(user.wallet.address);
    } else {
      console.log("funding error no wallet", user);
    }
  };

  if (!ready || !authenticated) return null;

  return (
    <Box>
      {isFetched && data && (
        <div>
          <span>{`Balance: ${data.formatted} ${data.symbol}`}</span>
        </div>
      )}
      <Button
        onClick={handleFunding}
        variant="solid"
        fontFamily="Rockwell"
        borderRadius=".125rem"
        color="brand.blue"
        _hover={{
          transform: "translate(0px, 2px)",
        }}
        bg="brand.purple"
        size="lg"
        px="2rem"
        pt=".5rem"
        mt="1rem"
        mb="2rem"
      >
        Fund Wallet
      </Button>
    </Box>
  );
};

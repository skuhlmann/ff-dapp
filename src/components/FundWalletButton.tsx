import { Button } from "@chakra-ui/react";
import { useFundWallet } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { CHAIN_OBJ } from "../utils/constants";
import { formatEther } from "viem";

export const FundWalletButton = ({ amount }: { amount: bigint }) => {
  const { user } = usePrivy();
  const { fundWallet } = useFundWallet();

  const handleFunding = async () => {
    if (user?.wallet?.address) {
      // Add a little extra for gas (10% extra)
      const amountWithGas = (amount * BigInt(110)) / BigInt(100);
      const amountString = formatEther(amountWithGas);

      await fundWallet(user.wallet.address, {
        chain: CHAIN_OBJ,
        amount: amountString,
      });
    }
  };

  if (!user?.wallet?.address) return null;

  return (
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
      my="1rem"
      w="full"
    >
      Fund Wallet
    </Button>
  );
};

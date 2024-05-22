import { Box, Button, Heading } from "@chakra-ui/react";
import { usePeachCollection } from "../hooks/usePeachCollection";
import { useWallets } from "@privy-io/react-auth";
import { createRaribleSdk } from "@rarible/sdk";
import {
  NFT_CONTRACT_ADDRESS,
  RARIBLE_PREFIX,
  RARIBLE_STAGE,
  TARGET_NETWORK,
} from "../utils/constants";
import { toCurrencyId, toItemId, toOrderId } from "@rarible/types";

function Marketplace() {
  const { collection } = usePeachCollection();

  const { wallets } = useWallets();

  const handleList = async () => {
    try {
      const wallet = wallets[0];
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();

      const sdk = createRaribleSdk(signer, RARIBLE_STAGE, {
        apiKey: import.meta.env.VITE_RARIBLE_KEY,
      });

      const contractAddress = NFT_CONTRACT_ADDRESS[TARGET_NETWORK];

      const orderId = await sdk.order.sell({
        itemId: toItemId(`${RARIBLE_PREFIX}:${contractAddress}:8`),
        amount: 1,
        currency: toCurrencyId("ETHEREUM:native"),
        price: "0.01",
      });

      console.log(`Successfully listed. Order ID: ${orderId}`);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const wallet = wallets[0];
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();

      const sdk = createRaribleSdk(signer, RARIBLE_STAGE, {
        apiKey: import.meta.env.VITE_RARIBLE_KEY,
      });

      const update = await sdk.order.sellUpdate({
        orderId: toOrderId(
          `ETHEREUM:0x25794ea731a7e8d17bbdc870e20efe59eb448363a2bf7d4b7617745fcebed89e`
        ),
        price: "0.001",
      });

      console.log("update", update);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleCancel = async () => {
    try {
      const wallet = wallets[0];
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();

      const sdk = createRaribleSdk(signer, RARIBLE_STAGE, {
        apiKey: import.meta.env.VITE_RARIBLE_KEY,
      });

      const cancel = await sdk.order.cancel({
        orderId: toOrderId(
          `ETHEREUM:0x25794ea731a7e8d17bbdc870e20efe59eb448363a2bf7d4b7617745fcebed89e`
        ),
      });

      //returns a hash - could wagmi await this
      console.log("cancel", cancel);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <Box w="100%" textAlign="center" my="3rem">
        <Heading size="3xl">Marketplace</Heading>

        <Button onClick={handleList}>List NFT</Button>
        <Button onClick={handleUpdate}>Update</Button>

        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    </>
  );
}

export default Marketplace;

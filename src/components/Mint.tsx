import { useContractWrite, usePrepareContractWrite } from "wagmi";

import {
  BLOCK_EXPLORER_URL,
  NFT_CONTRACT_ADDRESS,
  NFT_MINT_PRICE,
} from "../utils/constants";
import erc721Abi from "../abis/ERC721.json";
import { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { brandColors } from "../theme";
import { getDisplayPrice } from "../utils/formatting";

export const Mint = () => {
  const [pendingTx, setPendingTx] = useState<`0x${string}` | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const { config, error } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: erc721Abi,
    functionName: "mint",
    value: NFT_MINT_PRICE,
  });

  const {
    write,
    isError,
    error: mintError,
    isLoading: mintLoading,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log("Settled", { data, error });
      setPendingTx(data?.hash);
      setSuccessMessage("Success! Go to your farm to take a look.");
    },
    onSuccess(data) {
      console.log("Success", data);
      setPendingTx(undefined);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  // if (error) {
  //   return <p>Prep Error: {error.message}</p>;
  // }

  if (isError) {
    return <p>Mint Error: {mintError?.message}</p>;
  }

  return (
    <div>
      <Button
        variant="outline"
        colorScheme="orange"
        fontFamily="heading"
        fontSize="2xl"
        fontStyle="italic"
        fontWeight="900"
        border="2px"
        borderColor="orange.500"
        size="lg"
        height="64px"
        width="300px"
        _hover={{ bg: "transparent", color: "orange.300" }}
        isDisabled={pendingTx !== undefined || error === undefined}
        isLoading={mintLoading}
        onClick={() => write?.()}
      >
        Buy/Mint for {getDisplayPrice()}
      </Button>

      {error && <Text>do you have enough eth in your wallet?</Text>}

      {pendingTx && (
        <Text my="1rem">
          <a href={`${BLOCK_EXPLORER_URL}tx/${pendingTx}`} target="_blank">
            VIEW TX
          </a>
        </Text>
      )}

      {successMessage && (
        <Text fontSize="2xl" as="b" color={brandColors.orange}>
          {successMessage}
        </Text>
      )}

      {mintLoading && <p>waiting for confirmation...</p>}
    </div>
  );
};

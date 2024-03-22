import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import erc721Abi from "../abis/ERC721.json";
import { MintTx } from "./MintTx";
import {
  BLOCK_EXPLORER_URL,
  COMING_SOON,
  CRITTER_COUNT_PLUS_ONE,
  NFT_CONTRACT_ADDRESS,
  NFT_MINT_PRICE,
  TARGET_NETWORK,
} from "../utils/constants";
import { useWriteContract, useSimulateContract } from "wagmi";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { getNetwork } from "wagmi/actions";

const getCritterId = () => {
  return Math.floor(Math.random() * CRITTER_COUNT_PLUS_ONE);
};

export const BuyTreeButton = ({
  trunkId,
  account,
}: {
  trunkId: number;
  account: string;
}) => {
  const queryClient = useQueryClient();
  const [txComplete, setTxComplete] = useState(false);
  const [pendingTx, setPendingTx] = useState<`0x${string}` | undefined>();
  const { chain } = getNetwork();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, error } = useSimulateContract({
    address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
    abi: erc721Abi,
    functionName: "mint",
    value: NFT_MINT_PRICE[TARGET_NETWORK],
    args: [trunkId, getCritterId()],
  });

  console.log("chain", chain);

  const {
    writeContract,
    isError,
    error: mintError,
    isLoading: mintLoading,
    isIdle,
    data,
  } = useWriteContract({
    ...data,
    onSettled(data) {
      console.log("Settled", { data, error });
      setPendingTx(data?.hash);
      // setSuccessMessage("Success! Go to your farm to take a look.");
      queryClient.invalidateQueries({
        queryKey: [`accountNfts-${account}`],
      });

      if (data?.hash) {
        onOpen();
      }
    },
    onSuccess(data) {
      console.log("Success", data);
      setPendingTx(undefined);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  console.log("mintError", mintError);

  // if (isError) {
  //   return <p>Mint Error: {mintError?.message}</p>;
  // }

  const isDisabled = COMING_SOON || mintLoading || chain?.unsupported;

  return (
    <>
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
        isDisabled={isDisabled}
        _hover={{
          bg: "transparent",
          color: "brand.orange",
        }}
        onClick={() => writeContract?.()}
      >
        {COMING_SOON ? "MINT COMING SOON" : "MINT"}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="gunmetal"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent bg="#0f1418">
          <ModalHeader color="brand.green">Minting</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              {!isIdle && !isError && !txComplete && (
                <>
                  <Spinner size="xl" color="brand.green" thickness="8px" />
                </>
              )}

              {data?.hash && (
                <MintTx txHash={data?.hash} setTxComplete={setTxComplete} />
              )}
              {pendingTx && (
                <Link
                  isExternal
                  href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}/tx/${pendingTx}`}
                >
                  View tx
                </Link>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

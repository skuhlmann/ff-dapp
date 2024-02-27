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
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import erc721Abi from "../abis/ERC721.json";
import { MintTx } from "./MintTx";
import {
  BLOCK_EXPLORER_URL,
  NFT_CONTRACT_ADDRESS,
  NFT_MINT_PRICE,
} from "../utils/constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { usePrivy } from "@privy-io/react-auth";
import { getNetwork } from "wagmi/actions";

const comingSoon = false;

const getCritterId = () => {
  return Math.floor(Math.random() * 4);
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

  console.log("chain", chain);

  const { config, error } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: erc721Abi,
    functionName: "mint",
    value: NFT_MINT_PRICE,
    args: [trunkId, getCritterId()],
  });

  console.log("error", error);

  const {
    write,
    isError,
    error: mintError,
    isLoading: mintLoading,
    isIdle,
    data,
  } = useContractWrite({
    ...config,
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

  console.log("error", error);

  // if (isError) {
  //   return <p>Mint Error: {mintError?.message}</p>;
  // }

  const isDisabled = comingSoon || mintLoading || chain?.unsupported;

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
        disabled={isDisabled}
        _hover={{
          bg: "transparent",
          color: "brand.orange",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        onClick={() => write?.()}
      >
        {comingSoon ? "MINT COMING SOON" : "MINT"}
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
          <ModalHeader color="orange.500">Minting</ModalHeader>
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
                  <Text>Minting</Text>
                  <Spinner />
                </>
              )}

              {data?.hash && (
                <MintTx txHash={data?.hash} setTxComplete={setTxComplete} />
              )}
              {pendingTx && (
                <Link isExternal href={`${BLOCK_EXPLORER_URL}/tx/${pendingTx}`}>
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

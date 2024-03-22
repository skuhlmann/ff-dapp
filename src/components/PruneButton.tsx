import {
  Button,
  Flex,
  Heading,
  Image,
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

import prunAbi from "../abis/Prune.json";
import {
  BLOCK_EXPLORER_URL,
  BOOST_POINTS,
  COMING_SOON,
  PRUNE_CONTRACT_ADDRESS,
  PRUNE_PRICE,
  TARGET_NETWORK,
} from "../utils/constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { getNetwork } from "wagmi/actions";
import peachAvatar from "../assets/peach-avatar-trans.png";

import pruneIcon from "../assets/icon_prune.png";
import { PRUNE_DESCRIPTION } from "./BoostContent";
import { fromWei } from "../utils/formatting";
import { PruneTx } from "./PruneTx";

export const PruneButton = ({ tokenId }: { tokenId: string }) => {
  const queryClient = useQueryClient();
  const [txComplete, setTxComplete] = useState(false);
  const [pendingTx, setPendingTx] = useState<`0x${string}` | undefined>();
  const { chain } = getNetwork();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    config,
    error,
    isError: prepError,
  } = usePrepareContractWrite({
    address: PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK],
    abi: prunAbi,
    functionName: "prune",
    value: PRUNE_PRICE[TARGET_NETWORK],
    args: [tokenId],
  });

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
      queryClient.invalidateQueries({
        queryKey: [`treePoints-${tokenId}`],
      });
    },
    onSuccess(data) {
      console.log("Success", data);
      setPendingTx(undefined);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const handleConfirm = () => {
    onOpen();
  };

  if (isError) {
    console.log("mint error", mintError);
  }

  const isDisabled =
    COMING_SOON || mintLoading || chain?.unsupported || prepError;
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
        color="brand.green"
        size="lg"
        height="60px"
        width="220px"
        my=".5rem"
        disabled={false}
        _hover={{
          bg: "transparent",
          color: "brand.green",
        }}
        onClick={handleConfirm}
      >
        <Image src={pruneIcon} w="44px" mr=".5rem" />
        PRUNE
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
          <ModalHeader color="brand.green">Pruning</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="sm">{PRUNE_DESCRIPTION}</Text>

              <Flex align="center" gap=".5rem">
                <Heading size="md" color="brand.green">
                  1 X
                </Heading>
                <Image src={peachAvatar} w="32px" />

                <Heading size="md" color="brand.green">
                  & {`${BOOST_POINTS.PRUNE} POINTS`}
                </Heading>
              </Flex>

              <Heading size="md" color="brand.blue">
                COST:{" "}
                {`${fromWei(PRUNE_PRICE[TARGET_NETWORK].toString())} BASE ETH`}
              </Heading>

              {data?.hash && (
                <PruneTx txHash={data?.hash} setTxComplete={setTxComplete} />
              )}
              {pendingTx && (
                <Link
                  isExternal
                  href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}/tx/${pendingTx}`}
                >
                  View tx
                </Link>
              )}

              {!isIdle && !isError && !txComplete ? (
                <>
                  <Spinner size="xl" color="brand.green" thickness="8px" />
                </>
              ) : (
                <>
                  {!data?.hash && (
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
                      isDisabled={isDisabled}
                      _hover={{
                        bg: "transparent",
                        color: "brand.orange",
                      }}
                      onClick={() => write?.()}
                    >
                      PURCHASE
                    </Button>
                  )}
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

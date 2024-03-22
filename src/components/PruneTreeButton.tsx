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
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useAccount,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

import prunAbi from "../abis/Prune.json";
import {
  BLOCK_EXPLORER_URL,
  BOOST_POINTS,
  PRUNE_CONTRACT_ADDRESS,
  PRUNE_PRICE,
  TARGET_NETWORK,
} from "../utils/constants";
import peachAvatar from "../assets/peach-avatar-trans.png";

import pruneIcon from "../assets/icon_prune.png";
import { PRUNE_DESCRIPTION } from "./BoostContent";
import { fromWei } from "../utils/formatting";
import { useEffect } from "react";

export const PruneTreeButton = ({ tokenId }: { tokenId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useAccount();
  const queryClient = useQueryClient();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // TODO: optimistic point update?
  useEffect(() => {
    const reset = async () => {
      await queryClient.invalidateQueries({
        queryKey: [`treePoints-${tokenId}`],
      });
      console.log("INVALIDATed");
    };
    if (isConfirmed) {
      console.log("INVALIDATING");
      reset();
    }
  }, [isConfirmed, queryClient, tokenId]);

  const handleConfirm = () => {
    onOpen();
  };

  const handlePrune = async () => {
    writeContract({
      address: PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: prunAbi,
      functionName: "prune",
      value: PRUNE_PRICE[TARGET_NETWORK],
      args: [tokenId],
    });
  };

  const isDisabled = isPending || !chain;
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

              {!hash && (
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
                  onClick={handlePrune}
                >
                  PURCHASE
                </Button>
              )}

              {hash && (
                <Link
                  isExternal
                  href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}/tx/${hash}`}
                >
                  View tx
                </Link>
              )}

              {isConfirming && (
                <Spinner size="xl" color="brand.green" thickness="8px" />
              )}

              {isConfirmed && (
                <Heading size="md">
                  Pruning is Done! Your points will show up soon .
                </Heading>
              )}

              {error && (
                <Text fontSize="sm">
                  Error: {(error as BaseError).shortMessage || error.message}
                </Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Image,
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
import { useQueryClient } from "@tanstack/react-query";

import { RARIBLE_STAGE } from "../utils/constants";
import peachAvatar from "../assets/peach-avatar-trans.png";

import { useWallets } from "@privy-io/react-auth";
import { createRaribleSdk } from "@rarible/sdk";
import { toOrderId } from "@rarible/types";
import { useWaitForTransactionReceipt } from "wagmi";

export const UnListPeachButton = ({
  tokenId,
  orderId,
}: {
  tokenId: string;
  orderId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallets } = useWallets();

  const [isError, setIsError] = useState(false);

  const [hash, setHash] = useState();

  const queryClient = useQueryClient();

  const { isLoading: isProcessing, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    const reset = async () => {
      await queryClient.invalidateQueries({
        queryKey: [`peachStatus-${tokenId}`],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, tokenId]);

  const handleConfirm = () => {
    onOpen();
  };

  const handleUnList = async () => {
    console.log("orderId", orderId);
    try {
      const wallet = wallets[0];
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();

      const sdk = createRaribleSdk(signer, RARIBLE_STAGE, {
        apiKey: import.meta.env.VITE_RARIBLE_KEY,
      });

      const cancelled = await sdk.order.cancel({
        orderId: toOrderId(orderId),
      });

      console.log("cancelled", cancelled);

      setHash(cancelled.transaction.tx.hash);
    } catch (err) {
      console.log("err", err);
      setIsError(true);
    }
  };

  const isDisabled = isProcessing || isConfirmed;

  return (
    <>
      <Button
        variant="outline"
        fontFamily="heading"
        fontSize="xl"
        fontStyle="italic"
        fontWeight="700"
        border="1px"
        borderColor="brand.orange"
        borderRadius="200px;"
        color="brand.orange"
        size="lg"
        height="60px"
        width="220px"
        my=".5rem"
        _hover={{
          bg: "transparent",
          color: "brand.orange",
        }}
        onClick={handleConfirm}
      >
        UNLIST
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
          <ModalHeader color="brand.orange">Are you Sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="sm" textAlign="center">
                Remove this Peach Box from the Farmer's Market. You can put it
                back on sale anytime.
              </Text>
              <Image src={peachAvatar} w="32px" />

              {!isProcessing && !isConfirmed && (
                <Button
                  variant="outline"
                  fontFamily="heading"
                  fontSize="xl"
                  fontStyle="italic"
                  fontWeight="700"
                  border="1px"
                  borderColor="brand.orange"
                  borderRadius="200px;"
                  color="brand.orange"
                  size="lg"
                  height="60px"
                  width="220px"
                  my=".5rem"
                  disabled={isDisabled}
                  opacity={isDisabled ? "30%" : "100%"}
                  _hover={{
                    bg: "transparent",
                    color: "brand.orange",
                  }}
                  onClick={handleUnList}
                >
                  UNLIST
                </Button>
              )}

              {isProcessing && (
                <Spinner size="xl" color="brand.green" thickness="8px" />
              )}

              {isConfirmed && (
                <>
                  <Heading size="md">Your Peach Box has been Unlisted</Heading>
                  <Link
                    color="brand.orange"
                    style={{ textDecoration: "underline" }}
                    to="/market"
                  >
                    Farmer's Market
                  </Link>
                </>
              )}

              {isError && (
                <Text fontSize="sm" color="brand.red">
                  Error Listing Peach Box
                </Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

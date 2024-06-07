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

export const BuyPeachButton = ({
  tokenId,
  orderId,
  price,
}: {
  tokenId: string;
  orderId: string;
  price: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallets } = useWallets();

  const [isListing, setIsListing] = useState(false);
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

  const handleBuy = async () => {
    console.log("orderId", orderId);
    try {
      setIsListing(true);
      const wallet = wallets[0];
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();

      const sdk = createRaribleSdk(signer, RARIBLE_STAGE, {
        apiKey: import.meta.env.VITE_RARIBLE_KEY,
      });

      const tx = await sdk.order.buy({
        orderId: toOrderId(orderId),
        amount: 1,
      });

      console.log("tx", tx);

      setHash(tx.transaction.tx.hash);
      setIsListing(false);
    } catch (err) {
      console.log("err", err);
      setIsError(true);
      setIsListing(false);
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
        borderColor="brand.blue"
        borderRadius="200px;"
        color="brand.blue"
        size="lg"
        height="60px"
        width="220px"
        my=".5rem"
        _hover={{
          bg: "transparent",
          color: "brand.blue",
        }}
        onClick={handleConfirm}
      >
        BUY
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
              <Text fontSize="lg" fontWeight={700} textAlign="center">
                Buy this Peach NFT for {price}
              </Text>
              <Image src={peachAvatar} w="32px" />

              {!isProcessing && !isConfirmed && !isListing && (
                <Button
                  variant="outline"
                  fontFamily="heading"
                  fontSize="xl"
                  fontStyle="italic"
                  fontWeight="700"
                  border="1px"
                  borderColor="brand.blue"
                  borderRadius="200px;"
                  color="brand.blue"
                  size="lg"
                  height="60px"
                  width="220px"
                  my=".5rem"
                  disabled={isDisabled}
                  opacity={isDisabled ? "30%" : "100%"}
                  _hover={{
                    bg: "transparent",
                    color: "brand.blue",
                  }}
                  onClick={handleBuy}
                >
                  BUY
                </Button>
              )}

              {isListing ||
                (isProcessing && (
                  <Spinner size="xl" color="brand.green" thickness="8px" />
                ))}

              {isConfirmed && (
                <>
                  <Heading size="md">You got the Peach!</Heading>
                  <Link
                    color="brand.orange"
                    style={{ textDecoration: "underline" }}
                    to="/farm"
                  >
                    Your Farm
                  </Link>
                </>
              )}

              {isError && (
                <Text fontSize="sm" color="brand.red">
                  Error Buying Peach
                </Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

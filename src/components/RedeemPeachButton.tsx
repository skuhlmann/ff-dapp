import { useEffect } from "react";
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
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

import {
  BLOCK_EXPLORER_URL,
  PEACH_NFT_CONTRACT_ADDRESS,
  RARIBLE_PREFIX,
  RARIBLE_STAGE,
  TARGET_NETWORK,
} from "../utils/constants";
import peachNftAbi from "../abis/PeachERC712.json";

import { dhImagePath } from "../utils/formatting";
import { createRaribleSdk } from "@rarible/sdk";

export const RedeemPeachButton = ({
  tokenId,
  tokenImage,
  account,
}: {
  tokenId: string;
  tokenImage?: string;
  account: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const queryClient = useQueryClient();

  useEffect(() => {
    const reset = async () => {
      await queryClient.invalidateQueries({
        queryKey: [`peachStatus-${tokenId}`],
      });
      await queryClient.invalidateQueries({
        queryKey: [`accountPeaches-${account}`],
      });

      const sdk = createRaribleSdk(undefined, RARIBLE_STAGE, {
        apiKey: import.meta.env.VITE_RARIBLE_KEY,
      });

      await sdk.apis.item.resetItemMeta({
        itemId: `${RARIBLE_PREFIX}:${PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}:${tokenId}`,
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
    }
  }, [isConfirmed, queryClient, tokenId, account]);

  const handleConfirm = () => {
    onOpen();
  };

  const handleRedeem = async () => {
    writeContract({
      address: PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: peachNftAbi,
      functionName: "redeem",
      args: [tokenId],
    });
  };

  const isDisabled = !chain || isPending;

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
        disabled={isDisabled}
        _hover={{
          bg: "transparent",
          color: "brand.blue",
        }}
        onClick={handleConfirm}
      >
        REDEEM: STEP 1
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
          <ModalHeader color="brand.blue">Redeem for Peaches</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="sm">
                First use the 'Take a Bite' button below to make the transaction
                revealing your PΞACH pit design.
              </Text>
              <Text fontSize="sm">
                Then use the 'Order Peaches' button to visit our shop where you
                can enter your physical address to have your peaches* shipped to
                you.
              </Text>
              <Text style={{ fontSize: "10px" }}>
                *Due to their perishable nature, we will only be able to ship
                fresh peaches to addresses in the United States. For our
                international friends, we will be shipping freeze dried peaches.
              </Text>

              <Flex
                direction="column"
                justify="center"
                align="center"
                mb=".5rem"
              >
                {tokenImage && (
                  <Image
                    mb=".5rem"
                    height="200px"
                    src={dhImagePath(tokenImage)}
                  />
                )}
              </Flex>

              {!hash && (
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
                    isDisabled={isDisabled}
                    _hover={{
                      bg: "transparent",
                      color: "brand.orange",
                    }}
                    onClick={handleRedeem}
                  >
                    TAKE A BITE
                  </Button>
                </>
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
                <>
                  <Heading size="md" color="brand.orange">
                    JUICY BITE!
                  </Heading>
                  <Text
                    onClick={onClose}
                    color="brand.green"
                    textDecoration="underline"
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    Head back to the farm to put in your order.
                  </Text>
                </>
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

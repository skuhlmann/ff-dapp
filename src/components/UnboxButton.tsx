import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Flex,
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

import peachNftAbi from "../abis/PeachERC712.json";
import {
  BLOCK_EXPLORER_URL,
  PEACH_NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { dhImagePath } from "../utils/formatting";

// refetch and invalidate

export const UnboxButton = ({
  tokenId,
  tokenImage,
  account,
}: {
  tokenId: string;
  account: string;
  tokenImage?: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useAccount();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const queryClient = useQueryClient();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    const reset = async () => {
      await queryClient.invalidateQueries({
        queryKey: [`peachStatus-${tokenId}`],
      });
      await queryClient.invalidateQueries({
        queryKey: [`accountPeaches-${account}`],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
      // refetch();
    }
  }, [isConfirmed, queryClient, tokenId, account]);

  const handleUnbox = async () => {
    onOpen();
    writeContract({
      address: PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: peachNftAbi,
      functionName: "unbox",
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
        onClick={handleUnbox}
      >
        UNBOX
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
              gap="1rem"
            >
              <Text fontSize="lg">Unbox</Text>
              {/* <Image src={tokenImage} h="320px" /> */}
              {tokenImage && <Image mb=".5rem" src={dhImagePath(tokenImage)} />}

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
                <RouterLink to="/farm">
                  <Button
                    variant="outline"
                    fontFamily="Helsinki"
                    fontSize="2xl"
                    border="1px"
                    borderColor="brand.green"
                    borderRadius="200px;"
                    color="brand.orange"
                    size="lg"
                    height="72px"
                  >
                    Checkout Your Unboxed Peach
                  </Button>
                </RouterLink>
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

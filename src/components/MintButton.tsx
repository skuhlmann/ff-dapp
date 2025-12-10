import { Link as RouterLink } from "react-router-dom";
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
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useAccount,
} from "wagmi";

import erc721Abi from "../abis/GrapeERC721.json";
import {
  BLOCK_EXPLORER_URL,
  NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import { useNftPrice } from "../hooks/useNftPrice";

export const MintButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain, address } = useAccount();

  const { userMintPrice, baselineMintPrice } = useNftPrice({
    userAddress: address,
  });

  const mintPrice = userMintPrice ?? baselineMintPrice;

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleMint = async () => {
    if (!mintPrice) return;
    onOpen();
    writeContract({
      address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: erc721Abi,
      functionName: "mint",
      value: mintPrice,
      args: [],
    });
  };

  const isDisabled = isPending || !chain;

  return (
    <>
      <Button
        fontWeight="700"
        my="1rem"
        variant="solid"
        fontSize="3xl"
        borderRadius=".125rem"
        _hover={{
          transform: "translate(0px, 2px)",
        }}
        color="brand.orange"
        bg="brand.purple"
        size="lg"
        height="72px"
        w="full"
        px="3rem"
        pt=".75rem"
        isDisabled={isDisabled}
        onClick={handleMint}
      >
        Purchase
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
        <ModalContent bg="brand.purple">
          <ModalHeader color="brand.green">Purchasing</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              {isConfirmed && (
                <RouterLink to="/cellar">
                  <Button
                    fontWeight="700"
                    my="1rem"
                    variant="solid"
                    borderRadius=".125rem"
                    _hover={{
                      transform: "translate(0px, 2px)",
                    }}
                    color="brand.orange"
                    bg="brand.purple"
                    size="sm"
                    height="72px"
                    px="3rem"
                    pt=".75rem"
                  >
                    Your bottle and skele-grape are in your cellar
                  </Button>
                </RouterLink>
              )}

              {isConfirming && (
                <Spinner size="xl" color="brand.green" thickness="8px" />
              )}

              {hash && (
                <Link
                  isExternal
                  href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}/tx/${hash}`}
                  fontSize="xs"
                >
                  View tx
                </Link>
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

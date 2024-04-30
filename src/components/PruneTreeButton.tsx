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
  useBalance,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

import prunAbi from "../abis/Prune.json";
import {
  BLOCK_EXPLORER_URL,
  BOOST_POINTS,
  PRUNE_CONTRACT_ADDRESS,
  PRUNE_PRICE,
  PRUNE_PRICE_ERC20,
  TARGET_NETWORK,
} from "../utils/constants";
import peachAvatar from "../assets/peach-avatar-trans.png";

import pruneIcon from "../assets/icon_prune.png";
import { fromWei } from "../utils/formatting";
import { useEffect } from "react";
import { PruneTreeERC20Button } from "./PruneTreeERC20Button";
import { usePrivy } from "@privy-io/react-auth";
import { useTreePoints } from "../hooks/useTreePoints";

const PRUNE_SHORT_DESCRIPTION =
  "Pruning is a critical practice for maintaining the health and productivity of your trees. You can only prune once before your trees go into spring blossom, so don’t delay! Every pruned tree will earn an additional peach box and 75 points towards the Farmer’s Pot.";

export const PruneTreeButton = ({ tokenId }: { tokenId: string }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen, onClose } = useDisclosure();

  const { chain } = useAccount();
  const { user } = usePrivy();
  const { refetch } = useTreePoints({
    tokenId: tokenId,
  });

  const queryClient = useQueryClient();

  const result = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    const reset = async () => {
      await queryClient.invalidateQueries({
        queryKey: [`treePoints-${tokenId}`],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
      refetch();
    }
  }, [isConfirmed, queryClient, tokenId, refetch]);

  // const handleConfirm = () => {
  //   onOpen();
  // };

  const handlePrune = async () => {
    writeContract({
      address: PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: prunAbi,
      functionName: "prune",
      value: PRUNE_PRICE[TARGET_NETWORK],
      args: [tokenId],
    });
  };

  const handlePruneERC20 = async () => {
    writeContract({
      address: PRUNE_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: prunAbi,
      functionName: "pruneERC20",
      args: [tokenId, PRUNE_PRICE_ERC20[TARGET_NETWORK]],
    });
  };

  const hasBalance =
    PRUNE_PRICE[TARGET_NETWORK] < BigInt(result?.data?.value || 0);

  const isDisabled = isPending || !chain || !hasBalance;
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
        disabled={true}
        _hover={{
          bg: "transparent",
          color: "brand.green",
        }}
        // onClick={handleConfirm}
        opacity="30%"
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
              <Text fontSize="sm">{PRUNE_SHORT_DESCRIPTION}</Text>

              <Flex
                direction="column"
                justify="center"
                align="center"
                mb=".5rem"
              >
                <Text fontSize="sm" fontWeight="700" color="brand.green">
                  You Get
                </Text>
                <Flex align="center" gap=".5rem">
                  <Heading size="md" color="brand.green">
                    1 X
                  </Heading>
                  <Image src={peachAvatar} w="32px" />

                  <Heading size="xs" color="brand.green">
                    &
                  </Heading>

                  <Heading size="md" color="brand.green">
                    {`${BOOST_POINTS.PRUNE} POINTS`}
                  </Heading>
                </Flex>
              </Flex>

              {!hash && (
                <>
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="sm" fontWeight="700" color="brand.blue">
                      Cost
                    </Text>
                    <Heading size="md" color="brand.blue">
                      {`${fromWei(
                        PRUNE_PRICE[TARGET_NETWORK].toString()
                      )} BASE ETH`}
                    </Heading>
                  </Flex>

                  <Button
                    variant="outline"
                    fontFamily="heading"
                    fontSize="xl"
                    fontStyle="italic"
                    fontWeight="700"
                    border="1px"
                    borderColor="brand.green"
                    borderRadius="200px"
                    color="brand.orange"
                    size="lg"
                    height="60px"
                    width="260px"
                    isDisabled={isDisabled}
                    _hover={{
                      bg: "transparent",
                      color: "brand.orange",
                    }}
                    onClick={handlePrune}
                  >
                    {hasBalance ? "PURCHASE WITH ETH" : "NOT ENOUGH ETH"}
                  </Button>

                  <Text fontSize="sm">OR</Text>

                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="sm" fontWeight="700" color="brand.blue">
                      Cost
                    </Text>
                    <Heading size="md" color="brand.blue">
                      {`${fromWei(
                        PRUNE_PRICE_ERC20[TARGET_NETWORK].toString()
                      )} $DEGEN`}
                    </Heading>
                  </Flex>

                  <PruneTreeERC20Button
                    address={user?.wallet?.address}
                    handlePruneERC20={handlePruneERC20}
                    isDisabled={isDisabled}
                  />
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
                <Heading size="md">
                  Pruning is Done! Your points will show up soon .
                </Heading>
              )}

              {error && (
                <Text fontSize="sm" color="brand.red">
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

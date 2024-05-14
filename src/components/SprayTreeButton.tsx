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

import sprayAbi from "../abis/Spray.json";

import {
  BLOCK_EXPLORER_URL,
  BOOST_POINTS,
  SPRAY_CONTRACT_ADDRESS,
  SPRAY_PRICE,
  SPRAY_PRICE_ERC20,
  TARGET_NETWORK,
} from "../utils/constants";
import peachAvatar from "../assets/peach-avatar-trans.png";

import sprayIcon from "../assets/icon_spray.png";
import { fromWei } from "../utils/formatting";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useTreePoints } from "../hooks/useTreePoints";
import { SprayTreeERC20Button } from "./SprayTreeERC20Button";
import { SPRAY_DESCRIPTION } from "./BoostContent";
import { PiCheckFatFill } from "react-icons/pi";

export const SprayTreeButton = ({
  tokenId,
  canSpray,
}: {
  tokenId: string;
  canSpray?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { chain } = useAccount();
  const { user } = usePrivy();

  const { refetch, sprays, sprayWins } = useTreePoints({
    tokenId: tokenId,
  });

  const queryClient = useQueryClient();

  const result = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  const {
    data: hash,
    error,
    isPending,
    writeContract,
    reset: resetWriteState,
  } = useWriteContract();

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

  useEffect(() => {
    if (!isOpen) {
      resetWriteState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleConfirm = () => {
    onOpen();
  };

  const hasBalance =
    SPRAY_PRICE[TARGET_NETWORK] < BigInt(result?.data?.value || 0);

  const isDisabled = isPending || !chain || !hasBalance;

  const handleSpray = async () => {
    writeContract({
      address: SPRAY_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: sprayAbi,
      functionName: "spray",
      value: SPRAY_PRICE[TARGET_NETWORK],
      args: [tokenId],
    });
  };

  const handleSprayERC20 = async () => {
    writeContract({
      address: SPRAY_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: sprayAbi,
      functionName: "sprayERC20",
      args: [tokenId, SPRAY_PRICE_ERC20[TARGET_NETWORK]],
    });
  };

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
        <Image src={sprayIcon} w="44px" mr=".5rem" />
        SPRAY
        {!canSpray && (
          <Text ml=".25rem">
            <PiCheckFatFill />
          </Text>
        )}
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
          <ModalHeader color="brand.green">Spraying</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="sm">{SPRAY_DESCRIPTION}</Text>

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
                    {`${BOOST_POINTS.SPRAY} POINTS`}
                  </Heading>

                  <Heading size="xs" color="brand.green">
                    &
                  </Heading>

                  <Heading size="md" color="brand.green">
                    A Chance at 1 X
                  </Heading>
                  <Image src={peachAvatar} w="32px" />
                </Flex>
              </Flex>

              {!hash && canSpray && (
                <>
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="sm" fontWeight="700" color="brand.blue">
                      Cost
                    </Text>
                    <Heading size="md" color="brand.blue">
                      {`${fromWei(
                        SPRAY_PRICE[TARGET_NETWORK].toString()
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
                    onClick={handleSpray}
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
                        SPRAY_PRICE_ERC20[TARGET_NETWORK].toString()
                      )} $DEGEN`}
                    </Heading>
                  </Flex>

                  <SprayTreeERC20Button
                    address={user?.wallet?.address}
                    handleSprayERC20={handleSprayERC20}
                    isDisabled={isDisabled}
                    erc20BuyPrice={SPRAY_PRICE_ERC20[TARGET_NETWORK]}
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

              {!isConfirming && (
                <>
                  {sprays === 2 && (
                    <Heading size="lg" width="100%" textAlign="center">
                      {`You've sprayed 2 times and won ${Number(
                        sprayWins
                      )} peach box${Number(sprayWins) === 1 ? "" : "es"}`}
                      . You are out of sprays.
                    </Heading>
                  )}

                  {sprays === 1 && (
                    <Heading size="lg" width="100%" textAlign="center">
                      {`You've sprayed 1 time and won ${Number(
                        sprayWins
                      )} peach box${
                        Number(sprayWins) === 1 ? "" : "es"
                      }. You can spray once more.`}
                    </Heading>
                  )}

                  {sprays === 0 && (
                    <Heading size="lg" width="100%" textAlign="center">
                      You have 2 spray attempts left.
                    </Heading>
                  )}
                </>
              )}

              {isConfirmed && (
                <Heading size="md" width="100%" textAlign="center">
                  Your points will show up soon.
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

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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import {
  BOOST_POINTS,
  TARGET_NETWORK,
  WATERING_ENDPOINT,
  WATERING_MESSAGE,
} from "../utils/constants";

import waterIcon from "../assets/icon_water.png";

import { useWallets } from "@privy-io/react-auth";
import { useTreePoints } from "../hooks/useTreePoints";
import { WATERING_DESCRIPTION } from "./BoostContent";
import { useState } from "react";
import { post } from "../utils/fetch";

export const WaterTreeButton = ({
  tokenId,
  watererdToday,
}: {
  tokenId: string;
  watererdToday: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useAccount();
  const { wallets } = useWallets();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { refetch } = useTreePoints({
    tokenId: tokenId,
  });

  const handleConfirm = () => {
    onOpen();
  };

  const handleWater = async () => {
    setIsPending(true);
    const wallet = wallets[0];
    const provider = await wallet.getEthereumProvider();

    const address = wallet.address;

    try {
      const signature = await provider.request({
        method: "personal_sign",
        params: [WATERING_MESSAGE, address],
      });

      const wateringRes = await post(`${WATERING_ENDPOINT[TARGET_NETWORK]}`, {
        tokenId,
        signature,
      });

      console.log("wateringRes", wateringRes);
      setIsConfirmed(true);
      refetch();
    } catch (e) {
      console.log("error", e);
      setIsError(true);
      setIsPending(false);
    }
  };

  const isDisabled = !chain || isPending || isError || watererdToday;
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
        <Image src={waterIcon} w="44px" mr=".5rem" />
        WATER
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
          <ModalHeader color="brand.blue">Daily Watering</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="sm">{WATERING_DESCRIPTION}</Text>

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
                    {`${BOOST_POINTS.WATERING} POINT`}
                  </Heading>
                </Flex>
              </Flex>

              <>
                <Flex direction="column" justify="center" align="center">
                  <Text fontSize="sm" fontWeight="700" color="brand.blue">
                    Cost
                  </Text>
                  <Heading size="md" color="brand.blue">
                    FREE
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
                  onClick={handleWater}
                >
                  WATER
                </Button>
              </>

              {isConfirmed && !watererdToday && (
                <Heading size="md" textAlign="center">
                  You watered today and got your point!
                </Heading>
              )}

              {watererdToday && (
                <>
                  <Heading size="md" textAlign="center">
                    You watered today and got your point!
                  </Heading>

                  <Text fontSize="md" color="brand.orange">
                    Come back tomorrow to water again.
                  </Text>
                </>
              )}

              {isError && (
                <Text fontSize="sm" color="brand.red">
                  Error watering
                </Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

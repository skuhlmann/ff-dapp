import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

import {
  ERC20_PAYMENT_TOKEN,
  PEACH_NFT_CONTRACT_ADDRESS,
  RARIBLE_PREFIX,
  RARIBLE_STAGE,
  TARGET_NETWORK,
} from "../utils/constants";
import peachAvatar from "../assets/peach-avatar-trans.png";

import { useWallets } from "@privy-io/react-auth";
import { createRaribleSdk } from "@rarible/sdk";
import { toCurrencyId, toItemId } from "@rarible/types";

export const ListPeachButton = ({ tokenId }: { tokenId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallets } = useWallets();

  const [isListing, setIsListing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("ETH");

  const queryClient = useQueryClient();

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

  // @ts-expect-error react types
  const handleChange = (event) => setPrice(event.target.value);

  // @ts-expect-error react types
  const handleCurrencyChange = (event) => setCurrency(event.target.value);

  const handleConfirm = () => {
    onOpen();
  };

  const isDisabled =
    // @ts-expect-error react types
    price === undefined || price === 0 || price === "0" || price === "";

  const handleList = async () => {
    console.log("LISTING", price);

    if (!price) return;

    try {
      setIsListing(true);
      const wallet = wallets[0];
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();

      const sdk = createRaribleSdk(signer, RARIBLE_STAGE, {
        apiKey: import.meta.env.VITE_RARIBLE_KEY,
      });

      const contractAddress = PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK];

      const currencyId = `${RARIBLE_PREFIX}:${
        currency === "$DEGEN" ? ERC20_PAYMENT_TOKEN[TARGET_NETWORK] : "native"
      }`;

      console.log("currencyId", currencyId);

      const orderId = await sdk.order.sell({
        itemId: toItemId(`${RARIBLE_PREFIX}:${contractAddress}:${tokenId}`),
        amount: 1,
        currency: toCurrencyId(currencyId),
        price: price,
        // payouts
      });

      console.log(`Successfully listed. Order ID: ${orderId}`);

      setIsListing(true);
      if (orderId) {
        setIsConfirmed(true);
      }
    } catch (err) {
      console.log("err", err);
      setIsError(true);
    }
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
        _hover={{
          bg: "transparent",
          color: "brand.green",
        }}
        onClick={handleConfirm}
      >
        LIST FOR SALE
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
          <ModalHeader color="brand.orange">List For Sale</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="sm">
                Put this peach box up for sale in the farmer's market.
              </Text>
              <Image src={peachAvatar} w="32px" />

              <Flex
                direction="column"
                justify="center"
                align="center"
                mb=".5rem"
              >
                <Text fontSize="sm" mb="8px">
                  How much?
                </Text>
                <InputGroup>
                  <Input
                    type="number"
                    focusBorderColor="brand.orange"
                    value={price}
                    onChange={handleChange}
                  />
                  <InputRightAddon background="brand.green">
                    <Select
                      variant="unstyled"
                      value={currency}
                      background="brand.green"
                      color="black"
                      onChange={handleCurrencyChange}
                    >
                      <option value="ETH">ETH</option>
                      <option value="$DEGEN">$DEGEN</option>
                    </Select>
                  </InputRightAddon>
                </InputGroup>
              </Flex>

              {!isListing && !isConfirmed && (
                <Button
                  variant="outline"
                  fontFamily="heading"
                  fontSize="xl"
                  fontStyle="italic"
                  fontWeight="700"
                  border="1px"
                  borderColor="brand.green"
                  borderRadius="200px"
                  color="brand.green"
                  size="lg"
                  height="60px"
                  width="260px"
                  disabled={isDisabled}
                  opacity={isDisabled ? "30%" : "100%"}
                  _hover={{
                    bg: "transparent",
                    color: "brand.orange",
                  }}
                  onClick={handleList}
                >
                  LIST FOR SALE
                </Button>
              )}

              {isListing && (
                <Spinner size="xl" color="brand.green" thickness="8px" />
              )}

              {isConfirmed && (
                <>
                  <Heading size="md">Your Peach Box has been Listed</Heading>
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

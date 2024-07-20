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
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// import { useQueryClient } from "@tanstack/react-query";

import { useAccount } from "wagmi";

import peachBoxImg from "../assets/peach-box-12.png";
import { useCheckout } from "../hooks/useCheckout";
import { formatDateFromShopify } from "../utils/formatting";

export const OrderPeachButton = ({
  tokenId,
  account,
}: {
  tokenId: string;
  account: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useAccount();

  const {
    isError: isCheckoutFetchError,
    error: checkoutFetchError,
    order,
  } = useCheckout({
    tokenId: Number(tokenId),
    account,
  });

  const handleConfirm = () => {
    onOpen();
  };

  // const isDisabled = !chain || isPending;
  const isDisabled = !chain;

  if (isCheckoutFetchError) {
    console.log("checkout error", checkoutFetchError);

    return (
      <Text my=".5rem" fontSize="sm" color="brand.orange">
        Checkout unavailable
      </Text>
    );
  }
  if (!order) return null;

  if (order.orderId) {
    return (
      <Button
        variant="outline"
        fontFamily="heading"
        fontSize="sm"
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
          cursor: "unset",
        }}
        onClick={handleConfirm}
      >
        Peaches ordered on {formatDateFromShopify(order.createdAt)}
      </Button>
    );
  }

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
        REDEEM: STEP 2
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
                Use the 'Order Peaches' button to visit our shop where you can
                enter your physical address to have your peaches* shipped to
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
                <Image mb=".5rem" height="200px" src={peachBoxImg} />
              </Flex>

              {order.webUrl && !order.orderId && (
                <>
                  <Button
                    as={Link}
                    href={order.webUrl}
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
                  >
                    ORDER PEACHES
                  </Button>
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

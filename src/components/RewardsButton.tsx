import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { Link as RouterLink } from "react-router-dom";

export const RewardsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = usePrivy();

  return (
    <>
      <Button
        variant="outline"
        fontFamily="heading"
        fontSize="2xl"
        fontStyle="italic"
        fontWeight="700"
        border="2px"
        borderColor="brand.orange"
        borderRadius="200px;"
        color="brand.red"
        size="lg"
        height="72px"
        width="320px"
        my=".5rem"
        isDisabled={!user}
        _hover={{
          bg: "transparent",
          color: "brand.red",
        }}
        onClick={onOpen}
      >
        FARMER REWARDS
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
          <ModalHeader color="brand.green">Farmer Rewards</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="lg">
                A portion (3%) of all transactions made in the game during the
                2024 peach season were added to the Farmer’s Pot. You were able
                to earn points by watering, fertilizing, spraying for bugs and
                pruning.
              </Text>
              <Text fontSize="lg" fontWeight="700">
                The top ten points earners were given a boost and will have the
                most rewards to claim.{" "}
                <RouterLink to="/leaderboard">
                  <Text
                    color="brand.orange"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Leaderboard
                  </Text>
                </RouterLink>
              </Text>
              <Text fontSize="lg">
                The rewards will be distributed via a{" "}
                <Link
                  color="brand.orange"
                  href="https://admin.daohaus.fun/#/molochv3/0x2105/0x1503bd5f6f082f7fbd36438cc416cd67849c0bec"
                  target="_blank"
                >
                  moloch DAO on DAOHaus
                </Link>
                .
              </Text>
              <Text fontSize="lg">
                You can view your loot token balance in the DAO profile and then
                click 'Rage Quit' from the profile menu and follow the
                instructions to exchange the loot tokens for your share of the
                Base ETH, $DEGEN (and various s**t coins airdropped to the DAO,
                if you want them).
              </Text>
              <Button
                as={Link}
                href={`https://admin.daohaus.fun/#/molochv3/0x2105/0x1503bd5f6f082f7fbd36438cc416cd67849c0bec/member/${user?.wallet?.address}`}
                target="_blank"
                variant="outline"
                fontFamily="heading"
                fontSize="xl"
                fontStyle="italic"
                fontWeight="700"
                border="1px"
                borderColor="brand.green"
                borderRadius="200px;"
                color="brand.green"
                size="sm"
                height="64px"
                width="250px"
                _hover={{
                  bg: "transparent",
                  color: "brand.green",
                  textDecoration: "none",
                }}
              >
                VIEW PROFILE TO CLAIM
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

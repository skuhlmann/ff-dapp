import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useBalance, useReadContract } from "wagmi";
import {
  TARGET_NETWORK,
  ERC20_PAYMENT_TOKEN,
  SALE_STATE,
} from "../utils/constants";
import { useNftPrice } from "../hooks/useNftPrice";
import { displayPrice } from "../utils/formatting";
import { LogIn } from "./LogIn";
import GrapeAvatar from "../assets/grape_logo.png";
import { MintButton } from "./MintButton";
import { MintButtonErc20 } from "./MintButtonErc20";
import { FundWalletButton } from "./FundWalletButton";
import erc20Abi from "../abis/ERC20.json";

export const MintCard = ({ account }: { account?: string }) => {
  const [paymentMethod, setPaymentMethod] = useState<"native" | "erc20">(
    "native",
  );

  const {
    userMintPrice,
    baselineMintPrice,
    userErc20MintPrice,
    baselineErc20MintPrice,
    hasDiscount,
  } = useNftPrice({
    userAddress: account as `0x${string}` | undefined,
  });

  console.log("account", account);

  console.log(
    "userMintPrice, baselineMintPrice, userErc20MintPrice, baselineErc20MintPrice, hasDiscount",
    userMintPrice,
    baselineMintPrice,
    userErc20MintPrice,
    baselineErc20MintPrice,
    hasDiscount,
  );

  const mintPrice = userMintPrice ?? baselineMintPrice;
  const erc20MintPrice = userErc20MintPrice ?? baselineErc20MintPrice;

  const { data: ethBalance } = useBalance({
    address: account as `0x${string}`,
    query: {
      enabled: !!account,
    },
  });

  const { data: erc20Balance } = useReadContract({
    address: ERC20_PAYMENT_TOKEN[TARGET_NETWORK] as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account as `0x${string}`],
    query: {
      enabled: !!account,
    },
  }) as { data: bigint | undefined };

  const hasEnoughEth =
    !!ethBalance && mintPrice !== undefined && ethBalance.value >= mintPrice;
  const hasEnoughErc20 =
    !!erc20Balance &&
    erc20MintPrice !== undefined &&
    erc20Balance >= erc20MintPrice;
  const hasEnoughOfEither = hasEnoughEth || hasEnoughErc20;
  const hasEnoughOfBoth = hasEnoughEth && hasEnoughErc20;

  // Default to native if available, otherwise ERC20
  useEffect(() => {
    if (hasEnoughEth && paymentMethod === "erc20" && !hasEnoughErc20) {
      setPaymentMethod("native");
    }
    if (!hasEnoughEth && hasEnoughErc20 && paymentMethod === "native") {
      setPaymentMethod("erc20");
    }
  }, [hasEnoughEth, hasEnoughErc20, paymentMethod]);

  const currentBaselinePrice =
    paymentMethod === "native" ? baselineMintPrice : baselineErc20MintPrice;
  const currentUserPrice =
    paymentMethod === "native" ? userMintPrice : userErc20MintPrice;
  const currentHasDiscount =
    hasDiscount &&
    currentUserPrice !== undefined &&
    currentBaselinePrice !== undefined &&
    currentUserPrice < currentBaselinePrice;

  const symbol = paymentMethod === "native" ? "ETH" : "USDC";

  return (
    <Flex direction="column" align="center" gap="1rem">
      <Flex
        direction="column"
        align="center"
        w={{ base: "100%" }}
        bg="brand.lightPurple"
        borderRadius="20px"
        p="15px 36px"
        position="relative"
        overflow="hidden"
      >
        <Image
          src={GrapeAvatar.src}
          alt="grapeavatar"
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          zIndex={0}
          opacity={0.1}
        />
        <Box
          w="100%"
          textAlign="center"
          paddingBottom="1rem"
          position="relative"
          zIndex={1}
        >
          {/* <Text mb="1rem">
            Purchase a token (NFT) redeemable for 1 Bottle of Forgotten Fruit
            Alpha Red
          </Text> */}
          <Flex direction="column" align="center" gap="0.5rem" mt="1rem">
            {SALE_STATE === "presale" ? (
              <Heading size="lg" color="brand.orange">
                Price{" "}
                <span
                  style={{
                    fontSize: "20px",
                  }}
                >
                  (Presale pricing ends soon)
                </span>
              </Heading>
            ) : (
              <Heading size="sm" color="brand.orange">
                Price
              </Heading>
            )}

            {currentBaselinePrice ? (
              <>
                {currentHasDiscount && currentUserPrice ? (
                  <>
                    <Text
                      size="lg"
                      color="brand.blue"
                      textDecoration="line-through"
                      opacity={0.6}
                    >
                      {displayPrice(currentBaselinePrice, paymentMethod)}{" "}
                      {symbol}
                    </Text>
                    <Heading size="md" color="brand.orange">
                      You qualify for
                      {SALE_STATE === "presale" ? ` an additonal` : "a"}{" "}
                      discount!{" "}
                    </Heading>
                    <Text size="lg" fontWeight={700}>
                      {displayPrice(currentUserPrice, paymentMethod)} {symbol}
                    </Text>
                  </>
                ) : (
                  <Heading size="lg">
                    {displayPrice(currentBaselinePrice, paymentMethod)} {symbol}
                  </Heading>
                )}
              </>
            ) : (
              <Heading size="lg" color="brand.blue">
                Loading...
              </Heading>
            )}
          </Flex>
        </Box>

        {account && !hasEnoughOfEither && mintPrice !== undefined && (
          <Box
            my="1rem"
            textAlign="center"
            w="full"
            position="relative"
            zIndex={1}
          >
            <Text mb="1rem">
              Insufficient balance. Please fund your wallet.
            </Text>
            <FundWalletButton amount={mintPrice} />
          </Box>
        )}

        {!account && (
          <Box my="1rem" textAlign="center" position="relative" zIndex={1}>
            <LogIn />
            <Text mt="1rem" fontSize="xs">
              * You will be promted to signup or login before purchase
            </Text>
          </Box>
        )}
        {account && hasEnoughOfEither && (
          <Box
            position="relative"
            zIndex={1}
            w={{ base: "200px", sm: "300px" }}
          >
            {paymentMethod === "native" && hasEnoughEth && <MintButton />}
            {paymentMethod === "erc20" && hasEnoughErc20 && <MintButtonErc20 />}
            {paymentMethod === "native" &&
              !hasEnoughEth &&
              mintPrice !== undefined && (
                <Box my="1rem" textAlign="center" w="full">
                  <Text mb="1rem">Insufficient ETH balance.</Text>
                  <FundWalletButton amount={mintPrice} />
                </Box>
              )}
            {paymentMethod === "erc20" &&
              !hasEnoughErc20 &&
              erc20MintPrice !== undefined && (
                <Box my="1rem" textAlign="center" w="full">
                  <Text mb="1rem">Insufficient ERC20 balance.</Text>
                  <FundWalletButton amount={erc20MintPrice} />
                </Box>
              )}

            {hasEnoughOfBoth && (
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="center"
                mt="2rem"
                mb="1rem"
                width="full"
              >
                <Text
                  w={{ base: "full", md: "220px" }}
                  fontSize="xs"
                  color="brand.blue"
                  textAlign="center"
                >
                  Payment Method
                </Text>
                <ButtonGroup isAttached variant="outline">
                  <Button
                    isActive={paymentMethod === "erc20"}
                    onClick={() => setPaymentMethod("erc20")}
                    color="brand.blue"
                    borderColor="brand.blue"
                    size="xs"
                    pt=".25rem"
                    _active={{
                      bg: "brand.purple",
                      color: "brand.orange",
                    }}
                  >
                    USDC (Dollars)
                  </Button>
                  <Button
                    isActive={paymentMethod === "native"}
                    onClick={() => setPaymentMethod("native")}
                    color="brand.blue"
                    borderColor="brand.blue"
                    pt=".25rem"
                    size="xs"
                    _active={{
                      bg: "brand.purple",
                      color: "brand.orange",
                    }}
                  >
                    ETH
                  </Button>
                </ButtonGroup>
              </Flex>
            )}
          </Box>
        )}
      </Flex>
      {/* {account && <AccountNftCount account={account} name={"Bottles"} />} */}
    </Flex>
  );
};

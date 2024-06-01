import { Flex, Button, Text } from "@chakra-ui/react";
import { UnboxButton } from "./UnboxButton";

export const PeachActions = ({
  tokenId,
  tokenImage,
  account,
  tokenState,
}: {
  tokenId: string;
  tokenImage?: string;
  account: string;
  tokenState: number;
}) => {
  console.log(tokenId, account);
  // marketplace data
  // if (!isFetched) return <Spinner color="brand.green" />;

  const isListed = true;
  const isRedeemed = tokenState === 2;

  return (
    <Flex direction="column" align="center">
      {!isListed && (
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
          disabled={isRedeemed}
          opacity={isRedeemed ? "30%" : "100%"}
          _hover={{
            bg: "transparent",
            color: "brand.green",
            cursor: isRedeemed && "not-allowed",
          }}
        >
          LIST FOR SALE
        </Button>
      )}

      {isListed && (
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
            disabled={isRedeemed}
            opacity={isRedeemed ? "30%" : "100%"}
            _hover={{
              bg: "transparent",
              color: "brand.green",
              cursor: isRedeemed && "not-allowed",
            }}
          >
            UNLIST
          </Button>
        </>
      )}

      {tokenState === 0 && (
        <>
          {/* <Button
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
            disabled={true}
            _hover={{
              bg: "transparent",
              color: "brand.orange",
              // cursor: "not-allowed",
            }}
          >
            UNBOX
          </Button> */}
          <UnboxButton
            tokenId={tokenId}
            tokenImage={tokenImage}
            account={account}
          />
          <Text fontSize="xs" color="brand.orange" opacity="100%" mt="-0.5rem">
            Reveal your PΞACH
          </Text>
        </>
      )}

      {tokenState === 1 && (
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
            disabled={true}
            opacity="30%"
            _hover={{
              bg: "transparent",
              color: "brand.blue",
              cursor: "not-allowed",
            }}
          >
            REDEEM
          </Button>
          <Text fontSize="xs" color="brand.blue" opacity="40%" mt="-0.5rem">
            (Redemption Coming Soon)
          </Text>
        </>
      )}
    </Flex>
  );
};

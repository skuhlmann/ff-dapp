import { Image, Text, Flex, Button, Box } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

import waterIcon from "../assets/icon_water.png";
import pruneIcon from "../assets/icon_prune.png";
import { BalanceCheck } from "./BalanceCheck";
import { PRUNE_PRICE, TARGET_NETWORK } from "../utils/constants";
// import { PruneButton } from "./PruneButton";
import { useTreePoints } from "../hooks/useTreePoints";
import { PiCheckFatFill } from "react-icons/pi";
import { PruneTreeButton } from "./PruneTreeButton";

export const TreeActions = ({
  tokenId,
  account,
}: {
  tokenId: string;
  account: string;
}) => {
  const { prune } = useTreePoints({
    tokenId: tokenId,
  });

  return (
    <Flex direction="column" align="center">
      {!prune && (
        <BalanceCheck
          address={account}
          targetBalance={PRUNE_PRICE[TARGET_NETWORK]}
        >
          <PruneTreeButton tokenId={tokenId} />
        </BalanceCheck>
      )}
      {prune && (
        <>
          <Button
            opacity="30%"
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
              cursor: "not-allowed",
            }}
          >
            <Image src={pruneIcon} w="44px" mr=".5rem" />
            PRUNE
            {prune && (
              <Text ml=".25rem">
                <PiCheckFatFill />
              </Text>
            )}
          </Button>
        </>
      )}
      <Button
        opacity="30%"
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
        _hover={{
          bg: "transparent",
          color: "brand.blue",
          cursor: "not-allowed",
        }}
      >
        <Image src={waterIcon} w="44px" mr=".5rem" />
        WATER
      </Button>

      <Button
        opacity="30%"
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
          cursor: "not-allowed",
        }}
      >
        <Box mr=".5rem" color="brand.white" fontWeight="700">
          <FaPlus />
        </Box>
        BOOST
      </Button>
      <Text fontSize="xs" color="brand.orange">
        (Coming soon!)
      </Text>
    </Flex>
  );
};

import { Image, Text, Flex, Button, Box, Spinner } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

import pruneIcon from "../assets/icon_prune.png";
import { useTreePoints } from "../hooks/useTreePoints";
import { PiCheckFatFill } from "react-icons/pi";
import { PruneTreeButton } from "./PruneTreeButton";
import { WaterTreeButton } from "./WaterTreeButton";

export const TreeActions = ({
  tokenId,
}: {
  tokenId: string;
  account: string;
}) => {
  const { prune, watererdToday, isFetched } = useTreePoints({
    tokenId: tokenId,
  });

  if (!isFetched) return <Spinner color="brand.green" />;

  return (
    <Flex direction="column" align="center">
      {!prune && <PruneTreeButton tokenId={tokenId} />}
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

      <WaterTreeButton
        tokenId={tokenId}
        watererdToday={watererdToday || false}
      />

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

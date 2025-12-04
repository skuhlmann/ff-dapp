import { usePrivy } from "@privy-io/react-auth";
import { MintCard } from "../components/MintCard";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { RemainingSupply } from "../components/RemainingSupply";
import { SectionHeader } from "../components/SectionHeader";

import WineBottlePic from "../assets/wine_bottle_1.jpg";
import { SALE_STATE } from "../utils/constants";

function BuyWine() {
  const { user } = usePrivy();

  return (
    <>
      <SectionHeader
        title="Buy Bottles"
        showPresale={SALE_STATE === "presale"}
      />

      <Flex
        direction="column"
        gap="1rem"
        textAlign="center"
        px={{ base: "5vw", md: "15vw" }}
        color="brand.blue"
        mb="2rem"
      >
        <Text fontSize="sm">
          Ever wonder what happens to the grapes that don’t make the cut? Meet
          Alpha Red, the rowdy rebel of the vineyard.
        </Text>

        <Text fontSize="sm">
          Notes of blueberry and currant hit the nose, while dried fruit, fig,
          and spices dance on the palate — like your childhood fruit leather…
          with cherry liqueur. Bold, complex, and unapologetically fun. Pair it
          with pizza, charcuterie, or a good story. Each bottle comes with a
          unique skele-grape NFT.
        </Text>

        <Text fontSize="sm">
          Bold, complex, and unapologetically fun. Pair it with pizza,
          charcuterie, or a good story. Each bottle comes with a unique
          skele-grape NFT.
        </Text>
      </Flex>
      <RemainingSupply />

      <Flex
        gap="1rem"
        direction={{ base: "column", md: "row" }}
        alignItems="top"
        justifyContent="center"
        mb="3rem"
      >
        <MintCard account={user?.wallet?.address} />
        <Box p={{ base: "3rem", md: "0px" }}>
          <Image
            src={WineBottlePic}
            h={{ base: "auto", md: "551px" }}
            borderRadius="20px"
          />
        </Box>
      </Flex>
    </>
  );
}

export default BuyWine;

// w={{ base: "320px" }}

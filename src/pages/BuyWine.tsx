import { usePrivy } from "@privy-io/react-auth";
import { MintCard } from "../components/MintCard";
import { Box, Flex, Image, Text, Heading } from "@chakra-ui/react";
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
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "2rem", lg: "4rem" }}
        px={{ base: "5vw", md: "10vw", lg: "8vw" }}
        mb="3rem"
        alignItems={{ base: "center", lg: "flex-start" }}
      >
        {/* Product Image */}
        <Box
          w={{ base: "100%", lg: "auto" }}
          maxW={{ base: "500px", lg: "none" }}
        >
          <Heading size="2xl" color="brand.orange" mb="0.5rem">
            Forgotten Fruit Alpha Red
          </Heading>
          <Image
            src={WineBottlePic}
            w="100%"
            h={{ base: "auto", lg: "600px" }}
            objectFit="contain"
            borderRadius="20px"
          />
        </Box>

        {/* Product Details & Purchase */}
        <Flex
          direction="column"
          flex={{ base: "none", lg: "1" }}
          w={{ base: "100%", lg: "auto" }}
          gap=".5rem"
          mt={{ base: "0rem", lg: "3.5rem" }}
        >
          <Flex direction="column" gap="1rem" color="brand.blue">
            <Text fontSize="sm" lineHeight="1.6">
              Ever wonder what happens to the grapes that don't make the cut?
              Meet Alpha Red, the rowdy rebel of the vineyard.
            </Text>

            <Text fontSize="sm" lineHeight="1.6">
              Notes of blueberry and currant hit the nose, while dried fruit,
              fig, and spices dance on the palate — like your childhood fruit
              leather… with cherry liqueur. Bold, complex, and unapologetically
              fun. Pair it with pizza, charcuterie, or a good story.
            </Text>

            <Text fontSize="sm" lineHeight="1.6">
              Each bottle comes with an NFT containing unique skele-grape
              digital artwork.
            </Text>
          </Flex>

          <Box mt="1rem">
            {SALE_STATE !== "upcoming" && (
              <>
                <RemainingSupply />
                <MintCard account={user?.wallet?.address} />
              </>
            )}
            {SALE_STATE === "upcoming" && (
              <Text
                color="brand.orange"
                fontSize="2xl"
                fontWeight="700"
                textAlign="center"
                mb="2rem"
                lineHeight="1.5"
                w={{ base: "300px" }}
              >
                PRESALE IS OPENING SOON!
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default BuyWine;

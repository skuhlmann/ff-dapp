"use client";
import { usePrivy } from "@privy-io/react-auth";
import { MintCard } from "../components/MintCard";
import { Box, Flex, Image, Text, Heading } from "@chakra-ui/react";
// import { RemainingSupply } from "../components/RemainingSupply";
import { SectionHeader } from "../components/SectionHeader";

import WineBottlePic from "../assets/alpha_red_2.jpg";
import { SALE_STATE } from "../utils/constants";

function BuyWine() {
  const { user } = usePrivy();

  return (
    <>
      <SectionHeader
        title="Reserve Your Bottle"
        showPresale={SALE_STATE === "presale"}
      />

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "1rem", lg: "2rem" }}
        px={{ base: "5vw", md: "10vw", lg: "8vw" }}
        mb="3rem"
        alignItems={{ base: "center", lg: "flex-start" }}
      >
        {/* Product Image */}
        <Flex
          w={{ base: "100%", lg: "auto" }}
          maxW={{ base: "500px", lg: "none" }}
          direction="column"
          justify="start"
          align="start"
          gap={{ base: "0.5rem", md: "1rem" }}
        >
          <Heading size="2xl" color="brand.orange" mb="0rem">
            Forgotten Fruit Alpha Red
          </Heading>
          <Image
            src={WineBottlePic.src}
            alt="buywine"
            h={{ base: "auto" }}
            maxH="500px"
            objectFit="contain"
            borderRadius="20px"
          />
          <Box maxW="665px">
            <Flex direction="column" gap="1rem" color="brand.blue">
              <Text fontSize="sm" lineHeight="1.6">
                Ever wonder what happens to the grapes that don&apos;t make the
                cut? Meet Alpha Red, the rowdy rebel of the vineyard.
              </Text>

              <Text fontSize="sm" lineHeight="1.6">
                Notes of blueberry and currant hit the nose, while dried fruit,
                fig, and spices dance on the palate — like your childhood fruit
                leather… with cherry liqueur. Bold, complex, and
                unapologetically fun. Pair it with pizza, charcuterie, or a good
                story.
              </Text>

              <Text fontSize="sm" lineHeight="1.6">
                Each bottle comes with an NFT containing unique skele-grape
                digital artwork.
              </Text>
            </Flex>
          </Box>
        </Flex>

        {/* Product Details & Purchase */}
        <Flex
          direction="column"
          flex={{ base: "none", lg: "1" }}
          w={{ base: "100%", lg: "auto" }}
          gap=".5rem"
          mt={{ base: "0rem", lg: "3.5rem" }}
        >
          <Box mt="1rem">
            {SALE_STATE !== "upcoming" && (
              <>
                {/* <RemainingSupply /> */}
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

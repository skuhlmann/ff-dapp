"use client";
import { usePrivy } from "@privy-io/react-auth";
import { MintCard } from "../components/MintCard";
import { Box, Flex, Image, Text, Heading } from "@chakra-ui/react";
// import { RemainingSupply } from "../components/RemainingSupply";
import { SectionHeader } from "../components/SectionHeader";

import WineBottlePic from "../assets/alpha_red_2.jpg";
import { SALE_STATE } from "../utils/constants";
import { useEffect } from "react";

function BuyWine() {
  const { user } = usePrivy();

  useEffect(() => {
    // Re-initialize VinoShipper when component mounts
    if (window.Vinoshipper) {
      window.Vinoshipper.init(3680, {
        cartButton: false,
      });
    } else {
      // If Vinoshipper hasn't loaded yet, wait for it
      const handler = () => {
        window.Vinoshipper?.init(3680, {
          cartButton: false,
        });
      };
      window.document.addEventListener("vinoshipper:loaded", handler, {
        once: true,
      });

      // Cleanup
      return () => {
        window.document.removeEventListener("vinoshipper:loaded", handler);
      };
    }
  }, []);

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
          <Box>
            <Heading size="2xl" color="brand.orange" mb="0">
              Alpha Red
            </Heading>
            <Text fontSize="sm" color="brand.blue" fontStyle="italic">
              Limited Release
            </Text>
          </Box>
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
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  mb="0.25rem"
                >
                  Origin
                </Text>
                <Text fontSize="sm">Grand Valley AVA — Colorado</Text>
              </Box>

              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  mb="0.25rem"
                >
                  Blend
                </Text>
                <Text fontSize="sm">
                  Merlot • Mourvèdre • Malbec • Zweigelt
                </Text>
              </Box>

              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  mb="0.25rem"
                >
                  Tasting Notes
                </Text>
                <Text fontSize="sm" lineHeight="1.6">
                  Notes of blueberry and currant hit the nose, while dried
                  fruit, fig, and spices dance on the palate — like your
                  childhood fruit leather… with cherry liqueur. Bold, complex,
                  and unapologetically fun. Pair it with pizza, charcuterie, or
                  a good story.
                </Text>
              </Box>

              <Box
                borderLeft="3px solid"
                borderColor="brand.orange"
                pl="0.75rem"
                py="0.25rem"
              >
                <Text fontSize="sm" fontStyle="italic">
                  Includes digital collectible + tradable ownership token.
                </Text>
              </Box>
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

          <Box mt="1.5rem" color="brand.blue">
            <Heading size="sm" color="brand.orange" mb="0.5rem">
              Valid Shipping Locations
            </Heading>
            <Text fontSize="xs" mb="0.75rem">
              We are only able to ship wine to addresses in certain locations in
              United States.
            </Text>
            <div className="vs-available"></div>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default BuyWine;

import { Box, Flex, Text, Image } from "@chakra-ui/react";

import Orchard from "../assets/palisades_orchard.jpeg";

export const HomeSectionFour = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="stretch"
      minH={{ base: "auto", md: "480px" }}
      overflow="hidden"
    >
      {/* Image panel */}
      <Box
        flex={{ base: "none", md: "1" }}
        position="relative"
        minH={{ base: "260px", md: "auto" }}
        overflow="hidden"
      >
        <Image
          src={Orchard.src}
          alt="Palisades orchard — placeholder for misfit grape close-up"
          position="absolute"
          inset="0"
          w="full"
          h="full"
          objectFit="cover"
          filter="brightness(0.55) saturate(0.8)"
        />
        {/* Overlay label */}
        <Box
          position="absolute"
          bottom="1.25rem"
          left="1.25rem"
          bg="brand.black"
          px="0.75rem"
          py="0.3rem"
          border="1px solid"
          borderColor="brand.orange"
          borderRadius="2px"
        >
          <Text fontSize="xs" color="brand.orange" fontStyle="italic">
            Placeholder — misfit grape close-up / vineyard shot
          </Text>
        </Box>
      </Box>

      {/* Text panel */}
      <Flex
        flex={{ base: "none", md: "1" }}
        direction="column"
        justify="center"
        bg="brand.black"
        px={{ base: "8vw", md: "6vw", xl: "8vw" }}
        py={{ base: "4rem", md: "5rem" }}
        borderLeft={{ base: "none", md: "3px solid" }}
        borderTop={{ base: "3px solid", md: "none" }}
        borderColor="brand.orange"
      >
        <Text
          fontSize="xs"
          fontWeight="700"
          letterSpacing="widest"
          textTransform="uppercase"
          color="brand.orange"
          mb="1rem"
        >
          • The Story •
        </Text>

        <Text
          fontFamily="AntiqueStories"
          fontSize={{ base: "48px", md: "64px", xl: "80px" }}
          color="brand.tan"
          lineHeight="1"
          mb="2rem"
        >
          The Misfit Grapes
        </Text>

        <Text color="brand.blue" mb="1.25rem" maxW="420px">
          Every harvest leaves behind grapes that don&apos;t fit the expected
          blend.
        </Text>

        <Text
          color="brand.tan"
          fontSize={{ base: "lg", md: "xl" }}
          fontStyle="italic"
          mb="1.25rem"
          maxW="360px"
          lineHeight="1.6"
        >
          Wrong ratios.
          <br />
          Wrong timing.
          <br />
          Wrong reputation.
        </Text>

        <Text color="brand.blue" maxW="420px">
          But sometimes those misfits create the most interesting wine.
        </Text>

        <Box
          mt="2rem"
          borderLeft="3px solid"
          borderColor="brand.lightPurple"
          pl="1.25rem"
          maxW="380px"
        >
          <Text color="brand.tan" fontStyle="italic">
            Forgotten Fruit exists to prove that.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

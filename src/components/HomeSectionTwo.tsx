import { Flex, Text, Box, Divider } from "@chakra-ui/react";

const steps = [
  {
    number: "1",
    label: "Reserve a Bottle",
    body: "Buy a Bottle Token representing a real bottle of Alpha Red.",
  },
  {
    number: "2",
    label: "Store in Your Digital Cellar",
    body: "Age the bottle digitally or trade ownership. Your bottle, your rules.",
  },
  {
    number: "3",
    label: "Trade or Gift",
    body: "Sell or transfer the bottle to someone else before redemption.",
  },
  {
    number: "4",
    label: "Redeem",
    body: "Claim your wine and have it shipped straight to your door.",
  },
];

export const HomeSectionTwo = () => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%">
      {/* Section header */}
      <Flex
        w="full"
        direction="row"
        align="center"
        justify="center"
        mb={{ base: 8, md: 12 }}
      >
        <Divider
          mt={8}
          mr={8}
          flex="1"
          borderTop="solid 2px"
          borderColor="brand.orange"
          borderBottom="none"
          background="none"
        />
        <Box textAlign="center">
          <Text
            fontFamily="AntiqueStories"
            color="brand.orange"
            fontSize={{ base: "40px", md: "56px" }}
            fontWeight="bold"
            lineHeight="1"
          >
            Reserve. Age. Redeem.
          </Text>
          <Text color="brand.blue" fontSize="md" mt="0.5rem">
            A wine reservation flow built for the modern misfit.
          </Text>
        </Box>
        <Divider
          mt={8}
          ml={8}
          flex="1"
          borderTop="solid 2px"
          borderColor="brand.orange"
          borderBottom="none"
          background="none"
        />
      </Flex>

      {/* Steps */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align={{ base: "center", md: "flex-start" }}
        gap={{ base: "0", md: "0" }}
        w="full"
        px={{ base: "6vw", md: "8vw" }}
        position="relative"
      >
        {/* Horizontal connector line — desktop only */}
        <Box
          display={{ base: "none", md: "block" }}
          position="absolute"
          top="36px"
          left="calc(8vw + 60px)"
          right="calc(8vw + 60px)"
          h="2px"
          bg="brand.purple"
          zIndex={0}
        />

        {steps.map((step, i) => (
          <Flex
            key={step.number}
            direction={{ base: "row", md: "column" }}
            align={{ base: "flex-start", md: "center" }}
            flex="1"
            maxW={{ base: "100%", md: "260px" }}
            mb={{ base: "0", md: "0" }}
            position="relative"
            zIndex={1}
          >
            {/* Mobile vertical connector */}
            {i < steps.length - 1 && (
              <Box
                display={{ base: "block", md: "none" }}
                position="absolute"
                left="34px"
                top="72px"
                bottom="-16px"
                w="2px"
                bg="brand.purple"
                zIndex={0}
              />
            )}

            {/* Number circle */}
            <Flex
              align="center"
              justify="center"
              w="72px"
              h="72px"
              borderRadius="full"
              bg="brand.orange"
              color="brand.black"
              fontFamily="AntiqueStories"
              fontSize="32px"
              flexShrink={0}
              mr={{ base: "1.5rem", md: "0" }}
              mb={{ base: "0", md: "1.25rem" }}
              position="relative"
              zIndex={1}
              boxShadow="0 0 0 4px #171126"
            >
              {step.number}
            </Flex>

            {/* Text */}
            <Box
              textAlign={{ base: "left", md: "center" }}
              px={{ base: "0", md: "0.5rem" }}
              py={{ base: "1.25rem", md: "0" }}
              mb={{ base: "0.5rem", md: "0" }}
            >
              <Text
                color="brand.tan"
                fontWeight="700"
                fontSize={{ base: "lg", md: "md" }}
                mb="0.4rem"
              >
                {step.label}
              </Text>
              <Text color="brand.blue" fontSize="sm" maxW="200px" mx={{ base: "0", md: "auto" }}>
                {step.body}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

import { Divider, Flex, Text } from "@chakra-ui/react";

export const SectionHeader = ({
  title,
  showPresale,
}: {
  title: string;
  showPresale?: boolean;
}) => {
  return (
    <Flex
      w="full"
      border="none"
      direction="row"
      alignItems="center"
      justifyContent="start"
      mt={{ base: 0, md: 5 }}
      mb={10}
    >
      <Divider
        mt={4}
        mr={4}
        width="10vw"
        borderTop="solid 2px"
        borderColor={"brand.blue"}
        borderBottom="none"
        background="none"
      />
      <Text
        color="brand.blue"
        fontSize={{ base: "1.25rem", md: "2rem" }}
        fontWeight="bold"
      >
        {title}
      </Text>
      {showPresale && (
        <>
          <Text
            color="brand.orange"
            fontSize={{ base: "0.65rem", md: "1rem" }}
            fontWeight="bold"
            ml="1rem"
          >
            Presale is open!
          </Text>
        </>
      )}
      <Divider
        mt={4}
        ml={4}
        flex="1"
        borderTop="solid 2px"
        borderColor={"brand.blue"}
        borderBottom="none"
        background="none"
      />
    </Flex>
  );
};

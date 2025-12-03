import { Divider, Flex, Text } from "@chakra-ui/react";

export const SectionHeader = ({ title }: { title: string }) => {
  return (
    <Flex
      w="full"
      border="none"
      direction="row"
      alignItems="center"
      justifyContent="start"
      mt={10}
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
      <Text color="brand.blue" fontSize="2rem" fontWeight="bold">
        {title}
      </Text>
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

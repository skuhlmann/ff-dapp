import { Button } from "@chakra-ui/react";

export const BuyTreeButton = () => {
  return (
    <Button
      variant="outline"
      fontFamily="heading"
      fontSize="xl"
      fontStyle="italic"
      fontWeight="700"
      border="1px"
      borderColor="brand.green"
      borderRadius="200px;"
      color="brand.orange"
      size="lg"
      height="60px"
      width="220px"
      my="1rem"
      disabled={true}
      _hover={{
        bg: "transparent",
        color: "brand.orange",
        cursor: "not-allowed",
      }}
    >
      MINT COMING SOON
    </Button>
  );
};

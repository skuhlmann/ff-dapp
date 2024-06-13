import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ListingWrapper } from "../components/ListingWrapper";

function Listing() {
  const { tokenId } = useParams();

  return (
    <>
      <Box w="100%" textAlign="center" my="3rem">
        <Heading size="3xl">Farmer's Market</Heading>
      </Box>
      <Flex
        w="full"
        border="none"
        direction="row"
        alignItems="center"
        justifyContent="start"
        mt={10}
      >
        <Divider
          mt={4}
          mr={4}
          width="10vw"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
        <Text
          fontFamily="auster"
          color="brand.white"
          fontSize="20px"
          fontWeight="bold"
        >
          Peach Sale
        </Text>
        <Divider
          mt={4}
          ml={4}
          flex="1"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
      </Flex>

      <Flex mt={5} ml={3} mb={8}>
        <Box width="10vw" />
        <Box width="15vw">
          <Link to="/market">
            <Flex color="brand.orange" align="center" gap="0.5rem">
              <FaLongArrowAltLeft />
              <Text fontSize="md" color="brand.orange">
                Market
              </Text>
            </Flex>
          </Link>
        </Box>
        {/* <Box ml={4} mr={4} width={{ base: "80%", lg: "20vw" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdOutlineSearch color="gray.300" />
            </InputLeftElement>
            <Input />
          </InputGroup>
        </Box> */}
      </Flex>

      <Flex
        w="100%"
        gap="1rem"
        direction="column"
        align="center"
        justify="center"
        my="3rem"
      >
        {tokenId && <ListingWrapper tokenId={tokenId} />}
      </Flex>
    </>
  );
}

export default Listing;

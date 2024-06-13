import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useLeaders } from "../hooks/useLeaders";
import { LeaderTable } from "../components/LeaderTable";

function Leaderboard() {
  const { isLoading, leaders, isError } = useLeaders();

  return (
    <>
      <Box w="100%" textAlign="center" my="3rem">
        <Heading size="3xl">Leaderboard - Top 10</Heading>
        <Text fontSize="20px" mt="0.5rem">
          Updated Daily
        </Text>
      </Box>

      <Box px={{ base: "1rem", sm: "8rem" }} mb="3rem">
        <>
          {isLoading && (
            <Flex w="100%" justify="center">
              <Spinner size="xl" />
            </Flex>
          )}

          {!isLoading && !isError && leaders && (
            <LeaderTable leaders={leaders} />
          )}
        </>
      </Box>
    </>
  );
}

export default Leaderboard;

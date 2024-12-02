import { usePrivy } from "@privy-io/react-auth";
import { MintCard } from "../components/MintCard";
import { Flex } from "@chakra-ui/react";
import { RemainingSupply } from "../components/RemainingSupply";
import { SectionHeader } from "../components/SectionHeader";

function BuyWine() {
  const { user } = usePrivy();

  return (
    <>
      <SectionHeader title="Buy Wine" />

      <RemainingSupply />

      <Flex
        gap="1rem"
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        mb="3rem"
      >
        <MintCard account={user?.wallet?.address} />
      </Flex>
    </>
  );
}

export default BuyWine;

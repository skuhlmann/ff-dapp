import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

import waterIcon from "../assets/icon_water.png";
import pruneIcon from "../assets/icon_prune.png";
import sprayIcon from "../assets/icon_spray.png";
import fertIcon from "../assets/icon_fert.png";
import { fromWei } from "../utils/formatting";
import {
  BOOST_POINTS,
  PRUNE_PRICE,
  PRUNE_PRICE_ERC20,
  TARGET_NETWORK,
} from "../utils/constants";

type BoostData = {
  img: string;
  name: string;
  color: string;
  description?: string;
  frequency: string;
  cost: string;
  isActive: boolean;
};

export const PRUNE_DESCRIPTION = `To get started, you will need to prune your tree. Pruning is a critical practice for maintaining the health and productivity of your trees. It encourages new fruiting wood, which increases fruit production and allows for greater sunlight and air circulation , which is crucial for fruit growth and ripening. You can only prune once and before your trees go into spring blossom, so don't delay! Every pruned tree will earn an additional peach box and ${BOOST_POINTS.PRUNE} points towards the Farmer's Pot`;
export const WATERING_DESCRIPTION =
  "Well-watered peach trees are generally healthier and more vigorous. They are also more productive, producing higher-quality fruit over the long term.  It's important to water peach trees consistently, especially during periods of active growth, flowering, and fruiting, so don't forget to water your trees every day! You earn one point for every day you water. ";

const boosts: BoostData[] = [
  {
    img: pruneIcon,
    color: "brand.green",
    name: "Prune",
    description: PRUNE_DESCRIPTION,
    frequency: "Once",
    cost: `${fromWei(
      PRUNE_PRICE[TARGET_NETWORK].toString()
    )} BASE ETH or ${fromWei(
      PRUNE_PRICE_ERC20[TARGET_NETWORK].toString()
    )} $DEGEN`,
    isActive: true,
  },
  {
    img: waterIcon,
    name: "Water",
    color: "brand.blue",
    description: WATERING_DESCRIPTION,
    frequency: "Daily",
    cost: "Free",
    isActive: false,
  },
  {
    img: fertIcon,
    name: "Fertilize",
    color: "brand.orange",
    description: "",
    frequency: "-",
    cost: "-",
    isActive: false,
  },
  {
    img: sprayIcon,
    name: "Bug Spray",
    color: "brand.green",
    description: "",
    frequency: "-",
    cost: "-",
    isActive: false,
  },
];

export const BoostContent = () => {
  return (
    <Flex
      direction="column"
      gap="3rem"
      alignItems="center"
      justifyContent="center"
      px="10px"
      w={{ base: "100%", md: "85%", lg: "65%" }}
    >
      <Heading size="lg">Care for your Trees</Heading>

      <Text fontSize="md">
        So you bought a tree and now you think you're a farmer? Not so fast! It
        takes hard work to grow the tastiest peaches in the world and become the
        ultimate Peach Tycoon. The better you farm, the more points you earn and
        a larger percentage of the Farmer's Pot that you can earn.
      </Text>
      <Flex direction="column" gap="2.5rem">
        {boosts.map((boost) => {
          return (
            <Flex
              direction="row"
              wrap="wrap"
              justify="flex-start"
              key={boost.name}
            >
              <Box w={{ base: "10%", md: "10%" }}>
                <Image src={boost.img} />
              </Box>
              <Box w={{ base: "90%", md: "70%" }} px="10px">
                <Heading size="md" color={boost.color} mb="5px">
                  {boost.name}
                </Heading>
                <Text fontSize="sm">{boost.description}</Text>

                {!boost.isActive && <Text fontSize="sm">Coming Soon</Text>}
              </Box>
              <Box
                w={{ base: "12%", md: "10%" }}
                display={{ base: "block", md: "none" }}
                mt="10px"
              />
              <Box w={{ base: "30%", md: "10%" }} mt="10px">
                <Text fontSize="sm" fontWeight="700">
                  Frequecy
                </Text>
                <Text fontSize="sm">{boost.frequency}</Text>
              </Box>
              <Box w={{ base: "30%", md: "10%" }} mt="10px">
                <Text fontSize="sm" fontWeight="700">
                  Cost
                </Text>
                <Text fontSize="sm">{boost.cost}</Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

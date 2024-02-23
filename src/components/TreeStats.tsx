import { Box, Heading, Image, Text, Flex } from "@chakra-ui/react";

import waterIcon from "../assets/icon_water.png";
import pruneIcon from "../assets/icon_prune.png";
import sprayIcon from "../assets/icon_spray.png";
import fertIcon from "../assets/icon_fert.png";

export const TreeStats = () => {
  return (
    <Flex direction="column" align="center" opacity="30%">
      <Heading size="lg" mb=".5rem">
        0
      </Heading>
      <Box textAlign="center" mb=".5rem">
        <Image src={waterIcon} />
        <Text fontSize="xs">0</Text>
      </Box>
      <Box textAlign="center" mb=".5rem">
        <Image src={fertIcon} />
        <Text fontSize="xs">0</Text>
      </Box>
      <Box textAlign="center" mb=".5rem">
        <Image src={pruneIcon} />
        <Text fontSize="xs">0</Text>
      </Box>
      <Box textAlign="center" mb=".5rem">
        <Image src={sprayIcon} />
        <Text fontSize="xs">0</Text>
      </Box>
    </Flex>
  );
};

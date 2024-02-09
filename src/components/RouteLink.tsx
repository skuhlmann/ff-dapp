import { Link as RouterLink } from "react-router-dom";

import { Flex, Link } from "@chakra-ui/react";
import { brandColors } from "../theme";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

export const RouteLink = ({
  linkText,
  path,
  direction,
}: {
  linkText: string;
  path: string;
  direction?: "left" | "right";
}) => {
  return (
    <Link
      as={RouterLink}
      to={path}
      fontSize="xl"
      color={brandColors.orangered}
      fontFamily="heading"
      textTransform="uppercase"
      fontWeight="900"
      fontStyle="italic"
      mt="3rem"
    >
      <Flex alignItems="center" gap="0.5rem">
        {direction === "left" && <HiArrowLongLeft />}
        {linkText} {direction === "right" && <HiArrowLongRight />}
      </Flex>
    </Link>
  );
};

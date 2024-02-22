import { Box, Heading } from "@chakra-ui/react";
import styled from "styled-components";
import { brandColors } from "../theme";

export const LabelBadge = styled(Heading)`
  padding: 0px 20px;
  line-height: 1.75;
  height: 34px;
  text-transform: uppercase;
`;

export const PeachCard = styled(Box)`
  background-color: ${brandColors.gray};
  padding: 58px 53px;
  border-radius: 20px;
`;

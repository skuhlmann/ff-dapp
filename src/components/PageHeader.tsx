import { Flex, Heading } from "@chakra-ui/react";
import { brandColors } from "../theme";
import { ReactNode } from "react";

export const PageHeader = ({
  superTitle,
  title,
  children,
}: {
  superTitle?: string;
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      mb="3rem"
    >
      {superTitle && (
        <Heading size="lg" color={brandColors.orange}>
          {superTitle}
        </Heading>
      )}
      {title && <Heading size="4xl">{title}</Heading>}
      {children}
    </Flex>
  );
};

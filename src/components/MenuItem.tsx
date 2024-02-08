import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const MenuItem = ({
  children,
  to = "/",
}: {
  children: ReactNode;
  to: string;
}) => {
  return (
    <Link to={to}>
      <Text display="block">{children}</Text>
    </Link>
  );
};

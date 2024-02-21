import { Heading } from "@chakra-ui/react";
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
      <Heading color="brand.orange" display="block">
        {children}
      </Heading>
    </Link>
  );
};

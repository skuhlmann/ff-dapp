"use client";
import { Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import Link from "next/link";

export const MenuItem = ({
  children,
  to = "/",
}: {
  children: ReactNode;
  to: string;
}) => {
  return (
    <Link href={to}>
      <Heading color="brand.orange" display="block">
        {children}
      </Heading>
    </Link>
  );
};

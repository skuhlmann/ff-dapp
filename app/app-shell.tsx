"use client";

import { Box } from "@chakra-ui/react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { grapeConsole } from "@/utils/console";

// eslint-disable-next-line no-console
console.log(grapeConsole);

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <Box pt="180px">{children}</Box>
      <Footer />
    </>
  );
}

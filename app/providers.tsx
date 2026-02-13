"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { base, sepolia } from "wagmi/chains";
import { http, createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";

import theme from "@/theme";
import { DaoHooksProvider } from "@/hooks/DaoHooksContext";
import { ALCHEMY_RPC, CHAIN_OBJ } from "@/utils/constants";

const config = createConfig({
  chains: [base, sepolia],
  transports: {
    [base.id]: http(ALCHEMY_RPC),
    [sepolia.id]: http(ALCHEMY_RPC),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

const daoHooksConfig = {
  graphKey: process.env.NEXT_PUBLIC_GRAPH_KEY || "",
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DaoHooksProvider keyConfig={daoHooksConfig}>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            config={{
              loginMethods: ["email", "wallet"],
              embeddedWallets: {
                createOnLogin: "users-without-wallets",
              },
              defaultChain: CHAIN_OBJ,
              supportedChains: [CHAIN_OBJ],
            }}
          >
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </PrivyProvider>
        </DaoHooksProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

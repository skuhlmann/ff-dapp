import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { ChakraProvider } from "@chakra-ui/react";

import { Buffer } from "buffer/";
// @ts-expect-error buffer
window.Buffer = Buffer;

import { Routes } from "./Routes.tsx";
import { ALCHEMY_RPC, CHAIN_OBJ } from "./utils/constants.ts";
import theme from "./theme.ts";
import { Fonts } from "./Fonts.tsx";
import "./index.css";

const config = createConfig({
  chains: [CHAIN_OBJ],
  // @ts-expect-error ts wants single
  transports: {
    [CHAIN_OBJ.id]: http(ALCHEMY_RPC),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={import.meta.env.VITE_PRIVY_APP_ID}
          // onSuccess={handleLogin}
          config={{
            defaultChain: CHAIN_OBJ,
            loginMethods: ["email", "wallet", "farcaster"],
            appearance: {
              theme: "dark",
              accentColor: "#E46C1E",
              logo: "https://peachtycoon.com/assets/Peach_logo-pI9PBUaM.png",
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets", // or 'all-users'
            },
          }}
        >
          <WagmiProvider config={config}>
            <ChakraProvider theme={theme}>
              <Fonts />
              <Routes />
            </ChakraProvider>
          </WagmiProvider>
        </PrivyProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);

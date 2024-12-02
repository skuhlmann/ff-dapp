import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { base, sepolia } from "wagmi/chains";
import { http, createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Providers from "./Providers.tsx";
import { Routes } from "./Routes.tsx";

import theme from "./theme.ts";
import { grapeConsole } from "./utils/console.ts";
console.log(grapeConsole);

import "./index.css";

const config = createConfig({
  chains: [base, sepolia],
  transports: {
    [base.id]: http(),
    [sepolia.id]: http(),
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
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Providers>
            <ChakraProvider theme={theme}>
              <Routes />
            </ChakraProvider>
          </Providers>
        </QueryClientProvider>
      </WagmiProvider>
    </HashRouter>
  </React.StrictMode>
);

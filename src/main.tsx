import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { base, sepolia } from "@wagmi/chains";
import { ChakraProvider } from "@chakra-ui/react";

import { Buffer } from "buffer/";
// @ts-expect-error buffer
window.Buffer = Buffer;

import { Routes } from "./Routes.tsx";
import { TARGET_NETWORK } from "./utils/constants.ts";
import theme from "./theme.ts";
import { Fonts } from "./Fonts.tsx";
import "./index.css";

const chainObj = TARGET_NETWORK === "0x2105" ? base : sepolia;

const configureChainsConfig = configureChains([chainObj], [publicProvider()]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={import.meta.env.VITE_PRIVY_APP_ID}
          // onSuccess={handleLogin}
          config={{
            defaultChain: chainObj,
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
          <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
            <ChakraProvider theme={theme}>
              <Fonts />
              <Routes />
            </ChakraProvider>
          </PrivyWagmiConnector>
        </PrivyProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);

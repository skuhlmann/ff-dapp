import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { base } from "@wagmi/chains";
import { configureChains } from "wagmi";

import { Buffer } from "buffer/";
// @ts-expect-error tbd
window.Buffer = Buffer;

// You may replace this with your preferred providers
// https://wagmi.sh/react/providers/configuring-chains#multiple-providers
import { publicProvider } from "wagmi/providers/public";

import { Routes } from "./Routes.tsx";
// import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { Fonts } from "./Fonts.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const configureChainsConfig = configureChains([base], [publicProvider()]);

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const handleLogin = (user: any) => {
//   console.log(`User ${user.id} logged in!`);
//   console.log("user", user);
// };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={import.meta.env.VITE_PRIVY_APP_ID}
          // onSuccess={handleLogin}
          config={{
            defaultChain: base,
            loginMethods: ["email", "wallet"],
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

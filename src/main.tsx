import React from "react";
import ReactDOM from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { sepolia } from "@wagmi/chains";
import { configureChains } from "wagmi";

import { Buffer } from "buffer/";
// @ts-expect-error tbd
window.Buffer = Buffer;

// You may replace this with your preferred providers
// https://wagmi.sh/react/providers/configuring-chains#multiple-providers
import { publicProvider } from "wagmi/providers/public";

import App from "./App.tsx";
import "./index.css";

const configureChainsConfig = configureChains([sepolia], [publicProvider()]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleLogin = (user: any) => {
  console.log(`User ${user.id} logged in!`);
  console.log("user", user);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      onSuccess={handleLogin}
      config={{
        loginMethods: ["email", "wallet"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
      }}
    >
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <App />
      </PrivyWagmiConnector>
    </PrivyProvider>
  </React.StrictMode>
);

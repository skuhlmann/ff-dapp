import type { Metadata } from "next";
import Script from "next/script";
import Providers from "./providers";
import { AppShell } from "./app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forgotten Fruit",
  description: "Boutique wines from misfit grapes",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Forgotten Fruit",
    url: "https://forgottenfruit.xyz/",
    description: "Boutique wines from misfit grapes",
    images: ["/preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@PeachDropNFT",
    title: "Forgotten Fruit",
    description: "Boutique wines from misfit grapes",
  },
  other: {
    "theme-color": "#33215F",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="global-polyfill" strategy="beforeInteractive">
          {`if (typeof global === 'undefined') { var global = window; }`}
        </Script>
        <link rel="agent-commerce" href="/.well-known/agent-commerce" />
      </head>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
        <Script
          src="https://vinoshipper.com/injector/index.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

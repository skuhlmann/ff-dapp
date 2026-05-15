"use client";

import dynamic from "next/dynamic";

const BuyWine = dynamic(() => import("@/views/BuyWine"), { ssr: false });
export default function Page() {
  return <BuyWine />;
}

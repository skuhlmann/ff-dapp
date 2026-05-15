"use client";

import dynamic from "next/dynamic";

const Cellar = dynamic(() => import("@/views/Cellar"), { ssr: false });
export default function Page() {
  return <Cellar />;
}

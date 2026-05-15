"use client";

import dynamic from "next/dynamic";

const Marketplace = dynamic(() => import("@/views/Marketplace"), {
  ssr: false,
});
export default function Page() {
  return <Marketplace />;
}

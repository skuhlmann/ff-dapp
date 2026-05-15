"use client";

import dynamic from "next/dynamic";

const Faq = dynamic(() => import("@/views/Faq"), { ssr: false });
export default function Page() {
  return <Faq />;
}

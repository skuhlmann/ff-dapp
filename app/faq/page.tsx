import dynamic from "next/dynamic";

const Faq = dynamic(() => import("@/pages/Faq"), { ssr: false });
export default function Page() {
  return <Faq />;
}

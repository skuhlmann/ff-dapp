import dynamic from "next/dynamic";

const BuyWine = dynamic(() => import("@/pages/BuyWine"), { ssr: false });
export default function Page() {
  return <BuyWine />;
}

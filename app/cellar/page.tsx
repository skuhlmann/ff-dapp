import dynamic from "next/dynamic";

const Cellar = dynamic(() => import("@/pages/Cellar"), { ssr: false });
export default function Page() {
  return <Cellar />;
}

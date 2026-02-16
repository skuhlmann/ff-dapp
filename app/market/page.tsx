import dynamic from "next/dynamic";

const Marketplace = dynamic(() => import("@/pages/Marketplace"), {
  ssr: false,
});
export default function Page() {
  return <Marketplace />;
}

import dynamic from "next/dynamic";

const ForAgents = dynamic(() => import("@/views/ForAgents"), { ssr: false });
export default function Page() {
  return <ForAgents />;
}

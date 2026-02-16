import dynamic from "next/dynamic";

const Account = dynamic(() => import("@/pages/Account"), { ssr: false });
export default function Page() {
  return <Account />;
}

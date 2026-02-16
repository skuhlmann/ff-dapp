import dynamic from "next/dynamic";

const Listing = dynamic(() => import("@/views/Listing"), { ssr: false });

export default async function ListingPage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  return <Listing tokenId={tokenId} />;
}

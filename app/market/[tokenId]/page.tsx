import Listing from "@/pages/Listing";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  return <Listing tokenId={tokenId} />;
}

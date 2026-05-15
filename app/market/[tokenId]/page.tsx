import ListingClient from "./listing-client";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  return <ListingClient tokenId={tokenId} />;
}

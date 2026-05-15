"use client";

import dynamic from "next/dynamic";

const Listing = dynamic(() => import("@/views/Listing"), { ssr: false });

export default function ListingClient({ tokenId }: { tokenId: string }) {
  return <Listing tokenId={tokenId} />;
}

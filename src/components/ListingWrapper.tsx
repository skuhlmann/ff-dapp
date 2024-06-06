import { ListingCard } from "./ListingCard";
import { usePeachItem } from "../hooks/usePeachItem";
import { Spinner } from "@chakra-ui/react";

export const ListingWrapper = ({ tokenId }: { tokenId: string }) => {
  const { item, isLoading } = usePeachItem({ tokenId });

  if (!item || isLoading) return <Spinner color="brand.orange" />;
  return <ListingCard tokenId={item.tokenId as string} peach={item} />;
};

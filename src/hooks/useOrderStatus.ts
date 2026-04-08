import { useQuery } from "@tanstack/react-query";
import type { WineOrderRecord } from "../utils/types";

const fetchOrderStatus = async (
  tokenId: string,
): Promise<WineOrderRecord | null> => {
  const res = await fetch(`/api/order?tokenId=${encodeURIComponent(tokenId)}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch order status: ${res.status}`);
  }

  const data = await res.json();
  return data.order ?? null;
};

export const useOrderStatus = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`orderStatus-${tokenId}`],
    queryFn: () => fetchOrderStatus(tokenId),
    enabled: !!tokenId,
  });

  return { order: data ?? null, error, ...rest };
};

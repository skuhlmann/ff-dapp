import { useQuery } from "@tanstack/react-query";
import { CHECKOUT_URL } from "../utils/constants";
import { post } from "../utils/fetch";
import { PeachOrderData } from "../utils/types";

export const useCheckout = ({
  tokenId,
  account,
}: {
  tokenId: number | undefined;
  account: string | undefined;
}) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`$get-checkout-${tokenId}`, { tokenId }],
    queryFn: async () => {
      const cachedCheckoutString = localStorage.getItem(
        `peachCheckout${tokenId}`
      );
      let checkoutId;

      if (cachedCheckoutString) {
        const cachedCheckout = JSON.parse(cachedCheckoutString);
        if (cachedCheckout.orderId) {
          return cachedCheckout;
        }

        checkoutId = cachedCheckout.checkoutId;
      }

      const checkoutRes = await post(CHECKOUT_URL, {
        tokenId,
        account,
        checkoutId,
      });

      localStorage.setItem(
        `peachCheckout${tokenId}`,
        JSON.stringify(checkoutRes)
      );

      return checkoutRes;
    },
    enabled: !!tokenId && !!account,
  });

  return {
    order: data as PeachOrderData,
    error,
    ...rest,
  };
};

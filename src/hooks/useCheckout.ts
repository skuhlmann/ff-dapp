import { useQuery } from "react-query";
import { CHECKOUT_URL } from "../utils/constants";
import { post } from "../utils/fetch";

export const useCheckout = ({
  tokenId,
  account,
}: {
  tokenId: number | undefined;
  account: string | undefined;
}) => {
  const { data, ...rest } = useQuery(
    [`$get-checkout-${tokenId}`, { tokenId }],
    async () => {
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

      console.log("checkoutRes", checkoutRes);

      localStorage.setItem(
        `peachCheckout${tokenId}`,
        JSON.stringify(checkoutRes)
      );

      return checkoutRes;
    },
    { enabled: !!tokenId && !!account }
  );

  return {
    ...data,
    ...rest,
  };
};

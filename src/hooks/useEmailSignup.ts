import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { get, post } from "../utils/fetch";

type ContactLookupResponse = { hasEmail: boolean };
type ContactCreateResponse = { status: "success" | "error"; message?: string };

type UseEmailSignupParams = {
  walletAddress: string | undefined;
  privyHasEmail: boolean;
};

type UseEmailSignupReturn = {
  isChecking: boolean;
  showBanner: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  isSubmitted: boolean;
  submitEmail: (email: string) => Promise<void>;
};

const CONTACTS_API = "/api/contacts";

export const useEmailSignup = ({
  walletAddress,
  privyHasEmail,
}: UseEmailSignupParams): UseEmailSignupReturn => {
  const queryClient = useQueryClient();

  const shouldCheck = !!walletAddress && !privyHasEmail;

  const { data: lookupData, isLoading: isChecking } = useQuery({
    queryKey: ["contact-email-check", walletAddress],
    queryFn: async () => {
      return get<ContactLookupResponse>(
        `${CONTACTS_API}?wallet=${walletAddress}`,
      );
    },
    enabled: shouldCheck,
    staleTime: Infinity,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitEmail = useCallback(
    async (email: string) => {
      if (!walletAddress) return;

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const res = await post<
          { wallet: string; email: string },
          ContactCreateResponse
        >(CONTACTS_API, {
          wallet: walletAddress,
          email,
        });

        if (res.status === "error") {
          setSubmitError(res.message ?? "Something went wrong.");
          return;
        }

        setIsSubmitted(true);

        await queryClient.invalidateQueries({
          queryKey: ["contact-email-check", walletAddress],
        });
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : "Something went wrong.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [walletAddress, queryClient],
  );

  const showBanner =
    shouldCheck &&
    !isChecking &&
    !isSubmitted &&
    lookupData?.hasEmail === false;

  return {
    isChecking,
    showBanner,
    isSubmitting,
    submitError,
    isSubmitted,
    submitEmail,
  };
};

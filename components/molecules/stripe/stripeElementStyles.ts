import type { StripeElementStyleVariant } from "@stripe/stripe-js";

export const stripeElementStyles: {
  base: StripeElementStyleVariant;
  invalid: StripeElementStyleVariant;
  complete: StripeElementStyleVariant;
} = {
  base: {
    fontSize: "14px",
    color: "#0f172a",
    fontFamily: "Inter, sans-serif",
    "::placeholder": {
      color: "#475569",
    },
  },
  invalid: {
    color: "#ef4444",
  },
  complete: {
    color: "#0f172a",
  },
};

export const stripeInputWrapperClass = (
  focused: boolean,
  error?: string | boolean,
  disabled?: boolean
) =>
  `w-full h-10 flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ${
    !!error
      ? "border-2 border-red-500"
      : disabled
        ? "border border-slate-400 bg-slate-100 cursor-not-allowed"
        : focused
          ? "border-2 border-black"
          : "border border-slate-400 hover:border-2 hover:border-black"
  }`;

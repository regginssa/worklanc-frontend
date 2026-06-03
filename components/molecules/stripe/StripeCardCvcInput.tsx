import { CardCvcElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import StripeCardField from "./StripeCardField";
import {
  stripeElementStyles,
  stripeInputWrapperClass,
} from "./stripeElementStyles";

interface StripeCardCvcInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  labelClassName?: string;
}

export default function StripeCardCvcInput({
  label = "Security code",
  required,
  error,
  labelClassName,
}: StripeCardCvcInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <StripeCardField
      label={label}
      required={required}
      error={error}
      labelClassName={labelClassName}
    >
      <div className={stripeInputWrapperClass(focused, error)}>
        <CardCvcElement
          options={{
            style: stripeElementStyles,
            placeholder: "CVC",
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full"
        />
      </div>
    </StripeCardField>
  );
}

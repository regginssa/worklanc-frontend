import { CardNumberElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import StripeCardField from "./StripeCardField";
import {
  stripeElementStyles,
  stripeInputWrapperClass,
} from "./stripeElementStyles";

interface StripeCardNumberInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  labelClassName?: string;
}

export default function StripeCardNumberInput({
  label = "Card number",
  required,
  error,
  labelClassName,
}: StripeCardNumberInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <StripeCardField
      label={label}
      required={required}
      error={error}
      labelClassName={labelClassName}
      wrapperClassName="w-full"
    >
      <div className={stripeInputWrapperClass(focused, error)}>
        <CardNumberElement
          options={{
            style: stripeElementStyles,
            placeholder: "1234 1234 1234 1234",
            showIcon: true,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full"
        />
      </div>
    </StripeCardField>
  );
}

import { CardExpiryElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import StripeCardField from "./StripeCardField";
import {
  stripeElementStyles,
  stripeInputWrapperClass,
} from "./stripeElementStyles";

interface StripeCardExpiryInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  labelClassName?: string;
  classname?: string;
}

export default function StripeCardExpiryInput({
  label = "Expiration date",
  required,
  error,
  labelClassName,
  classname,
}: StripeCardExpiryInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <StripeCardField
      label={label}
      required={required}
      error={error}
      labelClassName={labelClassName}
      wrapperClassName={classname}
    >
      <div className={stripeInputWrapperClass(focused, error)}>
        <CardExpiryElement
          options={{
            style: stripeElementStyles,
            placeholder: "MM / YY",
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full"
        />
      </div>
    </StripeCardField>
  );
}

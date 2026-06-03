"use client";

import { Button, Input } from "@/components/atoms";
import { countries } from "country-data-list";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { stripePromise } from "@/lib/stripe";
import BillingAddressFields, {
  type BillingAddressFormData,
} from "./BillingAddressFields";
import StripeCardNumberInput from "./stripe/StripeCardNumberInput";
import StripeCardExpiryInput from "./stripe/StripeCardExpiryInput";
import StripeCardCvcInput from "./stripe/StripeCardCvcInput";

const emptyAddress: BillingAddressFormData = {
  country: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  postalCode: "",
};

interface StripeBillingFormProps {
  onSave?: (paymentMethodId: string) => void | Promise<void>;
  onCancel?: () => void;
  saveLabel?: string;
}

function StripeBillingFormFields({
  onSave,
  onCancel,
  saveLabel = "Save",
}: StripeBillingFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState<BillingAddressFormData>(emptyAddress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Payment system is not ready. Please try again.");
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);

    if (!cardNumber || !cardExpiry || !cardCvc) {
      setError("Card fields are not ready. Please try again.");
      return;
    }

    setLoading(true);

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
        billing_details: {
          name: `${firstName} ${lastName}`.trim(),
          address: {
            line1: address.addressLine1,
            line2: address.addressLine2 || undefined,
            city: address.city,
            state: address.state,
            postal_code: address.zipCode || address.postalCode,
            country: address.country
              ? countries.all.find((c) => c.name === address.country)?.alpha2
              : undefined,
          },
        },
      });

    setLoading(false);

    if (stripeError) {
      setError(stripeError.message ?? "Unable to save card.");
      return;
    }

    if (paymentMethod?.id) {
      await onSave?.(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <StripeCardNumberInput required />

      <div className="grid grid-cols-2 gap-10">
        <Input
          type="text"
          name="firstName"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          type="text"
          name="lastName"
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <StripeCardExpiryInput error={error ?? undefined} required />

        <StripeCardCvcInput required />
      </div>

      <div className="space-y-10">
        <h4 className="text-xl font-medium">Billing address</h4>
        <BillingAddressFields
          formData={address}
          onInputChange={handleAddressInputChange}
          onCountrySelect={(value) =>
            setAddress((prev) => ({ ...prev, country: value }))
          }
          onStateSelect={(value) =>
            setAddress((prev) => ({ ...prev, state: value }))
          }
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-blue-600 py-2 px-6 cursor-pointer hover:underline text-sm font-medium"
          >
            Cancel
          </button>
        )}
        <Button
          type="primary"
          label={saveLabel}
          classname="py-2! px-6! rounded-full! text-sm! font-medium!"
          isSubmit
          loading={loading}
          disabled={!stripe || loading}
        />
      </div>
    </form>
  );
}

export default function StripeBillingForm(props: StripeBillingFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <StripeBillingFormFields {...props} />
    </Elements>
  );
}

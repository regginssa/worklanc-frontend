"use client";

import { Button, Input } from "@/components/atoms";
import CardWindowLogo from "@/public/assets/svgs/icons/other/card_window.svg";
import PayoneerLogo from "@/public/assets/svgs/icons/logos/payoneer.svg";
import Image from "next/image";
import { useState } from "react";

interface PayoneerWithdrawalFormProps {
  onRegister?: (email: string) => Promise<{ registrationLink: string } | null>;
  onCancel?: () => void;
}

export default function PayoneerWithdrawalForm({
  onRegister,
  onCancel,
}: PayoneerWithdrawalFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [step, setStep] = useState<"intro" | "connecting">("intro");

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handleContinue = () => {
    setFormError(null);

    if (!validateEmail(email)) {
      setFormError("Enter a valid email address for your Payoneer account.");
      return;
    }

    setStep("connecting");
  };

  const handleConnect = async () => {
    setFormError(null);
    setLoading(true);

    try {
      const result = await onRegister?.(email.trim());
      if (!result?.registrationLink) {
        setFormError("Unable to start Payoneer registration. Please try again.");
        setStep("intro");
        return;
      }

      window.open(result.registrationLink, "_blank", "noopener,noreferrer");
    } catch {
      setFormError("Unable to connect Payoneer. Please try again.");
      setStep("intro");
    } finally {
      setLoading(false);
    }
  };

  if (step === "connecting") {
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        <Image
          src={CardWindowLogo}
          alt="Redirect to Payoneer"
          className="w-[145px] h-[130px]"
        />
        <div className="space-y-2 text-center max-w-md">
          <h3 className="text-xl font-medium">
            You are about to leave Worklanc
          </h3>
          <p className="text-sm text-slate-600 font-light">
            You will be redirected to Payoneer to securely connect your account
            and set up withdrawals for{" "}
            <span className="font-medium text-slate-900">{email}</span>.
          </p>
        </div>
        <p className="text-sm text-slate-600 font-light text-center max-w-md">
          Earnings will be sent to your Payoneer account. You can transfer funds
          to your local bank from Payoneer.
        </p>

        {formError && (
          <p className="text-sm text-red-600" role="alert">
            {formError}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            type="primary"
            label="Continue to Payoneer"
            icon="mdi:open-in-new"
            size="medium"
            classname="rounded-full!"
            loading={loading}
            onClick={handleConnect}
          />
          <Button
            type="secondary"
            label="Back"
            size="medium"
            classname="rounded-full!"
            disabled={loading}
            onClick={() => setStep("intro")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <Image src={PayoneerLogo} alt="Payoneer" width={120} />
        </div>
        <h4 className="text-lg font-medium">Connect your Payoneer account</h4>
        <p className="text-sm font-light text-slate-600">
          Payoneer is the recommended way to withdraw earnings to your local
          bank in 190+ countries. If you do not have a Payoneer account, you can
          create one during setup.
        </p>
      </div>

      <Input
        type="email"
        name="payoneerEmail"
        label="Payoneer account email"
        subLabel="Use the email associated with your Payoneer account."
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        maxLength={255}
      />

      <ul className="space-y-2 text-xs font-light text-slate-600">
        <li className="flex gap-2">
          <span className="mt-0.5">•</span>
          <span>
            Worklanc does not store your Payoneer password. Connection is
            handled securely on Payoneer.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5">•</span>
          <span>
            Withdrawal fees may apply depending on your country and Payoneer
            plan.
          </span>
        </li>
      </ul>

      {formError && (
        <p className="text-sm text-red-600" role="alert">
          {formError}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button
          type="primary"
          label="Continue"
          icon="mdi:arrow-right"
          size="medium"
          classname="rounded-full!"
          onClick={handleContinue}
        />
        {onCancel && (
          <Button
            type="secondary"
            label="Cancel"
            size="medium"
            classname="rounded-full!"
            onClick={onCancel}
          />
        )}
      </div>
    </div>
  );
}

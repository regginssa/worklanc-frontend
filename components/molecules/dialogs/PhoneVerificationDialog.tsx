import { Button, InputOTP, PhoneInput } from "@/components/atoms";
import PhoneVerificationAPI from "@/lib/api/phoneVerification";
import type { User } from "@/types/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { useEffect, useRef, useState } from "react";
import { Country, Value } from "react-phone-number-input";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

type Step = "phone" | "otp";

interface PhoneVerificationDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
  defaultPhone?: Value;
}

export default function PhoneVerificationDialog({
  open,
  onClose,
  onSuccess,
  defaultPhone,
}: PhoneVerificationDialogProps) {
  const [step, setStep] = useState<Step>("phone");
  const [country, setCountry] = useState<Country>("US");
  const [phone, setPhone] = useState<Value | undefined>(defaultPhone);
  const [sentPhone, setSentPhone] = useState("");
  const [code, setCode] = useState("");
  const [phoneError, setPhoneError] = useState<string>();
  const [codeError, setCodeError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const portalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setStep("phone");
      setPhone(defaultPhone);
      setSentPhone("");
      setCode("");
      setPhoneError(undefined);
      setCodeError(undefined);
      setSending(false);
      setVerifying(false);
      setResending(false);
      setResendCooldown(0);
      return;
    }

    if (defaultPhone) {
      setPhone(defaultPhone);
    }
  }, [open, defaultPhone]);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const validatePhone = (value: Value | undefined) => {
    if (!value) {
      return "Phone number is required";
    }
    if (!isValidPhoneNumber(value)) {
      return "Enter a valid phone number";
    }
    return undefined;
  };

  const validateCode = (value: string) => {
    if (!value.trim()) {
      return "Verification code is required";
    }
    if (value.trim().length < OTP_LENGTH) {
      return `Enter the ${OTP_LENGTH}-digit code`;
    }
    return undefined;
  };

  const sendVerificationCode = async (phoneNumber: string) => {
    const res = await PhoneVerificationAPI.send(phoneNumber);
    if (res?.status !== "pending") {
      setPhoneError(res?.message || "Unable to send verification code right now");
      return false;
    }

    setSentPhone(phoneNumber);
    setStep("otp");
    setCode("");
    setCodeError(undefined);
    setPhoneError(undefined);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    return true;
  };

  const handleSendCode = async () => {
    const nextPhoneError = validatePhone(phone);
    setPhoneError(nextPhoneError);
    if (nextPhoneError) return;

    setSending(true);
    try {
      await sendVerificationCode(String(phone));
    } finally {
      setSending(false);
    }
  };

  const handleResendCode = async () => {
    if (!sentPhone || resendCooldown > 0 || resending) return;

    setResending(true);
    setCodeError(undefined);
    try {
      const res = await PhoneVerificationAPI.send(sentPhone);
      if (res?.status === "pending") {
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
      } else {
        setCodeError(res?.message || "Unable to send verification code right now");
      }
    } finally {
      setResending(false);
    }
  };

  const handleVerifyCode = async () => {
    const nextCodeError = validateCode(code);
    setCodeError(nextCodeError);
    if (nextCodeError || !sentPhone) return;

    setVerifying(true);
    try {
      const res = await PhoneVerificationAPI.verify(sentPhone, code.trim());
      if (res?.status === "approved" && res.user) {
        onSuccess?.(res.user);
        onClose();
        return;
      }
      setCodeError(res?.message || "Verification code is invalid");
    } finally {
      setVerifying(false);
    }
  };

  const handleChangePhoneNumber = () => {
    setStep("phone");
    setCode("");
    setCodeError(undefined);
    setResendCooldown(0);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) onClose();
  };

  const formattedSentPhone = sentPhone
    ? parsePhoneNumberFromString(sentPhone)?.formatInternational() || sentPhone
    : "";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex min-w-xl flex-col">
        <div ref={portalContainerRef} className="contents">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">
            {step === "phone" ? "Verify your phone number" : "Enter your code"}
          </DialogTitle>
          <DialogDescription>
            {step === "phone"
              ? "We'll text you a one-time code to confirm this number. Standard messaging rates may apply."
              : `We sent a ${OTP_LENGTH}-digit code to ${formattedSentPhone}.`}
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto">
          {step === "phone" ? (
            <div className="space-y-3">
              <PhoneInput
                label="Your phone number"
                placeholder="Enter your mobile number"
                country={country}
                required
                value={phone}
                error={phoneError}
                portalContainer={portalContainerRef}
                onCountryChange={(country) => setCountry(country)}
                onChange={(value) => {
                  setPhone(value);
                  if (phoneError) setPhoneError(undefined);
                }}
              />
              <p className="text-sm text-slate-600">
                Use a number you can receive SMS on. We only use it for
                verification and account security — never for marketing.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <span>Didn't get the code?</span>
                <button
                  type="button"
                  className="underline cursor-pointer text-slate-900"
                  onClick={handleChangePhoneNumber}
                >
                  Change phone number
                </button>
              </div>

              <InputOTP
                length={OTP_LENGTH}
                value={code}
                error={codeError}
                onChange={(value) => {
                  setCode(value);
                  if (codeError) setCodeError(undefined);
                }}
              />

              <div className="flex justify-center">
                <button
                  type="button"
                  disabled={resendCooldown > 0 || resending}
                  onClick={handleResendCode}
                  className="text-sm font-medium text-blue-600 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer hover:underline"
                >
                  {resending
                    ? "Sending..."
                    : resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Resend code"}
                </button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button
              type="button"
              className="py-2.5 px-5 cursor-pointer text-sm font-medium"
            >
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label={step === "phone" ? "Send code" : "Verify"}
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            loading={step === "phone" ? sending : verifying}
            onClick={step === "phone" ? handleSendCode : handleVerifyCode}
          />
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

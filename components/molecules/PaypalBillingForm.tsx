"use client";

import CardWindowLogo from "@/public/assets/svgs/icons/other/card_window.svg";
import {
  createPayPalVaultSetupToken,
  savePayPalPaymentMethod,
} from "@/lib/api/payments";
import { paypalClientId, paypalEnvironment } from "@/lib/paypal";
import {
  INSTANCE_LOADING_STATE,
  PayPalProvider,
  PayPalSavePaymentButton,
  usePayPal,
} from "@paypal/react-paypal-js/sdk-v6";
import Image from "next/image";
import { toast } from "sonner";

interface PaypalBillingFormProps {
  onSuccess?: () => void;
}

function PayPalConnectButton({ onSuccess }: PaypalBillingFormProps) {
  const { loadingStatus, error } = usePayPal();

  if (loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
    return (
      <p className="text-sm text-slate-600 font-light">Loading PayPal...</p>
    );
  }

  if (loadingStatus === INSTANCE_LOADING_STATE.REJECTED) {
    return (
      <p className="text-sm text-red-600" role="alert">
        {error?.message ?? "Unable to load PayPal. Please try again."}
      </p>
    );
  }

  return (
    <PayPalSavePaymentButton
      createVaultToken={async () => {
        const data = await createPayPalVaultSetupToken();
        if (!data?.vaultSetupToken) {
          throw new Error("Unable to start PayPal connection.");
        }
        return { vaultSetupToken: data.vaultSetupToken };
      }}
      onApprove={async ({ vaultSetupToken }) => {
        const result = await savePayPalPaymentMethod(vaultSetupToken);
        if (result) {
          toast.success("PayPal account connected.");
          onSuccess?.();
        }
      }}
      onError={() => {
        toast.error("Unable to connect PayPal. Please try again.");
      }}
    />
  );
}

export default function PaypalBillingForm({ onSuccess }: PaypalBillingFormProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <Image
        src={CardWindowLogo}
        alt="Redirect to PayPal"
        className="w-[145px] h-[130px]"
      />
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-medium">You are about to leave Worklanc</h3>
        <p className="text-sm text-slate-600 font-light">
          You will be redirected to PayPal to securely connect your account to
          Worklanc.
        </p>
      </div>
      <p className="text-sm text-slate-600 font-light text-center">
        Worklanc charges will appear on your PayPal account as Worklanc.
      </p>

      {!paypalClientId ? (
        <p className="text-sm text-red-600 text-center" role="alert">
          PayPal is not configured. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID to your
          environment.
        </p>
      ) : (
        <PayPalProvider
          clientId={paypalClientId}
          environment={paypalEnvironment}
          components={["paypal-payments"]}
          pageType="checkout"
        >
          <PayPalConnectButton onSuccess={onSuccess} />
        </PayPalProvider>
      )}
    </div>
  );
}

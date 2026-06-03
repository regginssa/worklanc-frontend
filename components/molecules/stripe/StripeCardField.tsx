import { Icon } from "@iconify/react";
import { ReactNode } from "react";

interface StripeCardFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
}

export default function StripeCardField({
  label,
  required,
  error,
  children,
  wrapperClassName = "",
  labelClassName = "",
}: StripeCardFieldProps) {
  return (
    <div className={`flex flex-col items-start gap-1 ${wrapperClassName}`}>
      {label && (
        <label className={labelClassName}>
          {label} {required && <span>*</span>}
        </label>
      )}
      {children}
      {!!error && (
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:information-outline"
            width={16}
            className="text-red-500"
          />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

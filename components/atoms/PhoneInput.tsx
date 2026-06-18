import { PhoneInput as PhoneInputComponent } from "@/components/reui/phone-input";
import { Icon } from "@iconify/react";
import type { RefObject } from "react";
import { Value, type Country } from "react-phone-number-input";

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  defaultCountry?: Country;
  country?: Country;
  value: Value | undefined;
  required?: boolean;
  error?: string;
  labelClassName?: string;
  classname?: string;
  disabled?: boolean;
  popupClassName?: string;
  portalContainer?: RefObject<HTMLElement | null>;
  onChange: (value: Value) => void;
  onCountryChange?: (country: Country) => void;
}

export default function PhoneInput({
  label,
  placeholder,
  onChange,
  classname,
  defaultCountry,
  country,
  disabled,
  error,
  labelClassName,
  required,
  value,
  popupClassName,
  portalContainer,
  onCountryChange,
}: PhoneInputProps) {
  return (
    <div className={`flex flex-col items-start gap-1 ${classname}`}>
      {label && (
        <label className={`text-sm font-medium ${labelClassName}`}>
          {label}
          {required && <span> *</span>}
        </label>
      )}
      <PhoneInputComponent
        variant="default"
        placeholder={placeholder || "Enter phone number"}
        defaultCountry={country || "US"}
        onCountryChange={onCountryChange}
        popupClassName={popupClassName}
        portalContainer={portalContainer}
        className={`w-full! h-10! flex items-center gap-2 rounded-lg ${
          error
            ? "border-2 border-red-500"
            : disabled
            ? "border border-slate-400 bg-slate-100 cursor-not-allowed"
            : "border border-slate-400 hover:border-2 hover:border-black focus-within:border-2 focus-within:border-black"
        } group transition-all duration-200 [&_[data-slot=input]]:border-0! [&_[data-slot=input]]:bg-transparent! [&_[data-slot=input]]:shadow-none! [&_[data-slot=input]]:outline-none! [&_[data-slot=input]]:ring-0! [&_[data-slot=input]]:focus-visible:border-0! [&_[data-slot=input]]:focus-visible:shadow-none! [&_[data-slot=input]]:focus-visible:outline-none! [&_[data-slot=input]]:focus-visible:ring-0! [&_[data-slot=button]]:border-none! [&_[data-slot=button]]:bg-transparent! [&_[data-slot=button]]:shadow-none! [&_[data-slot=button]]:outline-none! [&_[data-slot=button]]:ring-0! [&_[data-slot=button]]:focus-visible:border-0! [&_[data-slot=button]]:focus-visible:shadow-none! [&_[data-slot=button]]:focus-visible:outline-none! [&_[data-slot=button]]:focus-visible:ring-0!`}
        disabled={disabled}
        value={value}
        onChange={(value: Value) => onChange(value)}
      />
      {!!error && (
        <div className="flex items-start gap-2">
          <Icon
            icon="mdi:information-outline"
            className="text-red-500 size-4"
          />
          <p className="text-red-600 text-sm flex-1">{error}</p>
        </div>
      )}
    </div>
  );
}

import { Input, SearchCombobox } from "@/components/atoms";
import { countries } from "country-data-list";
import { State } from "country-state-city";

export interface BillingAddressFormData {
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  postalCode: string;
}

interface BillingAddressFieldsProps {
  formData: BillingAddressFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountrySelect: (value: string) => void;
  onStateSelect: (value: string) => void;
}

export default function BillingAddressFields({
  formData,
  onInputChange,
  onCountrySelect,
  onStateSelect,
}: BillingAddressFieldsProps) {
  const countryCode = countries.all.find(
    (c) => c.name === formData.country
  )?.alpha2;
  const states = State.getStatesOfCountry(countryCode);

  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <SearchCombobox
          name="country"
          label="Country"
          placeholder="Select country"
          options={countries.all.map((c) => c.name)}
          defaultOption={formData.country}
          onSelect={onCountrySelect}
        />
      </div>

      <Input
        type="text"
        name="addressLine1"
        label="Address line 1"
        value={formData.addressLine1}
        onChange={onInputChange}
      />

      <Input
        type="text"
        name="addressLine2"
        label="Address line 2 - optional"
        value={formData.addressLine2}
        onChange={onInputChange}
      />

      <div className="grid grid-cols-2 gap-10">
        <Input
          type="text"
          name="city"
          label="City"
          classname="flex-1"
          value={formData.city}
          onChange={onInputChange}
        />
        <SearchCombobox
          name="state"
          label="State/Province"
          placeholder="Select state"
          options={states.map((s) => s.name)}
          defaultOption={formData.state}
          onSelect={onStateSelect}
        />
        {states.length > 0 ? (
          <Input
            type="text"
            name="zipCode"
            label="Zip code"
            classname="flex-1"
            value={formData.zipCode}
            onChange={onInputChange}
          />
        ) : (
          <Input
            type="text"
            name="postalCode"
            label="Postal code"
            classname="flex-1"
            value={formData.postalCode}
            onChange={onInputChange}
          />
        )}
      </div>
    </>
  );
}

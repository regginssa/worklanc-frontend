import { ClientSettingsLayout } from "@/components/layouts";
import { AccountType } from "@/types/user";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Button, Input, SearchCombobox } from "@/components/atoms";
import { countries } from "country-data-list";
import { useRouter } from "next/router";
import { State } from "country-state-city";

export default function Tax() {
  const [accountType, setAccountType] = useState<AccountType>("client");

  if (accountType === "client") {
    return (
      <ClientSettingsLayout
        seo={{
          title: "Tax Information - Worklanc",
          description: "Tax Information - Worklanc",
          url: "nx/tax",
        }}
      >
        <Content />
      </ClientSettingsLayout>
    );
  }
}

const Content = () => {
  const [formData, setFormData] = useState({
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    postalCode: "",
  });
  const router = useRouter();
  const countryCode = countries.all.find(
    (c) => c.name === formData?.country
  )?.alpha2;
  const states = State.getStatesOfCountry(countryCode);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-medium">Tax Information</h2>
        <p className="text-slate-600">
          We’re required to comply with the tax laws of the countries where we
          do business. Providing your tax information helps ensure accurate tax
          reporting and support payment processing. Learn more in our{" "}
          <Link href="#" className="text-blue-600 cursor-pointer underline">
            help article
          </Link>
          .
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-medium">Tax residence</h3>
        <p className="text-slate-600">
          This address will be displayed on invoices.
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 cursor-pointer font-medium hover:underline"
        >
          Use my profile address
        </motion.button>

        <form className="space-y-10 mt-4">
          <div className="grid grid-cols-2 gap-10">
            <SearchCombobox
              name="country"
              label="Country"
              placeholder="Select country"
              options={countries.all.map((c) => c.name)}
              defaultOption={formData?.country}
              onSelect={(v: string) => setFormData({ ...formData, country: v })}
            />
          </div>

          <Input
            type="text"
            name="addressLine1"
            label="Address line 1"
            value={formData?.addressLine1}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            name="addressLine2"
            label="Address line 2 - optional"
            value={formData?.addressLine2}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-2 gap-10">
            <Input
              type="text"
              name="city"
              label="City"
              classname="flex-1"
              value={formData?.city}
              onChange={handleInputChange}
            />
            <SearchCombobox
              name="state"
              label="State/Province"
              placeholder="Select state"
              options={states.map((s) => s.name)}
              defaultOption={formData?.state}
              onSelect={(v: string) => setFormData({ ...formData, state: v })}
            />
            {states.length > 0 ? (
              <Input
                type="text"
                name="zipCode"
                label="Zip code"
                classname="flex-1"
                value={formData?.zipCode}
                onChange={handleInputChange}
              />
            ) : (
              <Input
                type="text"
                name="postalCode"
                label="Postal code"
                classname="flex-1"
                value={formData?.postalCode}
                onChange={handleInputChange}
              />
            )}
          </div>

          <div className="flex items-center justify-end gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 py-2 px-6 cursor-pointer hover:underline font-medium"
              onClick={() => router.back()}
            >
              Cancel
            </motion.button>
            <Button
              type="primary"
              label="Save"
              classname="py-2! px-6! rounded-md!"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import Image from "next/image";
import AvatarImage from "@/public/assets/svgs/icons/other/avatar.svg";
import {
  Button,
  DatePicker,
  Input,
  PhoneInput,
  SearchCombobox,
} from "@/components/atoms";
import { useState } from "react";
import { countries } from "country-data-list";
import { Value } from "react-phone-number-input";
import { motion } from "motion/react";
import { useRouter } from "next/router";

export default function Location() {
  const [formData, setFormData] = useState<any>({
    birthday: null,
    country: "United States",
    address: "",
  });
  const [errors, setErrors] = useState<any>();
  const router = useRouter();

  const handleInputChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <CreateProfileLayout
      title="A few last details, then you can check and publish your profile."
      description="A professional photo helps you build trust with your clients. To keep things safe and simple, they’ll pay you through us - which is why we need your personal information."
      currentStep={10}
      totalSteps={10}
      seo={{
        title:
          "A few last details, then you can check and publish your profile.",
        description:
          "A professional photo helps you build trust with your clients. To keep things safe and simple, they’ll pay you through us - which is why we need your personal information.",
        url: "/nx/create-profile/location",
      }}
    >
      <div className="flex items-start">
        <div className="flex flex-col items-center gap-6 px-6">
          <button className="cursor-pointer">
            <Image src={AvatarImage} alt="Avatar" width={100} height={100} />
          </button>
          <Button
            type="outline"
            size="medium"
            label="Upload photo"
            icon="mdi:plus"
            classname="font-medium! text-sm! py-1.5! px-5! rounded-full!"
          />
        </div>

        <form className="flex-1 space-y-6">
          <div className="flex">
            <DatePicker
              label="Date of Birth"
              placeholder="Select date"
              name="birthday"
              value={formData.birthday}
              required
              onChange={(date: Date) =>
                handleInputChange({ target: { name: "birthday", value: date } })
              }
            />
          </div>

          <div className="bg-slate-200 h-[1px]"></div>

          <SearchCombobox
            label="Country"
            labelClassName="text-sm font-medium"
            classname="w-1/2"
            name="country"
            options={countries.all.map((c) => c.name)}
            error={errors?.country}
            defaultOption={formData?.country}
            required
            onSelect={(v: string) => setFormData({ ...formData, country: v })}
          />

          <div className="flex items-center gap-6">
            <Input
              type="text"
              name="address"
              label="Street address"
              labelClassName="text-sm font-medium"
              placeholder="Enter street address"
              classname="w-2/3"
              required
              value={formData.address}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="address"
              label="Apt/Suite"
              labelClassName="text-sm font-medium"
              placeholder="Apt/Suite (Optional)"
              classname="flex-1"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-6">
            <Input
              type="text"
              name="city"
              label="City"
              labelClassName="text-sm font-medium"
              placeholder="Enter city"
              classname="flex-1"
              required
              value={formData.city}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="state"
              label="State/Province"
              labelClassName="text-sm font-medium"
              placeholder="Enter state/province"
              classname="flex-1"
              required
              value={formData.state}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="zip"
              label="ZIP/Postal code"
              labelClassName="text-sm font-medium"
              placeholder="Enter ZIP/Postal code"
              classname="flex-1"
              required
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <PhoneInput
            label="Phone"
            placeholder="Enter number"
            defaultCountry="US"
            required
            classname="w-1/2!"
            value={formData.phone}
            onChange={(v: Value) => setFormData({ ...formData, phone: v })}
          />
        </form>
      </div>

      <div className="mt-20 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, add your photo and location"
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() => router.push("/nx/create-profile/location")}
        />
      </div>
    </CreateProfileLayout>
  );
}

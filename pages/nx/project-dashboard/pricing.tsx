import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Textarea,
} from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { CheckboxGroup } from "@/components/molecules";

const numberOfRevisionsOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "Unlimited", value: "unlimited" },
];

export default function Pricing() {
  const [formData, setFormData] = useState<any>({});
  const [is3Tiers, setIs3Tiers] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (value: any) => {
    setFormData({ ...formData, numberOfRevisions: value });
  };

  return (
    <ProjectDashboardOnboardingLayout
      seo={{
        title: "Project Catalog - Worklanc",
        description: "Project Catalog - Worklanc",
        url: "/nx/project-dashboard/pricing",
      }}
      currentStep={1}
    >
      <div className="flex items-start">
        <div className="w-3/4 pr-10 space-y-10 border-r border-slate-400">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">Price & scope</h1>
            <Button
              type="outline"
              label="Preview project"
              size="medium"
              icon="mdi:eye"
              classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
            />
          </div>

          <form className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h5 className="text-2xl font-medium">Create pricing tiers</h5>
                <p className="font-light">
                  Customize your project with 1 or 3 pricing tiers
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-light">3 Tiers</span>
                <Switch checked={is3Tiers} onCheckedChange={setIs3Tiers} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div></div>
              <span className="text-base font-medium">Starter</span>
              <span className="text-base font-medium">Standard</span>
              <span className="text-base font-medium">Advanced</span>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <label className="text-base">Custom Title</label>

              <Textarea
                name="starterTitle"
                subLabel="0/30 characters"
                rows={2}
                value={formData.starterTitle}
                onChange={handleTextareaChange}
              />

              <Textarea
                name="starterTitle"
                subLabel="0/30 characters"
                rows={2}
                value={formData.starterTitle}
                onChange={handleTextareaChange}
              />

              <Textarea
                name="starterTitle"
                subLabel="0/30 characters"
                rows={2}
                value={formData.starterTitle}
                onChange={handleTextareaChange}
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-1">
                <label className="text-base block">Custom Description</label>
                <Link
                  href="#"
                  className="text-blue-600 text-base cursor-pointer hover:underline text-center"
                >
                  Remove custom titles and descriptions
                </Link>
              </div>

              <Textarea
                name="starterTitle"
                subLabel="0/30 characters"
                rows={2}
                value={formData.starterTitle}
                onChange={handleTextareaChange}
              />

              <Textarea
                name="starterTitle"
                subLabel="0/30 characters"
                rows={2}
                value={formData.starterTitle}
                onChange={handleTextareaChange}
              />

              <Textarea
                name="starterTitle"
                subLabel="0/30 characters"
                rows={2}
                value={formData.starterTitle}
                onChange={handleTextareaChange}
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              <label className="text-base">Delivery Days</label>

              <Input
                type="number"
                name="starterTitle"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="starterTitle"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="starterTitle"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              <label className="text-base">Number of Revisions</label>

              <Dropdown
                name="starterNumberOfRevisions"
                options={numberOfRevisionsOptions}
                value={formData.numberOfRevisions}
                onSelect={handleDropdownChange}
              />

              <Dropdown
                name="starterNumberOfRevisions"
                options={numberOfRevisionsOptions}
                value={formData.numberOfRevisions}
                onSelect={handleDropdownChange}
              />

              <Dropdown
                name="starterNumberOfRevisions"
                options={numberOfRevisionsOptions}
                value={formData.numberOfRevisions}
                onSelect={handleDropdownChange}
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              <label className="text-base">
                Number of Mobile Operating Systems
              </label>

              <Input
                type="number"
                name="starterTitle"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="starterTitle"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="starterTitle"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />
            </div>

            <ul className="space-y-4">
              <li className="text-2xl font-medium">Pricing Tier Options</li>

              <li className="grid grid-cols-4 gap-6 py-2 hover:bg-slate-100 transition-colors duration-200">
                <label className="text-base">App Store Upload</label>

                <Checkbox />
                <Checkbox />
                <Checkbox />
              </li>

              <li className="grid grid-cols-4 gap-6 py-2 hover:bg-slate-100 transition-colors duration-200">
                <label className="text-base">App Icon Design</label>

                <Checkbox />
                <Checkbox />
                <Checkbox />
              </li>

              <li className="grid grid-cols-4 gap-6 py-2 hover:bg-slate-100 transition-colors duration-200">
                <label className="text-base">Splash Screen</label>

                <Checkbox />
                <Checkbox />
                <Checkbox />
              </li>

              <li className="grid grid-cols-4 gap-6 py-2 hover:bg-slate-100 transition-colors duration-200">
                <label className="text-base">Ad Network Integration</label>

                <Checkbox />
                <Checkbox />
                <Checkbox />
              </li>

              <li className="grid grid-cols-4 gap-6 py-2 hover:bg-slate-100 transition-colors duration-200">
                <label className="text-base">Source Code</label>

                <Checkbox />
                <Checkbox />
                <Checkbox />
              </li>
            </ul>

            <div className="grid grid-cols-4 gap-6">
              <label className="text-base">Project price</label>

              <Input
                type="number"
                name="starterTitle"
                placeholder="$0.00"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="starterTitle"
                placeholder="$0.00"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="starterTitle"
                placeholder="$0.00"
                value={formData.starterTitle}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-6 mt-14">
              <h5 className="text-3xl font-medium">
                Choose add-ons (optional)
              </h5>

              <ul className="space-y-4"></ul>
            </div>

            <div className="flex items-center justify-between">
              <Button
                type="outline"
                label="Back"
                size="medium"
                classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
              />

              <div className="flex items-center gap-8">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  className="py-2.5 text-sm font-medium text-blue-600 cursor-pointer"
                >
                  Save & Exit
                </motion.button>
                <Button
                  type="primary"
                  isSubmit
                  label="Save & Continue"
                  classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
                  onClick={() => router.push("/nx/project-dashboard/pricing")}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1 pl-10 space-y-10">
          <h2 className="text-2xl font-semibold">Pricing setup</h2>

          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Detail the scope and pricing of your project so clients
                understand what they will receive.
              </span>
            </li>

            <li className="flex items-start gap-2">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Build 1 or 3 tiers to provide different pricing options for your
                clients.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </ProjectDashboardOnboardingLayout>
  );
}

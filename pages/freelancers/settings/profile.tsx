import { Button, Dropdown, IconButton } from "@/components/atoms";
import { FreelancerSettingsLayout } from "@/components/layouts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import TurnstileAccessGate from "@/components/molecules/security/TurnstileAccessGate";
import { getTurnstileSession } from "@/lib/security/turnstile";

export default function Profile() {
  const levels = [
    {
      title: "Entry level",
      descripton: "I am relatively new to this field",
      value: "entry",
    },
    {
      title: "Intermediate",
      descripton: "I have substantial experience in this field",
      value: "intermediate",
    },
    {
      title: "Expert",
      descripton: "I have comprehensive and deep expertise in this field",
      value: "expert",
    },
  ];

  if (!getTurnstileSession("freelancer_profile")) {
    return <TurnstileAccessGate scope="freelancer_profile" />;
  }

  return (
    <FreelancerSettingsLayout
      seo={{
        title: "Profile Settings - Worklanc",
        description: "Profile Settings - Worklanc",
        url: "/freelancers/settings/profile",
      }}
    >
      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium">My profile</h3>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-sm text-blue-600 font-medium cursor-pointer hover:underline"
          >
            View my profile as others see it
          </motion.button>
        </div>

        <div className="space-y-8">
          <Dropdown
            name="visability"
            label="Visibility"
            labelClassName="mb-2!"
            options={[
              { label: "Public", value: "public" },
              { label: "Private", value: "private" },
            ]}
            value="public"
            onSelect={() => {}}
          />

          <Dropdown
            name="preference"
            label="Project preference"
            placeholder="Project preference"
            labelClassName="mb-2!"
            options={[
              {
                label: "Both short-term and long-term projects",
                value: "both",
              },
              { label: "Long-term projects (3+ months)", value: "long" },
              {
                label: "Short-term projects (less than 3 months)",
                value: "short",
              },
            ]}
            value=""
            onSelect={() => {}}
          />
        </div>

        <div className="text-sm space-y-4">
          <div className="flex items-center gap-1">
            <p className="font-medium">Earnings privacy</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Icon
                  icon="mdi:question-mark-circle-outline"
                  className="w-4 h-4"
                />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-sm p-2">
                  Please note that by checking this option, you will not show up
                  in search results if a client chooses to filter the results by
                  earnings.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <p>Want to keep your earnings private?</p>
          <div className="flex items-center gap-1">
            <button className="cursor-pointer text-blue-600 hover:underline">
              Upgrade to a Freelancer Plus membership
            </button>
            <p>to enable this setting.</p>
          </div>
        </div>
        </div>

        <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <h3 className="text-2xl font-medium">Experience level</h3>
        <ul className="grid grid-cols-3 gap-6">
          {levels.map((level, idx) => (
            <motion.li
              key={level.value}
              whileTap={{ scale: 0.95 }}
              className={`border rounded-xl px-4 py-8 cursor-pointer relative ${
                level.value === "entry"
                  ? "border-black bg-slate-50"
                  : "border-slate-300"
              } transition-all duration-200`}
            >
              <h5 className=" font-medium">{level.title}</h5>
              <p className="text-sm text-slate-600 mt-4">{level.descripton}</p>

              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  level.value === "entry" ? "border-black" : "border-slate-300"
                }`}
              >
                <span
                  className={`transition-all duration-200 w-3 h-3 rounded-full bg-black ${
                    level.value === "entry" ? "scale-100" : "scale-0"
                  }`}
                ></span>
              </div>
            </motion.li>
          ))}
        </ul>
        </div>

        <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium">Categories</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-medium">Accounting & Consulting</h4>

          <ul className="flex flex-wrap items-center gap-2 mt-2">
            {[
              { label: "Accounting", value: "accounting" },
              { label: "Consulting", value: "consulting" },
            ].map((skill) => (
              <li
                key={skill.value}
                className="py-1 px-4 rounded-md bg-slate-200 text-sm text-slate-800"
              >
                {skill.label}
              </li>
            ))}
          </ul>
        </div>
        </div>

        <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <h3 className="text-2xl font-medium">Linked accounts</h3>
        <div className="flex items-center gap-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="border border-slate-800 hover:bg-slate-50 transition-colors duration-200 cursor-pointer text-slate-800 text-sm font-medium rounded-full py-2 flex-1 flex items-center gap-2 justify-center"
          >
            <Icon icon="mdi:github" className="w-5 h-5" />
            <span>GitHub</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="border border-slate-800 hover:bg-slate-50 transition-colors duration-200 cursor-pointer text-slate-800 text-sm font-medium rounded-full py-2 flex-1 flex items-center gap-2 justify-center"
          >
            <Icon icon="mdi:stack-overflow" className="w-5 h-5" />
            <span>Stack Overflow</span>
          </motion.button>
        </div>
        </div>

        <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div>
          <h3 className="text-2xl font-medium">AI preference</h3>
          <p className="mt-1 text-slate-600 text-sm">
            Choose how your Worklanc data is used for AI training and
            improvement. Learn more
          </p>
        </div>

        <Button
          type="outline"
          label="Set preference"
          size="medium"
          classname="py-2! px-5! font-medium! text-sm! rounded-full!"
        />
        </div>
    </FreelancerSettingsLayout>
  );
}

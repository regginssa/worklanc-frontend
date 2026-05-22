import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { ExperienceType } from "@/types/user";
import { Button } from "@/components/atoms";
import { useRouter } from "next/router";

const Search = require("@/public/assets/svgs/icons/other/search.svg");
const Pencil = require("@/public/assets/svgs/icons/other/pencil_in_hand.svg");
const WomanPc = require("@/public/assets/svgs/icons/other/woman_pc.svg");

const radios = [
  { label: "I am brand new to this", icon: Search, value: "beginner" },
  { label: "I have some experience", icon: Pencil, value: "junior" },
  { label: "I am an expert", icon: WomanPc, value: "senior" },
];

export default function Experience() {
  const [exp, setExp] = useState<ExperienceType>("junior");
  const router = useRouter();

  return (
    <CreateProfileLayout
      title="A few quick questions: first, have you freelanced before?"
      description="This lets us know how much help to give you along the way. We won’t share your answer with anyone else, including potential clients."
      currentStep={1}
      totalSteps={3}
      seo={{
        title: "A few questions: first, have you freelanced before?",
        description:
          "This lets us know how much help to give you along the way. We won’t share your answer with anyone else, including potential clients.",
        url: "/nx/create-profile/experience",
      }}
    >
      <div className="grid grid-cols-3 gap-6">
        {radios.map((r, i) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setExp(r.value as any)}
          >
            <Card
              key={i}
              className={`hover:bg-slate-100 ${
                exp === r.value && "border border-black"
              } transition-all duration-200`}
            >
              <CardContent className="rounded-2xl p-4 space-y-4 relative">
                <Image src={r.icon} alt={r.value} width={145} height={130} />
                <p className="text-2xl text-left">{r.label}</p>
                <div
                  className={`absolute top-0 right-4 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    exp === r.value ? "border-black" : "border-slate-300"
                  }`}
                >
                  <span
                    className={`transition-all duration-200 w-3 h-3 rounded-full bg-black ${
                      exp === r.value ? "scale-100" : "scale-0"
                    }`}
                  ></span>
                </div>
              </CardContent>
            </Card>
          </motion.button>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <div className="flex items-center gap-4">
          <button className="py-2 px-4 text-sm font-medium hover:underline">
            Skip for now
          </button>

          <Button
            type="primary"
            label="Next"
            classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
            onClick={() => router.push("/nx/create-profile/goal")}
          />
        </div>
      </div>
    </CreateProfileLayout>
  );
}

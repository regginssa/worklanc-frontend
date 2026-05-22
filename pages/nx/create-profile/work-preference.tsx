import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { WorkPreferenceType } from "@/types/user";
import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/atoms";
import { useRouter } from "next/router";

const PC = require("@/public/assets/svgs/icons/other/pc_control.svg");
const Calc = require("@/public/assets/svgs/icons/other/calc_control.svg");

const radios = [
  {
    label: "I’d like to find opportunities myself",
    description:
      "Clients post jobs on our Talent Marketplace™: you can browse and bid for them, or get invited by a client.",
    icon: PC,
    value: "find_jobs",
  },
  {
    label: "I’d like to package up my work for clients to buy",
    description:
      "Define your service with prices and timelines: we’ll list it in our Project Catalog™ for clients to buy right away.",
    icon: Calc,
    value: "sell_services",
  },
];

export default function WorkPerformance() {
  const [perf, setPerf] = useState<WorkPreferenceType>("find_jobs");
  const router = useRouter();

  return (
    <CreateProfileLayout
      title="And how would you like to work?"
      description="Everybody works in different ways, so we have different ways of helping you win work. You can select multiple preferences now and can always change it later!"
      currentStep={3}
      totalSteps={3}
      seo={{
        title: "And how would you like to work?",
        description:
          "Everybody works in different ways, so we have different ways of helping you win work. You can select multiple preferences now and can always change it later!",
        url: "/nx/create-profile/work-preference",
      }}
    >
      <div className="grid grid-cols-3 gap-6">
        {radios.map((r, i) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setPerf(r.value as any)}
          >
            <Card
              key={i}
              className={`hover:bg-slate-100 border ${
                perf === r.value ? "border-black" : "border-slate-100"
              } transition-all duration-200`}
            >
              <CardContent className="rounded-2xl p-4 space-y-4 relative">
                <Image src={r.icon} alt={r.value} width={145} height={130} />
                <p className="text-2xl text-left">{r.label}</p>
                <div
                  className={`absolute top-0 right-4 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    perf === r.value ? "border-black" : "border-slate-300"
                  }`}
                >
                  <span
                    className={`transition-all duration-200 w-3 h-3 rounded-full bg-black ${
                      perf === r.value ? "scale-100" : "scale-0"
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
            label="Next, create a profile"
            classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
            onClick={() => (window.location.href = "/nx/create-profile/goal")}
          />
        </div>
      </div>
    </CreateProfileLayout>
  );
}

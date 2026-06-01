import { JobPostLayout } from "@/components/layouts";
import { useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/atoms";
import { useRouter } from "next/router";

export default function JobPostBudget() {
  const [budgetType, setBudgetType] = useState<"hourly" | "fixed">("hourly");
  const [budget, setBudget] = useState({
    min: 45,
    max: 70,
    fixed: 0,
  });
  const router = useRouter();

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBudget({ ...budget, [e.target.name]: Number(e.target.value) });

  return (
    <JobPostLayout
      seo={{
        title: "Budget - Worklanc",
        description: "Budget - Worklanc",
        url: "nx/job-post/instant/budget",
      }}
      step={5}
      nextLabel="Next: Description"
      onNext={() => router.push("/nx/job-post/instant/add-description")}
    >
      <div className="flex items-start gap-10">
        <div className="flex-1 space-y-8">
          <h1 className="text-3xl font-medium">Tell us about your budget.</h1>
          <p className="text-sm">
            This will help us match you to talent within your range.
          </p>
        </div>

        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                budgetType === "hourly"
                  ? "border-black bg-slate-100"
                  : "border-slate-300"
              }`}
              onClick={() => {
                setBudgetType("hourly");
              }}
            >
              <div className="flex items-center justify-between">
                <Icon icon="mdi:clock-time-four-outline" className="size-6" />

                <div
                  className={`w-5 h-5 overflow-hidden flex items-center border ${
                    budgetType === "hourly"
                      ? "border-black"
                      : "border-slate-300"
                  } justify-center transition-all duration-200 group-hover:bg-slate-100 rounded-full`}
                >
                  <div
                    className={`w-2.5 h-2.5 bg-zinc-800 rounded-full transition-all duration-200 ${
                      budgetType === "hourly" ? "scale-100" : "scale-0"
                    }`}
                  ></div>
                </div>
              </div>

              <h3 className="text-sm text-left font-light mt-4">Hourly rate</h3>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                budgetType === "fixed"
                  ? "border-black bg-slate-100"
                  : "border-slate-300"
              }`}
              onClick={() => {
                setBudgetType("fixed");
              }}
            >
              <div className="flex items-center justify-between">
                <Icon icon="solar:tag-price-outline" className="size-6" />

                <div
                  className={`w-5 h-5 overflow-hidden flex items-center border ${
                    budgetType === "fixed" ? "border-black" : "border-slate-300"
                  } justify-center transition-all duration-200 group-hover:bg-slate-100 rounded-full`}
                >
                  <div
                    className={`w-2.5 h-2.5 bg-zinc-800 rounded-full transition-all duration-200 ${
                      budgetType === "fixed" ? "scale-100" : "scale-0"
                    }`}
                  ></div>
                </div>
              </div>

              <h3 className="text-sm text-left font-light mt-4">Fixed price</h3>
            </motion.button>
          </div>

          {budgetType === "hourly" ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-6">
                  <Input
                    type="number"
                    name="min"
                    label="From ($/hr)"
                    labelClassName="text-sm!"
                    value={budget.min}
                    onChange={handleBudgetChange}
                  />
                  <Input
                    type="number"
                    name="min"
                    label="To ($/hr)"
                    labelClassName="text-sm!"
                    value={budget.max}
                    onChange={handleBudgetChange}
                  />
                </div>
                <p className="text-xs text-slate-600">
                  This is the average rate for similar projects.
                </p>
              </div>

              <p className="text-sm text-slate-600">
                Professionals tend to charge{" "}
                <strong className="text-black font-medium">$45 - $70</strong>{" "}
                /hour (USD) for full stack development projects like yours.
                Experts may charge higher rates.
              </p>

              <button className="text-blue-600 cursor-pointer text-sm hover:underline">
                Not ready to set an hourly rate?
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                Set a price for the project and pay at the end, or you can
                divide the project into milestones and pay as each milestone is
                completed.
              </p>

              <div className="space-y-4">
                <div className="text-sm">
                  <h4>What is the best cost estimate for your project?</h4>
                  <p className="text-slate-600">
                    You can negotiate this cost and create milestones when you
                    chat with your freelancer.
                  </p>
                </div>

                <Input
                  type="number"
                  name="fixed"
                  labelClassName="text-sm!"
                  value={budget.fixed}
                  onChange={handleBudgetChange}
                />

                <button className="text-blue-600 cursor-pointer text-sm hover:underline">
                  Not ready to set a budget?
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </JobPostLayout>
  );
}

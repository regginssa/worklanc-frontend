import { Button, IconButton, Input, Textarea } from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Plus } from "lucide-react";
import { motion, steps } from "motion/react";
import { useRouter } from "next/router";
import { useState } from "react";

const originalSteps = [
  {
    title: "Client purchases the project and sends requirements.",
    description: "Client purchases the project and sends requirements.",
  },
  {
    title: "You complete the project following the steps that you add here.",
    description:
      "Check off steps in the project workroom to keep your client up-to-date on the progress.",
  },
  {
    title: "Client reviews and approves your work, and you get paid.",
    description: "Your client may request revisions before approving the work.",
  },
];

export default function Description() {
  const [formData, setFormData] = useState<any>({});
  const [addStepFormData, setAddStepFormData] = useState<any>({});
  const [addQuestionFormData, setAddQuestionFormData] = useState<any>({});
  const [addStepOpen, setAddStepOpen] = useState(false);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/nx/project-dashboard/pricing");
  };

  const handleAddStep = () => {
    setFormData({
      ...formData,
      additionalSteps: [...(formData?.additionalSteps || []), addStepFormData],
    });
    setAddStepFormData({});
    setAddStepOpen(false);
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      frequentlyAskedQuestions: [
        ...(formData?.frequentlyAskedQuestions || []),
        addQuestionFormData,
      ],
    });
    setAddQuestionFormData({});
    setAddQuestionOpen(false);
  };
  return (
    <ProjectDashboardOnboardingLayout
      seo={{
        title: "Project Catalog - Worklanc",
        description: "Project Catalog - Worklanc",
        url: "/nx/project-dashboard/pricing",
      }}
      currentStep={5}
    >
      <div className="flex items-start">
        <div className="w-3/4 pr-10 space-y-10 border-r border-slate-400">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">Project description</h1>
            <Button
              type="outline"
              label="Preview project"
              size="medium"
              icon="solar:eye-linear"
              classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
            />
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="text-xl font-medium">Project summary</h5>
                <p className="text-base text-slate-800">
                  Briefly explain what sets you and your project apart.
                </p>
              </div>

              <Textarea
                name="description"
                placeholder="EXAMPLE: You'll get a polished logo design that will bring your company to the next level. With over 5 years of experience in freelance and agency environments, I care deeply about helping startups tell their story through design. The work I deliver is 100% original and high quality."
                subLabel="0/1,200 characters (min. 120)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="text-xl font-medium">Project steps</h5>
                <p className="text-base text-slate-800">
                  List the steps involved in delivering your project.
                </p>
              </div>

              <ul className="space-y-4">
                {originalSteps.map((step, index) => (
                  <li key={index} className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="size-8 flex items-center justify-center rounded-full border-2 border-slate-300">
                        {index + 1}
                      </div>
                      <div className="">
                        <h5 className="text-base font-medium">{step.title}</h5>
                        <p className="text-base text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {index === 1 && formData?.additionalSteps?.length > 0 && (
                      <ul className="pl-12">
                        {formData.additionalSteps.map(
                          (as: any, index: number) => (
                            <li
                              key={index}
                              className="py-4 border-t border-slate-600 flex items-center justify-between"
                            >
                              <div className="flex items-start gap-2 text-sm">
                                <span>{index + 1}.</span>

                                <div>
                                  <h5 className="font-medium">{as.title}</h5>
                                  <p className="text-slate-600">
                                    {as.description}
                                  </p>
                                </div>
                              </div>

                              <IconButton
                                variant="secondary"
                                icon="mdi:dots-horizontal"
                                className="p-1!"
                                onClick={() => {}}
                              />
                            </li>
                          )
                        )}
                      </ul>
                    )}

                    {addStepOpen && index === 1 && (
                      <div className="p-6 rounded-md bg-slate-100 space-y-6">
                        <Input
                          type="text"
                          name="title"
                          placeholder="Step name"
                          value={addStepFormData.title}
                          onChange={(e) =>
                            setAddStepFormData({
                              ...addStepFormData,
                              title: e.target.value,
                            })
                          }
                        />
                        <Textarea
                          name="description"
                          placeholder="Step description"
                          subLabel="0/ 250 characters"
                          value={addStepFormData.description}
                          onChange={(e) =>
                            setAddStepFormData({
                              ...addStepFormData,
                              description: e.target.value,
                            })
                          }
                        />
                        <div className="flex items-center gap-4 justify-end">
                          <button className="cursor-pointer text-sm font-medium text-blue-600 hover:underline px-5 py-2">
                            Cancel
                          </button>
                          <Button
                            type="primary"
                            label="Add"
                            classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
                            onClick={handleAddStep}
                          />
                        </div>
                      </div>
                    )}
                  </li>
                ))}
                <li
                  className="flex items-center gap-2 text-base font-medium text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setAddStepOpen(true)}
                >
                  <Plus className="size-5" />
                  Add a step
                </li>
              </ul>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h5 className="text-xl font-medium">
                      Frequently asked questions (optional)
                    </h5>
                    <p className="text-base text-slate-800">
                      Write answers to common questions your client ask. Add up
                      to 5 questions.
                    </p>
                  </div>

                  {formData?.frequentlyAskedQuestions?.length > 0 && (
                    <ul>
                      {formData.frequentlyAskedQuestions.map(
                        (fq: any, index: number) => (
                          <li
                            key={index}
                            className="py-4 border-t border-slate-600 flex items-center justify-between"
                          >
                            <div className="flex items-start gap-2 text-sm">
                              <span>{index + 1}.</span>
                              <div>
                                <h5 className="font-medium">{fq.question}</h5>
                                <p className="text-slate-600">{fq.answer}</p>
                              </div>
                            </div>

                            <IconButton
                              variant="secondary"
                              icon="mdi:dots-horizontal"
                              className="p-1!"
                              onClick={() => {}}
                            />
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {addQuestionOpen && (
                    <div className="p-6 rounded-md bg-slate-100 space-y-6">
                      <Input
                        type="text"
                        name="question"
                        placeholder="Question"
                        value={addQuestionFormData.question}
                        onChange={(e) =>
                          setAddQuestionFormData({
                            ...addQuestionFormData,
                            question: e.target.value,
                          })
                        }
                      />
                      <Textarea
                        name="answer"
                        subLabel="0/ 250 characters"
                        placeholder="Answer"
                        value={addQuestionFormData.answer}
                        onChange={(e) =>
                          setAddQuestionFormData({
                            ...addQuestionFormData,
                            answer: e.target.value,
                          })
                        }
                      />

                      <div className="flex items-center gap-4 justify-end">
                        <button className="cursor-pointer text-sm font-medium text-blue-600 hover:underline px-5 py-2">
                          Cancel
                        </button>
                        <Button
                          type="primary"
                          label="Add"
                          classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
                          onClick={handleAddQuestion}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className="flex items-center gap-2 text-base font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setAddQuestionOpen(true)}
                  >
                    <Plus className="size-5" />
                    Add a question
                  </button>
                </div>
              </TooltipTrigger>

              <TooltipContent side="right">
                <p className="text-sm p-2">
                  Anticipate your client's questions here.
                  <br />
                  <br />
                  Here are some examples:
                  <br />
                  <br />
                  What's included in a revision?
                  <br />
                  What tools do you use?
                  <br />
                  How often can I expect to hear from you if I buy this project?
                </p>
              </TooltipContent>
            </Tooltip>

            <div className="flex items-center justify-between">
              <Button
                type="outline"
                label="Back"
                size="medium"
                classname="rounded-md! text-sm! font-medium! py-2.5! px-5!"
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
          <h2 className="text-2xl font-semibold">Project details</h2>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Add more details about your offering and why clients should work
                with you.
              </span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Show potential clients the steps you take to complete your
                project.
              </span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Address common client questions to save the back and forth.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </ProjectDashboardOnboardingLayout>
  );
}

import {
  Button,
  Checkbox,
  Dropdown,
  IconButton,
  Input,
  Textarea,
} from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import { Check, Plus } from "lucide-react";
import { useRouter } from "next/router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const answerOptions = [
  { label: "Free Text", value: "free-text" },
  { label: "Multiple Choice", value: "multiple-choice" },
  { label: "File Attachment", value: "file-attachment" },
];

export default function Requirements() {
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<any>({});
  const router = useRouter();
  const [requirements, setRequirements] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/nx/project-dashboard/description");
  };

  const handleAddSubmit = () => {
    setAddOpen(false);
    setAddForm({});
    setRequirements([...requirements, addForm]);
  };

  useEffect(() => {
    if (addForm?.answer === "multiple-choice") {
      setAddForm({ ...addForm, choices: [""] });
    }
  }, [addForm?.answer]);

  return (
    <ProjectDashboardOnboardingLayout
      seo={{
        title: "Project Catalog - Worklanc",
        description: "Project Catalog - Worklanc",
        url: "/nx/project-dashboard/pricing",
      }}
      currentStep={4}
    >
      <div className="flex items-start">
        <div className="w-3/4 pr-10 space-y-10 border-r border-slate-400">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">
              Requirements for the client
            </h1>
            <Button
              type="outline"
              label="Preview project"
              size="medium"
              icon="solar:eye-linear"
              classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
            />
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <h5 className="text-2xl font-medium">
              Tell the client what you need to get started
            </h5>

            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-base font-medium"
                >
                  <span>{index + 1}.</span>
                  <span className="flex-1 line-clamp-1">
                    {requirement.description}
                  </span>
                  <IconButton
                    variant="outline"
                    icon="mdi:dots-horizontal"
                    className="p-1!"
                    onClick={() => {}}
                  />
                </li>
              ))}
            </ul>

            {addOpen && (
              <div className="p-6 rounded-md bg-slate-100 space-y-6">
                <Textarea
                  name="description"
                  subLabel="0/250 characters (min. 10)"
                  placeholder="EXAMPLE: Do you have preferred styles or your illustration? Send me some examples if you have any."
                  rows={4}
                  value={addForm.description}
                  onChange={(e) =>
                    setAddForm({ ...addForm, description: e.target.value })
                  }
                />

                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Answer:</label>
                      <Dropdown
                        options={answerOptions}
                        name="answer"
                        value={addForm.answer}
                        classname="w-52!"
                        onSelect={(value) =>
                          setAddForm({ ...addForm, answer: value })
                        }
                      />
                    </div>
                    <p className="text-xs text-slate-800">
                      The client can also attach files.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm font-medium">
                      Mandatory requirement
                    </span>
                  </div>
                </div>

                {addForm.answer === "multiple-choice" && (
                  <ul className="space-y-6">
                    {addForm?.choices?.map((choice: string, index: number) => (
                      <li key={index} className="flex items-center gap-6">
                        <Input
                          type="text"
                          name="choice"
                          placeholder={`Choice ${index + 1}`}
                          classname="flex-1"
                          value={choice}
                          onChange={(e) =>
                            setAddForm({
                              ...addForm,
                              choices: addForm.choices.map(
                                (o: string, i: number) =>
                                  i === index ? e.target.value : o
                              ),
                            })
                          }
                        />
                        <IconButton
                          variant="secondary"
                          icon="mdi:trash-can-outline"
                          onClick={() =>
                            setAddForm({
                              ...addForm,
                              choices: addForm.choices.filter(
                                (o: string) => o !== choice
                              ),
                            })
                          }
                        />
                      </li>
                    ))}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Allow more than 1 answer</span>
                      </div>

                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 cursor-pointer hover:underline flex items-center gap-2"
                        onClick={() =>
                          setAddForm({
                            ...addForm,
                            choices: [...addForm.choices, ""],
                          })
                        }
                      >
                        <Plus className="size-5" />
                        Add another choice
                      </button>
                    </li>
                  </ul>
                )}

                <div className="flex items-center gap-2 justify-end">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="text-blue-600 cursor-pointer hover:underline text-sm font-medium px-6 py-2"
                    onClick={() => {
                      setAddForm({});
                      setAddOpen(false);
                    }}
                  >
                    Cancel
                  </motion.button>
                  <Button
                    type="primary"
                    label="Add"
                    classname="px-6! py-2! rounded-md! text-sm! font-medium!"
                    onClick={handleAddSubmit}
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              className="text-blue-600 cursor-pointer hover:underline flex items-center gap-2"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="size-5" />
              <span className="text-base font-medium">Add a requirement</span>
            </button>

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
          <h2 className="text-2xl font-semibold">
            Define what you need from your client upfront
          </h2>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                After a client purchases your project, they will be required to
                answer questions you define before the contract officially
                starts.
              </span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                The due date for your project is defined by the number of days
                to deliver, starting from when the client submits these
                requirements.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </ProjectDashboardOnboardingLayout>
  );
}

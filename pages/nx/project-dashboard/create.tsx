import { Button, Input } from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import { useState } from "react";
import { motion } from "motion/react";
import { AutoComplete } from "@/components/common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CreateProjectDashboard() {
  const [formData, setFormData] = useState<any>({});
  const [tagKeyWord, setTagKeyWord] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <ProjectDashboardOnboardingLayout
      seo={{
        title: "Project Catalog - Worklanc",
        description: "Project Catalog - Worklanc",
        url: "/nx/project-dashboard/create",
      }}
      currentStep={1}
    >
      <div className="flex items-start">
        <div className="w-3/4 pr-10 space-y-10 border-r border-slate-400">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">Project overview</h1>
            <Button
              type="outline"
              label="Preview project"
              size="medium"
              icon="mdi:eye"
              classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
            />
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-medium">Title</span>
                <span className="text-base font-light text-slate-800">
                  Tell the client what you will deliver and how it benefits
                  them.
                </span>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    type="text"
                    name="title"
                    subLabel="0/75 characters (min. 7 words)"
                    placeholder="You will get a fantastic deliverable that drives impact"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="p-2 text-sm">
                    Make sure your title is specific and describes the type of
                    work you offer in the project.
                    <br />
                    <br />
                    Your title can include types of deliverables, quantities,
                    and client benefits.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-medium">Category</span>
                <span className="text-base font-light text-slate-800">
                  Select a category so it's easy for clients to find your
                  project.
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-base h-10 font-medium text-blue-600 cursor-pointer"
              >
                Browse all categories
              </motion.button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-medium">Project attributes</span>
                <span className="text-base font-light text-slate-800">
                  Select a category above to view options.
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-medium">
                  Search tags (optional)
                </span>
              </div>

              <AutoComplete
                name="tags"
                placeholder="Start typing to view & select options. If entering your own tags, press Enter to save."
                subLabel="(max. 5 tags)"
                options={[]}
                loading={false}
                value={tagKeyWord}
                selectedValues={[]}
                onSelect={() => {}}
                onSelectedChange={() => {}}
                filterOptionsLocally={false}
                noResultsText="No tags found"
                maxResults={10}
                multiple={true}
                onChange={(value) => setTagKeyWord(value)}
              />
            </div>

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
              />
            </div>
          </form>
        </div>
        <div className="flex-1 pl-10"></div>
      </div>
    </ProjectDashboardOnboardingLayout>
  );
}

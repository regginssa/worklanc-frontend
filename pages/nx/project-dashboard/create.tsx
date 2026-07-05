import { Button, Checkbox, Input, RadioGroup } from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import { useState } from "react";
import { motion } from "motion/react";
import { AutoComplete } from "@/components/common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ProjectCategoryDialog } from "@/components/molecules";
import { useQuery } from "@tanstack/react-query";
import CategoryAPI from "@/lib/api/categories";
import {
  categoriesToRadioOptions,
  parseCategoryRadioValue,
  toCategoryRadioValue,
} from "@/utils/category";
import { useRouter } from "next/router";

const mockAttributes = [
  {
    title: "Platform",
    description: "Choose up to 1",
    options: [
      { label: "Android", value: "android" },
      { label: "iOS", value: "ios" },
      { label: "Mobile Website", value: "mobile-website" },
      { label: "Tizen", value: "tizen" },
    ],
  },
  {
    title: "App Type",
    desecription: "Chose up to 1",
    options: [
      { label: "Native App", value: "native" },
      { label: "Hybrid App", value: "hybrid-app" },
      { label: "PWA", value: "pwa" },
    ],
  },
  {
    title: "Development Technology",
    description: "Choose up to 3",
    options: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Node.js", value: "nodejs" },
      { label: "Express", value: "express" },
      { label: "MongoDB", value: "mongodb" },
      { label: "PostgreSQL", value: "postgresql" },
    ],
  },
  {
    title: "App Purpose",
    description: "Choose up to 10",
    options: [
      { label: "Productivity", value: "productivity" },
      { label: "Social", value: "social" },
      { label: "Entertainment", value: "entertainment" },
      { label: "Education", value: "education" },
      { label: "Health", value: "health" },
      { label: "Finance", value: "finance" },
      { label: "Communication", value: "communication" },
      { label: "Travel", value: "travel" },
      { label: "Shopping", value: "shopping" },
      { label: "Food", value: "food" },
      { label: "Transportation", value: "transportation" },
      { label: "Utilities", value: "utilities" },
      { label: "Other", value: "other" },
    ],
  },
  {
    title: "Expertise",
    description: "Choose up to 3",
    options: [
      { label: "Frontend", value: "frontend" },
      { label: "Backend", value: "backend" },
      { label: "Full Stack", value: "full-stack" },
      { label: "Mobile", value: "mobile" },
      { label: "Desktop", value: "desktop" },
      { label: "UI/UX Design", value: "uiux-design" },
      { label: "DevOps", value: "devops" },
      { label: "QA", value: "qa" },
      { label: "Other", value: "other" },
    ],
  },
];

export default function CreateProjectDashboard() {
  const [formData, setFormData] = useState<any>({});
  const [tagKeyWord, setTagKeyWord] = useState("");
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ["project-categories"],
    queryFn: () => CategoryAPI.getAll(),
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const makeCategorySuggestions = () => {
    if (!categories) return [];
    return categoriesToRadioOptions(categories);
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
                  <div>
                    <Input
                      type="text"
                      name="title"
                      subLabel="0/75 characters (min. 7 words)"
                      placeholder="You will get a fantastic deliverable that drives impact"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
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

              {formData.title && formData.title.length > 0 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Here are some suggestions based on your project title.
                  </p>

                  <RadioGroup
                    name="category"
                    options={makeCategorySuggestions()}
                    value={toCategoryRadioValue(
                      formData.category,
                      formData.subCategory
                    )}
                    onChange={(value) => {
                      const { category, subCategory } =
                        parseCategoryRadioValue(value);
                      setFormData({ ...formData, category, subCategory });
                    }}
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                {formData.title && formData.title.length > 0 && (
                  <span className="text-sm text-slate-600">
                    Not seeing the right fit?
                  </span>
                )}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="text-base h-10 font-medium text-blue-600 cursor-pointer"
                  onClick={() => setCategoryDialogOpen(true)}
                >
                  Browse all categories
                </motion.button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-medium">Project attributes</span>
                {formData.category && formData.category.length > 0 ? (
                  <ul className="space-y-6">
                    {mockAttributes.map((attribute) => (
                      <li key={attribute.title} className="space-y-2">
                        <div className="space-y-1">
                          <h5 className="text-base">{attribute.title}</h5>
                          <p className="text-sm font-light text-slate-800">
                            {attribute.description}
                          </p>
                        </div>

                        <ul className="grid grid-cols-3 gap-4">
                          {attribute.options.map((option) => (
                            <li
                              key={option.value}
                              className="flex items-center gap-2"
                            >
                              <Checkbox className="size-5!" />
                              <span className="text-sm">{option.label}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-base font-light text-slate-800">
                    Select a category above to view options.
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-medium">
                  Search tags (optional)
                </span>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
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
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="p-2 text-sm">
                    Search tags help clients find your project. Add the tags
                    that you think clients will use when searching for your
                    services. The more specific, the better.
                    <br />
                    <br />
                    It doesn't matter if you use uppercase or lowercase letters
                    for your tags.
                  </p>
                </TooltipContent>
              </Tooltip>
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
                onClick={() => router.push("/nx/project-dashboard/pricing")}
              />
            </div>
          </form>
        </div>

        <div className="flex-1 pl-10 space-y-10">
          <h2 className="text-2xl font-semibold">Need help getting started?</h2>

          <ul className="text-base space-y-2">
            <li>
              Review these resources to learn how to create a great project.
            </li>
            <li>
              <Link
                href="#"
                className="cursor-pointer flex items-start gap-2 underline text-blue-600 hover:text-blue-500"
              >
                <Icon icon="f7:doc" className="size-5 text-black" />
                <span className="flex-1">
                  Step by step videos on how to create a project
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="cursor-pointer flex items-start gap-2 underline text-blue-600 hover:text-blue-500"
              >
                <Icon icon="f7:doc" className="size-5 text-black" />
                <span className="flex-1">
                  Tip for planning and improving your project
                </span>
              </Link>
            </li>
            <li>You can always come back and change your project later.</li>
          </ul>
        </div>
      </div>

      <ProjectCategoryDialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        onSave={(fd) => {
          setFormData({ ...formData, ...fd });
        }}
      />
    </ProjectDashboardOnboardingLayout>
  );
}

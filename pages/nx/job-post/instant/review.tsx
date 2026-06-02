import { ClientLayout } from "@/components/layouts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import ChecklistIcon from "@/public/assets/svgs/icons/other/checklist.svg";
import AIIcon from "@/public/assets/svgs/icons/other/ai.svg";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Button,
  Dropdown,
  IconButton,
  RadioGroup,
  Textarea,
} from "@/components/atoms";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@iconify/react";
import { CheckBoxGroup } from "@/components/molecules";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const screeningQuestions = [
  {
    label: "Describe your recent experience with similar projects",
    value: "Describe your recent experience with similar projects",
  },
  {
    label: "Please list any certifications related to this project",
    value: "Please list any certifications related to this project",
  },
  {
    label: "Include a link to your GitHub profile and/or website",
    value: "Include a link to your GitHub profile and/or website",
  },
  {
    label: "What frameworks have you worked with?",
    value: "What frameworks have you worked with?",
  },
  {
    label: "Describe your approach to testing and improving QA",
    value: "Describe your approach to testing and improving QA",
  },
];

const englishLevelOptions = [
  {
    title: "Any level",
    value: "any_level",
  },
  {
    title: "Conversational or better",
    value: "conversational_or_better",
  },
  {
    title: "Fluent or better",
    value: "fluent_or_better",
  },
  {
    title: "Native or bilingual only",
    value: "native_or_bilingual_only",
  },
];

const hoursPerWeekOptions = [
  {
    title: "More than 30 hrs/week",
    value: "more_than_30_hrs_week",
  },
  {
    title: "Less than 30 hrs/week",
    value: "less_than_30_hrs_week",
  },
  {
    title: "I'm not sure",
    value: "not_sure",
  },
];

const talentTypeOptions = [
  {
    label: "No preference",
    value: "no_preference",
  },
  {
    label: "Independent",
    value: "independent",
  },
  {
    label: "Agency",
    value: "agency",
  },
];

const hireDateOptions = [
  { title: "1 to 3 days", value: "one_to_three_days" },
  { title: "One week", value: "one_week" },
  { title: "Two weeks", value: "two_weeks" },
  { title: "One month", value: "one_month" },
];

const numberOfProfessionalsNeedsOptions = [
  { title: "One person", value: "one_person" },
  { title: "More than one person", value: "more_than_one_person" },
];

export default function JobPostReview() {
  const [open, setOpen] = useState(true);
  const [writtenQuestions, setWrittenQuestions] = useState<string[]>([]);
  const [writeOpen, setWriteOpen] = useState(false);
  const [writeQuestion, setWriteQuestion] = useState<string | null>(null);
  const router = useRouter();

  return (
    <ClientLayout
      seo={{
        title: "Review - Worklanc",
        description: "Review - Worklanc",
        url: "/nx/job-post/instant/review",
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Job details</h1>
          <Button
            type="primary"
            label="Post this job"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </div>

        <div className="border-2 border-blue-200 rounded-3xl p-4 flex items-center justify-between gap-16">
          <div className="flex items-center gap-4">
            <div className="freelancer-plus-alert size-14 flex items-center justify-center rounded-lg">
              <Image src={AIIcon} alt="AI" className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm uppercase">Uma Recruiter Basic</h3>
                <div className="py-0.5 px-3 rounded-sm bg-zinc-900">
                  <span className="text-white text-xs">Beta</span>
                </div>
              </div>
              <h2 className="text-xl font-medium">
                Hire faster with Uma using AI-powered recruiting
              </h2>
              <p className="text-xs text-slate-600">
                Get a curated shortlist of top freelancers for your job within
                hours.{" "}
                <Link href="#" className="text-black underline">
                  Learn more
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid grid-cols-3 gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="bg-slate-200 rounded-md space-y-4 p-4 cursor-pointer"
                    onClick={() => router.push("/nx/plans/client/change-plan")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium text-lg">
                        0
                      </span>
                      <Icon
                        icon="mdi:lock-outline"
                        className="size-5 text-slate-600"
                      />
                    </div>
                    <p className="text-xs text-slate-600">
                      Freelancers sourced
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-sm p-2">
                    Upgrade to Business Plus to have Uma Recruiter proactively
                    find freelancers for you.
                  </p>
                </TooltipContent>
              </Tooltip>

              <div className="space-y-4 p-4">
                <h4 className="text-slate-600 font-medium text-lg">3 to 5</h4>
                <p className="text-xs text-slate-600">
                  Top proposals shortlisted
                </p>
              </div>
              <div className="space-y-4 p-4">
                <h4 className="text-slate-600 font-medium text-lg">6 hrs</h4>
                <p className="text-xs text-slate-600">Shortlist delivered</p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="border border-slate-300 rounded-3xl">
        <div className="flex items-center justify-between p-8 border-b border-slate-300 gap-8">
          <h2 className="text-2xl font-medium">Fintech SaaS Platform</h2>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex items-center justify-between p-8 border-b border-slate-300 gap-8">
          <p className="text-sm font-light leading-7">
            Need a full-stack developer who is free for work and not looking to
            get rich immediately from this project.
            <br />
            This is my test site: readyhome.ge the prototype of which I want to
            create (not referring to design). <br />
            In the footer, there is Russian language, fill out the questionnaire
            and go to the configurator.
          </p>

          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="p-8 border-b border-slate-300 space-y-8">
          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Category</h3>
              <p className="text-sm font-light">Full Stack Development</p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => {}}
            />
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Skills</h3>
              <p className="text-sm font-light">
                Database Architecture, HTML5, JavaScript, SaaS
              </p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => {}}
            />
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Scope</h3>
              <p className="text-sm font-light">
                Medium, 3 to 6 months, Intermediate level, Contract-to-hire
                opportunity
              </p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => {}}
            />
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Location preferences</h3>
              <p className="text-sm font-light">U.S. only</p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => {}}
            />
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Budget</h3>
              <p className="text-sm font-light">$50.00</p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => {}}
            />
          </div>
        </div>

        <div className="p-8 border-b border-slate-300 space-y-8">
          <div className="flex items-start justify-between cursor-pointer">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">
                Screening questions (optional)
              </h3>
              <p className="text-slate-600 font-light text-sm">
                Narrow down your candidates
              </p>
            </div>

            <Icon icon="mdi:chevron-down" className="size-6 text-slate-700" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Select or add up to 5 questions
              </p>
              <Button
                type="outline"
                label="Write your own question"
                size="medium"
                icon="mdi:plus"
                classname="py-2! px-5! text-sm! font-medium! border! rounded-full!"
              />
            </div>

            <div className="">
              <div className="flex items-center justify-between gap-8">
                <Textarea
                  name="writeQuestion"
                  subLabel="255 characters left"
                  rows={1}
                  value={writeQuestion || ""}
                  onChange={(e) => setWriteQuestion(e.target.value)}
                  labelClassName="text-sm font-medium"
                  required
                  classname="flex-1"
                />
                <IconButton
                  icon="mdi:trash-can-outline"
                  variant="outline"
                  className="p-1!"
                  onClick={() => {}}
                />
              </div>
              <Button
                type="primary"
                label="Save question"
                classname="py-1.5! px-5! text-sm! font-medium! border! rounded-full!"
                disabled={!!writeQuestion}
              />
            </div>

            {writtenQuestions.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm font-medium">Your questions</p>
                <ul className="space-y-4 text-sm font-light">
                  {writtenQuestions.map((question, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-8"
                    >
                      <p>{question}</p>
                      <IconButton
                        variant="outline"
                        className="p-1!"
                        icon="mdi:pencil-outline"
                        onClick={() => {}}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm font-medium">Suggested</p>
              <CheckBoxGroup
                options={screeningQuestions}
                value={[]}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="p-8 border-b border-slate-300 space-y-8">
          <div className="flex items-start justify-between cursor-pointer">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">
                Advanced preferences (optional)
              </h3>
              <p className="text-slate-600 font-light text-sm">
                Hours per week, hire date, and more
              </p>
            </div>

            <Icon icon="mdi:chevron-down" className="size-6 text-slate-700" />
          </div>

          <div className="flex items-start">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-light">English level</p>
                <RadioGroup
                  options={englishLevelOptions}
                  value={englishLevelOptions[0].value}
                  onChange={() => {}}
                />
              </div>

              <div className="space-y-4">
                <p className="text-sm font-light">Hours per week</p>
                <RadioGroup
                  options={hoursPerWeekOptions}
                  value={hoursPerWeekOptions[0].value}
                  onChange={() => {}}
                />
              </div>

              <Dropdown
                label="Talent type"
                labelClassName="text-sm! font-light! mb-2!"
                name="talentType"
                classname="w-1/3!"
                options={talentTypeOptions}
                value={talentTypeOptions[0].value}
                onSelect={() => {}}
              />
            </div>
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-light">Hire date</p>
                <RadioGroup
                  options={hireDateOptions}
                  value={hireDateOptions[0].value}
                  onChange={() => {}}
                />
              </div>
              <div className="space-y-4">
                <p className="text-sm font-light">
                  Number of professionals needed
                </p>
                <RadioGroup
                  options={numberOfProfessionalsNeedsOptions}
                  value={numberOfProfessionalsNeedsOptions[0].value}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="py-2 px-5 border border-slate-400 text-sm font-medium cursor-pointer rounded-full hover:bg-slate-50 transition-colors duration-200"
            onClick={() =>
              router.replace("/nx/job-post/instant/add-description")
            }
          >
            Back
          </motion.button>
          <div className="flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="py-2 px-5 text-sm font-medium hover:underline cursor-pointer"
            >
              Save as a draft
            </motion.button>

            <Button
              type="primary"
              label="Post this job"
              classname="py-2! px-5! rounded-full! text-sm! font-medium!"
            />
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col">
          <div className="flex flex-col items-center justify-center gap-8 py-8">
            <Image
              src={ChecklistIcon}
              alt="Checklist"
              className="w-[145px] h-[130px]"
            />

            <h4 className="text-2xl font-medium">
              What happens after you post your job?
            </h4>
            <p className="text-sm font-light">
              You’ll receive proposals and you can invite talent to your job. No
              charges until you hire.
            </p>
          </div>

          <DialogFooter>
            <div className="w-full flex items-center justify-center py-4">
              <DialogClose asChild>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-5 text-sm font-medium hover:underline cursor-pointer"
                >
                  Edit job post
                </motion.button>
              </DialogClose>
              <Button
                type="primary"
                label="Post your job"
                classname="py-2! px-5! rounded-full! text-sm! font-medium!"
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientLayout>
  );
}

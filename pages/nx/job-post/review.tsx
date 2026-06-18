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
import { AnimatePresence, motion } from "motion/react";
import {
  Button,
  Dropdown,
  IconButton,
  RadioGroup,
  Stepper,
  Textarea,
} from "@/components/atoms";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CheckBoxGroup from "@/components/molecules/CheckBoxGroup";
import { useJobPost } from "@/hooks/useJobPost";
import { PhoneVerificationDialog } from "@/components/molecules";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import type {
  JobEnglishLevel,
  JobHireDate,
  JobHoursPerWeek,
  JobProfessionalsNeeded,
  JobTalentType,
} from "@/types/job";
import {
  formatBudgetSummary,
  formatCategoryLabel,
  formatLocationSummary,
  formatScopeSummary,
  formatSkillsSummary,
} from "@/utils/jobDisplay";

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
  { title: "Any level", value: "any_level" },
  { title: "Conversational or better", value: "conversational_or_better" },
  { title: "Fluent or better", value: "fluent_or_better" },
  { title: "Native or bilingual only", value: "native_or_bilingual_only" },
];

const hoursPerWeekOptions = [
  { title: "More than 30 hrs/week", value: "more_than_30_hrs_week" },
  { title: "Less than 30 hrs/week", value: "less_than_30_hrs_week" },
  { title: "I'm not sure", value: "not_sure" },
];

const talentTypeOptions = [
  { label: "No preference", value: "no_preference" },
  { label: "Independent", value: "independent" },
  { label: "Agency", value: "agency" },
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {
    uid,
    job,
    isLoading,
    saving,
    saveDraft,
    publish,
    withJobParam,
    goBack,
  } = useJobPost();

  const [confirmOpen, setConfirmOpen] = useState(true);
  const [writtenQuestions, setWrittenQuestions] = useState<string[]>([]);
  const [writeQuestion, setWriteQuestion] = useState("");
  const [screeningExpanded, setScreeningExpanded] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [selectedSuggested, setSelectedSuggested] = useState<string[]>([]);
  const [umaRecruiterEnabled, setUmaRecruiterEnabled] = useState(false);
  const [englishLevel, setEnglishLevel] =
    useState<JobEnglishLevel>("any_level");
  const [hoursPerWeek, setHoursPerWeek] =
    useState<JobHoursPerWeek>("more_than_30_hrs_week");
  const [talentType, setTalentType] =
    useState<JobTalentType>("no_preference");
  const [hireDate, setHireDate] = useState<JobHireDate>("one_to_three_days");
  const [professionalsNeeded, setProfessionalsNeeded] =
    useState<JobProfessionalsNeeded>("one_person");
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!uid) router.replace("/nx/job-post/welcome");
  }, [router.isReady, uid, router]);

  useEffect(() => {
    if (!job) return;
    if (job.screeningQuestions?.length) {
      setWrittenQuestions(job.screeningQuestions);
    }
    if (job.umaRecruiterEnabled) setUmaRecruiterEnabled(job.umaRecruiterEnabled);
    if (job.englishLevel) setEnglishLevel(job.englishLevel);
    if (job.hoursPerWeek) setHoursPerWeek(job.hoursPerWeek);
    if (job.talentType) setTalentType(job.talentType);
    if (job.hireDate) setHireDate(job.hireDate);
    if (job.professionalsNeeded) {
      setProfessionalsNeeded(job.professionalsNeeded);
    }
  }, [job]);

  const reviewPatch = () => ({
    screeningQuestions: [
      ...writtenQuestions,
      ...selectedSuggested.filter((q) => !writtenQuestions.includes(q)),
    ].slice(0, 5),
    umaRecruiterEnabled,
    englishLevel,
    hoursPerWeek,
    talentType,
    hireDate,
    professionalsNeeded,
  });

  const handlePublish = async () => {
    const res = await publish(reviewPatch());
    if (!res?.job) return;

    if (res.phoneVerificationRequired) {
      setConfirmOpen(false);
      setPhoneDialogOpen(true);
      return;
    }

    setConfirmOpen(false);
    await router.push("/nx/client/dashboard");
  };

  const handleSaveDraft = async () => {
    await saveDraft(reviewPatch());
  };

  const handleBack = async () => {
    await goBack(
      reviewPatch(),
      "/nx/job-post/add-description",
      "/nx/job-post/review",
    );
  };

  const editPath = (step: string) => withJobParam(step);

  if (!uid || isLoading || !job) return null;

  return (
    <ClientLayout
      seo={{
        title: "Review - Worklanc",
        description: "Review - Worklanc",
        url: "/nx/job-post/review",
      }}
    >
      <div className="flex items-center justify-center">
        <Stepper
          steps={[
            { title: "Add business context" },
            { title: "Create job post" },
            { title: "Share with talent" },
          ]}
          currentStep={2}
        />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Job details</h1>
          <Button
            type="primary"
            label={saving ? "Posting..." : "Post this job"}
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            disabled={saving}
            onClick={() => setConfirmOpen(true)}
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
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Switch
              checked={umaRecruiterEnabled}
              onCheckedChange={setUmaRecruiterEnabled}
            />
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl">
        <div className="flex items-center justify-between p-8 border-b border-slate-300 gap-8">
          <h2 className="text-2xl font-medium">{job.title}</h2>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => router.push(editPath("/nx/job-post/title"))}
          />
        </div>

        <div className="flex items-center justify-between p-8 border-b border-slate-300 gap-8">
          <p className="text-sm font-light leading-7 whitespace-pre-wrap">
            {job.description}
          </p>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => router.push(editPath("/nx/job-post/add-description"))}
          />
        </div>

        <div className="p-8 border-b border-slate-300 space-y-8">
          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Category</h3>
              <p className="text-sm font-light">
                {formatCategoryLabel(job.categorySlug)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Skills</h3>
              <p className="text-sm font-light">{formatSkillsSummary(job)}</p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => router.push(editPath("/nx/job-post/skills"))}
            />
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Scope</h3>
              <p className="text-sm font-light">{formatScopeSummary(job)}</p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => router.push(editPath("/nx/job-post/duration"))}
            />
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Location preferences</h3>
              <p className="text-sm font-light">
                {formatLocationSummary(job)}
              </p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => router.push(editPath("/nx/job-post/location"))}
            />
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Budget</h3>
              <p className="text-sm font-light">{formatBudgetSummary(job)}</p>
            </div>
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={() => router.push(editPath("/nx/job-post/budget"))}
            />
          </div>
        </div>

        <div className="p-8 border-b border-slate-300 space-y-8">
          <button
            type="button"
            aria-expanded={screeningExpanded}
            className="flex w-full items-start justify-between cursor-pointer text-left"
            onClick={() => setScreeningExpanded((prev) => !prev)}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-medium">
                Screening questions (optional)
              </h3>
              <p className="text-slate-600 font-light text-sm">
                Narrow down your candidates
              </p>
            </div>
            <Icon
              icon="mdi:chevron-down"
              className={`size-6 shrink-0 text-slate-700 transition-transform duration-200 ${
                screeningExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {screeningExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-6"
              >
                <CheckBoxGroup
                  options={screeningQuestions}
                  value={selectedSuggested}
                  onChange={setSelectedSuggested}
                />
                {writtenQuestions.map((question, index) => (
                  <p key={index} className="text-sm">
                    {question}
                  </p>
                ))}
                <Textarea
                  name="writeQuestion"
                  subLabel={`${255 - writeQuestion.length} characters left`}
                  rows={1}
                  value={writeQuestion}
                  onChange={(e) => setWriteQuestion(e.target.value)}
                  labelClassName="text-sm font-medium"
                  classname="flex-1"
                />
                <Button
                  type="primary"
                  label="Save question"
                  classname="py-1.5! px-5! text-sm! font-medium! border! rounded-full!"
                  disabled={
                    !writeQuestion.trim() ||
                    writtenQuestions.length + selectedSuggested.length >= 5
                  }
                  onClick={() => {
                    if (!writeQuestion.trim()) return;
                    setWrittenQuestions((prev) => [...prev, writeQuestion.trim()]);
                    setWriteQuestion("");
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 border-b border-slate-300 space-y-8">
          <button
            type="button"
            aria-expanded={advancedExpanded}
            className="flex w-full items-start justify-between cursor-pointer text-left"
            onClick={() => setAdvancedExpanded((prev) => !prev)}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-medium">
                Advanced preferences (optional)
              </h3>
            </div>
            <Icon
              icon="mdi:chevron-down"
              className={`size-6 shrink-0 text-slate-700 transition-transform duration-200 ${
                advancedExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {advancedExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-start">
                  <div className="flex-1 space-y-8">
                    <RadioGroup
                      options={englishLevelOptions}
                      value={englishLevel}
                      onChange={(v) => setEnglishLevel(v as JobEnglishLevel)}
                    />
                    <RadioGroup
                      options={hoursPerWeekOptions}
                      value={hoursPerWeek}
                      onChange={(v) => setHoursPerWeek(v as JobHoursPerWeek)}
                    />
                    <Dropdown
                      label="Talent type"
                      name="talentType"
                      options={talentTypeOptions}
                      value={talentType}
                      onSelect={(v) => setTalentType(v as JobTalentType)}
                    />
                  </div>
                  <div className="flex-1 space-y-8">
                    <RadioGroup
                      options={hireDateOptions}
                      value={hireDate}
                      onChange={(v) => setHireDate(v as JobHireDate)}
                    />
                    <RadioGroup
                      options={numberOfProfessionalsNeedsOptions}
                      value={professionalsNeeded}
                      onChange={(v) =>
                        setProfessionalsNeeded(v as JobProfessionalsNeeded)
                      }
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 flex items-center justify-between">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className="py-2 px-5 border border-slate-400 text-sm font-medium cursor-pointer rounded-full hover:bg-slate-50 transition-colors duration-200"
            onClick={handleBack}
            disabled={saving}
          >
            Back
          </motion.button>
          <div className="flex items-center">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="py-2 px-5 text-sm font-medium hover:underline cursor-pointer disabled:opacity-50"
              disabled={saving}
              onClick={handleSaveDraft}
            >
              {saving ? "Saving..." : "Save as a draft"}
            </motion.button>
            <Button
              type="primary"
              label={saving ? "Posting..." : "Post this job"}
              classname="py-2! px-5! rounded-full! text-sm! font-medium!"
              disabled={saving}
              onClick={() => setConfirmOpen(true)}
            />
          </div>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
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
              You'll receive proposals and you can invite talent to your job. No
              charges until you hire.
            </p>
            {!user?.phoneVerified && (
              <p className="text-sm text-amber-700">
                Your job will be saved as pending until you verify your phone
                number.
              </p>
            )}
          </div>
          <DialogFooter>
            <div className="w-full flex items-center justify-center py-4">
              <DialogClose asChild>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-5 text-sm font-medium hover:underline cursor-pointer"
                >
                  Edit job post
                </motion.button>
              </DialogClose>
              <Button
                type="primary"
                label={saving ? "Posting..." : "Post your job"}
                classname="py-2! px-5! rounded-full! text-sm! font-medium!"
                disabled={saving}
                onClick={handlePublish}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PhoneVerificationDialog
        open={phoneDialogOpen}
        onClose={() => setPhoneDialogOpen(false)}
        onSuccess={(verifiedUser) => {
          dispatch(setUser(verifiedUser));
          setPhoneDialogOpen(false);
          router.push("/nx/client/dashboard");
        }}
      />
    </ClientLayout>
  );
}

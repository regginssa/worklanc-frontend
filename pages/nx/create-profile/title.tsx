import { Button, Input } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  TITLE_MAX_LENGTH,
  validateTitleForm,
} from "@/utils/validateFreelancerProfileForms";

export default function Title() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const router = useRouter();
  const { profile, saveStep, saving } = useOnboarding();
  const seeded = useRef(false);

  useEffect(() => {
    if (!profile || seeded.current) return;
    seeded.current = true;
    if (profile.title) setTitle(profile.title);
  }, [profile]);

  const validateTitle = (value = title) => {
    const result = validateTitleForm(value);
    setTitleError(result.errors.title ?? null);
  };

  return (
    <CreateProfileLayout
      title="Got it. Now, add a title to tell the world what you do."
      description="It’s the very first thing clients see, so make it count. Stand out by describing your expertise in your own words."
      currentStep={4}
      totalSteps={10}
      seo={{
        title: "Got it. Now, add a title to tell the world what you do.",
        description:
          "It’s the very first thing clients see, so make it count. Stand out by describing your expertise in your own words.",
        url: "/nx/create-profile/title",
      }}
    >
      <div className="w-3/5">
        <Input
          label="Your professional role"
          placeholder="Example: Accounting & Consulting"
          type="text"
          name="title"
          classname="text-sm!"
          value={title}
          maxLength={TITLE_MAX_LENGTH}
          onChange={(e) => {
            setTitle(e.target.value);
            validateTitle(e.target.value);
          }}
          error={titleError ?? undefined}
        />
        <p className="text-right text-sm text-slate-600 mt-1">
          {title.length}/{TITLE_MAX_LENGTH} characters
        </p>
      </div>

      <div className="mt-36 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, add your experience"
          loading={saving}
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() => {
            const result = validateTitleForm(title);
            setTitleError(result.errors.title ?? null);
            if (!result.isValid) return;
            saveStep({ title: title.trim() }, "/nx/create-profile/employment");
          }}
        />
      </div>
    </CreateProfileLayout>
  );
}

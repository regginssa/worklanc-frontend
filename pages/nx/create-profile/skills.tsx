import { AutoComplete, Button } from "@/components/atoms";
import { AutoCompleteOption } from "@/components/atoms/AutoComplete";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { MOCK_SKILLS, type MockSkill } from "@/static/data/mock-skills";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import UserImage from "@/public/assets/webps/avatars/resume-import.webp";
import { motion } from "motion/react";
import { useRouter } from "next/router";

export default function Skills() {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<MockSkill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (skill: MockSkill) => {
    if (selectedSkills.length >= 15) {
      setError(`Must be less than 15 items.`);
      return;
    }

    setError(null);
    setSelectedSkills((prev) => [...prev, skill]);
    setSearch("");
  };

  const removeSkill = (option: AutoCompleteOption) => {
    setSelectedSkills((prev) => prev.filter((s) => s.value !== option.value));
  };

  return (
    <CreateProfileLayout
      title="Nearly there! What work are you here to do?"
      description="Your skills show clients what you can offer, and help us choose which jobs to recommend to you. Add or remove the ones we’ve suggested, or start typing to pick more. It’s up to you."
      currentStep={3}
      totalSteps={10}
      seo={{
        title: "Nearly there! What work are you here to do?",
        description:
          "Your skills show clients what you can offer, and help us choose which jobs to recommend to you. Add or remove the ones we’ve suggested, or start typing to pick more. It’s up to you.",
        url: "/nx/create-profile/skills",
      }}
    >
      <div className="flex items-start gap-20">
        <div className="w-3/5">
          <AutoComplete
            label="Your skills"
            subLabel={`Max 15 skills`}
            placeholder="Enter skills here"
            name="skills"
            options={MOCK_SKILLS}
            value={search}
            selectedValues={selectedSkills}
            onChange={setSearch}
            onSelect={handleSelect}
            onRemove={removeSkill}
            error={error || undefined}
          />

          <div className="space-y-4 mt-4">
            <h3 className="text-sm">Suggested skills</h3>
            <div className="flex flex-wrap gap-2">
              {MOCK_SKILLS.slice(0, 10).map((skill) => (
                <button
                  key={skill.value}
                  className="text-sm border border-slate-300 cursor-pointer rounded-full px-3 py-1.5 flex items-center gap-2"
                  onClick={() => handleSelect(skill)}
                >
                  <Icon icon="mdi:plus" className="w-5 h-5 text-slate-600" />
                  {skill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-2xl bg-slate-100 p-6">
          <Image
            src={UserImage}
            alt="Avatar"
            className="h-[60px] w-[60px] rounded-full object-cover"
          />

          <p className="mt-6 text-xl">
            “WorkLanc’s algorithm will recommend specific job posts to you based
            on your skills. So choose them carefully to get the best match!”
          </p>
          <p className="mt-1 text-sm text-slate-800">WorkLanc Pro Tip</p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, your profile title"
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() => router.push("/nx/create-profile/title")}
        />
      </div>
    </CreateProfileLayout>
  );
}

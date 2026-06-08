import { Button, Dropdown, SearchCombobox } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { LanguageLevel } from "@/types/user";
import { useEffect, useRef, useState } from "react";
import { languages as countryLanguages } from "country-data-list";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import router from "next/router";
import { useOnboarding } from "@/hooks/useOnboarding";

const languageLevels = [
  { label: "Basic", value: "basic" },
  { label: "Conversational", value: "conversational" },
  { label: "Fluent", value: "fluent" },
  { label: "Native or Bilingual", value: "native" },
];

type LanguageDraft = {
  name: string;
  level: LanguageLevel | "";
};

const languageOptions = countryLanguages.all
  .filter((language) => language.name !== "English")
  .map((language) => language.name);

export default function Languages() {
  const [englishLevel, setEnglishLevel] = useState<LanguageLevel | "">("");
  const [languages, setLanguages] = useState<LanguageDraft[]>([]);
  const { profile, saveStep, saving } = useOnboarding();
  const seeded = useRef(false);

  useEffect(() => {
    if (!profile || seeded.current) return;
    seeded.current = true;
    const saved = profile.languages ?? [];
    const english = saved.find((language) => language.name === "English");
    if (english) setEnglishLevel(english.level);
    setLanguages(
      saved
        .filter((language) => language.name !== "English")
        .map((language) => ({ name: language.name, level: language.level }))
    );
  }, [profile]);

  const handleNext = () => {
    const payload = [
      ...(englishLevel
        ? [{ name: "English", level: englishLevel as LanguageLevel }]
        : []),
      ...languages
        .filter((language) => language.name && language.level)
        .map((language) => ({
          name: language.name,
          level: language.level as LanguageLevel,
        })),
    ];
    return saveStep({ languages: payload }, "/nx/create-profile/overview");
  };

  const handleAddLanguage = () => {
    setLanguages((prev) => [...prev, { name: "", level: "" }]);
  };

  const handleLanguageChange = (index: number, value: string) => {
    setLanguages((prev) =>
      prev.map((language, currentIndex) =>
        currentIndex === index ? { ...language, name: value } : language
      )
    );
  };

  const handleLevelChange = (index: number, value: string) => {
    setLanguages((prev) =>
      prev.map((language, currentIndex) =>
        currentIndex === index
          ? { ...language, level: value as LanguageLevel }
          : language
      )
    );
  };

  return (
    <CreateProfileLayout
      title="Looking good. Next, tell us which languages you speak."
      description="Worklanc is global, so clients are often interested to know what languages you speak. English is a must, but do you speak any other languages?"
      currentStep={7}
      totalSteps={10}
      seo={{
        title: "Looking good. Next, tell us which languages you speak.",
        description:
          "Worklanc is global, so clients are often interested to know what languages you speak. English is a must, but do you speak any other languages?",
        url: "/nx/create-profile/languages",
      }}
    >
      <div className="">
        <label className="text-sm font-light">Language</label>
        <ul className="">
          <li className="border-b border-slate-200 flex items-center p-4">
            <span className="text-sm text-slate-600 w-1/2">
              English (all profiles include this)
            </span>

            <div className="flex-1 flex items-center gap-2 justify-between">
              <Dropdown
                name="level"
                placeholder="My level is"
                options={languageLevels}
                classname="w-1/3!"
                value={englishLevel}
                onSelect={(value) => setEnglishLevel(value as LanguageLevel)}
              />
            </div>
          </li>

          {languages.map((lang, index) => (
            <li
              key={`${lang.name || "language"}-${index}`}
              className="border-b border-slate-200 flex items-center gap-2 p-4"
            >
              <div className="flex-1 flex items-center gap-2">
                <div className="w-2/3!">
                  <SearchCombobox
                    placeholder="Select language"
                    name="language"
                    options={languageOptions}
                    defaultOption={lang.name}
                    onSelect={(value: string) =>
                      handleLanguageChange(index, value)
                    }
                  />
                </div>
              </div>

              <div className="flex-1 flex items-center gap-2 justify-between">
                <Dropdown
                  name="level"
                  placeholder="My level is"
                  options={languageLevels}
                  classname="w-1/3!"
                  value={lang.level}
                  disabled={!lang.name}
                  onSelect={(value) => handleLevelChange(index, value)}
                />
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="p-1 rounded-full border border-slate-400 transition-all duration-200 cursor-pointer hover:bg-slate-100"
                  onClick={() =>
                    setLanguages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <Icon icon="mdi:trash-can-outline" width={20} />
                </motion.button>
              </div>
            </li>
          ))}
        </ul>
        <Button
          type="outline"
          size="medium"
          label="Add a language"
          icon="mdi:plus"
          classname="py-2.5! px-5! rounded-full! mt-10"
          onClick={handleAddLanguage}
        />
      </div>

      <div className="mt-20 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, write an overview"
          loading={saving}
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={handleNext}
        />
      </div>
    </CreateProfileLayout>
  );
}

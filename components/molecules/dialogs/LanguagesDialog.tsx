import { Button, Dropdown, SearchCombobox } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LanguageDraft } from "@/hooks/useFreelancerProfilePage";
import type { LanguageLevel } from "@/types/user";
import { Icon } from "@iconify/react";
import { languages as countryLanguages } from "country-data-list";
import { motion } from "motion/react";

const LANGUAGE_LEVEL_OPTIONS = [
  { label: "Basic", value: "basic" },
  { label: "Conversational", value: "conversational" },
  { label: "Fluent", value: "fluent" },
  { label: "Native or Bilingual", value: "native" },
];

const LANGUAGE_OPTIONS = countryLanguages.all
  .filter((language) => language.name !== "English")
  .map((language) => language.name);

export type LanguagesDialogErrors = {
  englishLevel?: string;
  languages?: string;
  [key: `name-${number}`]: string | undefined;
  [key: `level-${number}`]: string | undefined;
};

export default function LanguagesDialog({
  open,
  onClose,
  englishLevel,
  onEnglishLevelChange,
  languages,
  onLanguagesChange,
  onSave,
  loading = false,
  errors = {},
}: {
  open: boolean;
  onClose: () => void;
  englishLevel: LanguageLevel | "";
  onEnglishLevelChange: (level: LanguageLevel) => void;
  languages: LanguageDraft[];
  onLanguagesChange: (languages: LanguageDraft[]) => void;
  onSave: () => void;
  loading?: boolean;
  errors?: LanguagesDialogErrors;
}) {
  const handleLanguageChange = (index: number, value: string) => {
    onLanguagesChange(
      languages.map((language, currentIndex) =>
        currentIndex === index ? { ...language, name: value } : language
      )
    );
  };

  const handleLevelChange = (index: number, value: string) => {
    onLanguagesChange(
      languages.map((language, currentIndex) =>
        currentIndex === index
          ? { ...language, level: value as LanguageLevel }
          : language
      )
    );
  };

  const handleRemoveLanguage = (index: number) => {
    onLanguagesChange(
      languages.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const handleAddLanguage = () => {
    onLanguagesChange([...languages, { name: "", level: "" }]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex w-full flex-col sm:max-w-4xl">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Edit languages</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto">
          {errors.languages && (
            <p className="mb-4 text-sm text-red-600">{errors.languages}</p>
          )}

          <label className="text-sm font-light">Language</label>
          <ul>
            <li className="flex items-center border-b border-slate-200 p-4">
              <span className="w-1/2 text-sm text-slate-600">
                English (all profiles include this)
              </span>

              <div className="flex flex-1 items-center justify-between gap-2">
                <Dropdown
                  name="english-level"
                  placeholder="My level is"
                  options={LANGUAGE_LEVEL_OPTIONS}
                  classname="w-2/3!"
                  value={englishLevel}
                  onSelect={(value) =>
                    onEnglishLevelChange(value as LanguageLevel)
                  }
                  error={errors.englishLevel}
                />
              </div>
            </li>

            {languages.map((language, index) => (
              <li
                key={`${language.name || "language"}-${index}`}
                className="flex items-center gap-2 border-b border-slate-200 p-4"
              >
                <div className="flex flex-1 items-center gap-2">
                  <div className="w-2/3!">
                    <SearchCombobox
                      placeholder="Select language"
                      name={`language-${index}`}
                      options={LANGUAGE_OPTIONS}
                      defaultOption={language.name}
                      onSelect={(value: string) =>
                        handleLanguageChange(index, value)
                      }
                      error={errors[`name-${index}`]}
                    />
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-between gap-2">
                  <Dropdown
                    name={`language-level-${index}`}
                    placeholder="My level is"
                    options={LANGUAGE_LEVEL_OPTIONS}
                    classname="w-2/3!"
                    value={language.level}
                    disabled={!language.name}
                    onSelect={(value) => handleLevelChange(index, value)}
                    error={errors[`level-${index}`]}
                  />
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer rounded-full border border-slate-400 p-1 transition-all duration-200 hover:bg-slate-100"
                    onClick={() => handleRemoveLanguage(index)}
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
            classname="mt-10 rounded-full! px-5! py-2.5!"
            onClick={handleAddLanguage}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="cursor-pointer px-5 py-2.5 text-sm font-medium">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Save languages"
            classname="rounded-full! px-5! py-2.5! text-sm! font-medium!"
            loading={loading}
            onClick={onSave}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

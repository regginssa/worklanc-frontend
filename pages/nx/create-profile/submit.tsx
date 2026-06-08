import {
  AutoCompleteSelector,
  Button,
  Checkbox,
  Dropdown,
  IconButton,
  Input,
  SearchCombobox,
  Textarea,
} from "@/components/atoms";
import type { AutoCompleteOption } from "@/components/atoms/AutoCompleteSelector";
import { DateDropdown } from "@/components/molecules";
import { CreateProfilePageLayout } from "@/components/layouts";
import DocEditIcon from "@/public/assets/svgs/icons/other/doc_edit.svg";
import AvatarImage from "@/public/assets/svgs/icons/other/avatar.svg";
import { replaceUserAvatar } from "@/lib/api/avatar";
import { resolveMediaAssetUrl } from "@/lib/api/upload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MOCK_SKILLS, type MockSkill } from "@/static/data/mock-skills";
import {
  Education,
  EmploymentFormInput,
  Language,
  LanguageLevel,
} from "@/types/user";
import { formatMonthYear } from "@/utils/df";
import { buildHourlyRateForm } from "@/utils/rate";
import { Icon } from "@iconify/react";
import { countries, languages as countryLanguages } from "country-data-list";
import { Move } from "lucide-react";
import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useRouter } from "next/router";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const EDITOR_PREVIEW_SIZE = 300;

const LANGUAGE_LEVEL_OPTIONS = [
  { label: "Basic", value: "basic" },
  { label: "Conversational", value: "conversational" },
  { label: "Fluent", value: "fluent" },
  { label: "Native or Bilingual", value: "native" },
];

const LANGUAGE_LEVEL_LABELS: Record<LanguageLevel, string> = {
  basic: "Basic",
  conversational: "Conversational",
  fluent: "Fluent",
  native: "Native or Bilingual",
};

const LANGUAGE_OPTIONS = Array.from(
  new Set(
    countryLanguages.all
      .filter((language) => language.name !== "English")
      .map((language) => language.name)
  )
);

type RateForm = {
  rate: string;
  fee: string;
  estimated: string;
};

type LanguageDraft = {
  name: string;
  level: LanguageLevel | "";
};

const createEmptyExperience = (): EmploymentFormInput => ({
  title: "",
  company: "",
  city: "",
  country: "",
  isCurrent: false,
  startedAt: new Date(),
  endAt: new Date(),
  description: "",
});

const createEmptyEducation = (): Education => ({
  school: "",
  degree: "",
  fieldOfStudy: "",
  startedYear: null,
  endYear: null,
  description: "",
});

const cloneExperience = (experience: EmploymentFormInput): EmploymentFormInput => ({
  ...experience,
  startedAt: new Date(experience.startedAt),
  endAt: new Date(experience.endAt),
});

const buildRateForm = (rate: string): RateForm => buildHourlyRateForm(rate);

const getTitleError = (value: string) => {
  const trimmedValue = value.trim();

  if (trimmedValue.length < 4) {
    return "Enter a title with at least 4 characters.";
  }

  if (trimmedValue.length > 62) {
    return "Title must be less than 62 characters";
  }

  return null;
};

const formatCurrency = (value: string) => {
  if (!value.trim()) return "$0.00";

  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue)) return "$0.00";

  return `$${parsedValue.toFixed(2)}`;
};

export default function Submit() {
  const [profileTitle, setProfileTitle] = useState("");
  const [titleDraft, setTitleDraft] = useState(profileTitle);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [titleOpen, setTitleOpen] = useState(false);

  const [profileDescription, setProfileDescription] = useState("");
  const [descriptionDraft, setDescriptionDraft] = useState(profileDescription);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const [rateForm, setRateForm] = useState<RateForm>(buildRateForm(""));
  const [rateDraft, setRateDraft] = useState<RateForm>(rateForm);
  const [rateOpen, setRateOpen] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState<MockSkill[]>([]);
  const [skillDrafts, setSkillDrafts] = useState<MockSkill[]>(selectedSkills);
  const [skillSearch, setSkillSearch] = useState("");
  const [skillError, setSkillError] = useState<string | null>(null);
  const [skillsOpen, setSkillsOpen] = useState(false);

  const [workHistory, setWorkHistory] = useState<EmploymentFormInput[]>([]);
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [employmentDraft, setEmploymentDraft] = useState<EmploymentFormInput>(
    createEmptyExperience()
  );
  const [employmentEditingIndex, setEmploymentEditingIndex] = useState<
    number | null
  >(null);

  const [educationHistory, setEducationHistory] = useState<Education[]>([]);
  const [educationOpen, setEducationOpen] = useState(false);
  const [educationDraft, setEducationDraft] = useState<Education>(
    createEmptyEducation()
  );
  const [educationEditingIndex, setEducationEditingIndex] = useState<
    number | null
  >(null);

  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageDrafts, setLanguageDrafts] = useState<LanguageDraft[]>([]);
  const [languagesOpen, setLanguagesOpen] = useState(false);

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [savedPhotoUrl, setSavedPhotoUrl] = useState<string | null>(null);
  const [draftPhoto, setDraftPhoto] = useState<File | null>(null);
  const [draftPhotoUrl, setDraftPhotoUrl] = useState<string | null>(null);
  const [photoZoom, setPhotoZoom] = useState(0);
  const [photoRotation, setPhotoRotation] = useState(0);
  const [photoOffset, setPhotoOffset] = useState({ x: 0, y: 0 });
  const [isAttachingPhoto, setIsAttachingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { profile, complete, saving } = useOnboarding();
  const { user } = useAppSelector((state) => state.user);
  const seeded = useRef(false);
  const photoSeeded = useRef(false);

  const displayName = user
    ? `${user.firstName}${user.lastName ? ` ${user.lastName[0]}.` : ""}`
    : "";
  const countryName = user?.countryCode
    ? countries.all.find((c) => c.alpha2 === user.countryCode)?.name
    : undefined;
  const locationText = [user?.city, countryName].filter(Boolean).join(", ");
  const localTime = user?.timezone
    ? new Date().toLocaleTimeString("en-US", {
        timeZone: user.timezone,
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  useEffect(() => {
    if (!profile || seeded.current) return;
    seeded.current = true;

    if (profile.title) {
      setProfileTitle(profile.title);
      setTitleDraft(profile.title);
    }
    if (profile.overview) {
      setProfileDescription(profile.overview);
      setDescriptionDraft(profile.overview);
    }
    if (profile.hourlyRate != null) {
      setRateForm(buildRateForm(String(profile.hourlyRate)));
    }
    if (profile.skills?.length) {
      setSelectedSkills(
        profile.skills.map((skill) => ({
          label: skill.name,
          value: skill.name,
        }))
      );
    }
    if (profile.employment?.length) {
      setWorkHistory(
        profile.employment.map((item: any) => ({
          title: item.title || "",
          company: item.company || "",
          city: item.city || "",
          country: item.country || "",
          isCurrent: Boolean(item.isCurrent),
          startedAt: item.startedAt ? new Date(item.startedAt) : new Date(),
          endAt: item.endAt ? new Date(item.endAt) : new Date(),
          description: item.description || "",
        }))
      );
    }
    if (profile.education?.length) {
      setEducationHistory(
        profile.education.map((item: any) => ({
          school: item.school || "",
          degree: item.degree || "",
          fieldOfStudy: item.fieldOfStudy || "",
          startedYear: item.startedYear ?? null,
          endYear: item.endYear ?? null,
          description: item.description || "",
        }))
      );
    }
    if (profile.languages?.length) {
      setLanguages(
        profile.languages.map((language) => ({
          name: language.name,
          level: language.level,
        }))
      );
    }
  }, [profile]);

  useEffect(() => {
    if (photoSeeded.current) return;
    const storedAvatar = user?.avatarUrl || profile?.photoUrl;
    if (!storedAvatar) return;
    photoSeeded.current = true;
    setSavedPhotoUrl(resolveMediaAssetUrl(storedAvatar));
  }, [user, profile]);

  useEffect(() => {
    if (!profilePhoto) {
      setProfilePhotoUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(profilePhoto);
    setProfilePhotoUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePhoto]);

  useEffect(() => {
    if (!draftPhoto) {
      setDraftPhotoUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(draftPhoto);
    setDraftPhotoUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [draftPhoto]);

  useEffect(() => {
    if (!avatarOpen) return;

    setDraftPhoto(profilePhoto);
    setPhotoZoom(0);
    setPhotoRotation(0);
    setPhotoOffset({ x: 0, y: 0 });
  }, [avatarOpen, profilePhoto]);

  useEffect(() => {
    setPhotoOffset((previousOffset) => {
      const nextOffset = clampPhotoOffset(previousOffset);

      if (
        nextOffset.x === previousOffset.x &&
        nextOffset.y === previousOffset.y
      ) {
        return previousOffset;
      }

      return nextOffset;
    });
  }, [photoZoom]);

  const scale = 1 + photoZoom / 100;
  const canMovePhoto = !!draftPhotoUrl && photoZoom > 0;
  const profileImageSrc: string | StaticImageData | null =
    profilePhotoUrl ?? savedPhotoUrl;

  const clampPhotoOffset = (
    offset: { x: number; y: number },
    size = EDITOR_PREVIEW_SIZE
  ) => {
    const maxOffset = Math.max(0, (size * (scale - 1)) / 2);

    return {
      x: Math.min(maxOffset, Math.max(-maxOffset, offset.x)),
      y: Math.min(maxOffset, Math.max(-maxOffset, offset.y)),
    };
  };

  const getPreviewOffset = (size: number) => {
    const scaledOffset = {
      x: (photoOffset.x * size) / EDITOR_PREVIEW_SIZE,
      y: (photoOffset.y * size) / EDITOR_PREVIEW_SIZE,
    };

    return clampPhotoOffset(scaledOffset, size);
  };

  const handlePhotoChange = (file: File | null) => {
    setDraftPhoto(file);
    setPhotoZoom(0);
    setPhotoRotation(0);
    setPhotoOffset({ x: 0, y: 0 });

    if (!file && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleZoomIn = () => {
    setPhotoZoom((previousZoom) => Math.min(previousZoom + 10, 100));
  };

  const handleRotate = () => {
    setPhotoRotation((previousRotation) => previousRotation - 90);
  };

  const buildEditedPhoto = async () => {
    if (!draftPhotoUrl || !draftPhoto) return null;

    const sourceImage = await new Promise<HTMLImageElement>(
      (resolve, reject) => {
        const image = new window.Image();
        image.onload = () => resolve(image);
        image.onerror = () =>
          reject(new Error("Unable to load selected photo."));
        image.src = draftPhotoUrl;
      }
    );

    const outputSize = 600;
    const previewSize = EDITOR_PREVIEW_SIZE;
    const scaleRatio = outputSize / previewSize;
    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = outputSize;

    const context = canvas.getContext("2d");
    if (!context) return null;

    const coverScale = Math.max(
      outputSize / sourceImage.width,
      outputSize / sourceImage.height
    );
    const imageWidth = sourceImage.width * coverScale;
    const imageHeight = sourceImage.height * coverScale;
    const clampedOffset = clampPhotoOffset(photoOffset, previewSize);
    const translateX = clampedOffset.x * scaleRatio;
    const translateY = clampedOffset.y * scaleRatio;

    context.save();
    context.beginPath();
    context.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
    context.clip();
    context.translate(outputSize / 2 + translateX, outputSize / 2 + translateY);
    context.rotate((photoRotation * Math.PI) / 180);
    context.scale(scale, scale);
    context.drawImage(
      sourceImage,
      -imageWidth / 2,
      -imageHeight / 2,
      imageWidth,
      imageHeight
    );
    context.restore();

    const fileType =
      draftPhoto.type && draftPhoto.type.startsWith("image/")
        ? draftPhoto.type
        : "image/png";
    const extension = fileType.split("/")[1] || "png";
    const fileName =
      draftPhoto.name?.replace(/\.[^/.]+$/, "") || "profile-photo";

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, fileType, 0.92)
    );

    if (!blob) return null;

    return new File([blob], `${fileName}-edited.${extension}`, {
      type: blob.type || fileType,
    });
  };

  const handleAttachPhoto = async () => {
    if (!draftPhoto) {
      setAvatarOpen(false);
      return;
    }

    try {
      setIsAttachingPhoto(true);
      const editedPhoto = await buildEditedPhoto();
      if (!editedPhoto) return;

      const previousToken = user?.avatarUrl || profile?.photoUrl || null;
      const result = await replaceUserAvatar(editedPhoto, previousToken);
      if (!result) return;

      if (result.user) {
        let nextUser = result.user;
        if (result.account) {
          nextUser = {
            ...nextUser,
            accounts: nextUser.accounts.map((account: (typeof nextUser.accounts)[number]) =>
              account.id === result.account!.id
                ? { ...account, ...result.account }
                : account,
            ),
          };
        }
        dispatch(setUser(nextUser));
      }

      if (result.profile) {
        queryClient.setQueryData(["talent-profile"], {
          profile: result.profile,
          account: result.account ?? null,
        });
      }

      setSavedPhotoUrl(result.displayUrl);
      setProfilePhoto(null);
      photoSeeded.current = true;
      setAvatarOpen(false);
    } catch (error) {
      console.error("Failed to attach edited photo", error);
    } finally {
      setIsAttachingPhoto(false);
    }
  };

  const handlePhotoDragStart = (e: PointerEvent<HTMLDivElement>) => {
    if (!draftPhotoUrl || photoZoom === 0) return;

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: photoOffset.x,
      offsetY: photoOffset.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePhotoDragMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || !draftPhotoUrl || photoZoom === 0) return;

    const { x, y, offsetX, offsetY } = dragStartRef.current;

    setPhotoOffset(
      clampPhotoOffset({
        x: offsetX + (e.clientX - x),
        y: offsetY + (e.clientY - y),
      })
    );
  };

  const handlePhotoDragEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    dragStartRef.current = null;
  };

  const renderPhotoPreview = (
    size: number,
    showMoveLabel = false,
    source: string | StaticImageData | null = profileImageSrc
  ) => {
    const imageSrc = source ?? AvatarImage;
    const previewOffset = draftPhotoUrl
      ? getPreviewOffset(size)
      : { x: 0, y: 0 };
    const previewScale = draftPhotoUrl ? scale : 1;
    const previewRotation = draftPhotoUrl ? photoRotation : 0;

    return (
      <div
        className={`relative overflow-hidden rounded-full bg-slate-100 ${
          showMoveLabel && canMovePhoto ? "cursor-move touch-none" : ""
        }`}
        style={{ width: size, height: size }}
        onPointerDown={showMoveLabel ? handlePhotoDragStart : undefined}
        onPointerMove={showMoveLabel ? handlePhotoDragMove : undefined}
        onPointerUp={showMoveLabel ? handlePhotoDragEnd : undefined}
        onPointerLeave={showMoveLabel ? handlePhotoDragEnd : undefined}
        onPointerCancel={showMoveLabel ? handlePhotoDragEnd : undefined}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${previewOffset.x}px, ${previewOffset.y}px)`,
          }}
        >
          <div
            className="relative h-full w-full transition-transform duration-200"
            style={{
              transform: `scale(${previewScale}) rotate(${previewRotation}deg)`,
              transformOrigin: "center",
            }}
          >
            <Image
              src={imageSrc}
              alt="Photo"
              fill
              unoptimized={typeof imageSrc === "string"}
              className="object-cover select-none pointer-events-none"
            />
          </div>
        </div>

        {showMoveLabel && canMovePhoto && (
          <div className="bg-white/80 absolute bottom-4 left-1/2 -translate-x-1/2 mx-auto py-1 px-2 rounded-full flex items-center gap-2">
            <Move className="w-5 h-5" />
            <span className="text-sm font-medium">Move</span>
          </div>
        )}
      </div>
    );
  };

  const openTitleDialog = () => {
    setTitleDraft(profileTitle);
    setTitleError(null);
    setTitleOpen(true);
  };

  const handleSaveTitle = () => {
    const nextError = getTitleError(titleDraft);
    setTitleError(nextError);

    if (nextError) return;

    setProfileTitle(titleDraft.trim());
    setTitleOpen(false);
  };

  const openDescriptionDialog = () => {
    setDescriptionDraft(profileDescription);
    setDescriptionOpen(true);
  };

  const handleSaveDescription = () => {
    setProfileDescription(descriptionDraft.trim());
    setDescriptionOpen(false);
  };

  const openRateDialog = () => {
    setRateDraft(rateForm);
    setRateOpen(true);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRateDraft(buildRateForm(e.target.value));
  };

  const handleSaveRate = () => {
    setRateForm(buildRateForm(rateDraft.rate));
    setRateOpen(false);
  };

  const openSkillsDialog = () => {
    setSkillDrafts(selectedSkills);
    setSkillSearch("");
    setSkillError(null);
    setSkillsOpen(true);
  };

  const handleSelectSkill = (skill: MockSkill) => {
    if (
      skillDrafts.some((selectedSkill) => selectedSkill.value === skill.value)
    ) {
      setSkillSearch("");
      return;
    }

    if (skillDrafts.length >= 15) {
      setSkillError("Must be less than 15 items.");
      return;
    }

    setSkillError(null);
    setSkillDrafts((previousSkills) => [...previousSkills, skill]);
    setSkillSearch("");
  };

  const handleRemoveSkill = (skill: AutoCompleteOption) => {
    setSkillDrafts((previousSkills) =>
      previousSkills.filter(
        (selectedSkill) => selectedSkill.value !== skill.value
      )
    );
    setSkillError(null);
  };

  const handleSaveSkills = () => {
    setSelectedSkills(skillDrafts);
    setSkillsOpen(false);
  };

  const resetEmploymentDialog = () => {
    setEmploymentEditingIndex(null);
    setEmploymentDraft(createEmptyExperience());
  };

  const handleEmploymentOpenChange = (nextOpen: boolean) => {
    setEmploymentOpen(nextOpen);

    if (!nextOpen) {
      resetEmploymentDialog();
    }
  };

  const openAddEmploymentDialog = () => {
    setEmploymentEditingIndex(null);
    setEmploymentDraft(createEmptyExperience());
    setEmploymentOpen(true);
  };

  const openEditEmploymentDialog = (index: number) => {
    setEmploymentEditingIndex(index);
    setEmploymentDraft(cloneExperience(workHistory[index]));
    setEmploymentOpen(true);
  };

  const handleSaveEmployment = () => {
    if (employmentEditingIndex !== null) {
      setWorkHistory((previousHistory) =>
        previousHistory.map((experience, index) =>
          index === employmentEditingIndex
            ? cloneExperience(employmentDraft)
            : experience
        )
      );
    } else {
      setWorkHistory((previousHistory) => [
        ...previousHistory,
        cloneExperience(employmentDraft),
      ]);
    }

    handleEmploymentOpenChange(false);
  };

  const handleDeleteEmployment = (index: number) => {
    setWorkHistory((previousHistory) =>
      previousHistory.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const resetEducationDialog = () => {
    setEducationEditingIndex(null);
    setEducationDraft(createEmptyEducation());
  };

  const handleEducationOpenChange = (nextOpen: boolean) => {
    setEducationOpen(nextOpen);

    if (!nextOpen) {
      resetEducationDialog();
    }
  };

  const openAddEducationDialog = () => {
    setEducationEditingIndex(null);
    setEducationDraft(createEmptyEducation());
    setEducationOpen(true);
  };

  const openEditEducationDialog = (index: number) => {
    setEducationEditingIndex(index);
    setEducationDraft({ ...educationHistory[index] });
    setEducationOpen(true);
  };

  const handleSaveEducation = () => {
    if (educationEditingIndex !== null) {
      setEducationHistory((previousEducation) =>
        previousEducation.map((education, index) =>
          index === educationEditingIndex ? { ...educationDraft } : education
        )
      );
    } else {
      setEducationHistory((previousEducation) => [
        ...previousEducation,
        { ...educationDraft },
      ]);
    }

    handleEducationOpenChange(false);
  };

  const handleDeleteEducation = (index: number) => {
    setEducationHistory((previousEducation) =>
      previousEducation.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const openLanguagesDialog = () => {
    const currentLanguages =
      languages.length > 0
        ? languages
        : [{ name: "English", level: "native" as LanguageLevel }];

    setLanguageDrafts(currentLanguages.map((language) => ({ ...language })));
    setLanguagesOpen(true);
  };

  const handleEnglishLevelChange = (value: string) => {
    setLanguageDrafts((previousLanguages) =>
      previousLanguages.map((language, index) =>
        index === 0
          ? { ...language, name: "English", level: value as LanguageLevel }
          : language
      )
    );
  };

  const handleLanguageNameChange = (index: number, value: string) => {
    setLanguageDrafts((previousLanguages) =>
      previousLanguages.map((language, currentIndex) =>
        currentIndex === index ? { ...language, name: value } : language
      )
    );
  };

  const handleLanguageLevelChange = (index: number, value: string) => {
    setLanguageDrafts((previousLanguages) =>
      previousLanguages.map((language, currentIndex) =>
        currentIndex === index
          ? { ...language, level: value as LanguageLevel }
          : language
      )
    );
  };

  const handleAddLanguage = () => {
    setLanguageDrafts((previousLanguages) => [
      ...previousLanguages,
      { name: "", level: "" },
    ]);
  };

  const handleDeleteLanguage = (index: number) => {
    setLanguageDrafts((previousLanguages) =>
      previousLanguages.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const hasIncompleteLanguageDrafts = languageDrafts.some((language, index) => {
    if (index === 0) {
      return !language.level;
    }

    return Boolean(language.name.trim()) !== Boolean(language.level);
  });

  const handleSaveLanguages = () => {
    if (hasIncompleteLanguageDrafts) return;

    const sanitizedLanguages = languageDrafts
      .filter((language, index) => index === 0 || language.name.trim())
      .map((language, index) => ({
        name: index === 0 ? "English" : language.name.trim(),
        level: (language.level || "native") as LanguageLevel,
      }));

    setLanguages(sanitizedLanguages);
    setLanguagesOpen(false);
  };

  return (
    <CreateProfilePageLayout
      seo={{
        title: "Submit your profile",
        description:
          "Make any edits you want, then submit your profile. You can make more changes after it’s live.",
        url: "/nx/create-profile/submit",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handlePhotoChange(e.target.files?.[0] || null)}
      />

      <div className="space-y-8">
        <h1 className="text-3xl font-medium">Preview Profile</h1>

        <div className="p-8 rounded-3xl bg-slate-50 flex items-center gap-8">
          <div className="w-3/4">
            <h2 className="text-2xl font-medium">
              Looking good{user?.firstName ? `, ${user.firstName}` : ""}!
            </h2>
            <p className="text-sm mt-2">
              Make any edits you want, then submit your profile. You can make
              more changes after it’s live.
            </p>
            <Button
              type="primary"
              label="Submit profile"
              loading={saving}
              classname="text-sm! font-medium! rounded-full! mt-6"
              onClick={() => complete("/nx/create-profile/finish")}
            />
          </div>

          <div className="flex-1">
            <Image
              src={DocEditIcon}
              alt="Doc Edit Icon"
              width={145}
              height={130}
            />
          </div>
        </div>

        <div className="flex items-start gap-8">
          <div className="w-3/4 space-y-8">
            <div className="border border-slate-300 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative w-[128px] h-[128px]">
                  {profileImageSrc ? (
                    <Image
                      src={profileImageSrc}
                      alt={displayName || "User"}
                      width={128}
                      height={128}
                      unoptimized={typeof profileImageSrc === "string"}
                      className="rounded-full object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src={AvatarImage}
                      alt="Avatar"
                      width={128}
                      height={128}
                      className="rounded-full object-cover w-full h-full"
                    />
                  )}

                  <button
                    type="button"
                    className="p-1 rounded-full bg-white border border-blue-600 text-blue-600 absolute bottom-1 right-1 cursor-pointer hover:bg-slate-100"
                    onClick={() => setAvatarOpen(true)}
                  >
                    <Icon icon="mdi:pencil-outline" width={24} height={24} />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-medium">{displayName}</h3>
                  {locationText && (
                    <div className="flex items-center gap-2 text-slate-800">
                      <Icon
                        icon="mdi:map-marker-outline"
                        width={16}
                        height={16}
                      />
                      <p className="text-sm">{locationText}</p>
                    </div>
                  )}
                  {localTime && (
                    <p className="text-sm text-slate-600">
                      {localTime} local time
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <h4 className="text-lg font-medium">{profileTitle}</h4>
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="p-1.5!"
                  onClick={openTitleDialog}
                />
              </div>

              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-800">{profileDescription}</p>
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="p-1.5!"
                  onClick={openDescriptionDialog}
                />
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <h4 className="text-lg font-medium">
                    {formatCurrency(rateForm.rate)}
                  </h4>
                  <p className="text-sm text-slate-600">Hourly rate</p>
                </div>
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="p-1.5!"
                  onClick={openRateDialog}
                />
              </div>
            </div>

            <div className="border border-slate-300 rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-medium">Skills</h4>
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="p-1.5!"
                  onClick={openSkillsDialog}
                />
              </div>

              <div>
                <p className="text-sm text-slate-600">Self-reported</p>
                <ul className="flex flex-wrap items-center gap-2 mt-2">
                  {selectedSkills.map((skill) => (
                    <li
                      key={skill.value}
                      className="py-1 px-4 rounded-md bg-slate-200 text-sm text-slate-800"
                    >
                      {skill.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1 text-slate-600">
                  <p className="text-sm">Working style</p>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon
                        icon="mdi:question-mark-circle-outline"
                        className="w-4 h-4"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-sm p-2">
                        This science-backed assessment helps you understand how
                        you work best and connect with the right clients. There
                        are no right or wrong answers, only insights into your
                        natural strengths and working style.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="p-4 rounded-xl bg-blue-100 flex items-start gap-4 mt-2">
                  <Icon
                    icon="mdi:account-star-outline"
                    className="w-6 h-6 text-blue-600"
                  />
                  <p className="text-sm font-medium">
                    Help clients see why you’re the right fit and boost your
                    chances of getting hired by highlighting strengths beyond
                    hard skills.{" "}
                    <Link href="#" className="underline cursor-pointer">
                      Take assessment
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-slate-300 rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-medium">Work history</h4>
                <IconButton
                  variant="outline"
                  icon="mdi:plus"
                  className="p-1.5!"
                  onClick={openAddEmploymentDialog}
                />
              </div>

              <ul className="space-y-6">
                {workHistory.map((work, index) => (
                  <li
                    key={index}
                    className="flex items-start justify-between gap-6"
                  >
                    <div>
                      <h5 className="text-lg font-medium mb-2">
                        {work.company} | {work.title}
                      </h5>
                      <p className="text-sm text-slate-600">
                        {formatMonthYear(work.startedAt)} -{" "}
                        {work.isCurrent
                          ? "Present"
                          : formatMonthYear(work.endAt)}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {work.city}, {work.country}
                      </p>
                      <p className="text-sm line-clamp-3 mt-2">
                        {work.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <IconButton
                        variant="outline"
                        icon="mdi:pencil-outline"
                        className="p-1.5!"
                        onClick={() => openEditEmploymentDialog(index)}
                      />
                      <IconButton
                        variant="outline"
                        icon="mdi:trash-can-outline"
                        className="p-1.5!"
                        onClick={() => handleDeleteEmployment(index)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-300 rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-medium">Education</h4>
                <IconButton
                  variant="outline"
                  icon="mdi:plus"
                  className="p-1.5!"
                  onClick={openAddEducationDialog}
                />
              </div>

              <ul className="space-y-6">
                {educationHistory.map((education, index) => (
                  <li
                    key={index}
                    className="flex items-start justify-between gap-6"
                  >
                    <div>
                      <h5 className="text-lg font-medium mb-2">
                        {education.school}
                      </h5>
                      <p className="text-sm text-slate-600">
                        {education.degree}, {education.fieldOfStudy}{" "}
                        {education.startedYear} - {education.endYear}
                      </p>
                      <p className="text-sm line-clamp-3 mt-2">
                        {education.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <IconButton
                        variant="outline"
                        icon="mdi:pencil-outline"
                        className="p-1.5!"
                        onClick={() => openEditEducationDialog(index)}
                      />
                      <IconButton
                        variant="outline"
                        icon="mdi:trash-can-outline"
                        className="p-1.5!"
                        onClick={() => handleDeleteEducation(index)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-medium">Languages</h4>
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="p-1.5!"
                  onClick={openLanguagesDialog}
                />
              </div>

              <ul className="space-y-2">
                {languages.map((language, index) => (
                  <li key={`${language.name}-${index}`}>
                    <p className="text-sm">
                      {language.name}:{" "}
                      <span className="text-slate-600">
                        {LANGUAGE_LEVEL_LABELS[language.level]}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-200 w-full h-[1px]"></div>

            <div className="space-y-6">
              <h4 className="text-2xl font-medium">Verifications</h4>

              <ul className="space-y-4">
                <li className="text-sm">
                  <span>Phone number:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Icon
                      icon={
                        user?.phoneVerified
                          ? "mdi:verified"
                          : "mdi:alert-circle-outline"
                      }
                      className={`w-5 h-5 ${
                        user?.phoneVerified ? "text-blue-600" : "text-slate-400"
                      }`}
                    />
                    <span className="text-slate-600">
                      {user?.phoneVerified ? "Verified" : "Not verified"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={avatarOpen} onOpenChange={setAvatarOpen}>
        <DialogContent className="flex max-h-[90vh] w-full flex-col overflow-hidden sm:max-w-4xl">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Your photo</DialogTitle>
          </DialogHeader>

          <div className="flex items-start gap-10 overflow-y-auto p-4">
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="rounded-full transition-all relative duration-200 border border-dotted border-slate-400 w-[300px] h-[300px] overflow-hidden">
                {!draftPhotoUrl ? (
                  <button
                    type="button"
                    className="cursor-pointer hover:bg-slate-100 w-full h-full flex flex-col items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 w-[40%]">
                      <Icon
                        icon="material-symbols-light:account-circle-outline"
                        className="w-14 h-14 text-slate-800"
                      />
                      <p className="text-sm text-slate-600 text-center">
                        <span className="text-black underline">Upload</span> or
                        drop image here
                      </p>
                    </div>
                  </button>
                ) : (
                  renderPhotoPreview(300, true, draftPhotoUrl)
                )}
              </div>

              {!draftPhoto ? (
                <p className="text-sm text-slate-600">
                  250x250 Min size/ 5MB Max
                </p>
              ) : (
                <div className="space-y-8 w-full mt-2 px-6">
                  <div className="flex items-center gap-4">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer"
                      onClick={handleZoomIn}
                    >
                      <Icon
                        icon="material-symbols-light:zoom-in-rounded"
                        className="w-6 h-6"
                      />
                    </motion.button>
                    <Slider
                      className="flex-1"
                      value={[photoZoom]}
                      onValueChange={(value) => setPhotoZoom(value[0] || 0)}
                      max={100}
                      step={1}
                    />
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer"
                      onClick={handleRotate}
                    >
                      <Icon
                        icon="material-symbols-light:rotate-left-rounded"
                        className="w-6 h-6"
                      />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-center">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer text-sm font-medium flex items-center gap-2 text-blue-600"
                      onClick={() => handlePhotoChange(null)}
                    >
                      <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                      Delete current image
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <h3 className="text-3xl">
                Show clients the best version of yourself!
              </h3>

              <div className="flex items-end gap-4">
                {renderPhotoPreview(
                  100,
                  false,
                  draftPhotoUrl ?? profileImageSrc
                )}
                {renderPhotoPreview(
                  80,
                  false,
                  draftPhotoUrl ?? profileImageSrc
                )}
                {renderPhotoPreview(
                  60,
                  false,
                  draftPhotoUrl ?? profileImageSrc
                )}
                {renderPhotoPreview(
                  40,
                  false,
                  draftPhotoUrl ?? profileImageSrc
                )}
              </div>

              <div className="text-sm">
                <p className="font-medium">Must be an actual photo of you.</p>
                <p className="text-slate-900 mt-1">
                  Logos, clip-art, group photos, and digitally-altered images
                  are not allowed.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer py-2 px-4 rounded-full text-sm font-medium"
              >
                Cancel
              </motion.button>
            </DialogClose>

            <Button
              type="primary"
              label="Attach photo"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              disabled={!draftPhoto}
              loading={isAttachingPhoto}
              onClick={handleAttachPhoto}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={titleOpen} onOpenChange={setTitleOpen}>
        <DialogContent className="flex w-full flex-col sm:max-w-2xl">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Edit title</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <Input
              label="Your professional role"
              placeholder="Example: Accounting & Consulting"
              type="text"
              name="title"
              classname="text-sm!"
              value={titleDraft}
              onChange={(e) => {
                setTitleDraft(e.target.value);
                if (titleError) {
                  setTitleError(getTitleError(e.target.value));
                }
              }}
              error={titleError ?? undefined}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSaveTitle}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={descriptionOpen} onOpenChange={setDescriptionOpen}>
        <DialogContent className="flex w-full flex-col sm:max-w-4xl">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Edit overview</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <Textarea
              name="overview"
              value={descriptionDraft}
              placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile."
              rows={10}
              onChange={(e) => setDescriptionDraft(e.target.value)}
            />
            <p className="text-xs text-slate-600 text-right mt-1">
              At least 100 characters
            </p>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSaveDescription}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rateOpen} onOpenChange={setRateOpen}>
        <DialogContent className="flex w-full flex-col sm:max-w-4xl">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Edit hourly rate</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <ul>
              <li className="pb-6 flex items-center justify-between gap-6 border-b border-slate-200">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium">Hourly rate</h3>
                  <p className="text-sm text-slate-900">
                    Total amount the client will see.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    name="rate"
                    placeholder="$0.00"
                    value={rateDraft.rate}
                    onChange={handleRateChange}
                  />
                  <span className="text-sm text-slate-600">/ hr</span>
                </div>
              </li>

              <li className="py-6 flex items-center justify-between gap-6 border-b border-slate-200">
                <div>
                  <h3 className="text-2xl font-medium mb-4">Service fee</h3>
                  <p className="text-sm text-slate-900">
                    This helps us run the platform and provide services like
                    payment protection and customer support.
                  </p>
                  <p className="text-sm text-slate-900">
                    Fees vary and are shown before contract acceptance. $0.00
                    /hr per hour -$0.00/hr
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    name="fee"
                    placeholder="$0.00"
                    disabled={true}
                    value={rateDraft.fee}
                    onChange={() => {}}
                  />
                  <span className="text-sm text-slate-600">/ hr</span>
                </div>
              </li>

              <li className="py-6 flex items-center justify-between gap-6 border-b border-slate-200">
                <div>
                  <h3 className="text-2xl font-medium mb-4">You'll get</h3>
                  <p className="text-sm text-slate-900">
                    The estimated amount you'll receive after service fees
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    name="estimated"
                    placeholder="$0.00"
                    disabled={true}
                    value={rateDraft.estimated}
                    onChange={() => {}}
                  />
                  <span className="text-sm text-slate-600">/ hr</span>
                </div>
              </li>
            </ul>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSaveRate}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={skillsOpen} onOpenChange={setSkillsOpen}>
        <DialogContent className="flex w-full flex-col sm:max-w-3xl">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Edit skills</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <AutoCompleteSelector
              label="Your skills"
              subLabel="Max 15 skills"
              placeholder="Enter skills here"
              name="skills"
              options={MOCK_SKILLS}
              value={skillSearch}
              selectedValues={skillDrafts}
              onChange={setSkillSearch}
              onSelect={(option) => handleSelectSkill(option as MockSkill)}
              onRemove={handleRemoveSkill}
              error={skillError || undefined}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSaveSkills}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={employmentOpen} onOpenChange={handleEmploymentOpenChange}>
        <DialogContent className="flex max-h-[90vh] w-full flex-col sm:max-w-4xl">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">
              {employmentEditingIndex !== null
                ? "Edit Work Experience"
                : "Add Work Experience"}
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6 p-4 no-scrollbar overflow-y-auto">
            <Input
              type="text"
              name="title"
              label="Title"
              placeholder="Ex: Software Engineer"
              labelClassName="text-sm font-medium"
              required
              value={employmentDraft.title}
              onChange={(e) =>
                setEmploymentDraft({
                  ...employmentDraft,
                  title: e.target.value,
                })
              }
            />
            <Input
              type="text"
              name="company"
              label="Company"
              placeholder="Ex: Microsoft"
              labelClassName="text-sm font-medium"
              required
              value={employmentDraft.company}
              onChange={(e) =>
                setEmploymentDraft({
                  ...employmentDraft,
                  company: e.target.value,
                })
              }
            />

            <div>
              <label className="text-sm font-medium">Location</label>
              <div className="flex items-center gap-6 mt-1">
                <div className="flex-1">
                  <Input
                    type="text"
                    name="city"
                    placeholder="Ex: London"
                    labelClassName="text-sm font-medium"
                    required
                    value={employmentDraft.city}
                    onChange={(e) =>
                      setEmploymentDraft({
                        ...employmentDraft,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <SearchCombobox
                    name="country"
                    placeholder="Country"
                    options={countries.all.map((country) => country.name)}
                    defaultOption={employmentDraft.country}
                    onSelect={(value: string) =>
                      setEmploymentDraft({
                        ...employmentDraft,
                        country: value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={employmentDraft.isCurrent}
                onCheck={(value: boolean) =>
                  setEmploymentDraft({
                    ...employmentDraft,
                    isCurrent: value,
                  })
                }
                className="w-5! h-5!"
              />
              <label className="text-sm">
                I am currently working in this role
              </label>
            </div>

            <div className="flex items-center gap-6">
              <DateDropdown
                label="Start Date"
                name="startedAt"
                required
                value={employmentDraft.startedAt}
                onChange={(value: Date) =>
                  setEmploymentDraft({ ...employmentDraft, startedAt: value })
                }
                classname="flex-1"
              />
              <DateDropdown
                label="End Date"
                name="endAt"
                required
                value={employmentDraft.endAt}
                onChange={(value: Date) =>
                  setEmploymentDraft({ ...employmentDraft, endAt: value })
                }
                classname="flex-1"
                disabled={employmentDraft.isCurrent}
              />
            </div>

            <Textarea
              name="description"
              label="Description"
              labelClassName="text-sm font-medium"
              value={employmentDraft.description}
              onChange={(e) =>
                setEmploymentDraft({
                  ...employmentDraft,
                  description: e.target.value,
                })
              }
            />
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSaveEmployment}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={educationOpen} onOpenChange={handleEducationOpenChange}>
        <DialogContent className="flex max-h-[90vh] w-full flex-col sm:max-w-4xl">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">
              {educationEditingIndex !== null
                ? "Edit Education History"
                : "Add Education History"}
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6 p-4 no-scrollbar overflow-y-auto">
            <Input
              type="text"
              name="school"
              label="School"
              placeholder="Ex: University of London"
              labelClassName="text-sm font-medium"
              required
              value={educationDraft.school}
              onChange={(e) =>
                setEducationDraft({
                  ...educationDraft,
                  school: e.target.value,
                })
              }
            />
            <Input
              type="text"
              name="degree"
              label="Degree"
              placeholder="Ex: Bachelors"
              labelClassName="text-sm font-medium"
              required
              value={educationDraft.degree}
              onChange={(e) =>
                setEducationDraft({
                  ...educationDraft,
                  degree: e.target.value,
                })
              }
            />

            <Input
              type="text"
              name="fieldOfStudy"
              label="Field of Study"
              placeholder="Ex: Computer Science"
              labelClassName="text-sm font-medium"
              required
              value={educationDraft.fieldOfStudy}
              onChange={(e) =>
                setEducationDraft({
                  ...educationDraft,
                  fieldOfStudy: e.target.value,
                })
              }
            />

            <div>
              <label className="text-sm font-medium">Dates Attended</label>
              <div className="flex items-center gap-6 mt-1">
                <Dropdown
                  placeholder="From"
                  name="startedYear"
                  options={Array.from(
                    { length: 20 },
                    (_, index) => index + 2005
                  ).map((year) => ({
                    label: year.toString(),
                    value: year.toString(),
                  }))}
                  value={educationDraft.startedYear?.toString() || ""}
                  onSelect={(value: string) =>
                    setEducationDraft({
                      ...educationDraft,
                      startedYear: Number(value),
                    })
                  }
                />

                <Dropdown
                  placeholder="To (or expected graduation year)"
                  name="endYear"
                  options={Array.from(
                    { length: 20 },
                    (_, index) => index + 2005
                  ).map((year) => ({
                    label: year.toString(),
                    value: year.toString(),
                  }))}
                  value={educationDraft.endYear?.toString() || ""}
                  onSelect={(value: string) =>
                    setEducationDraft({
                      ...educationDraft,
                      endYear: Number(value),
                    })
                  }
                />
              </div>
            </div>

            <Textarea
              name="description"
              label="Description"
              labelClassName="text-sm font-medium"
              value={educationDraft.description ?? ""}
              onChange={(e) =>
                setEducationDraft({
                  ...educationDraft,
                  description: e.target.value,
                })
              }
            />
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSaveEducation}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={languagesOpen} onOpenChange={setLanguagesOpen}>
        <DialogContent className="flex w-full flex-col sm:max-w-4xl">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Edit languages</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <label className="text-sm font-light">Language</label>
            <ul>
              <li className="border-b border-slate-200 flex items-center p-4">
                <span className="text-sm text-slate-600 w-1/2">
                  English (all profiles include this)
                </span>

                <div className="flex-1 flex items-center gap-2 justify-between">
                  <Dropdown
                    name="english-level"
                    placeholder="My level is"
                    options={LANGUAGE_LEVEL_OPTIONS}
                    classname="w-2/3!"
                    value={languageDrafts[0]?.level || ""}
                    onSelect={handleEnglishLevelChange}
                  />
                </div>
              </li>

              {languageDrafts.slice(1).map((language, index) => {
                const actualIndex = index + 1;

                return (
                  <li
                    key={`${language.name || "language"}-${actualIndex}`}
                    className="border-b border-slate-200 flex items-center gap-2 p-4"
                  >
                    <div className="flex-1 flex items-center gap-2">
                      <div className="w-2/3!">
                        <SearchCombobox
                          placeholder="Select language"
                          name={`language-${actualIndex}`}
                          options={LANGUAGE_OPTIONS}
                          defaultOption={language.name}
                          onSelect={(value: string) =>
                            handleLanguageNameChange(actualIndex, value)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex items-center gap-2 justify-between">
                      <Dropdown
                        name={`language-level-${actualIndex}`}
                        placeholder="My level is"
                        options={LANGUAGE_LEVEL_OPTIONS}
                        classname="w-2/3!"
                        value={language.level}
                        disabled={!language.name}
                        onSelect={(value) =>
                          handleLanguageLevelChange(actualIndex, value)
                        }
                      />
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="p-1 rounded-full border border-slate-400 transition-all duration-200 cursor-pointer hover:bg-slate-100"
                        onClick={() => handleDeleteLanguage(actualIndex)}
                      >
                        <Icon icon="mdi:trash-can-outline" width={20} />
                      </motion.button>
                    </div>
                  </li>
                );
              })}
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

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              disabled={hasIncompleteLanguageDrafts}
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSaveLanguages}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CreateProfilePageLayout>
  );
}

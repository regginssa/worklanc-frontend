import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import TalentAPI, {
  type EmploymentInput,
  type EducationInput,
  type FreelancerProfileResponse,
  type LanguageInput,
  type TalentProfilePatch,
} from "@/lib/api/talent";
import AuthAPI from "@/lib/api/auth";
import type {
  Certification,
  Education,
  Employment,
  EmploymentFormInput,
  Language,
  LanguageLevel,
  OtherExperience,
} from "@/types/user";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

const emptyEmployment = (): EmploymentFormInput => ({
  title: "",
  company: "",
  city: "",
  country: "",
  startedAt: new Date(),
  endAt: new Date(),
  isCurrent: false,
  description: "",
});

const emptyEducation = (): Education => ({
  school: "",
  degree: "",
  fieldOfStudy: "",
  startedYear: null,
  endYear: null,
  description: "",
});

const toEmploymentForm = (item: Employment): any => ({
  title: item.title,
  company: item.company,
  location: {
    city: item.city || "",
    country: item.country || "",
  },
  startedAt: item.startedAt ? new Date(item.startedAt) : new Date(),
  endAt: item.endAt ? new Date(item.endAt) : new Date(),
  isCurrent: item.isCurrent,
  description: item.description || "",
});

const toEmploymentInput = (item: Employment): EmploymentInput => ({
  title: item.title,
  company: item.company,
  city: item.city ?? null,
  country: item.country ?? null,
  startedAt: item.startedAt ?? null,
  endAt: item.endAt ?? null,
  isCurrent: item.isCurrent,
  description: item.description ?? "",
});

const fromEmploymentForm = (form: any): EmploymentInput => ({
  title: form.title,
  company: form.company,
  city: form.location?.city ?? null,
  country: form.location?.country ?? null,
  startedAt: form.startedAt,
  endAt: form.isCurrent ? null : form.endAt,
  isCurrent: Boolean(form.isCurrent),
  description: form.description ?? "",
});

export function useFreelancerProfilePage(uid?: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [previewAsPublic, setPreviewAsPublic] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<FreelancerProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady || !uid) {
      setData(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    TalentAPI.getFreelancerByUid(uid)
      .then((response) => {
        if (!cancelled) {
          setData(response);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [router.isReady, uid]);

  const isPageLoading = !router.isReady || (Boolean(uid) && isLoading);

  const profile = data?.profile ?? null;
  const freelancer = data?.freelancer ?? null;
  const isOwner = Boolean(data?.isOwner);
  const canEdit = isOwner && !previewAsPublic;

  const refreshProfile = useCallback(async () => {
    if (!uid) return;
    const response = await TalentAPI.getFreelancerByUid(uid);
    setData(response);
  }, [uid]);

  const patchProfile = useCallback(
    async (patch: TalentProfilePatch) => {
      if (!canEdit) return null;
      setSaving(true);
      try {
        const res = await TalentAPI.updateProfile(patch);
        if (res?.profile) {
          setData((current) =>
            current
              ? {
                  ...current,
                  profile: res.profile,
                }
              : null,
          );
          queryClient.setQueryData(["talent-profile"], {
            profile: res.profile,
            account: res.account ?? null,
          });
        }
        return res;
      } finally {
        setSaving(false);
      }
    },
    [canEdit, queryClient]
  );

  const saveTitle = useCallback(
    async (title: string) => patchProfile({ title }),
    [patchProfile]
  );

  const saveOverview = useCallback(
    async (overview: string) => patchProfile({ overview }),
    [patchProfile]
  );

  const saveHourlyRate = useCallback(
    async (hourlyRate: number) => patchProfile({ hourlyRate }),
    [patchProfile]
  );

  const saveEmployment = useCallback(
    async (items: EmploymentInput[]) => patchProfile({ employment: items }),
    [patchProfile]
  );

  const saveEducation = useCallback(
    async (items: EducationInput[]) => patchProfile({ education: items }),
    [patchProfile]
  );

  const saveLanguages = useCallback(
    async (items: LanguageInput[]) => patchProfile({ languages: items }),
    [patchProfile]
  );

  const saveCertifications = useCallback(
    async (items: Certification[]) =>
      patchProfile({
        certifications: items.map((item) => ({
          name: item.name,
          provider: item.provider,
          providerLogoUrl: item.providerLogoUrl,
          issuedDate: item.issuedDate,
          expirationDate: item.expirationDate,
          description: item.description,
          credentialId: item.credentialId,
          credentialUrl: item.credentialUrl,
        })),
      }),
    [patchProfile]
  );

  const saveOtherExperiences = useCallback(
    async (items: OtherExperience[]) =>
      patchProfile({
        otherExperiences: items.map((item) => ({
          subject: item.subject,
          description: item.description,
        })),
      }),
    [patchProfile]
  );

  const saveSkills = useCallback(
    async (skills: { name: string }[]) =>
      patchProfile({ skills: skills.map((skill) => skill.name) }),
    [patchProfile]
  );

  const saveMilitaryVeteran = useCallback(async () => {
    const res = await AuthAPI.updateMe({ isMilitaryVeteran: true });
    if (res?.user) {
      dispatch(setUser(res.user));
      await refreshProfile();
    }
  }, [dispatch, refreshProfile]);

  const employmentItems = useMemo(
    () => profile?.employment ?? [],
    [profile?.employment]
  );
  const educationItems = useMemo(
    () => profile?.education ?? [],
    [profile?.education]
  );

  return {
    router,
    profile,
    freelancer,
    isLoading: isPageLoading,
    isOwner,
    canEdit,
    previewAsPublic,
    setPreviewAsPublic,
    saving,
    patchProfile,
    refreshProfile,
    saveTitle,
    saveOverview,
    saveHourlyRate,
    saveEmployment,
    saveEducation,
    saveLanguages,
    saveCertifications,
    saveOtherExperiences,
    saveSkills,
    saveMilitaryVeteran,
    employmentItems,
    educationItems,
    emptyEmployment,
    emptyEducation,
    toEmploymentForm,
    fromEmploymentForm,
  };
}

export type LanguageDraft = {
  name: string;
  level: LanguageLevel | "";
};

export function splitLanguageDrafts(languages: Language[]) {
  const english = languages.find((language) => language.name === "English");

  return {
    englishLevel: (english?.level ?? "") as LanguageLevel | "",
    additionalLanguages: languages
      .filter((language) => language.name !== "English")
      .map((language) => ({
        name: language.name,
        level: language.level,
      })),
  };
}

export function buildLanguagesPayload(
  englishLevel: LanguageLevel | "",
  additionalLanguages: LanguageDraft[],
): LanguageInput[] {
  const payload: LanguageInput[] = [];

  if (englishLevel) {
    payload.push({ name: "English", level: englishLevel });
  }

  additionalLanguages
    .filter((language) => language.name.trim() && language.level)
    .forEach((language) => {
      payload.push({
        name: language.name.trim(),
        level: language.level as LanguageLevel,
      });
    });

  return payload;
}

/** @deprecated Use splitLanguageDrafts + buildLanguagesPayload instead. */
export function buildLanguageDrafts(languages: Language[]): LanguageDraft[] {
  if (!languages.length) {
    return [{ name: "English", level: "native" }];
  }
  return languages.map((language) => ({
    name: language.name,
    level: language.level,
  }));
}

/** @deprecated Use buildLanguagesPayload instead. */
export function sanitizeLanguageDrafts(
  drafts: LanguageDraft[]
): LanguageInput[] {
  return drafts
    .filter((language, index) => index === 0 || language.name.trim())
    .map((language, index) => ({
      name: index === 0 ? "English" : language.name.trim(),
      level: (language.level || "basic") as LanguageLevel,
    }));
}

export function serializeEmploymentList(
  items: Employment[],
  form: any,
  editingIndex: number | null
): EmploymentInput[] {
  const next = items.map(toEmploymentInput);
  const payload = fromEmploymentForm(form);

  if (editingIndex == null) {
    next.push(payload);
  } else {
    next[editingIndex] = payload;
  }
  return next;
}

export function removeEmploymentAt(
  items: Employment[],
  index: number
): EmploymentInput[] {
  return items
    .filter((_, itemIndex) => itemIndex !== index)
    .map(toEmploymentInput);
}

export function serializeEducationList(
  items: Education[],
  form: Education,
  editingIndex: number | null
): EducationInput[] {
  const next = items.map((item) => ({
    school: item.school,
    degree: item.degree,
    fieldOfStudy: item.fieldOfStudy,
    startedYear: item.startedYear,
    endYear: item.endYear,
    description: item.description,
  }));

  const payload = {
    school: form.school,
    degree: form.degree,
    fieldOfStudy: form.fieldOfStudy,
    startedYear: form.startedYear,
    endYear: form.endYear,
    description: form.description,
  };

  if (editingIndex == null) {
    next.push(payload);
  } else {
    next[editingIndex] = payload;
  }
  return next;
}

export function removeEducationAt(
  items: Education[],
  index: number
): EducationInput[] {
  return items
    .filter((_, itemIndex) => itemIndex !== index)
    .map((item) => ({
      school: item.school,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy,
      startedYear: item.startedYear,
      endYear: item.endYear,
      description: item.description,
    }));
}

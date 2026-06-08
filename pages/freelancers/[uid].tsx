import { FreelancerLayout } from "@/components/layouts";
import AvatarImage from "@/public/assets/svgs/icons/other/avatar.svg";
import { Button } from "@/components/atoms";
import {
  CertificationDialog,
  emptyCertificationForm,
  EducationDialog,
  EmploymentDialog,
  FreelancerPlusAlert,
  FreelancerProfileCertifications,
  FreelancerProfileConnects,
  FreelancerProfileEmploymentHistory,
  FreelancerProfileHeader,
  FreelancerProfileHoursPerWeek,
  FreelancerProfileLanguages,
  FreelancerProfileLicenses,
  FreelancerProfileOtherExperiences,
  FreelancerProfileOverview,
  FreelancerProfilePortfolio,
  FreelancerProfileProjectCatalog,
  FreelancerProfilePromoteAds,
  FreelancerProfileSidebarEducation,
  FreelancerProfileSkills,
  FreelancerProfileTestimonials,
  FreelancerProfileTitleRate,
  FreelancerProfileVerifications,
  FreelancerProfileVideoIntro,
  FreelancerProfileWorkHistory,
  HourlyRateDialog,
  LanguagesDialog,
  MilitaryVeteranDialog,
  OtherExperienceDialog,
  emptyOtherExperienceForm,
  ProfileOverviewDialog,
  TestimonialDialog,
  TitleDialog,
  type CertificationFormData,
  type LanguagesDialogErrors,
  type OtherExperienceFormData,
  AvailabilityDialog,
  emptyAvailabilityForm,
  type AvailabilityFormData,
  type AvailabilityFormErrors,
} from "@/components/molecules";
import { resolveMediaAssetUrl } from "@/lib/api/upload";
import {
  buildLanguagesPayload,
  removeCertificationAt,
  removeEducationAt,
  removeEmploymentAt,
  serializeCertificationList,
  serializeEducationList,
  serializeEmploymentList,
  splitLanguageDrafts,
  toCertificationForm,
  useFreelancerProfilePage,
  type LanguageDraft,
} from "@/hooks/useFreelancerProfilePage";
import {
  formatContractToHirePreference,
  formatFreelancerDisplayName,
  formatFreelancerLocalTime,
  formatFreelancerLocation,
  formatHoursPerWeekLabel,
  LANGUAGE_LEVEL_LABELS,
} from "@/utils/freelancer-profile";
import { buildHourlyRateForm } from "@/utils/rate";
import {
  validateAvailabilityForm,
  validateCertificationForm,
  validateEducationForm,
  validateEmploymentForm,
  validateHourlyRateForm,
  validateLanguagesForm,
  validateOtherExperienceForm,
  validateOverviewForm,
  validateSkillsForm,
  validateTitleForm,
  type CertificationFormErrors,
  type EducationFormErrors,
  type EmploymentFormErrors,
} from "@/utils/validateFreelancerProfileForms";
import type { Education, LanguageLevel } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AutoCompleteSelector, Button as AtomButton } from "@/components/atoms";
import { MOCK_SKILLS } from "@/static/data/mock-skills";
import type { AutoCompleteOption } from "@/components/atoms/AutoCompleteSelector";

const createEmptyEmploymentDraft = () => ({
  title: "",
  company: "",
  location: { city: "", country: "" },
  startedAt: new Date(),
  endAt: new Date(),
  isCurrent: false,
  description: "",
});

export default function FreelancerProfilePage() {
  const router = useRouter();
  const uid = router.isReady
    ? (router.query.uid as string | undefined)
    : undefined;

  const {
    profile,
    freelancer,
    isLoading,
    canEdit,
    previewAsPublic,
    setPreviewAsPublic,
    saving,
    saveTitle,
    saveOverview,
    saveHourlyRate,
    saveAvailability,
    saveEmployment,
    saveEducation,
    saveLanguages,
    saveCertifications,
    saveOtherExperiences,
    saveSkills,
    saveMilitaryVeteran,
    employmentItems,
    educationItems,
    emptyEducation,
    toEmploymentForm,
  } = useFreelancerProfilePage(uid);

  const [portfolioTabIdx, setPortfolioTabIdx] = useState(0);
  const [titleOpen, setTitleOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [testimonialOpen, setTestimonialOpen] = useState(false);
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [certificationOpen, setCertificationOpen] = useState(false);
  const [otherExperienceOpen, setOtherExperienceOpen] = useState(false);
  const [militaryVeteranOpen, setMilitaryVeteranOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [availabilityDraft, setAvailabilityDraft] =
    useState<AvailabilityFormData>(emptyAvailabilityForm());

  const [titleDraft, setTitleDraft] = useState("");
  const [overviewDraft, setOverviewDraft] = useState("");
  const [rateDraft, setRateDraft] = useState(buildHourlyRateForm(""));
  const [employmentDraft, setEmploymentDraft] = useState<any>(
    createEmptyEmploymentDraft()
  );
  const [educationDraft, setEducationDraft] = useState<Education>(
    emptyEducation()
  );
  const [certificationDraft, setCertificationDraft] =
    useState<CertificationFormData>(emptyCertificationForm());
  const [otherExperienceDraft, setOtherExperienceDraft] =
    useState<OtherExperienceFormData>(emptyOtherExperienceForm());
  const [englishLevel, setEnglishLevel] = useState<LanguageLevel | "">("");
  const [additionalLanguages, setAdditionalLanguages] = useState<
    LanguageDraft[]
  >([]);
  const [skillDrafts, setSkillDrafts] = useState<AutoCompleteOption[]>([]);
  const [skillSearch, setSkillSearch] = useState("");

  const [employmentEditingIndex, setEmploymentEditingIndex] = useState<
    number | null
  >(null);
  const [educationEditingIndex, setEducationEditingIndex] = useState<
    number | null
  >(null);
  const [removingEmploymentIndex, setRemovingEmploymentIndex] = useState<
    number | null
  >(null);
  const [removingEducationIndex, setRemovingEducationIndex] = useState<
    number | null
  >(null);
  const [certificationEditingIndex, setCertificationEditingIndex] = useState<
    number | null
  >(null);
  const [removingCertificationIndex, setRemovingCertificationIndex] = useState<
    number | null
  >(null);

  const [titleErrors, setTitleErrors] = useState<{ title?: string }>({});
  const [rateErrors, setRateErrors] = useState<{ rate?: string }>({});
  const [overviewErrors, setOverviewErrors] = useState<{ overview?: string }>(
    {}
  );
  const [employmentErrors, setEmploymentErrors] =
    useState<EmploymentFormErrors>({});
  const [educationErrors, setEducationErrors] = useState<EducationFormErrors>(
    {}
  );
  const [certificationErrors, setCertificationErrors] =
    useState<CertificationFormErrors>({});
  const [otherExperienceErrors, setOtherExperienceErrors] = useState<{
    subject?: string;
  }>({});
  const [languageErrors, setLanguageErrors] = useState<LanguagesDialogErrors>(
    {}
  );
  const [skillErrors, setSkillErrors] = useState<{ skills?: string }>({});
  const [availabilityErrors, setAvailabilityErrors] =
    useState<AvailabilityFormErrors>({});

  const displayName = freelancer ? formatFreelancerDisplayName(freelancer) : "";
  const locationText = freelancer ? formatFreelancerLocation(freelancer) : "";
  const localTime = freelancer
    ? formatFreelancerLocalTime(freelancer.timezone)
    : "";
  const avatarSrc =
    resolveMediaAssetUrl(freelancer?.avatarUrl || profile?.photoUrl) ||
    AvatarImage;

  const publishedPortfolios = useMemo(
    () =>
      profile?.portfolios?.filter((item) => item.status === "published") ?? [],
    [profile?.portfolios]
  );
  const draftPortfolios = useMemo(
    () => profile?.portfolios?.filter((item) => item.status === "draft") ?? [],
    [profile?.portfolios]
  );
  const visiblePortfolios =
    portfolioTabIdx === 0 ? publishedPortfolios : draftPortfolios;

  const hoursLabel = formatHoursPerWeekLabel(profile?.hoursPerWeek);
  const contractPreference = formatContractToHirePreference(
    profile?.openToContractToHire,
  );

  const ownerActions = canEdit
    ? {
        onEditAvatar: () => router.push("/nx/create-profile/location"),
        isSharable: true,
      }
    : {};

  const openTitleDialog = () => {
    setTitleDraft(profile?.title || "");
    setTitleErrors({});
    setTitleOpen(true);
  };

  const openRateDialog = () => {
    setRateDraft(buildHourlyRateForm(String(profile?.hourlyRate ?? "")));
    setRateErrors({});
    setRateOpen(true);
  };

  const openOverviewDialog = () => {
    setOverviewDraft(profile?.overview || "");
    setOverviewErrors({});
    setOverviewOpen(true);
  };

  const openEmploymentDialog = (index: number | null = null) => {
    setEmploymentEditingIndex(index);
    setEmploymentDraft(
      index == null
        ? createEmptyEmploymentDraft()
        : toEmploymentForm(employmentItems[index])
    );
    setEmploymentErrors({});
    setEmploymentOpen(true);
  };

  const openEducationDialog = (index: number | null = null) => {
    setEducationEditingIndex(index);
    setEducationDraft(
      index == null ? emptyEducation() : { ...educationItems[index] }
    );
    setEducationErrors({});
    setEducationOpen(true);
  };

  const openLanguagesDialog = () => {
    const {
      englishLevel: savedEnglishLevel,
      additionalLanguages: savedLanguages,
    } = splitLanguageDrafts(profile?.languages ?? []);
    setEnglishLevel(savedEnglishLevel);
    setAdditionalLanguages(savedLanguages);
    setLanguageErrors({});
    setLanguagesOpen(true);
  };

  const openSkillsDialog = () => {
    setSkillDrafts(
      (profile?.skills ?? []).map((skill) => ({
        label: skill.name,
        value: skill.name,
      }))
    );
    setSkillSearch("");
    setSkillErrors({});
    setSkillsOpen(true);
  };

  const openCertificationDialog = (index: number | null = null) => {
    setCertificationEditingIndex(index);
    setCertificationDraft(
      index == null
        ? emptyCertificationForm()
        : toCertificationForm((profile?.certifications ?? [])[index])
    );
    setCertificationErrors({});
    setCertificationOpen(true);
  };

  const openOtherExperienceDialog = () => {
    setOtherExperienceDraft(emptyOtherExperienceForm());
    setOtherExperienceErrors({});
    setOtherExperienceOpen(true);
  };

  const openAvailabilityDialog = () => {
    setAvailabilityDraft({
      hoursPerWeek: profile?.hoursPerWeek ?? "",
      openToContractToHire: profile?.openToContractToHire ?? false,
    });
    setAvailabilityErrors({});
    setAvailabilityOpen(true);
  };

  if (isLoading || !profile || !freelancer) {
    return (
      <FreelancerLayout
        seo={{
          title: "Freelancer profile",
          description: "",
          url: `/freelancers/${uid ?? ""}`,
        }}
      >
        <div className="rounded-3xl border border-slate-300 p-12 text-center text-slate-600">
          {isLoading ? "Loading profile..." : "Profile not found"}
        </div>
      </FreelancerLayout>
    );
  }

  const seoTitle = [
    displayName,
    profile.title,
    "Worklanc Freelancer ",
    locationText ? `from ${locationText}` : "",
  ]
    .filter(Boolean)
    .join(" - ");

  return (
    <FreelancerLayout
      seo={{
        title: seoTitle,
        description: profile.overview || "",
        url: `/freelancers/${profile.uid}`,
      }}
    >
      <div className="rounded-3xl border border-slate-300">
        <FreelancerProfileHeader
          name={displayName}
          avatar={avatarSrc}
          isOnline={false}
          location={locationText}
          localTime={localTime ? `${localTime} local time` : undefined}
          identityVerified={freelancer.idVerified}
          verifyIdentityHref={
            canEdit ? "/freelancers/settings/identity-verification" : undefined
          }
          jobSuccessScore={0}
          badge="NONE"
          {...ownerActions}
        >
          {canEdit && (
            <div className="flex items-center gap-4">
              <Button
                type="outline"
                label="See public view"
                size="medium"
                classname="rounded-full! px-5! py-2! text-sm! font-medium!"
                onClick={() => setPreviewAsPublic(true)}
              />
              <Link href="/freelancers/settings/profile">
                <Button
                  type="primary"
                  label="Profile settings"
                  classname="rounded-full! border-2 border-blue-600 px-5! py-2! text-sm! font-medium!"
                />
              </Link>
            </div>
          )}
          {previewAsPublic && (
            <div className="flex items-center gap-4">
              <Button
                type="outline"
                label="Back to edit view"
                size="medium"
                classname="rounded-full! px-5! py-2! text-sm! font-medium!"
                onClick={() => setPreviewAsPublic(false)}
              />
            </div>
          )}
        </FreelancerProfileHeader>

        <div className="flex items-start">
          <div className="w-1/3">
            {canEdit && (
              <div className="border-b border-slate-300 p-8">
                <FreelancerPlusAlert />
              </div>
            )}

            <div className="space-y-8 p-8">
              {canEdit && (
                <FreelancerProfilePromoteAds
                  items={[
                    {
                      label: "Availability badge",
                      value: "Off",
                      onEdit: () => {},
                    },
                    {
                      label: "Boost your profile",
                      value: "Off",
                      onEdit: () => {},
                    },
                  ]}
                />
              )}

              {canEdit && <FreelancerProfileConnects count={0} />}

              <FreelancerProfileVideoIntro
                onAdd={canEdit ? () => {} : undefined}
              />

              <FreelancerProfileHoursPerWeek
                hours={hoursLabel}
                contractPreference={contractPreference}
                onEdit={canEdit ? openAvailabilityDialog : undefined}
              />

              <FreelancerProfileLanguages
                languages={(profile.languages ?? []).map((language) => ({
                  name: language.name,
                  level: LANGUAGE_LEVEL_LABELS[language.level],
                }))}
                onEdit={canEdit ? openLanguagesDialog : undefined}
              />

              <FreelancerProfileVerifications
                items={[
                  {
                    label: "ID:",
                    value: freelancer.idVerified ? "Verified" : "Unverified",
                    verified: freelancer.idVerified,
                    verifyHref: canEdit
                      ? "/freelancers/settings/identity-verification"
                      : undefined,
                  },
                  {
                    label: "Phone number:",
                    value: freelancer.phoneVerified ? "Verified" : "Unverified",
                    verified: freelancer.phoneVerified,
                  },
                  {
                    label: "Military veteran:",
                    value:
                      freelancer.isMilitaryVeteran == null
                        ? ""
                        : freelancer.isMilitaryVeteran
                        ? "Yes"
                        : "No",
                    onAdd:
                      canEdit && freelancer.isMilitaryVeteran == null
                        ? () => setMilitaryVeteranOpen(true)
                        : undefined,
                  },
                ]}
              />

              <FreelancerProfileLicenses
                onAdd={canEdit ? () => {} : undefined}
              />

              <FreelancerProfileSidebarEducation
                items={educationItems.map((item, index) => ({
                  school: item.school,
                  degree: item.degree || "",
                  fieldOfStudy: item.fieldOfStudy || "",
                  startedYear: item.startedYear ?? null,
                  endYear: item.endYear ?? null,
                  onEdit: canEdit
                    ? () => openEducationDialog(index)
                    : undefined,
                  deleteLoading: removingEducationIndex === index,
                  onRemove: canEdit
                    ? async () => {
                        setRemovingEducationIndex(index);
                        try {
                          await saveEducation(
                            removeEducationAt(educationItems, index)
                          );
                        } finally {
                          setRemovingEducationIndex(null);
                        }
                      }
                    : undefined,
                }))}
                onAdd={canEdit ? () => openEducationDialog(null) : undefined}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-14 border-b border-slate-300 p-8">
              <FreelancerProfileTitleRate
                title={profile.title || "Add a title"}
                hourlyRate={profile.hourlyRate ?? 0}
                onEditTitle={canEdit ? openTitleDialog : undefined}
                onEditRate={canEdit ? openRateDialog : undefined}
              />

              <FreelancerProfileOverview
                overview={profile.overview || "No overview yet."}
                onEdit={canEdit ? openOverviewDialog : undefined}
              />
            </div>

            <div className="border-b border-slate-300 p-8">
              <FreelancerProfilePortfolio
                tabs={[
                  { label: "Published", value: "published" },
                  { label: "Drafts", value: "drafts" },
                ]}
                selectedTabIndex={portfolioTabIdx}
                onTab={setPortfolioTabIdx}
                onAdd={canEdit ? () => {} : undefined}
                onEmptyAction={canEdit ? () => {} : undefined}
              >
                {visiblePortfolios.length > 0 ? (
                  <ul className="space-y-4">
                    {visiblePortfolios.map((item) => (
                      <li
                        key={item.uid}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <h4 className="font-medium">{item.title}</h4>
                        {item.role && (
                          <p className="text-sm text-slate-600">{item.role}</p>
                        )}
                        {item.description && (
                          <p className="mt-2 text-sm text-slate-700">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </FreelancerProfilePortfolio>
            </div>

            <div className="border-b border-slate-300 p-8">
              <FreelancerProfileWorkHistory />
            </div>

            <div className="border-b border-slate-300 p-8">
              <FreelancerProfileSkills
                skills={(profile.skills ?? []).map((skill) => ({
                  label: skill.name,
                  value: skill.name,
                }))}
                onEdit={canEdit ? openSkillsDialog : undefined}
              />
            </div>

            {canEdit && (
              <div className="p-8">
                <FreelancerProfileProjectCatalog onManage={() => {}} />
              </div>
            )}
          </div>
        </div>
      </div>

      <FreelancerProfileTestimonials
        onAdd={canEdit ? () => setTestimonialOpen(true) : undefined}
        onEmptyAction={canEdit ? () => setTestimonialOpen(true) : undefined}
      />

      <FreelancerProfileCertifications
        items={(profile.certifications ?? []).map((certification, index) => ({
          ...certification,
          onEdit: canEdit
            ? () => openCertificationDialog(index)
            : undefined,
          deleteLoading: removingCertificationIndex === index,
          onRemove: canEdit
            ? async () => {
                setRemovingCertificationIndex(index);
                try {
                  await saveCertifications(
                    removeCertificationAt(profile.certifications ?? [], index)
                  );
                } finally {
                  setRemovingCertificationIndex(null);
                }
              }
            : undefined,
        }))}
        onAdd={canEdit ? () => openCertificationDialog(null) : undefined}
        onEmptyAction={canEdit ? () => openCertificationDialog(null) : undefined}
      />

      <FreelancerProfileEmploymentHistory
        items={employmentItems.map((item, index) => ({
          company: item.company,
          title: item.title,
          startedAt: item.startedAt ? new Date(item.startedAt) : new Date(),
          endAt: item.endAt ? new Date(item.endAt) : new Date(),
          isCurrent: item.isCurrent,
          description: item.description || "",
          onEdit: canEdit ? () => openEmploymentDialog(index) : undefined,
          deleteLoading: removingEmploymentIndex === index,
          onRemove: canEdit
            ? async () => {
                setRemovingEmploymentIndex(index);
                try {
                  await saveEmployment(
                    removeEmploymentAt(employmentItems, index)
                  );
                } finally {
                  setRemovingEmploymentIndex(null);
                }
              }
            : undefined,
        }))}
        onAdd={canEdit ? () => openEmploymentDialog(null) : undefined}
      />

      <FreelancerProfileOtherExperiences
        onAdd={canEdit ? openOtherExperienceDialog : undefined}
        onEmptyAction={canEdit ? openOtherExperienceDialog : undefined}
      >
        {(profile.otherExperiences ?? []).length > 0 ? (
          <ul className="space-y-4 py-6">
            {(profile.otherExperiences ?? []).map((item) => (
              <li
                key={item.uid || item.subject}
                className="rounded-xl border border-slate-200 p-4"
              >
                <h4 className="font-medium">{item.subject}</h4>
                {item.description && (
                  <p className="mt-2 text-sm text-slate-700">
                    {item.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </FreelancerProfileOtherExperiences>

      <MilitaryVeteranDialog
        open={militaryVeteranOpen}
        onClose={() => setMilitaryVeteranOpen(false)}
        loading={saving}
        onSubmit={async () => {
          await saveMilitaryVeteran();
          setMilitaryVeteranOpen(false);
        }}
      />

      <EmploymentDialog
        open={employmentOpen}
        onClose={() => setEmploymentOpen(false)}
        loading={saving}
        errors={employmentErrors}
        onSave={async () => {
          const result = validateEmploymentForm(employmentDraft);
          setEmploymentErrors(result.errors);
          if (!result.isValid) return;

          await saveEmployment(
            serializeEmploymentList(
              employmentItems,
              employmentDraft,
              employmentEditingIndex
            )
          );
          setEmploymentOpen(false);
        }}
        formData={employmentDraft}
        onChangeFormData={(data) => {
          setEmploymentDraft(data);
          setEmploymentErrors({});
        }}
      />

      <AvailabilityDialog
        open={availabilityOpen}
        onClose={() => setAvailabilityOpen(false)}
        loading={saving}
        formData={availabilityDraft}
        errors={availabilityErrors}
        onChangeFormData={(data) => {
          setAvailabilityDraft(data);
          setAvailabilityErrors({});
        }}
        onSave={async () => {
          const result = validateAvailabilityForm(availabilityDraft);
          setAvailabilityErrors(result.errors);
          if (!result.isValid || !availabilityDraft.hoursPerWeek) return;

          await saveAvailability(
            availabilityDraft.hoursPerWeek,
            availabilityDraft.openToContractToHire,
          );
          setAvailabilityOpen(false);
        }}
      />

      <EducationDialog
        open={educationOpen}
        onClose={() => setEducationOpen(false)}
        loading={saving}
        errors={educationErrors}
        onSave={async () => {
          const result = validateEducationForm(educationDraft);
          setEducationErrors(result.errors);
          if (!result.isValid) return;

          await saveEducation(
            serializeEducationList(
              educationItems,
              educationDraft,
              educationEditingIndex
            )
          );
          setEducationOpen(false);
        }}
        formData={educationDraft}
        onChangeFormData={(data) => {
          setEducationDraft(data);
          setEducationErrors({});
        }}
      />

      <TitleDialog
        open={titleOpen}
        onClose={() => setTitleOpen(false)}
        title={titleDraft}
        onChangeTitle={(value) => {
          setTitleDraft(value);
          setTitleErrors({});
        }}
        loading={saving}
        errors={titleErrors}
        onSave={async () => {
          const result = validateTitleForm(titleDraft);
          setTitleErrors(result.errors);
          if (!result.isValid) return;

          await saveTitle(titleDraft.trim());
          setTitleOpen(false);
        }}
      />

      <HourlyRateDialog
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        rate={Number(rateDraft.rate) || 0}
        onChangeRate={(value) => {
          setRateDraft(buildHourlyRateForm(String(value)));
          setRateErrors({});
        }}
        loading={saving}
        errors={rateErrors}
        onSave={async () => {
          const result = validateHourlyRateForm(rateDraft.rate);
          setRateErrors(result.errors);
          if (!result.isValid) return;

          await saveHourlyRate(Number(rateDraft.rate));
          setRateOpen(false);
        }}
      />

      <ProfileOverviewDialog
        open={overviewOpen}
        onClose={() => setOverviewOpen(false)}
        overview={overviewDraft}
        onChangeOverview={(value) => {
          setOverviewDraft(value);
          setOverviewErrors({});
        }}
        loading={saving}
        errors={overviewErrors}
        onSave={async () => {
          const result = validateOverviewForm(overviewDraft);
          setOverviewErrors(result.errors);
          if (!result.isValid) return;

          await saveOverview(overviewDraft.trim());
          setOverviewOpen(false);
        }}
      />

      <TestimonialDialog
        open={testimonialOpen}
        onClose={() => setTestimonialOpen(false)}
        onRequest={() => setTestimonialOpen(false)}
      />

      <CertificationDialog
        open={certificationOpen}
        onClose={() => setCertificationOpen(false)}
        formData={certificationDraft}
        errors={certificationErrors}
        isEditing={certificationEditingIndex != null}
        onChangeFormData={(data) => {
          setCertificationDraft(data);
          setCertificationErrors({});
        }}
        loading={saving}
        onSave={async () => {
          const result = validateCertificationForm(certificationDraft);
          setCertificationErrors(result.errors);
          if (!result.isValid || !certificationDraft.issueDate) return;

          await saveCertifications(
            serializeCertificationList(
              profile.certifications ?? [],
              certificationDraft,
              certificationEditingIndex
            )
          );
          setCertificationOpen(false);
        }}
      />

      <OtherExperienceDialog
        open={otherExperienceOpen}
        onClose={() => setOtherExperienceOpen(false)}
        formData={otherExperienceDraft}
        errors={otherExperienceErrors}
        onChangeFormData={(data) => {
          setOtherExperienceDraft(data);
          setOtherExperienceErrors({});
        }}
        loading={saving}
        onSave={async () => {
          const result = validateOtherExperienceForm(otherExperienceDraft);
          setOtherExperienceErrors(result.errors);
          if (!result.isValid) return;

          const next = [
            ...(profile.otherExperiences ?? []),
            {
              subject: otherExperienceDraft.subject.trim(),
              description: otherExperienceDraft.description || null,
            },
          ];
          await saveOtherExperiences(next);
          setOtherExperienceOpen(false);
        }}
      />

      <LanguagesDialog
        open={languagesOpen}
        onClose={() => setLanguagesOpen(false)}
        englishLevel={englishLevel}
        onEnglishLevelChange={(level) => {
          setEnglishLevel(level);
          setLanguageErrors((prev) => ({ ...prev, englishLevel: undefined }));
        }}
        languages={additionalLanguages}
        onLanguagesChange={(languages) => {
          setAdditionalLanguages(languages);
          setLanguageErrors({});
        }}
        errors={languageErrors}
        loading={saving}
        onSave={async () => {
          const result = validateLanguagesForm(
            englishLevel,
            additionalLanguages
          );
          setLanguageErrors(result.errors as LanguagesDialogErrors);
          if (!result.isValid) return;

          await saveLanguages(
            buildLanguagesPayload(englishLevel, additionalLanguages)
          );
          setLanguagesOpen(false);
        }}
      />

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
              error={skillErrors.skills}
              onChange={(value) => {
                setSkillSearch(value);
                setSkillErrors({});
              }}
              onSelect={(option) => {
                if (skillDrafts.some((skill) => skill.value === option.value)) {
                  setSkillSearch("");
                  return;
                }
                if (skillDrafts.length >= 15) {
                  setSkillErrors({ skills: "Must be 15 skills or fewer" });
                  return;
                }
                setSkillErrors({});
                setSkillDrafts((prev) => [...prev, option]);
                setSkillSearch("");
              }}
              onRemove={(option) => {
                setSkillDrafts((prev) =>
                  prev.filter((skill) => skill.value !== option.value)
                );
                setSkillErrors({});
              }}
            />
          </div>
          <DialogFooter>
            <AtomButton
              type="primary"
              label="Save skills"
              loading={saving}
              onClick={async () => {
                const result = validateSkillsForm(skillDrafts);
                setSkillErrors(result.errors);
                if (!result.isValid) return;

                await saveSkills(
                  skillDrafts.map((skill) => ({ name: skill.value }))
                );
                setSkillsOpen(false);
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FreelancerLayout>
  );
}

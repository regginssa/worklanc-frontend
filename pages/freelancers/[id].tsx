import { FreelancerLayout } from "@/components/layouts";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import { Button } from "@/components/atoms";
import {
  CertificationDialog,
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
  OtherExperienceDialog,
  ProfileOverviewDialog,
  TestimonialDialog,
  TitleDialog,
} from "@/components/molecules";
import { useState } from "react";
import { Education, Employment } from "@/types/user";

export default function FreelancerProfil() {
  const [portfolioTabIdx, setPortfolioTabIdx] = useState(0);
  const [titleOpen, setTitleOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [testimonialOpen, setTestimonialOpen] = useState(false);
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [certificationOpen, setCertificationOpen] = useState(false);
  const [otherExperienceOpen, setOtherExperienceOpen] = useState(false);
  const [employments, setEmployments] = useState<Employment[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [title, setTitle] = useState("Accounting & Consulting");

  return (
    <FreelancerLayout
      seo={{
        title:
          "Marco N. - Accouting & Consulting - Worklanc Freelancer from London, United Kingdom",
        description: "",
        url: "/freelancers/1",
      }}
    >
      <div className="rounded-3xl border border-slate-300">
        <FreelancerProfileHeader
          name="Marco N."
          avatar={UserPic}
          isOnline
          location="London, United Kingdom"
          localTime="10:42 am local time"
          jobSuccessScore={80}
          badge="TOP_RATED_PLUS"
          isAvailableNow
          onEditAvatar={() => {}}
          isSharable
        >
          <div className="flex items-center gap-4">
            <Button
              type="outline"
              label="See public view"
              size="medium"
              classname="rounded-full! px-5! py-2! text-sm! font-medium!"
            />
            <Button
              type="primary"
              label="Profile settings"
              classname="rounded-full! border-2 border-blue-600 px-5! py-2! text-sm! font-medium!"
            />
          </div>
        </FreelancerProfileHeader>

        <div className="flex items-start">
          <div className="w-1/3">
            <div className="border-b border-slate-300 p-8">
              <FreelancerPlusAlert />
            </div>

            <div className="space-y-8 p-8">
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

              <FreelancerProfileConnects count={0} />

              <FreelancerProfileVideoIntro onAdd={() => {}} />

              <FreelancerProfileHoursPerWeek
                hours="More than 30 hrs/week"
                onEdit={() => {}}
              />

              <FreelancerProfileLanguages
                languages={[{ name: "English", level: "Native or Bilingual" }]}
                onAdd={() => {}}
                onEdit={() => {}}
              />

              <FreelancerProfileVerifications
                items={[
                  {
                    label: "ID:",
                    value: "Unverified",
                    verified: false,
                    verifyHref: "#",
                  },
                  {
                    label: "Phone number:",
                    value: "Verified",
                    verified: true,
                  },
                  {
                    label: "Military veteran:",
                    value: "",
                    onAdd: () => {},
                  },
                ]}
              />

              <FreelancerProfileLicenses onAdd={() => {}} />

              <FreelancerProfileSidebarEducation
                items={[
                  {
                    school: "University of London",
                    degree: "Bachelor of Accountancy (BAcc)",
                    fieldOfStudy: "Economics",
                    startedYear: 2018,
                    endYear: 2022,
                    onEdit: () => {},
                    onRemove: () => {},
                  },
                ]}
                onAdd={() => setEducationOpen(true)}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-14 border-b border-slate-300 p-8">
              <FreelancerProfileTitleRate
                title={title}
                hourlyRate={52}
                onEditTitle={() => setTitleOpen(true)}
                onEditRate={() => setRateOpen(true)}
                onLink={() => {}}
              />

              <FreelancerProfileOverview
                overview="Marco is a certified public accountant with over 10 years of experience in accounting and consulting. He has worked with a variety of clients, from small businesses to large corporations."
                onEdit={() => setOverviewOpen(true)}
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
                onAdd={() => {}}
                onEmptyAction={() => {}}
              />
            </div>

            <div className="border-b border-slate-300 p-8">
              <FreelancerProfileWorkHistory />
            </div>

            <div className="border-b border-slate-300 p-8">
              <FreelancerProfileSkills
                skills={[
                  { label: "Accounting", value: "accounting" },
                  { label: "Consulting", value: "consulting" },
                ]}
                onEdit={() => {}}
              />
            </div>

            <div className="p-8">
              <FreelancerProfileProjectCatalog onManage={() => {}} />
            </div>
          </div>
        </div>
      </div>

      <FreelancerProfileTestimonials
        onAdd={() => setTestimonialOpen(true)}
        onEmptyAction={() => setTestimonialOpen(true)}
      />

      <FreelancerProfileCertifications
        certifications={[]}
        onAdd={() => setCertificationOpen(true)}
        onEmptyAction={() => setCertificationOpen(true)}
      />

      <FreelancerProfileEmploymentHistory
        items={[
          {
            company: "Accouting",
            title: "Microsoft",
            startedAt: new Date("2021-08-01"),
            endAt: new Date(),
            isCurrent: true,
            description:
              "Designed and implemented a new accounting system for the company",
            onEdit: () => {},
            onRemove: () => {},
          },
        ]}
        onAdd={() => setEmploymentOpen(true)}
      />

      <FreelancerProfileOtherExperiences
        onAdd={() => setOtherExperienceOpen(true)}
        onEmptyAction={() => setOtherExperienceOpen(true)}
      />

      <EmploymentDialog
        open={employmentOpen}
        onClose={() => setEmploymentOpen(false)}
        onSave={() => {}}
        formData={employments[0]}
        onChangeFormData={(data) => setEmployments(data)}
      />

      <EducationDialog
        open={educationOpen}
        onClose={() => setEducationOpen(false)}
        onSave={() => {}}
        formData={educations[0]}
        onChangeFormData={(data) => {}}
      />

      <TitleDialog
        open={titleOpen}
        onClose={() => setTitleOpen(false)}
        title={title}
        onChangeTitle={setTitle}
        onSave={() => {}}
      />

      <HourlyRateDialog
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        rate={52}
        onChangeRate={() => {}}
        onSave={() => {}}
      />

      <ProfileOverviewDialog
        open={overviewOpen}
        onClose={() => setOverviewOpen(false)}
        overview=""
        onChangeOverview={() => {}}
        onSave={() => {}}
      />

      <TestimonialDialog
        open={testimonialOpen}
        onClose={() => setTestimonialOpen(false)}
        onRequest={() => {}}
      />

      <CertificationDialog
        open={certificationOpen}
        onClose={() => setCertificationOpen(false)}
        onAdd={() => {}}
      />

      <OtherExperienceDialog
        open={otherExperienceOpen}
        onClose={() => setOtherExperienceOpen(false)}
        onSave={() => {}}
      />
    </FreelancerLayout>
  );
}

import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";

export default function ResumeImport() {
  return (
    <CreateProfileLayout
      title="How would you like to tell us about yourself?"
      description="We need to get a sense of your education, experience and skills. It’s quickest to import your information — you can edit it before your profile goes live."
      currentStep={1}
      totalSteps={10}
      seo={{
        title: "How would you like to tell us about yourself?",
        description:
          "We need to get a sense of your education, experience and skills. It’s quickest to import your information — you can edit it before your profile goes live.",
        url: "/nx/create-profile/resume-import",
      }}
    >
      <div>
        <h1>Upload your resume</h1>
      </div>
    </CreateProfileLayout>
  );
}

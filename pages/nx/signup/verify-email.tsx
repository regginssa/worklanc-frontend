import { OnboardingLayout } from "@/components/layouts/auth/OnboardingLayout";

export default function VerifyEmail() {
  return (
    <OnboardingLayout
      seo={{
        title: "Verify your email - Worklanc",
        description: "Verify your email - Worklanc",
        url: "/nx/signup/verify-email",
      }}
    >
      <div className="max-w-lg w-full px-6 text-center space-y-4">
        <h1 className="text-3xl font-medium">Verify your email</h1>
        <p className="text-sm text-slate-600">
          Check your inbox for a verification link to continue.
        </p>
      </div>
    </OnboardingLayout>
  );
}

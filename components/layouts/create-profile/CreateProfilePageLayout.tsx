import { SEO } from "@/components/atoms";
import { Header } from "@/components/organisms";
import { useOnboardingGuard } from "@/hooks/useAuth";
import { TSEO } from "@/types/components.types";

interface CreateProfilePageLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
  className?: string;
}

/** Create-profile flow pages without the step progress UI (e.g. finish, submit). */
export function CreateProfilePageLayout({
  children,
  seo,
  className = "flex-1 w-full max-w-7xl mx-auto mt-6 px-6 mb-10",
}: CreateProfilePageLayoutProps) {
  useOnboardingGuard();

  return (
    <div className="min-h-screen flex flex-col">
      {seo && <SEO {...seo} />}
      <Header />
      <main className={className}>{children}</main>
    </div>
  );
}

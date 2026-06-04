import { SEO } from "@/components/atoms";
import { AuthorizedFooter, Header } from "@/components/organisms";
import { TSEO } from "@/types/components.types";

interface ClientOnboardingLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
  centered?: boolean;
}

export function ClientOnboardingLayout({
  children,
  seo,
  centered = false,
}: ClientOnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SEO {...seo} />
      <main
        className={
          centered
            ? "flex-1 max-w-lg mx-auto flex flex-col items-center justify-center gap-8 py-20 w-full px-6"
            : "flex-1 max-w-7xl mx-auto space-y-8 w-full px-6 py-8"
        }
      >
        {children}
      </main>
      <AuthorizedFooter />
    </div>
  );
}

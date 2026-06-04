import { SEO } from "@/components/atoms";
import { AuthorizedFooter, Header } from "@/components/organisms";
import type { HeaderVariant } from "@/lib/headerVariant";
import { TSEO } from "@/types/components.types";

interface FreelancerLayoutProps {
  seo: TSEO;
  children: React.ReactNode;
  headerVariant?: HeaderVariant;
}

export default function FreelancerLayout({
  seo,
  children,
  headerVariant = "talent",
}: FreelancerLayoutProps) {
  return (
    <>
      <Header variant={headerVariant} />
      <SEO {...seo} />
      <main className="max-w-7xl mx-auto space-y-10">{children}</main>
      <AuthorizedFooter />
    </>
  );
}

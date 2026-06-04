import { SEO } from "@/components/atoms";
import { AuthorizedFooter, Header } from "@/components/organisms";
import type { HeaderVariant } from "@/lib/headerVariant";
import { TSEO } from "@/types/components.types";

interface ClientLayoutProps {
  seo: TSEO;
  children: React.ReactNode;
  headerVariant?: HeaderVariant;
}

export default function ClientLayout({
  seo,
  children,
  headerVariant = "client",
}: ClientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant={headerVariant} />
      <SEO {...seo} />
      <main className="w-full max-w-7xl mx-auto space-y-10 flex-1">
        {children}
      </main>
      <div className="w-full">
        <AuthorizedFooter />
      </div>
    </div>
  );
}

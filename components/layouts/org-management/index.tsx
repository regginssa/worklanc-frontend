import { SEO, TabBar } from "@/components/atoms";
import { AuthorizedFooter, Header } from "@/components/organisms";
import { TSEO } from "@/types/components.types";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface OrgManagementLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
}

export default function OrgManagementLayout({
  children,
  seo,
}: OrgManagementLayoutProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    { label: "Teams", value: "/nx/org-management/teams" },
    { label: "Members", value: "/nx/org-management/members" },
    { label: "Invitations", value: "/nx/org-management/invitations" },
    { label: "Company settings", value: "/nx/org-management/company-settings" },
  ];

  useEffect(() => {
    const tab = tabs.find((tab) => tab.value === pathname);
    if (tab) {
      setSelectedTabIndex(tabs.indexOf(tab));
    }
  }, [pathname]);

  const handleTabChange = (index: number) => {
    router.push(tabs[index].value);
  };

  return (
    <>
      <Header />
      <SEO {...seo} />

      <main className="max-w-7xl mx-auto space-y-10 mt-10">
        <div>
          <Link
            href="/nx/client-info"
            className="inline-flex items-center gap-2 cursor-pointer hover:underline text-blue-600"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Back to settings</span>
          </Link>
        </div>

        <TabBar
          tabs={tabs}
          selectedTabIndex={selectedTabIndex}
          onTab={handleTabChange}
        />

        {children}
      </main>
      <AuthorizedFooter />
    </>
  );
}

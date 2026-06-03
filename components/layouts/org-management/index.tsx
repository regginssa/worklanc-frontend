import { SEO, TabBar } from "@/components/atoms";
import {
  AuthorizedFooter,
  ClientHeader,
  FreelancerHeader,
} from "@/components/organisms";
import { TSEO } from "@/types/components.types";
import { AccountType } from "@/types/user";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface OrgManagementLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
  title: string;
}

export default function OrgManagementLayout({
  children,
  seo,
  title,
}: OrgManagementLayoutProps) {
  const [accountType, setAccountType] = useState<AccountType>("client");
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
      {accountType === "client" ? <ClientHeader /> : <FreelancerHeader />}
      <SEO {...seo} />

      <main className="max-w-7xl mx-auto space-y-10">
        <div>
          <Link
            href="/nx/client-info"
            className="inline-flex items-center gap-2 cursor-pointer hover:underline text-blue-600"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Back to settings</span>
          </Link>
        </div>

        <div className="space-y-6">
          <TabBar
            tabs={tabs}
            selectedTabIndex={selectedTabIndex}
            onTab={handleTabChange}
          />

          <h1 className="text-2xl font-medium px-4">{title}</h1>
        </div>

        {children}
      </main>
      <AuthorizedFooter />
    </>
  );
}

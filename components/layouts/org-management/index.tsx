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
import { useRouter } from "next/router";
import { useState } from "react";

interface OrgManagementLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
}

export default function OrgManagementLayout({
  seo,
  children,
}: OrgManagementLayoutProps) {
  const [accountType, setAccountType] = useState<AccountType>("client");
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const router = useRouter();
  const tabs = [
    { label: "Teams", value: "/nx/org-management/teams" },
    { label: "Members", value: "/nx/org-management/members" },
    { label: "Invitations", value: "/nx/org-management/invitations" },
    { label: "Company settings", value: "/nx/org-management/company-settings" },
  ];

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
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

        <TabBar
          tabs={tabs}
          selectedTabIndex={selectedTabIndex}
          onTab={handleTabChange}
        />
      </main>
      <AuthorizedFooter />
    </>
  );
}

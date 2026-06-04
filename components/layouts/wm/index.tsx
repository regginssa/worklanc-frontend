import { TabBar } from "@/components/atoms";
import { TSEO } from "@/types/components.types";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ClientLayout } from "..";

const tabs = [
  { label: "All job posts", value: "/nx/wm/all-jobs" },
  { label: "All contracts", value: "/nx/wm/client/contracts" },
];

export default function WmLayout({
  seo,
  children,
}: {
  seo: TSEO;
  children: React.ReactNode;
}) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.value === pathname);
    if (index !== -1) {
      setSelectedTabIndex(index);
    }
  }, [pathname]);

  const handleTabChange = (index: number) => {
    router.push(tabs[index].value);
  };

  return (
    <ClientLayout seo={seo}>
      <TabBar
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        onTab={handleTabChange}
      />
      {children}
    </ClientLayout>
  );
}

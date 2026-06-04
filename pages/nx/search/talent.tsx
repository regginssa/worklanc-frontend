import { ClientLayout } from "@/components/layouts";

export default function SearchTalent() {
  return (
    <ClientLayout
      seo={{
        title: "Search talent - Worklanc",
        description: "Search talent - Worklanc",
        url: "/nx/search/talent",
      }}
    >
      <h1 className="text-3xl font-medium">Search talent</h1>
    </ClientLayout>
  );
}

import { TSEO } from "@/types/components.types";
import ClientLayout from "../client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, IconButton, Input, Textarea } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const mainNavs: NavItem[] = [
  { label: "Discover", href: "/browse/bench", icon: "iconamoon:discover-thin" },
  {
    label: "Your hires",
    href: "/browse/bench/my-hires",
    icon: "hugeicons:new-job",
  },
  {
    label: "Company hires",
    href: "/browse/bench/company-hires",
    icon: "mdi:company",
  },
  {
    label: "Direct contracts",
    href: "/browse/bench/byo",
    icon: "material-symbols-light:contract-outline",
  },
  {
    label: "Recently viewed",
    href: "/browse/bench/recently-viewed",
    icon: "material-symbols-light:history",
  },
];

const yourLists: NavItem[] = [
  {
    label: "Saved talent",
    href: "/browse/bench/your-list-1",
    icon: "mdi:heart",
  },
  {
    label: "Saved projects",
    href: "/browse/bench/your-list-1",
    icon: "fluent:tag-20-regular",
  },
];

export default function BenchLayout({
  seo,
  children,
}: {
  seo: TSEO;
  children: React.ReactNode;
}) {
  const [activeNav, setActiveNav] = useState<NavItem | null>(null);
  const [open, setOpen] = useState(false);
  const [listData, setListData] = useState({
    name: "",
    description: "",
  });
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    router.replace(href);
  };

  useEffect(() => {
    const activeNav = mainNavs.find((nav) => nav.href === pathname);
    if (activeNav) {
      setActiveNav(activeNav);
    }
  }, [pathname]);

  return (
    <ClientLayout seo={seo} headerVariant="client">
      <div className="flex items-start gap-8">
        <div className="w-1/4 space-y-20">
          <ul className="space-y-1">
            {mainNavs.map((nav) => (
              <li
                key={nav.href}
                className={`p-2 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeNav?.href === nav.href
                    ? "bg-slate-100 font-medium"
                    : "hover:bg-slate-100"
                }`}
                onClick={() => handleNavClick(nav.href)}
              >
                <Icon icon={nav.icon} className="size-5" />
                <span>{nav.label}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-300">
              <h2 className="text-xl font-medium">Your lists</h2>
              <IconButton
                variant="outline"
                icon="mdi:plus"
                className="p-1! border!"
                onClick={() => setOpen(true)}
              />
            </div>

            <ul className="space-y-1">
              {yourLists.map((nav) => (
                <li
                  key={nav.href}
                  className={`p-2 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    activeNav?.href === nav.href
                      ? "bg-slate-100 font-medium"
                      : "hover:bg-slate-100"
                  }`}
                  onClick={() => handleNavClick(nav.href)}
                >
                  <Icon icon={nav.icon} className="size-5" />
                  <span>{nav.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 space-y-8">{children}</div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Create list</DialogTitle>
          </DialogHeader>

          <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto space-y-6">
            <Input
              type="text"
              name="name"
              label="List name"
              required
              value={listData.name}
              onChange={(e) =>
                setListData({ ...listData, name: e.target.value })
              }
            />
            <Textarea
              name="description"
              label="How would you describe this list? (Optional)"
              value={listData.description}
              rows={6}
              onChange={(e) =>
                setListData({ ...listData, description: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button className="py-2.5 px-5 cursor-pointer text-sm font-medium">
                Cancel
              </button>
            </DialogClose>
            <Button
              type="primary"
              label="Create list"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientLayout>
  );
}

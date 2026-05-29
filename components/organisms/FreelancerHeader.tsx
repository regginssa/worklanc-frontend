import { Icon } from "@iconify/react";
import Link from "next/link";
import { IconButton, WorklancLogo } from "../atoms";
import { HeaderSearch } from "../molecules";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { LucideBell, LucideCircleQuestionMark } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
};

type NavSection = {
  heading?: string;
  items: NavLink[];
};

interface HoverNavMenuProps {
  label: string;
  sections: NavSection[];
}

function HoverNavMenu({ label, sections }: HoverNavMenuProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-1 py-2 text-sm font-medium text-slate-800 transition-all duration-200 hover:text-slate-600 cursor-pointer"
      >
        <span>{label}</span>
        <Icon
          icon="mdi:chevron-down"
          className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      <div className="invisible pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
        <div className="w-56 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
          {sections.map((section, index) => (
            <div key={`${label}-${section.heading ?? `section-${index}`}`}>
              {index > 0 && (
                <div className="h-[1px] bg-slate-200 w-full my-2" />
              )}
              {section.heading && (
                <p className="text-slate-600 text-xs p-2 font-medium">
                  {section.heading}
                </p>
              )}

              <ul>
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-lg p-2 text-sm transition-all duration-200 hover:bg-slate-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FreelancerHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const navs = {
    findWorkNavs: [
      {
        items: [
          { label: "Find work", href: "#" },
          { label: "Saved jobs", href: "#" },
          { label: "Proposals and offers", href: "#" },
        ],
      },
      {
        heading: "Reach more clients",
        items: [
          { label: "Your services", href: "#" },
          { label: "Promote with ads", href: "#" },
          { label: "Direct contracts", href: "#" },
        ],
      },
    ],
    deliverWorkNavs: [
      {
        items: [
          { label: "Your active contracts", href: "#" },
          { label: "Contract history", href: "#" },
          { label: "Hourly work daily", href: "#" },
        ],
      },
    ],
    manageFinancesNavs: [
      {
        items: [
          { label: "Financial overview", href: "#" },
          { label: "Your reports", href: "#" },
          { label: "Billings and earnings", href: "#" },
          { label: "Transactions", href: "#" },
          { label: "Certificate of earnings", href: "#" },
        ],
      },
      {
        heading: "Payments",
        items: [{ label: "Withdraw earnings", href: "#" }],
      },
      {
        heading: "Taxes",
        items: [
          { label: "Tax forms", href: "#" },
          { label: "Tax information", href: "#" },
        ],
      },
    ],
  };

  const profileNavs = [
    {
      label: "Your profile",
      icon: "material-symbols-light:account-circle-outline",
      href: "#",
    },
    {
      label: "Stats and trends",
      icon: "material-symbols-light:trending-up",
      href: "/nx/my-stats",
    },
    {
      label: "Account health",
      icon: "material-symbols-light:av-timer",
      href: "#",
    },

    {
      label: "Membership plan",
      icon: "material-symbols-light:id-card-outline",
      href: "#",
    },

    {
      label: "Connects",
      icon: "material-symbols-light:av-timer",
      href: "#",
    },

    {
      label: "Account settings",
      icon: "material-symbols-light:settings-outline",
      href: "/freelancers/settings/contact-info",
    },

    {
      label: "Log out",
      icon: "material-symbols-light:logout",
      href: "#",
    },
  ];

  return (
    <header
      ref={headerRef}
      className="w-full max-w-[90%] mx-auto py-2 flex items-center justify-between bg-white mb-10"
    >
      <div className="flex items-center gap-4">
        <WorklancLogo />

        <nav className="flex items-center gap-2">
          <HoverNavMenu label="Find work" sections={navs.findWorkNavs} />
          <HoverNavMenu label="Deliver work" sections={navs.deliverWorkNavs} />
          <HoverNavMenu
            label="Manage finances"
            sections={navs.manageFinancesNavs}
          />
          <Link
            href="#"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-800 transition-all duration-200 hover:text-slate-600 cursor-pointer"
          >
            Messages
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <HeaderSearch />
        <div className="flex items-center gap-6">
          <Link href="#" className="">
            <LucideCircleQuestionMark className="w-6 h-6" />
          </Link>
          <Link href="#" className="">
            <LucideBell className="w-6 h-6" />
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Image src={UserPic} alt="User" width={32} height={32} />

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute bg-white top-full w-[280px] right-0 max-h-[420px] overflow-y-auto text-sm z-40 mt-1 shadow-md py-1 rounded-lg border border-slate-200"
                >
                  <div className="py-1 border-b border-slate-200">
                    <div className="flex items-center gap-2 p-4 hover:bg-slate-100 cursor-pointer">
                      <Image
                        src={UserPic}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <h3 className="text-sm font-medium">Jhon Smthi</h3>
                        <p className="text-xs text-slate-600">Freelancer</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full px-4 py-2">
                      <span>Online for messages</span>
                      <Switch />
                    </div>
                  </div>

                  <ul className="py-1 border-b border-slate-200">
                    {profileNavs.slice(0, 2).map((nav, index) => (
                      <li
                        key={nav.label}
                        className="px-4 py-2 rounded-md hover:bg-slate-100 cursor-pointer"
                      >
                        <Link
                          href={nav.href}
                          className="flex items-center gap-4"
                        >
                          <Icon icon={nav.icon} className="w-5 h-5" />
                          <span className="text-sm">{nav.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <ul className="py-1 border-b border-slate-200">
                    {profileNavs.slice(2, 6).map((nav, index) => (
                      <li
                        key={nav.label}
                        className="px-4 py-2 rounded-md hover:bg-slate-100 cursor-pointer"
                      >
                        <Link
                          href={nav.href}
                          className="flex items-center gap-4"
                        >
                          {" "}
                          <Icon icon={nav.icon} className="w-5 h-5" />
                          <span className="text-sm">{nav.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <ul className="py-1 border-b border-slate-200">
                    <li
                      key={profileNavs[6].label}
                      className="px-4 py-2 rounded-md hover:bg-slate-100 cursor-pointer"
                    >
                      <Link
                        href={profileNavs[6].href}
                        className="flex items-center gap-4"
                      >
                        <Icon icon={profileNavs[6].icon} className="w-5 h-5" />
                        <span className="text-sm">{profileNavs[6].label}</span>
                      </Link>
                    </li>
                  </ul>
                </motion.ul>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}

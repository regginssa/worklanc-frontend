import { TSEO } from "@/types/components.types";
import Link from "next/link";
import { useRouter } from "next/router";
import FreelancerLayout from ".";

interface ClientSettingsLayoutProps {
  seo: TSEO;
  children: React.ReactNode;
}

export default function ClientSettingsLayout({
  seo,
  children,
}: ClientSettingsLayoutProps) {
  const router = useRouter();

  const settingNavs = [
    { label: "My Info", href: "/nx/client-info" },
    { label: "Billing & Payments", href: "/freelancers/1" },
    {
      label: "Password & Security",
      href: "/ab/account-security/password-and-security",
    },
    { label: "Teams & Members", href: "/freelancers/1" },
    { label: "Membership", href: "/freelancers/1" },
    { label: "Notification Settings", href: "/ab/notification-settings" },
    { label: "Tax Information", href: "/freelancers/1" },
    { label: "Connected Services", href: "/nx/connected-services" },
  ];

  return (
    <FreelancerLayout seo={seo}>
      <div className="flex items-start">
        <div className="w-1/4 space-y-6">
          <h1 className="text-4xl font-semibold">Settings</h1>

          <ul className="text-sm text-slate-600">
            {settingNavs.map((nav, index) => {
              const isActive = nav.href !== "#" && router.pathname === nav.href;

              return (
                <li
                  key={index}
                  className={`py-2 px-4 hover:text-black ${
                    isActive
                      ? "border-l-2 border-black text-black"
                      : "border-l border-slate-200"
                  }`}
                >
                  <Link href={nav.href} className="">
                    {nav.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex-1 space-y-6">{children}</div>
      </div>
    </FreelancerLayout>
  );
}

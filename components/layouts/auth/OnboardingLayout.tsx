import Link from "next/link";
import { SocialGroup } from "@/components/molecules";
import { TSEO } from "@/types/components.types";
import { SEO } from "@/components/atoms";
import { Header } from "@/components/organisms";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  seo: TSEO;
}

const navs = [
  { label: "About Us", href: "#" },
  { label: "Feedback", href: "#" },
  { label: "Trust, Safety & Security", href: "#" },
  { label: "Help & Support", href: "#" },
  { label: "Worklanc Foundation", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "CA Notice at Collection", href: "#" },
  { label: "Your Privacy Choices", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Desktop App", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Enterprise Solutions", href: "#" },
  { label: "Release notes", href: "#" },
];

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  showFooter,
  seo,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {seo && <SEO {...seo} />}
      <Header />

      {/* Main */}
      <main
        className={`flex-1 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto ${
          !showFooter && "mb-20"
        }`}
      >
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="w-[70%] mx-auto border-t border-slate-200 py-14 text-xs text-slate-500">
          <div className="grid grid-cols-4">
            <ul className="flex flex-col gap-4 ">
              {navs.slice(0, 3).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className=" hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-4 ">
              {navs.slice(3, 6).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className=" hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-4 ">
              {navs.slice(6, 10).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className=" hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-4 ">
              {navs.slice(10, navs.length).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className=" hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-6">
              <span>Follow Us</span>
              <SocialGroup />
            </div>
            <div className="flex items-center gap-6">
              <span>Mobile app</span>
              <Link href="#" className="p-1 rounded-full hover:bg-slate-100">
                <Icon icon="mdi:apple" width={24} />
              </Link>
              <Link href="#" className="p-1 rounded-full hover:bg-slate-100">
                <Icon icon="mdi:android" width={24} />
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

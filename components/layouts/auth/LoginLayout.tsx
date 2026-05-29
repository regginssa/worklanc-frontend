import Link from "next/link";
import { SEO, WorklancLogo } from "@/components/atoms";

export function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Log in to Worklanc"
        description="Log in to Worklanc to find work you love or hire talent to help you grow your business."
        url="/nx/login"
      />
      {/* Header */}
      <header className="h-20 w-full bg-white">
        <div className="w-[80%] h-full mx-auto flex items-center justify-between">
          <WorklancLogo />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full flex items-center justify-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-28 w-[80%] rounded-lg mb-8 mx-auto bg-zinc-900 flex items-center justify-center mt-8">
        <p className="text-white text-xs">
          © 2024 - 2026 Worklanc® Global LLC •{" "}
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>{" "}
          •{" "}
          <Link href="#" className="hover:underline">
            Your Privacy Choices
          </Link>
        </p>
      </footer>
    </div>
  );
}

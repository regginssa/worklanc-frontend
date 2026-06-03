import { Button, SEO, WorklancLogo } from "@/components/atoms";
import AlienIcon from "@/public/assets/svgs/icons/other/alien.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Worklanc - Page Not Found"
        description="We can’t find this page. But we can help you find new opportunities: hire talent, find work or get help."
        url="/404"
      />
      <header className="p-6">
        <WorklancLogo />
      </header>

      <main className="max-w-lg w-full mx-auto flex flex-col items-center justify-center flex-1 space-y-10">
        <Image src={AlienIcon} alt="Alien" className="w-[145px] h-[130px]" />

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-medium">Looking for something?</h1>
          <p className="text-slate-600">
            We can’t find this page. But we can help you find new opportunities:{" "}
            <Link
              href="/hire"
              className="text-blue-600 underline cursor-pointer"
            >
              hire talent
            </Link>
            ,{" "}
            <Link
              href="/freelance-jobs"
              className="text-blue-600 underline cursor-pointer"
            >
              find work
            </Link>{" "}
            or get help.
          </p>
        </div>

        <div>
          <Button
            type="primary"
            label="Go to homepage"
            classname="py-2.5! px-8! rounded-md! text-sm! font-medium!"
            onClick={() => router.push("/")}
          />
          <p className="text-slate-600 font-medium text-center mt-2">
            Error 404 (BN)
          </p>
        </div>

        <p className="text-slate-600 font-medium text-center">
          RequestID: a060fe488b34163f-PDX
        </p>
      </main>

      <footer className="flex items-center justify-center p-6">
        <p className="text-sm text-slate-600 text-center">
          © 2024 - 2022 Worklanc® Global Inc.
        </p>
      </footer>
    </div>
  );
}

import { INavItem } from "@/types/components.types";
import Navbar from "../Navbar";
import { Button, WorklancLogo } from "@/components/atoms";
import { HeaderSearch } from "@/components/molecules";
import Link from "next/link";
import { introNavItems } from "./introNavItems";

interface IntroHeaderProps {
  navItems?: INavItem[];
}

export default function IntroHeader({
  navItems = introNavItems,
}: IntroHeaderProps) {
  return (
    <header className="w-full h-20 flex items-center fixed top-0 z-50">
      <div className="w-[80%] mx-auto flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-10">
          <WorklancLogo />
          <Navbar navItems={navItems} />
        </div>
        <div className="flex items-center gap-8">
          <HeaderSearch />
          <Link href="/nx/login" className="text-sm cursor-pointer">
            Log in
          </Link>
          <Link href="/nx/signup">
            <Button
              type="primary"
              label="Sign up"
              size="medium"
              classname="rounded-full!"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

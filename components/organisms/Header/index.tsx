"use client";

import { useState } from "react";
import type { HeaderVariant } from "@/lib/headerVariant";
import { useHeaderVariant } from "@/hooks/useHeaderVariant";
import ClientHeader from "../ClientHeader";
import CreateProfileHeader from "../CreateProfileHeader";
import FreelancerHeader from "../FreelancerHeader";
import IntroHeader from "./IntroHeader";
import type { INavItem } from "@/types/components.types";

export type { HeaderVariant };

interface HeaderProps {
  /** Force a specific header (e.g. intro on marketing layouts). */
  variant?: HeaderVariant;
  /** Optional override for intro navigation items. */
  navItems?: INavItem[];
}

export default function Header({ variant: forcedVariant, navItems }: HeaderProps) {
  const variant = useHeaderVariant(forcedVariant);
  const [menuOpen, setMenuOpen] = useState(false);

  switch (variant) {
    case "create-profile":
      return <CreateProfileHeader open={menuOpen} setOpen={setMenuOpen} />;
    case "client":
      return <ClientHeader />;
    case "talent":
      return <FreelancerHeader />;
    case "intro":
    default:
      return <IntroHeader navItems={navItems} />;
  }
}

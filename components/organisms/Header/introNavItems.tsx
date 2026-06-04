import { INavItem } from "@/types/components.types";
import { FindTalent, FindWork, WhatNew, WhyCharlie } from "@/components/layouts/IntroLayout/NavChildren";

export const introNavItems: INavItem[] = [
  {
    label: "Find talent",
    path: "#",
    active: false,
    children: <FindTalent />,
  },
  {
    label: "Find work",
    path: "#",
    active: false,
    children: <FindWork />,
  },
  {
    label: "Why Worklanc",
    path: "#",
    active: false,
    children: <WhyCharlie />,
  },
  {
    label: "What's new",
    path: "#",
    active: false,
    children: <WhatNew />,
  },
  {
    label: "Enterprise",
    path: "#",
    active: false,
  },
  {
    label: "Pricing",
    path: "#",
    active: false,
  },
];

import Link from "next/link";
import IntroLayout from "../IntroLayout";
import NavLayout, { TNavItem } from "../NavLayout";
import {
  Avatar,
  AvatarGroup,
  Button,
  ExpandableText,
  LinkDropdown,
  Rater,
  SEO,
  SkillTag,
} from "@/components/atoms";
import type {
  ICatFreelancerCategory,
  IExpandableText,
  TAccordionImageViewerItem,
  TCatLayoutExpertCategory,
  TFreelancerBadge,
  TLinkDropdownItem,
  TSEO,
} from "@/types/components.types";
import Image, { StaticImageData } from "next/image";
import { Icon } from "@iconify/react";

import MicroSoftImage from "@/public/assets/svgs/talent-marketplace/microsoft.svg";
import AirbnbImage from "@/public/assets/svgs/talent-marketplace/airbnb.svg";
import AutomatticImage from "@/public/assets/svgs/talent-marketplace/automattic.svg";
import BissellImage from "@/public/assets/svgs/talent-marketplace/bissell.svg";
import ClouldflareImage from "@/public/assets/pngs/talent-marketplace/cloudflare.png";
import { AccordionImageViewer } from "@/components/organisms";
import HowITExpertsWorkNowImage from "@/public/assets/webps/cat/dev-it/how_it_experts_work_now.webp";
import { formatNumberWithCommas } from "@/utils/math";

import ReadArticleImage from "@/public/assets/pngs/cat/admin-customer-support/read_article.png";

export type TCatLayoutIntro = {
  title: string;
  description: string;
  image: StaticImageData;
};

export type TCatLayoutExpert = {
  title: string;
  categories?: TCatLayoutExpertCategory[];
  rate: {
    value: string;
    label: string;
  };
  contracts: {
    value: string;
    label: string;
  };
  skills: {
    value: string;
    label: string;
  };
};

export type TCatLayoutService = {
  title: string;
  items: TAccordionImageViewerItem[];
};

export type TCatLayoutProjectOverview = {
  title: string;
  description: string;
  message: string;
  rate: number;
  budget: number;
  skills: string[];
  image: StaticImageData;
};

export type TCatLayoutFreelancerCategory = {
  title: string;
  categories: ICatFreelancerCategory[];
};

export type TCatLayoutProfessionalCardItem = {
  message: string;
  user: {
    name: string;
    pic: string;
    badge: TFreelancerBadge;
    profession: string;
  };
};

export type TCatLayoutProfessionals = {
  title: string;
  professionals: TCatLayoutProfessionalCardItem[];
};

interface CatLayoutProps {
  param: string;
  intro: TCatLayoutIntro | null;
  expert: TCatLayoutExpert | null;
  services: TCatLayoutService | null;
  freelancerCategory: TCatLayoutFreelancerCategory | null;
  projectOverview: TCatLayoutProjectOverview | null;
  professionals: TCatLayoutProfessionals | null;
  faqs: IExpandableText[] | null;
  seo: TSEO | null;
}

export const navs: TNavItem[] = [
  { label: "Development & IT", path: "/cat/dev-it" },
  { label: "AI Services", path: "/cat/ai" },
  { label: "Design & Creative", path: "/cat/design-creative" },
  { label: "Sales & Marketing", path: "/cat/sales-and-marketing" },
  { label: "Admin & Customer Support", path: "/cat/admin-customer-support" },
];

export const dropdowns: TLinkDropdownItem[] = [
  { label: "Writing & Translation", path: "/cat/writing-translation" },
  { label: "Finance & Accounting", path: "/cat/finance-accounting" },
  { label: "HR & Training", path: "/cat/hr-training" },
  { label: "Legal", path: "/cat/legal" },
  {
    label: "Engineering & Architecture",
    path: "/cat/engineering-architecture",
  },
  { label: "See all specializations", path: "/hire" },
];

const CatLayout: React.FC<CatLayoutProps> = ({
  param,
  intro,
  expert,
  services,
  freelancerCategory,
  projectOverview,
  professionals,
  faqs,
  seo,
}) => {
  return (
    <IntroLayout>
      {seo && <SEO {...seo} />}

      {/* Navigation Menu */}
      <NavLayout>
        <nav role="navigation" aria-label="Main categories">
          <ul className="flex flex-row items-center gap-6">
            {navs.map((nav, index) => (
              <li key={index}>
                <Link
                  href={nav.path}
                  className="text-sm hover:text-blue-600 hover:underline"
                >
                  {nav.label}
                </Link>
              </li>
            ))}
            <li>
              <LinkDropdown placeholder="More" items={dropdowns} />
            </li>
          </ul>
        </nav>
      </NavLayout>

      {/* Main Content */}
      <main className="w-full flex flex-col gap-16 py-8 mt-[150px]">
        {/* Hero Section */}
        {intro && (
          <section className="w-[70%] mx-auto" aria-labelledby="hero-title">
            {/* Hero Content */}
            <div className="w-full flex gap-20">
              <div className="w-1/2 flex flex-col items-center justify-center">
                {/* Title & Description */}
                <header>
                  <h1 id="hero-title" className="text-6xl font-semibold">
                    {intro.title}
                  </h1>
                  <p className="text-xl mt-8">{intro.description}</p>
                </header>

                {/* Get started Button */}
                <div className="w-full mt-8">
                  <button
                    className="bg-blue-600 hover:bg-blue-500 w-[60%] py-3 rounded-lg text-lg text-white font-semibold transition-all duration-150 ease-in-out cursor-pointer"
                    aria-label="Get started with Worklancs"
                  >
                    Get started
                  </button>
                </div>
              </div>
              <div className="w-1/2">
                <Image
                  src={intro.image}
                  alt={`${intro.title} - Worklanc freelance services`}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Trusted Brands */}
            <aside
              className="w-full flex flex-row items-center justify-between mt-8"
              aria-label="Trusted by leading companies"
            >
              <p className="text-gray-500 text-sm">TRUSTED BY</p>
              <Image src={MicroSoftImage} alt="Microsoft - trusted partner" />
              <Image src={AirbnbImage} alt="Airbnb - trusted partner" />
              <Image src={AutomatticImage} alt="Automattic - trusted partner" />
              <Image src={BissellImage} alt="Bissell - trusted partner" />
              <Image
                src={ClouldflareImage}
                alt="Cloudflare - trusted partner"
                className="w-[150px] h-auto object-cover"
              />
            </aside>
          </section>
        )}

        {/* Expert Statistics Section */}
        {expert && (
          <section
            className="w-full py-20 bg-[#f9f9f9]"
            aria-labelledby="expert-stats"
          >
            <div className="w-[70%] mx-auto">
              <header className="w-4/5">
                <h2
                  id="expert-stats"
                  className="text-5xl font-semibold text-[#0e183d]"
                >
                  {expert.title}
                </h2>
              </header>

              {/* Statistics */}
              <div
                className="w-full flex flex-row items-center justify-between mt-16 gap-10"
                role="region"
                aria-label="Expert statistics"
              >
                {/* Rating */}
                <div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mynaui:star-solid"
                      className="w-8 h-8 text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="text-4xl font-semibold text-[#0e183d]">
                      {expert.rate.value}
                    </span>
                  </div>
                  <p className="mt-2 text-[#0e183d]">{expert.rate.label}</p>
                </div>

                {/* Contracts */}
                <div className="px-6 border-l-[1px] border-gray-300">
                  <span className="text-4xl font-semibold text-[#0e183d]">
                    {expert.contracts.value}K+ contracts
                  </span>
                  <p className="mt-2 text-[#0e183d]">
                    {expert.contracts.label}
                  </p>
                </div>

                {/* Skills */}
                <div className="px-6 border-l-[1px] border-gray-300">
                  <span className="text-4xl font-semibold text-[#0e183d]">
                    {expert.skills.value} skills
                  </span>
                  <p className="mt-2 text-[#0e183d]">{expert.skills.label}</p>
                </div>
              </div>

              {/* Expert Categories */}
              {expert.categories && (
                <div className="mt-14">
                  <div className="w-full grid grid-cols-4 gap-6">
                    {expert.categories.map((cat, index) => (
                      <article
                        key={index}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-4 transition-all duration-300 ease-in-out"
                      >
                        <Link
                          href={cat.path}
                          className="flex flex-col items-start justify-between h-full w-full"
                        >
                          {/* Category Title */}
                          <h3 className="text-lg font-semibold text-[#0e183d]">
                            {cat.name}
                          </h3>

                          {/* Average Rating & Expert Avatars */}
                          <div className="w-full">
                            {/* Average Rating */}
                            <div className="w-full flex items-center gap-2 mt-6">
                              <Icon
                                icon="mynaui:star-solid"
                                className="text-yellow-500 w-5 h-5"
                                aria-hidden="true"
                              />
                              <span className="text-[#0e183d]">
                                {cat.rate} average rating
                              </span>
                            </div>

                            {/* Expert Avatars */}
                            <div className="w-full flex items-center justify-between mt-4">
                              <AvatarGroup avatars={cat.experts} />
                              <Icon
                                icon="solar:arrow-right-linear"
                                className="text-blue-600 w-8 h-8"
                                aria-label="View category"
                              />
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                  <div className="mt-10">
                    <Button
                      type="outline"
                      label="See more skills"
                      size="large"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Services Section */}
        {services && (
          <section className="w-[70%] mx-auto" aria-labelledby="services-title">
            {/* Services Title */}
            <header className="w-4/5">
              <h2
                id="services-title"
                className="text-5xl font-semibold text-[#0e183d]"
              >
                {services.title}
              </h2>
            </header>

            {/* Services Content */}
            <div className="mt-14">
              <AccordionImageViewer
                items={services.items}
                defaultSelected="1"
              />
              <div className="mt-10">
                <Button type="outline" label="Browse projects" size="large" />
              </div>
            </div>
          </section>
        )}

        {/* Enterprise Suite Section */}
        {!dropdowns.some((d) => d.path.includes(param)) && (
          <section
            className="w-[70%] mx-auto rounded-2xl bg-zinc-900 flex p-4 mt-10"
            aria-labelledby="enterprise-title"
          >
            {/* Content */}
            <div className="w-1/2 p-6 flex flex-col items-start gap-4">
              <span
                className="text-sm font-semibold text-white"
                aria-label="Enterprise Suite"
              >
                ENTERPRISE SUITE
              </span>
              <h2
                id="enterprise-title"
                className="text-5xl font-semibold text-white mt-2"
              >
                This is how{" "}
                {param === "dev-it"
                  ? "IT Experts"
                  : param === "sales-and-marketing"
                  ? "Sales & Marketing"
                  : param === "admin-customer-support"
                  ? "Administrators"
                  : "Creatives"}{" "}
                work now
              </h2>
              <p className="text-white mt-4">
                Build an agile workforce that moves faster than the pace of
                <br />
                business with Enterprise Suite.
              </p>
              <div className="mt-6 mb-4">
                <Link
                  href="/enterprise"
                  className="bg-[#51a8fa] rounded-xl py-3 px-10 text-xl hover:bg-white transition-all duration-300 ease-in-out"
                  aria-label="Learn about Enterprise Suite"
                >
                  Find out how
                </Link>
              </div>
            </div>

            {/* Enterprise Image */}
            <div className="w-1/2 rounded-2xl overflow-auto">
              <Image
                src={HowITExpertsWorkNowImage}
                alt="Enterprise Suite - How IT experts work with modern tools"
                className="w-full h-auto object-cover"
              />
            </div>
          </section>
        )}

        {/* Project Overview Section */}
        {projectOverview && (
          <section
            className="w-[70%] mx-auto flex gap-10 mt-14"
            aria-labelledby="project-overview-title"
          >
            {/* Project Details */}
            <article className="w-1/2 flex flex-col items-start justify-center">
              <header className="w-4/5">
                <h2
                  id="project-overview-title"
                  className="text-5xl font-semibold text-[#0e183d]"
                >
                  {projectOverview.title}
                </h2>
              </header>

              {/* Project Description */}
              <h3 className="text-xl font-semibold mt-6 text-[#0e183d]">
                {projectOverview.description}
              </h3>
              <blockquote className="mt-8">
                "{projectOverview.message}"
              </blockquote>

              {/* Project Metrics */}
              <div className="mt-6 flex flex-row items-center gap-6">
                <Rater rate={projectOverview.rate} />
                <span className="text-lg text-[#0e183d]">
                  <strong>
                    Budget: ${formatNumberWithCommas(projectOverview.budget)}
                  </strong>
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-row items-start gap-2 mt-4">
                <h4 className="text-lg font-semibold text-[#0e183d]">
                  Skills:{" "}
                </h4>
                <div
                  className="flex flex-wrap gap-2"
                  role="list"
                  aria-label="Required skills"
                >
                  {projectOverview.skills.map((skill, index) => (
                    <SkillTag key={index} label={skill} value={skill} />
                  ))}
                </div>
              </div>
            </article>

            {/* Project Image */}
            <div className="w-1/2 rounded-2xl overflow-hidden">
              <Image
                src={projectOverview.image}
                alt={`${projectOverview.title} project example`}
                className="w-full h-auto object-cover"
              />
            </div>
          </section>
        )}

        {/* Professionals Section */}
        {professionals && (
          <section
            className="w-full py-20 bg-[#f9f9f9]"
            aria-labelledby="professionals-title"
          >
            <div className="w-[70%] mx-auto">
              {/* Section Title */}
              <header className="w-4/5">
                <h2
                  id="professionals-title"
                  className="text-5xl font-semibold text-[#0e183d]"
                >
                  {professionals.title}
                </h2>
              </header>

              {/* Professional Testimonials */}
              <div className="w-full grid grid-cols-2 gap-8 mt-14">
                {professionals.professionals.map((pro, index) => (
                  <article
                    key={index}
                    className="rounded-2xl bg-white p-8 flex flex-col items-start justify-between gap-16"
                  >
                    {/* Testimonial */}
                    <blockquote className="text-3xl">
                      "{pro.message}"
                    </blockquote>

                    {/* Professional Info */}
                    <footer className="">
                      {/* Avatar & Badge */}
                      <Avatar {...pro.user} />
                      {/* Profession */}
                      <cite className="mt-4 not-italic">
                        {pro.user.profession}
                      </cite>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Customer Service Article Section */}
        {param === "admin-customer-support" && (
          <section
            className="w-[70%] mx-auto rounded-2xl bg-[#053b8d] px-12 flex flex-row items-center justify-between gap-14"
            aria-labelledby="customer-service-article"
          >
            {/* Article Content */}
            <div className="w-3/4 flex flex-col items-start justify-between gap-8">
              <h2
                id="customer-service-article"
                className="text-4xl font-semibold text-white"
              >
                Discover how you can build a virtual Customer Service team to
                help unlock new levels of productivity within your organization.
              </h2>
              <Link
                href="#"
                className="bg-white text-[#0e183d] py-3 px-10 rounded-xl text-lg"
                aria-label="Read article about building virtual customer service teams"
              >
                Read article
              </Link>
            </div>

            {/* Article Image */}
            <div className="w-1/4">
              <Image
                src={ReadArticleImage}
                alt="Virtual Customer Service team productivity guide"
                className="w-full h-auto object-cover"
              />
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs && (
          <section
            className="w-[70%] mx-auto flex gap-10 mt-14 bg-[#f9f9f9] rounded-2xl p-10"
            aria-labelledby="faq-title"
          >
            {/* FAQ Title */}
            <header className="w-1/3">
              <h2
                id="faq-title"
                className="text-5xl font-semibold text-[#0e183d]"
              >
                Frequently asked
                <br />
                questions
              </h2>
            </header>

            {/* FAQ Content */}
            <div className="w-2/3" role="region" aria-labelledby="faq-title">
              {faqs.map((faq, index) => (
                <ExpandableText key={index} {...faq}>
                  {faq.children}
                </ExpandableText>
              ))}
              <div className="mt-2 flex flex-row items-center gap-2">
                <p>Still have questions?</p>
                <Link
                  href="#"
                  className="text-blue-600 underline font-semibold"
                >
                  Visit our Help Center
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Freelancer Categories Section */}
        {freelancerCategory && (
          <section
            className="w-[70%] mx-auto mt-14"
            aria-labelledby="freelancer-categories-title"
          >
            {/* Categories Title */}
            <header className="w-2/3">
              <h2
                id="freelancer-categories-title"
                className="text-5xl font-semibold text-[#0e183d]"
              >
                {freelancerCategory.title}
              </h2>
            </header>

            {/* Categories List */}
            <div role="region" aria-labelledby="freelancer-categories-title">
              {freelancerCategory.categories.map((cat, index) => (
                <article key={index} className="w-full mt-10">
                  <h3 className="text-3xl font-semibold text-[#0e183d]">
                    {cat.title}
                  </h3>
                  <nav
                    className="w-full grid grid-cols-4 gap-4 mt-6"
                    aria-label={`${cat.title} services`}
                  >
                    {cat.items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.path}
                        className="hover:underline"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </IntroLayout>
  );
};

export default CatLayout;

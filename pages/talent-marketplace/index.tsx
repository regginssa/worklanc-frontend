import { Button, LinkDropdown, SEO } from "@/components/atoms";
import { IntroLayout, NavLayout } from "@/components/layouts";
import { TLinkDropdownItem } from "@/types/components.types";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Intro1Image from "@/public/assets/webps/talent-marketplace/intro.webp";
import MicroSoftImage from "@/public/assets/svgs/talent-marketplace/microsoft.svg";
import AirbnbImage from "@/public/assets/svgs/talent-marketplace/airbnb.svg";
import AutomatticImage from "@/public/assets/svgs/talent-marketplace/automattic.svg";
import BissellImage from "@/public/assets/svgs/talent-marketplace/bissell.svg";
import ClouldflareImage from "@/public/assets/pngs/talent-marketplace/cloudflare.png";
import DevelopmentImage from "@/public/assets/pngs/icons/web-programming.png";
import MarketingImage from "@/public/assets/pngs/icons/marketing.png";
import DesignImage from "@/public/assets/pngs/icons/design-and-creative.png";
import WritingImage from "@/public/assets/pngs/icons/writing.png";
import CustomerSupportImage from "@/public/assets/pngs/icons/customer-support-simple.png";
import FinanceAccountingImage from "@/public/assets/pngs/icons/financial-analysis-valuation.png";
import PostJobImage from "@/public/assets/jpgs/talent-marketplace/post-job.jpg";
import ProjectCatalogImage from "@/public/assets/webps/talent-marketplace/project_catalog.webp";

type TNavItem = {
  label: string;
  path: string;
};

type TProjectCatalog = {
  title: string;
  subtitle: string;
  image: StaticImageData;
  path: string;
};

type TBenefit = {
  title: string;
  descriptions: string[];
  icon: string;
};

const TalentMarketplace = () => {
  const navs: TNavItem[] = [
    { label: "Development & IT", path: "/cat/dev-it" },
    { label: "AI Services", path: "#" },
    { label: "Design & Creative", path: "/cat/design-creative" },
    { label: "Sales & Marketing", path: "/cat/sales-and-marketing" },
    { label: "Admin & Customer Support", path: "/cat/admin-customer-support" },
  ];

  const dropdowns: TLinkDropdownItem[] = [
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

  const projectCatalog: TProjectCatalog[] = [
    {
      title: "Development & IT",
      subtitle: "20K+ jobs posted weekly",
      image: DevelopmentImage,
      path: "#",
    },
    {
      title: "Sales & Marketing",
      subtitle: "10K+ jobs posted weekly",
      image: MarketingImage,
      path: "#",
    },
    {
      title: "Design & Creative",
      subtitle: "15K+ jobs posted weekly",
      image: DesignImage,
      path: "#",
    },
    {
      title: "Writing & Translation",
      subtitle: "20K+ jobs posted weekly",
      image: WritingImage,
      path: "#",
    },
    {
      title: "Admin & Customer Support",
      subtitle: "10K+ jobs posted weekly",
      image: CustomerSupportImage,
      path: "#",
    },
    {
      title: "Finance & Accounting",
      subtitle: "15K+ jobs posted weekly",
      image: FinanceAccountingImage,
      path: "#",
    },
  ];

  const companyTutorials: TNavItem[] = [
    {
      label:
        "How Flexible Talent Helps a Fast-Paced Company Improve Productivity",
      path: "#",
    },
    {
      label:
        "How On-Demand Devs Provide PGA of America Time and Budget for Testing New Ideas",
      path: "#",
    },
    {
      label:
        "Singularity University Invents Their Future with On-Demand Independent Experts",
      path: "#",
    },
  ];

  const benefits: TBenefit[] = [
    {
      title: "Discover quality talent fast",
      descriptions: [
        "Post a job and receive proposals from talent",
        "See verified work history and reviews",
        "Send 30 invitations to talent per job post",
        "Use advanced search filters",
      ],
      icon: "solar:shield-star-linear",
    },
    {
      title: "Safe, easy payments",
      descriptions: [
        "Get an extra level of security with Worklanc - Freelancer Payment Protection",
        "Pay as you go billing for milestone and hourly contracts",
        "3-5% marketplace fee depending on billing method",
      ],
      icon: "solar:dollar-minimalistic-linear",
    },
    {
      title: "Collaboration tools for project tracking",
      descriptions: [
        "Chat, video call, and share files with talent",
        "Get advanced reporting and tracking",
        "Set coworker teams and member permission settings",
        "Customize your invoice with activity codes",
      ],
      icon: "mdi-light:pencil",
    },
    {
      title: "Account support and guidance",
      descriptions: ["Account support and guidance"],
      icon: "material-symbols-light:headset-mic-outline",
    },
  ];

  return (
    <IntroLayout>
      {/* Enhanced SEO */}
      <SEO
        title="Talent Marketplace - Post a Job & Hire Top Freelancers | Worklanc"
        description="Post a job today and hire quality freelancers tomorrow. Find verified talent in development, marketing, design, writing, and more. Secure payments, verified reviews, and 24/7 support on Worklanc's talent marketplace."
        url="/talent-marketplace"
        keywords="talent marketplace, post a job, hire freelancers, freelance developers, freelance marketers, freelance designers, find freelancers, quality freelancers, Worklanc, AI-powered talent marketplace, remote freelancers, freelance job posting, verified freelancers, secure payments, project-based hiring"
      />

      {/* Navigation Menu */}
      <NavLayout>
        <nav role="navigation" aria-label="Talent marketplace categories">
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
      <main className="w-full flex flex-col gap-24 py-8 mt-[150px]">
        {/* Hero Section */}
        <section className="w-[70%] mx-auto" aria-labelledby="hero-title">
          {/* Hero Content */}
          <div className="w-full flex gap-20">
            <div className="w-1/2 flex flex-col items-center justify-center">
              {/* Hero Header */}
              <header>
                <h1 id="hero-title" className="text-6xl font-semibold">
                  Post a job today, hire tomorrow
                </h1>
                <p className="text-xl mt-8">
                  Connect with talent that gets you, and hire them to take your
                  business to the next level.
                </p>
              </header>

              {/* Hero CTA */}
              <div className="w-full mt-8">
                <button
                  className="bg-blue-600 hover:bg-blue-500 w-[60%] py-3 rounded-lg text-lg text-white font-semibold transition-all duration-150 ease-in-out cursor-pointer"
                  aria-label="Get started with posting a job on Worklanc talent marketplace"
                >
                  Get started
                </button>
              </div>
            </div>
            <div className="w-1/2">
              <Image
                src={Intro1Image}
                alt="Talent Marketplace - Post jobs and hire qualified freelancers on Worklanc"
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Trusted Companies */}
          <aside
            className="w-full flex flex-row items-center justify-between mt-8"
            aria-label="Trusted by leading companies"
          >
            <p className="text-gray-500 text-sm">TRUSTED BY</p>
            <Image
              src={MicroSoftImage}
              alt="Microsoft - trusted client using Worklanc talent marketplace"
            />
            <Image
              src={AirbnbImage}
              alt="Airbnb - trusted client using Worklanc talent marketplace"
            />
            <Image
              src={AutomatticImage}
              alt="Automattic - trusted client using Worklanc talent marketplace"
            />
            <Image
              src={BissellImage}
              alt="Bissell - trusted client using Worklanc talent marketplace"
            />
            <Image
              src={ClouldflareImage}
              alt="Cloudflare - trusted client using Worklanc talent marketplace"
              className="w-[150px] h-auto object-cover"
            />
          </aside>
        </section>

        {/* Talent Quality Section */}
        <section
          className="w-full py-20 bg-[#f9f9f9]"
          aria-labelledby="talent-quality-title"
        >
          <div className="w-[70%] mx-auto">
            {/* Section Content */}
            <div className="w-full flex items-start">
              {/* Section Header */}
              <header className="w-3/5">
                <h2
                  id="talent-quality-title"
                  className="text-5xl font-semibold"
                >
                  The best colleagues you've
                  <br />
                  never met
                </h2>
                <p className="text-xl mt-8">
                  Logo designers. App developers. Customer support gurus.
                  Marketing agencies.
                  <br />
                  Make the right connection and it'll last a lifetime.
                </p>
              </header>

              {/* Platform Statistics */}
              <div
                className="w-2/5 flex items-center justify-between gap-8"
                role="region"
                aria-label="Platform quality statistics"
              >
                <div>
                  <div className="w-full flex items-center gap-2">
                    <span className="text-5xl font-semibold">4.9</span>
                    {/* Star Rating */}
                    <div
                      className="flex items-center gap-0"
                      role="img"
                      aria-label="4.9 out of 5 stars rating"
                    >
                      <Icon
                        icon="mynaui:star-solid"
                        className="w-5 h-5 text-yellow-500"
                        aria-hidden="true"
                      />
                      <Icon
                        icon="mynaui:star-solid"
                        className="w-5 h-5 text-yellow-500"
                        aria-hidden="true"
                      />
                      <Icon
                        icon="mynaui:star-solid"
                        className="w-5 h-5 text-yellow-500"
                        aria-hidden="true"
                      />
                      <Icon
                        icon="mynaui:star-solid"
                        className="w-5 h-5 text-yellow-500"
                        aria-hidden="true"
                      />
                      <Icon
                        icon="mynaui:star-solid"
                        className="w-5 h-5 text-yellow-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <p className="text-base mt-4">
                    Average rating of talent
                    <br />
                    from 2M+ reviews
                  </p>
                </div>
                <div>
                  <span className="text-5xl font-semibold">8K+</span>
                  <p className="text-base mt-4">
                    Skills represented by talent
                    <br />
                    on Worklanc.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Categories */}
            <div
              className="w-full grid grid-cols-3 gap-8 mt-8"
              role="region"
              aria-label="Available talent categories"
            >
              {projectCatalog.map((ct, index) => (
                <article key={index}>
                  <Link
                    href={ct.path}
                    className="w-full flex flex-row items-center gap-4 bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden p-6 transition-all duration-300 ease-in-out"
                    aria-label={`Browse ${ct.title} freelancers - ${ct.subtitle}`}
                  >
                    <Image
                      src={ct.image}
                      alt={`${ct.title} freelance services icon`}
                      className="w-14 h-auto object-cover"
                    />
                    <div className="w-full">
                      <h3 className="text-lg font-semibold">{ct.title}</h3>
                      <p className="text-gray-600 mt-1">{ct.subtitle}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Job Posting Process */}
        <section
          className="w-[70%] mx-auto flex items-center gap-16"
          aria-labelledby="job-posting-title"
        >
          <div className="w-1/2 rounded-xl overflow-hidden">
            <Image
              src={PostJobImage}
              alt="Post a job on Worklanc talent marketplace - easy and secure hiring process"
              className="w-full h-auto object-cover"
            />
          </div>
          <article className="w-1/2">
            {/* Process Header */}
            <header>
              <h2 id="job-posting-title" className="text-5xl font-semibold">
                Post today, hire tomorrow
              </h2>
              <p className="text-xl mt-4">
                We've got you covered from idea to delivery. Post your job and
                you'll start getting proposals. Once you've found your expert,
                you can talk timings, availability, and prices before going
                ahead.
              </p>
            </header>

            {/* Payment Protection Feature */}
            <div className="w-full flex flex-row items-center gap-4 mt-6">
              <Icon
                icon="solar:dollar-minimalistic-linear"
                className="w-10 h-10"
                color="black"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  Worklanc Payment Protection
                </h3>
                <p className="text-lg font-semibold text-gray-600">
                  Gives you security and peace of mind
                </p>
              </div>
            </div>

            {/* Job Posting CTA */}
            <div className="mt-6">
              <Button type="primary" label="Post a job" />
            </div>
          </article>
        </section>

        {/* Success Stories Section */}
        <section
          className="w-[70%] mx-auto"
          aria-labelledby="success-stories-title"
        >
          <header>
            <h2 id="success-stories-title" className="text-5xl font-semibold">
              You're in good company
            </h2>
            <p className="text-xl mt-4">
              Millions of companies, big and small, use Worklanc to get great
              work done. Join them today.
            </p>
          </header>
          <div
            className="w-full grid grid-cols-3 gap-4 mt-6"
            role="region"
            aria-label="Company success stories"
          >
            {companyTutorials.map((tutorial, index) => (
              <article key={index}>
                <Link
                  href={tutorial.path}
                  className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out block"
                  aria-label={`Read case study: ${tutorial.label}`}
                >
                  <h3 className="text-xl font-semibold">{tutorial.label}</h3>
                  <div className="mt-4">
                    <Icon
                      icon="solar:arrow-right-linear"
                      className="text-blue-600 w-6 h-6"
                      aria-label="Read more"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Platform Benefits */}
        <section className="w-[70%] mx-auto" aria-labelledby="benefits-title">
          <header>
            <h2 id="benefits-title" className="text-5xl font-semibold">
              What you'll get
            </h2>
          </header>
          <div
            className="w-full mt-10 grid grid-cols-2 gap-8"
            role="region"
            aria-label="Platform benefits and features"
          >
            {benefits.map((benefit, index) => (
              <article
                key={index}
                className="w-full flex items-start gap-6 overflow-hidden"
              >
                <Icon
                  icon={benefit.icon}
                  className="w-12 h-12"
                  color="black"
                  aria-hidden="true"
                />
                <div className="w-full">
                  <h3 className="text-2xl font-semibold">{benefit.title}</h3>
                  <ul className="mt-2 list-disc list-inside" role="list">
                    {benefit.descriptions.map((des, index) => (
                      <li key={index} role="listitem">
                        {des}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Project Catalog CTA */}
        <section
          className="w-[70%] mx-auto bg-green-600 p-4 rounded-xl flex items-center gap-8"
          aria-labelledby="project-catalog-title"
        >
          <div className="w-2/3 pl-4">
            <span
              className="text-white text-sm"
              aria-label="Project Catalog section"
            >
              PROJECT CATALOG
            </span>
            <h2
              id="project-catalog-title"
              className="text-white text-5xl font-semibold mt-2"
            >
              Take the first step toward a
              <br />
              smarter talent strategy
            </h2>
            <p className="text-white text-xl mt-4">
              Browse and buy projects from talent
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="bg-white text-lg font-semibold py-3 px-8 rounded-xl inline-block"
                aria-label="Browse ready-made projects in our Project Catalog"
              >
                Browse projects
              </Link>
            </div>
          </div>
          <div className="w-1/3">
            <Image
              src={ProjectCatalogImage}
              alt="Project Catalog - Browse and buy ready-made projects from talented freelancers"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
      </main>
    </IntroLayout>
  );
};

export default TalentMarketplace;

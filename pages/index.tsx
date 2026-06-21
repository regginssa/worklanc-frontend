import { IntroLayout } from "@/components/layouts";
import Image from "next/image";
import SearchSectionBgImage from "@/public/assets/jpgs/intro/intro_section1.jpg";
import { Button, Switch } from "@/components/atoms";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import EnterpriseSuiteImage from "@/public/assets/jpgs/intro/intro_enterprise_suite.jpg";
import ForClientsImage from "@/public/assets/jpgs/intro/intro_for_clients.jpg";
import FindWorkImage from "@/public/assets/jpgs/intro/intro_find_work.jpg";
import Head from "next/head";

type TFirstIntroSectionItem = {
  title: string;
  description: string;
  icon: string;
};

type TTalentCategory = {
  label: string;
  rate: number;
  skills: number;
  path: string;
};

type TSkillCategory = {
  label: string;
  path: string;
};

export default function Home() {
  const [activeSwitchIndex, setActiveSwitchIndex] = useState<number>(0);
  const [activeSkillCategoryIndex, setActiveSkillCategoryIndex] =
    useState<number>(0);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Popular search keywords
  const popularSearches = [
    "Design my mobile app",
    "Hire a virtual assistance",
    "AI/ML consultant for AI startup",
  ];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setActiveSearch(false);
      }
    };

    if (activeSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeSearch]);

  const firstIntroSectionItems: TFirstIntroSectionItem[] = [
    {
      title: "No cost to join",
      description:
        "Register and browse talent profiles, explore projects, or even book a consultation.",
      icon: "material-symbols:edit-square-outline-rounded",
    },
    {
      title: "Post a job and hire top talent",
      description:
        "Finding talent doesn't have to be a chore. Post a job or we can search for you!",
      icon: "solar:pin-outline",
    },
    {
      title: "Work with the best—without breaking the bank",
      description:
        "Worklanc makes it affordable to up your work and take advantage of low transaction rates.",
      icon: "solar:shield-star-outline",
    },
  ];

  const talentCategories: TTalentCategory[] = [
    { label: "Development & IT", rate: 4.85, skills: 1853, path: "#" },
    { label: "AI Services", rate: 4.8, skills: 294, path: "#" },
    { label: "Design & Creative", rate: 4.91, skills: 968, path: "#" },
    { label: "Sales & Marketing", rate: 4.77, skills: 392, path: "#" },
    { label: "Writing & Translation", rate: 4.92, skills: 505, path: "#" },
    { label: "Admin & Customer Support", rate: 4.77, skills: 508, path: "#" },
    { label: "Finance & Accounting", rate: 4.79, skills: 214, path: "#" },
    { label: "Engineering & Architecture", rate: 4.85, skills: 650, path: "#" },
  ];

  const reasonsTurningToUs: TFirstIntroSectionItem[] = [
    {
      title: "Proof of quality",
      description:
        "Check any pro's work samples, client reviews, and identity verification.",
      icon: "solar:star-circle-outline",
    },
    {
      title: "No cost until you hire",
      description:
        "Interview potential fits for your job, negotiate rates, and only pay for work you approve.",
      icon: "solar:dollar-outline",
    },
    {
      title: "Safe and secure",
      description:
        "Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if you need it.",
      icon: "solar:check-circle-outline",
    },
  ];

  const adus: TFirstIntroSectionItem[] = [
    {
      title: "4.9/5",
      description: "Clients rate professionals on Charle Unicorn AI",
      icon: "mynaui:star-solid",
    },
    {
      title: "Award winner",
      description: "G2's 2021 Best Software Awards",
      icon: "solar:star-circle-outline",
    },
  ];

  const skillCategories = ["Top skills", "Trending skills", "Project Catalog"];

  const skills: TSkillCategory[][] = [
    [
      { label: "Generative AI Specialists", path: "#" },
      { label: "Data Entry Specialists", path: "#" },
      { label: "Video Editors", path: "#" },
      { label: "Data Analyst", path: "#" },
      { label: "Shopify Developer", path: "#" },
      { label: "Ruby on Rails Developer", path: "#" },
      { label: "Android Developer", path: "#" },
      { label: "Bookkeeper", path: "#" },
      { label: "Content Writer", path: "#" },
      { label: "Copywriter", path: "#" },
      { label: "Data Scientist", path: "#" },
      { label: "Front-End Developer", path: "#" },
      { label: "Game Developer", path: "#" },
      { label: "Graphic Designer", path: "#" },
      { label: "iOS Developer", path: "#" },
      { label: "Java Developer", path: "#" },
      { label: "JavaScript Developer", path: "#" },
      { label: "Logo Designer", path: "#" },
      { label: "Mobile App Developer", path: "#" },
      { label: "PHP Developer", path: "#" },
      { label: "Python Developer", path: "#" },
      { label: "Resume Writer", path: "#" },
      { label: "SEO Expert", path: "#" },
      { label: "Social Media Manager", path: "#" },
      { label: "Software Developer", path: "#" },
      { label: "Software Engineer", path: "#" },
      { label: "Technical Writer", path: "#" },
      { label: "UI Designer", path: "#" },
      { label: "UX Designer", path: "#" },
      { label: "Virtual Assistant", path: "#" },
      { label: "Web Designer", path: "#" },
      { label: "Wordpress Developer", path: "#" },
    ],
    [
      { label: "Generative AI Specialists", path: "#" },
      { label: "Prompt Engineering Specialists", path: "#" },
      { label: "AI Content Creators", path: "#" },
      { label: "ChatGPT Specialists", path: "#" },
      { label: "AI Chatbot Specialists", path: "#" },
      { label: "Stable Diffusion Artists", path: "#" },
      { label: "Blockchain", path: "#" },
      { label: "Go development", path: "#" },
      { label: "Node.js", path: "#" },
      { label: "Vue.js", path: "#" },
      { label: "HR consulting", path: "#" },
      { label: "Microsoft Power BI", path: "#" },
      { label: "Instructional design", path: "#" },
      { label: "React.js", path: "#" },
      { label: "Videographers", path: "#" },
      { label: "HTML5 Developers", path: "#" },
      { label: "Ghostwriters", path: "#" },
      { label: "Unity 3D Developers", path: "#" },
      { label: "Business Consultants", path: "#" },
      { label: "Coders", path: "#" },
      { label: "Web Developers", path: "#" },
      { label: "Illustrators", path: "#" },
      { label: "Google AdWords Experts", path: "#" },
      { label: "Digital Marketers", path: "#" },
      { label: "Project Managers", path: "#" },
      { label: "Ruby Developers", path: "#" },
      { label: "AngularJS Devleopers", path: "#" },
      { label: "Full Stack Developers", path: "#" },
      { label: "React Native Developers", path: "#" },
      { label: "Swift Developers", path: "#" },
      { label: "CSS Developers", path: "#" },
      { label: "Back End Developers", path: "#" },
    ],
    [
      { label: "Generative AI Services", path: "#" },
      { label: "Resume Writing Services", path: "#" },
      { label: "SEO Services", path: "#" },
      { label: "Translation Services", path: "#" },
      { label: "Transcription Services", path: "#" },
      { label: "Virtual Assistant Services", path: "#" },
      { label: "Email Marketing Services", path: "#" },
      { label: "Web Design Services", path: "#" },
      { label: "Proofreading Services", path: "#" },
      { label: "Business Consulting Services", path: "#" },
      { label: "Logo Design Services", path: "#" },
      { label: "Architecture/Interior Design Services", path: "#" },
      { label: "Branding Services", path: "#" },
      { label: "Social Media Management Services", path: "#" },
      { label: "Video Editing Services", path: "#" },
      { label: "Lead Generation Services", path: "#" },
      { label: "Content Marketing Services", path: "#" },
      { label: "Survey Services", path: "#" },
      { label: "Landscape Design Services", path: "#" },
      { label: "Photoshop Services", path: "#" },
      { label: "Mobile App Development Services", path: "#" },
      { label: "Data Entry Services", path: "#" },
      { label: "Building Information Modeling Services", path: "#" },
      { label: "Podcast Editing Services", path: "#" },
      { label: "Wellness Services", path: "#" },
      { label: "Video Marketing Services", path: "#" },
      { label: "WordPress Development Services", path: "#" },
      { label: "Ecommerce Services", path: "#" },
      { label: "Influencer Marketing Services", path: "#" },
      { label: "Public Relations Services", path: "#" },
      { label: "QA Services", path: "#" },
      { label: "Podcast Marketing Services", path: "#" },
    ],
  ];

  return (
    <IntroLayout>
      {/* Enhanced SEO */}
      <Head>
        <title>
          Worklanc — Find Top Freelancers & Remote Jobs | Powered by AI
        </title>
        <meta
          name="description"
          content="Join Worklanc to connect with skilled AI-powered freelancers or discover high-quality remote job opportunities. From web development to AI services, design, marketing, and more. Start your project today."
        />
        <meta
          name="keywords"
          content="freelancers, freelance jobs, remote work, AI freelancers, web developers, designers, digital marketing, Worklanc, hire freelancers, freelance marketplace, independent contractors, project-based work"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Worklanc" />
        <link rel="canonical" href="https://charlieunicornai-freelancer.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Worklanc" />
        <meta
          property="og:title"
          content="Worklanc — Find Top Freelancers & Remote Jobs"
        />
        <meta
          property="og:description"
          content="Connect with skilled AI-powered freelancers or discover quality remote job opportunities. From development to design, marketing to AI services."
        />
        <meta
          property="og:url"
          content="https://charlieunicornai-freelancer.com/"
        />
        <meta
          property="og:image"
          content="https://charlieunicornai-freelancer.com/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Worklanc — Find Top Freelancers & Remote Jobs"
        />
        <meta
          name="twitter:description"
          content="Connect with skilled AI-powered freelancers or discover quality remote job opportunities."
        />
        <meta
          name="twitter:image"
          content="https://charlieunicornai-freelancer.com/og-image.jpg"
        />

        {/* Additional SEO */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="en-US" />
        <meta name="rating" content="general" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Worklanc",
            description:
              "AI-powered freelance marketplace connecting businesses with top freelancers",
            url: "https://charlieunicornai-freelancer.com/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://charlieunicornai-freelancer.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Head>

      {/* Main Content */}
      <main
        ref={pageRef}
        className="w-[70%] flex flex-col gap-24 mx-auto py-8 mt-[90px]"
      >
        {/* Hero Search Section */}
        <section
          className="relative w-full h-[700px]"
          aria-labelledby="hero-title"
        >
          <Image
            src={SearchSectionBgImage}
            alt="Worklanc - Connect clients with top freelancers"
            className="absolute w-full h-full object-cover rounded-lg"
            priority
          />
          <div className="absolute top-5 w-1/2 h-full flex flex-col items-center justify-center pl-8 gap-20">
            <h1
              id="hero-title"
              className={`text-6xl text-white font-semibold transition-all duration-300 ${
                activeSearch
                  ? "opacity-0 transform -translate-y-8"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              Connecting clients in need to freelancers who deliver
            </h1>

            {/* Search Interface */}
            <div
              ref={searchContainerRef}
              className={`w-full rounded-4xl p-8 transition-all duration-300 ease-in-out ${
                activeSearch
                  ? "transform -translate-y-20"
                  : "transform translate-y-0"
              }`}
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.7)",
                backdropFilter: "blur(8px)",
                height: activeSearch ? "400px" : "auto",
              }}
              role="search"
              aria-label="Find freelancers or browse jobs"
            >
              {/* Search Type Switch */}
              <Switch
                type="ghost"
                labels={["Find talent", "Browse jobs"]}
                activeIndex={activeSwitchIndex}
                onSelect={setActiveSwitchIndex}
              />

              {activeSwitchIndex === 0 ? (
                <>
                  {/* Talent Search Input */}
                  <div className="w-full flex bg-white items-center rounded-full mt-4 overflow-hidden">
                    <input
                      type="search"
                      placeholder="Search by role, skills or keywords"
                      className="bg-transparent py-3 px-5 w-full rounded-full border-none outline-none"
                      onClick={() => setActiveSearch(true)}
                      aria-label="Search for freelancers by skills or keywords"
                    />
                    <button
                      className="flex items-center justify-center bg-black text-white font-semibold rounded-full py-2 px-5 mr-[2px] text-lg"
                      aria-label="Search for freelancers"
                    >
                      <Icon
                        icon="mingcute:search-line"
                        className="w-6 h-6 mr-2 text-[#d2ff00]"
                        aria-hidden="true"
                      />
                      Search
                    </button>
                  </div>

                  {/* Popular Searches */}
                  {activeSearch && (
                    <div
                      className="w-full mt-6"
                      role="region"
                      aria-label="Popular searches"
                    >
                      <p className="text-white text-sm font-semibold mb-4">
                        POPULAR SEARCHES
                      </p>
                      <nav className="flex flex-col gap-3">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors text-left"
                            aria-label={`Search for ${search}`}
                          >
                            <Icon
                              icon="mingcute:search-line"
                              className="w-4 h-4 text-gray-300"
                              aria-hidden="true"
                            />
                            <span className="text-white text-sm">{search}</span>
                          </button>
                        ))}
                      </nav>
                    </div>
                  )}

                  {/* Trusted Brands */}
                  {!activeSearch && (
                    <aside
                      className="flex flex-row items-center justify-center gap-8 mt-6 w-[80%] mx-auto"
                      aria-label="Trusted by leading companies"
                    >
                      <Image
                        src={
                          "https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/q_auto/brontes/hero/logo-microsoft-grey.svg"
                        }
                        alt="Microsoft - trusted client"
                        width={100}
                        height={50}
                      />
                      <Image
                        src={
                          "https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/q_auto/brontes/hero/logo-airbnb-grey.svg"
                        }
                        alt="Airbnb - trusted client"
                        width={70}
                        height={30}
                      />
                      <Image
                        src={
                          "https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/q_auto/brontes/hero/logo-bissell-grey.svg"
                        }
                        alt="Bissell - trusted client"
                        width={40}
                        height={30}
                      />
                      <Image
                        src={
                          "https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/q_auto/brontes/hero/logo-glassdoor.svg"
                        }
                        alt="Glassdoor - trusted client"
                        width={80}
                        height={30}
                      />
                    </aside>
                  )}
                </>
              ) : (
                <div className="w-full flex flex-col items-center justify-center mt-6">
                  <p className="text-lg font-semibold text-white text-center mb-4">
                    Build your freelancing career on Worklanc, with thousands of
                    jobs posted every week.
                  </p>
                  <Button
                    type="primary"
                    label="Explore recently posted jobs"
                    size="large"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section
          className="w-full flex gap-8 py-4"
          aria-labelledby="getting-started-title"
        >
          <div
            className="w-2/5 rounded-md bg-blue-200"
            aria-hidden="true"
          ></div>
          <div className="w-3/5">
            <header>
              <h2 id="getting-started-title" className="text-5xl font-semibold">
                Up your work game, it's easy
              </h2>
            </header>
            <div className="w-full flex flex-col items-start gap-4 mt-8">
              {firstIntroSectionItems.map((item, index) => (
                <article
                  key={index}
                  className="flex flex-row items-start gap-4 w-full overflow-hidden"
                >
                  <Icon
                    icon={item.icon}
                    className="w-6 h-6 mt-1"
                    aria-hidden="true"
                  />
                  <div className="w-full">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-base">{item.description}</p>
                  </div>
                </article>
              ))}
              <div className="flex items-center gap-4 mb-4 mt-4">
                <Button type="primary" label="Sign up for free" size="medium" />
                <Button
                  type="outline"
                  label="Learn how to hire"
                  size="medium"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Talent Categories Section */}
        <section
          className="w-full py-4"
          aria-labelledby="talent-categories-title"
        >
          <header>
            <h2 id="talent-categories-title" className="text-5xl font-semibold">
              Browse talent by category
            </h2>
            <p className="text-xl mt-4 text-gray-600">
              Looking for work?{" "}
              <Link href="#" className="text-blue-500 underline">
                Browse jobs
              </Link>
            </p>
          </header>

          {/* Talent Categories Grid */}
          <div
            className="w-full grid grid-cols-4 gap-8 mt-8"
            role="region"
            aria-label="Freelancer categories"
          >
            {talentCategories.map((category, index) => (
              <article key={index}>
                <Link
                  href={category.path}
                  className="px-4 py-6 rounded-md bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out block"
                  aria-label={`Browse ${category.label} freelancers - ${category.rate} out of 5 stars with ${category.skills} skills available`}
                >
                  <h3 className="font-semibold text-xl">{category.label}</h3>
                  <div className="flex items-center gap-8 mt-4">
                    <div className="flex items-center gap-1">
                      <Icon
                        icon="mynaui:star-solid"
                        className="text-blue-500 w-5 h-5"
                        aria-hidden="true"
                      />
                      <span>{category.rate} / 5</span>
                    </div>
                    <span>{category.skills} skills</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Enterprise Suite Section */}
        <section
          className="w-full bg-[#1034a6] flex rounded-lg"
          aria-labelledby="enterprise-title"
        >
          {/* Enterprise Content */}
          <div className="w-[55%] p-8">
            {/* Enterprise Header */}
            <header>
              <h2 className="text-white font-semibold text-2xl">
                Enterprise Suite
              </h2>
              <div>
                <h3
                  id="enterprise-title"
                  className="text-white font-semibold text-5xl mt-4"
                >
                  This is how
                </h3>
                <h3 className="text-blue-300 font-semibold text-5xl mt-2">
                  good companies
                </h3>
                <h3 className="text-blue-300 font-semibold text-5xl mt-1">
                  find good company.
                </h3>
              </div>
            </header>

            {/* Enterprise Description */}
            <p className="text-white font-semibold text-lg mt-6">
              Access the top 1% of talent on Worklanc, and a full suite of
              hybrid
              <br />
              workforce management tools. This is how innovation works now.
            </p>

            {/* Enterprise Features */}
            <div
              className="w-full flex flex-col items-start gap-2 mt-4"
              role="list"
              aria-label="Enterprise features"
            >
              <div className="w-full flex items-center gap-2" role="listitem">
                <Icon
                  icon="material-symbols-light:handyman-outline"
                  className="w-5 h-5 text-blue-300"
                  aria-hidden="true"
                />
                <p className="text-white">
                  Access expert talent to fill your skill gaps
                </p>
              </div>
              <div className="w-full flex items-center gap-2" role="listitem">
                <Icon
                  icon="material-symbols-light:work"
                  className="w-5 h-5 text-blue-300"
                  aria-hidden="true"
                />
                <p className="text-white">
                  Control your workflow: hire, classify and pay your talent
                </p>
              </div>
              <div className="w-full flex items-center gap-2" role="listitem">
                <Icon
                  icon="material-symbols-light:headset-mic-rounded"
                  className="w-5 h-5 text-blue-300"
                  aria-hidden="true"
                />
                <p className="text-white">
                  Partner with Worklanc for end-to-end support
                </p>
              </div>
            </div>

            {/* Enterprise CTA */}
            <button
              className="rounded-lg text-[#1034a6] bg-white text-base py-2 px-7 mt-4 cursor-pointer"
              aria-label="Learn more about Enterprise Suite"
            >
              Learn more
            </button>
          </div>

          {/* Enterprise Image */}
          <div className="w-[45%]">
            <Image
              src={EnterpriseSuiteImage}
              alt="Enterprise Suite - Advanced workforce management tools"
              className="w-full h-full object-cover rounded-r-lg"
            />
          </div>
        </section>

        {/* For Clients Section */}
        <section
          className="w-full rounded-lg relative h-[600px]"
          aria-labelledby="clients-title"
        >
          <Image
            src={ForClientsImage}
            alt="For Clients - Find talent your way on Worklanc"
            className="absolute top-0 left-0 w-full h-full object-cover object-top rounded-lg"
          />

          <div className="absolute top-0 p-8 w-full">
            {/* Clients Header */}
            <header>
              <h2 className="text-white text-2xl font-semibold">For clients</h2>
              <div className="mt-10">
                <h3
                  id="clients-title"
                  className="text-white text-6xl font-semibold"
                >
                  Find talent <br /> your way
                </h3>
                <p className="mt-14 font-semibold text-xl text-white">
                  Work with the largest network of independent <br />{" "}
                  professionals and get things done—from <br /> quick
                  turnarounds to big transformations.
                </p>
              </div>
            </header>

            {/* Client Options */}
            <div
              className="w-full grid grid-cols-3 gap-8 mt-8"
              role="region"
              aria-label="Ways to hire talent"
            >
              <article>
                <Link
                  href="#"
                  className="px-4 py-6 rounded-lg bg-blue-800 transition-all duration-300 ease-in-out cursor-pointer hover:bg-white group block"
                  aria-label="Post a job and hire professional freelancers through Talent Marketplace"
                >
                  <h4 className="text-white text-4xl font-semibold group-hover:text-blue-600">
                    Post a job <br />
                    and hire a pro
                  </h4>
                  <span className="flex items-center gap-2 text-white mt-4 group-hover:text-blue-600">
                    Talent Marketplace
                    <Icon
                      icon="solar:arrow-right-outline"
                      className="group-hover:text-blue-600 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </article>
              <article>
                <Link
                  href="#"
                  className="px-4 py-6 rounded-lg bg-blue-800 transition-all duration-300 ease-in-out cursor-pointer hover:bg-white group block"
                  aria-label="Browse and buy ready-made projects from Project Catalog"
                >
                  <h4 className="text-white text-4xl font-semibold group-hover:text-blue-600">
                    Browse and
                    <br />
                    buy projects
                  </h4>
                  <span className="flex items-center gap-2 text-white mt-4 group-hover:text-blue-600">
                    Project Catalog
                    <Icon
                      icon="solar:arrow-right-outline"
                      className="group-hover:text-blue-600 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </article>
              <article>
                <Link
                  href="#"
                  className="px-4 py-6 rounded-lg bg-blue-800 transition-all duration-300 ease-in-out cursor-pointer hover:bg-white group block"
                  aria-label="Get expert advice through one-on-one consultations"
                >
                  <h4 className="text-white text-4xl font-semibold group-hover:text-blue-600">
                    Get advice from an
                    <br />
                    industry expert
                  </h4>
                  <span className="flex items-center gap-2 text-white mt-4 group-hover:text-blue-600">
                    Consultations
                    <Icon
                      icon="solar:arrow-right-outline"
                      className="group-hover:text-blue-600 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section
          className="w-full relative flex gap-4"
          aria-labelledby="why-choose-title"
        >
          <div className="w-[70%] bg-gray-100 rounded-lg px-8 py-16">
            {/* Why Choose Header */}
            <header>
              <h2 id="why-choose-title" className="text-6xl font-semibold">
                Why businesses
                <br />
                turn to Worklanc
              </h2>
            </header>

            {/* Business Benefits */}
            <div className="w-[70%] flex flex-col items-start gap-8 mt-8">
              {reasonsTurningToUs.map((reason, index) => (
                <article
                  key={index}
                  className="w-full flex flex-row items-start gap-4 overflow-hidden"
                >
                  <Icon
                    icon={reason.icon}
                    color="black"
                    className="w-6 h-6 mt-2"
                    aria-hidden="true"
                  />
                  <div className="w-full">
                    <h3 className="text-3xl font-semibold">{reason.title}</h3>
                    <p className="text-base text-gray-500">
                      {reason.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside
            className="w-[30%] bg-blue-600 rounded-lg relative"
            aria-labelledby="marketplace-stats"
          >
            <div className="absolute bottom-0 left-0 px-10 py-16">
              {/* Marketplace Stats Header */}
              <header>
                <h3
                  id="marketplace-stats"
                  className="text-3xl font-semibold text-white"
                >
                  We're
                  <br />
                  the world's work
                  <br />
                  marketplace
                </h3>
              </header>

              {/* Platform Achievements */}
              <div className="w-full flex flex-col items-start gap-4 mt-8">
                {adus.map((ad, index) => (
                  <article
                    key={index}
                    className="w-full flex flex-row items-start gap-4 overflow-hidden"
                  >
                    <Icon
                      icon={ad.icon}
                      color="white"
                      className="w-6 h-6 mt-2"
                      aria-hidden="true"
                    />
                    <div className="w-full">
                      <h4 className="text-3xl font-semibold text-white">
                        {ad.title}
                      </h4>
                      <p className="text-base text-white">{ad.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* For Talent Section */}
        <section
          className="w-full flex bg-green-600 rounded-lg overflow-hidden"
          aria-labelledby="talent-opportunities-title"
        >
          <Image
            src={FindWorkImage}
            alt="For Talent - Find great work opportunities on Worklanc"
            className="w-1/2 h-auto object-cover"
          />
          <div className="w-1/2 p-8">
            {/* Talent Header */}
            <header>
              <h2 className="text-white text-2xl font-semibold">For talent</h2>
              <div className="mt-8">
                <h3
                  id="talent-opportunities-title"
                  className="text-white text-6xl font-semibold"
                >
                  Find great
                  <br />
                  work
                </h3>
                <p className="text-white text-xl mt-8">
                  Meet clients you're excited to work with and take
                  <br />
                  your career or business to new heights.
                </p>
              </div>
            </header>

            {/* Talent Benefits */}
            <div
              className="w-full h-[1px] bg-white mt-32"
              aria-hidden="true"
            ></div>
            <div
              className="w-full grid grid-cols-3 gap-8 mt-4"
              role="region"
              aria-label="Freelancer benefits"
            >
              <p className="text-white">
                Find opportunities for
                <br />
                every stage of your <br />
                freelance career
              </p>
              <p className="text-white">
                Control when, where, <br />
                and how you work
              </p>
              <p className="text-white">
                Explore different ways
                <br /> to earn
              </p>
            </div>
            <button
              className="mt-10 bg-white py-3 px-7 text-green-600 rounded-lg cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out"
              aria-label="Find freelance opportunities"
            >
              Find opportunities
            </button>
          </div>
        </section>

        {/* Skills Directory Section */}
        <section
          className="w-full flex gap-8"
          aria-labelledby="skills-directory-title"
        >
          <header className="w-1/3 flex flex-col items-start gap-4">
            <h2 id="skills-directory-title" className="sr-only">
              Skills and Services Directory
            </h2>
            {skillCategories.map((skillCategory, index) => (
              <button
                key={index}
                className={`w-full font-semibold text-4xl hover:text-blue-600 ${
                  activeSkillCategoryIndex === index
                    ? "text-blue-600"
                    : "text-gray-300"
                } cursor-pointer text-left`}
                onClick={() => setActiveSkillCategoryIndex(index)}
                aria-label={`View ${skillCategory}`}
                aria-pressed={activeSkillCategoryIndex === index}
              >
                {skillCategory}
              </button>
            ))}
          </header>
          <nav
            className="w-1/3 flex flex-col items-start gap-4"
            aria-label={`${skillCategories[activeSkillCategoryIndex]} - first column`}
          >
            {skills[activeSkillCategoryIndex]
              .slice(0, 16)
              .map((skill, index) => (
                <Link
                  key={index}
                  href={skill.path}
                  className="text-2xl text-gray-500 hover:text-blue-600"
                >
                  {skill.label}
                </Link>
              ))}
          </nav>
          <nav
            className="w-1/3 flex flex-col items-start gap-4"
            aria-label={`${skillCategories[activeSkillCategoryIndex]} - second column`}
          >
            {skills[activeSkillCategoryIndex]
              .slice(16, skills[activeSkillCategoryIndex].length)
              .map((skill, index) => (
                <Link
                  key={index}
                  href={skill.path}
                  className="text-2xl text-gray-500 hover:text-blue-600"
                >
                  {skill.label}
                </Link>
              ))}
          </nav>
        </section>
      </main>
    </IntroLayout>
  );
}

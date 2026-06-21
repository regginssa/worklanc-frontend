import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import {
  Button,
  ExpandableText,
  FreelancerCard,
  LinkDropdown,
  SEO,
} from "@/components/atoms";
import { IntroLayout, NavLayout } from "@/components/layouts";
import { dropdowns, navs } from "@/components/layouts/CatLayout";
import {
  AI_EXPERTS,
  AI_EXPERTS_CARDS,
  AI_EXPERTS_SERVICES,
  CAT_AI_EXPERT_FREELANCER_CATEGORIES,
} from "@/static/data/cat/ai";
import { IExpandableText, TFreelancer, TSEO } from "@/types/components.types";
import { useState } from "react";
import TabBar, { TTabItem } from "@/components/atoms/TabBar";
import {
  AIExpertConnectionMethodsFaq,
  AIExpertHiringBenefitsFaq,
  HiringAIExpertCostIntroFaq,
} from "@/components/layouts/cat/faqs/AIExpertFaqs";
import { getMonthName } from "@/utils/date";

export type TAIExpertCardItem = {
  title: string;
  description: string;
  experts: TFreelancer[];
};

export type TAIExpertService = {
  label: string;
  path: string;
};

export type TAIExpertServiceItem = {
  title: string;
  icon: string;
  items: TAIExpertService[];
};

const AIServices = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const zIndexClasses = ["z-40", "z-30", "z-20", "z-10", "z-5"];

  const now = new Date();

  const tabs: TTabItem[] = [
    { label: "All talent", value: "all_talent" },
    { label: "Custom chatbots", value: "custom_chatbots" },
    { label: "Generative AI writing", value: "generative_ai_writing" },
    { label: "Generative AI art", value: "generative_ai_art" },
    { label: "AI models", value: "ai_models" },
    { label: "Data annotation", value: "data_annotation" },
  ];

  const faqs: IExpandableText[] = [
    {
      title:
        "What is the first step to hiring AI talent and determining the project cost?",
      description:
        "One of the first steps in hiring any talent is to determine what skills you need for your project. For example, if you're integrating AI into your applications, you may need engineers or data scientists. Or, if you're interested in using generative AI technologies to create content, you'll want to explore working with an AI content editor to check AI outputs. Examples of talent you'll find on Worklanc - Freelancer include:",
      children: <HiringAIExpertCostIntroFaq />,
    },
    {
      title: "How can I connect with AI talent on Worklanc - Freelancer?",
      description:
        "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your AI projects. Here's how you can find an expert with the skills you need:",
      children: <AIExpertConnectionMethodsFaq />,
    },
    {
      title:
        "Why should I use Worklanc - Freelancer to hire talent for AI services?",
      description:
        "When it comes to AI, you may need a multidisciplinary team to handle your project. You might need professionals like:",
      children: <AIExpertHiringBenefitsFaq />,
    },
  ];

  const seo: TSEO = {
    title: `Top AI Services & Experts for Hire in ${getMonthName(
      now.getMonth()
    )} ${now.getFullYear()} | Worklanc - Freelancer`,
    description:
      "Hire top-rated AI experts, developers, and creators on Worklanc. From machine learning and chatbot development to generative AI, prompt engineering, and data science—discover professionals who bring artificial intelligence solutions to life. Start your AI project today.",
    keywords:
      "AI freelancers, AI developers, machine learning engineers, ChatGPT specialists, GPT-4 developers, DALL·E artists, Stable Diffusion experts, prompt engineers, OpenAI Codex, generative AI, AI chatbot developers, AI content creators, data scientists, AI engineers, AI services, hire AI experts, Worklanc",
    url: "/cat/ai",
  };

  return (
    <IntroLayout>
      {/* SEO */}
      <SEO {...seo} />

      {/* Navigation Layout */}
      <NavLayout>
        <nav role="navigation" aria-label="AI services categories">
          <ul className="flex flex-row items-center gap-6">
            {navs.map((nav: any, index: number) => (
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
      <main className="w-full mt-[150px] flex flex-col gap-16 py-8">
        {/* Hero Section */}
        <section className="w-full bg-[#181818]" aria-labelledby="hero-title">
          <div className="w-[70%] mx-auto py-10 flex flex-col items-center justify-center gap-8">
            {/* Hero Content */}
            <header className="flex flex-col items-center justify-center gap-4">
              <h1 id="hero-title" className="text-5xl font-semibold text-white">
                WORK, SMARTER.
              </h1>
              <p className="text-base text-white">
                Partner with independent talent on Worklanc - Freelancer to help
                AI work for your business.
              </p>
              <div className="w-2/3">
                <Button
                  type="primary"
                  label="Hire an AI expert"
                  size="medium"
                  width="full"
                />
              </div>
            </header>

            {/* AI Expert Categories */}
            <div
              className="w-full grid grid-cols-3 gap-6"
              role="region"
              aria-label="AI expert categories"
            >
              {AI_EXPERTS_CARDS.map((card, index) => {
                const [isHovered, setIsHovered] = useState(false);

                return (
                  <article key={index}>
                    <motion.button
                      className="relative rounded-xl p-6 bg-white cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out w-full text-left"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      transition={{ duration: 0.3 }}
                      aria-label={`Explore ${card.title} services`}
                    >
                      <h2 className="text-left">{card.title}</h2>
                      <p className="text-sm mt-4 text-left">
                        {card.description}
                      </p>

                      <div className="flex flex-row items-center gap-4 mt-8">
                        {/* Expert Avatars */}
                        <div
                          className="flex"
                          role="group"
                          aria-label={`${card.title} experts`}
                        >
                          {card.experts.map((ex, expertIndex) => (
                            <motion.div
                              key={expertIndex}
                              className={`relative ${zIndexClasses[expertIndex]} w-12 h-12`}
                              animate={{
                                x: isHovered
                                  ? expertIndex * 2
                                  : expertIndex * -8,
                              }}
                              transition={{
                                duration: 0.3,
                                ease: "easeOut",
                                delay: expertIndex * 0.05,
                              }}
                            >
                              <Image
                                src={ex.pic || ""}
                                alt={`${ex.name} - AI expert`}
                                className="border rounded-full ring-2 ring-white ring-opacity-50 object-cover"
                                fill
                              />
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          animate={{ y: isHovered ? 4 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <Icon
                            icon="solar:arrow-down-linear"
                            className="text-blue-600 w-6 h-6"
                            aria-hidden="true"
                          />
                        </motion.div>
                      </div>
                    </motion.button>
                  </article>
                );
              })}
            </div>

            {/* Talent Navigation */}
            <aside
              className="flex items-center gap-1 w-full text-left"
              aria-label="For talent"
            >
              <p className="text-white">FOR TALENT :</p>
              <Link
                href="#"
                className="text-blue-500 underline"
                aria-label="Find AI jobs and develop your skills"
              >
                Find AI jobs and hone your skills
              </Link>
              <Icon
                icon="solar:arrow-right-linear"
                className="w-5 h-5 text-blue-500"
                aria-hidden="true"
              />
            </aside>
          </div>
        </section>

        {/* AI Business Transformation Section */}
        <section
          className="w-[70%] mx-auto"
          aria-labelledby="transformation-title"
        >
          {/* Section Header */}
          <header className="w-3/5">
            <h2
              id="transformation-title"
              className="text-4xl font-semibold text-[#0e183d]"
            >
              Explore how AI can transform your business
            </h2>
            <p className="mt-4">
              Book a paid 1-on-1 consultation with an expert. They can help you
              create a plan for how AI fits into your innovation strategy.{" "}
              <Link href="#" className="text-blue-600 underline">
                See all consultants
              </Link>
            </p>
          </header>

          {/* AI Consultants */}
          <div
            className="w-full grid grid-cols-4 gap-6 mt-6"
            role="region"
            aria-label="Featured AI consultants"
          >
            {AI_EXPERTS.slice(0, 4).map((expert, index) => (
              <FreelancerCard
                key={index}
                freelancer={expert}
                type="CONSULTANT"
              />
            ))}
          </div>

          <div className="w-full flex items-center justify-center mt-6">
            <Button type="primary" label="Hire an AI expert" size="medium" />
          </div>
        </section>

        {/* Talent Hiring Section */}
        <section
          className="w-[70%] mx-auto"
          aria-labelledby="talent-hiring-title"
        >
          {/* Section Header */}
          <header className="w-3/5">
            <h2
              id="talent-hiring-title"
              className="text-4xl font-semibold text-[#0e183d]"
            >
              Hire the right talent for your project
            </h2>
            <p className="mt-4">
              Find a pro with the skills and experience you need. Sign up to
              invite them to a job, then start a contract on Worklanc -
              Freelancer when you've figured out the details.{" "}
              <Link href="#" className="text-blue-600 underline">
                See all talent
              </Link>
            </p>
          </header>

          {/* Talent Categories and Listings */}
          <div className="w-full mt-6">
            <TabBar
              tabs={tabs}
              selectedTabIndex={selectedTabIndex}
              onTab={setSelectedTabIndex}
            />
            <div
              className="w-full grid grid-cols-4 gap-6 mt-8"
              role="region"
              aria-label="Available AI talent"
            >
              {AI_EXPERTS.slice(0, 4).map((expert, index) => (
                <FreelancerCard
                  key={index}
                  freelancer={expert}
                  type="CONSULTANT"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="w-[70%] mx-auto" aria-labelledby="stats-title">
          <h2 id="stats-title" className="sr-only">
            AI Talent Statistics
          </h2>
          {/* Statistics Display */}
          <div
            className="w-full flex flex-row items-center justify-between mt-16 gap-10"
            role="region"
            aria-label="Platform statistics"
          >
            {/* Average Rating */}
            <div>
              <div className="flex items-center gap-2">
                <Icon
                  icon="mynaui:star-solid"
                  className="w-8 h-8 text-yellow-500"
                  aria-hidden="true"
                />
                <span className="text-4xl font-semibold text-[#0e183d]">
                  4.8
                </span>
              </div>
              <p className="mt-2 text-[#0e183d]">
                Average rating for work with AI talent
              </p>
            </div>

            {/* Contracts */}
            <div className="px-6 border-l-[1px] border-gray-300">
              <span className="text-4xl font-semibold text-[#0e183d]">
                20K+ contracts
              </span>
              <p className="mt-2 text-[#0e183d]">
                Involving AI work in the last year
              </p>
            </div>

            {/* Skills */}
            <div className="px-6 border-l-[1px] border-gray-300">
              <span className="text-4xl font-semibold text-[#0e183d]">
                250+ skills
              </span>
              <p className="mt-2 text-[#0e183d]">
                Represented by talent on Worklanc - Freelancer
              </p>
            </div>
          </div>
        </section>

        {/* AI Services Directory */}
        <section
          className="w-[70%] mx-auto"
          aria-labelledby="services-directory-title"
        >
          {/* Section Header */}
          <header className="w-3/5">
            <h2
              id="services-directory-title"
              className="text-4xl font-semibold text-[#0e183d]"
            >
              All the AI talent you could ever want
            </h2>
          </header>

          {/* Services Grid */}
          <div
            className="w-full grid grid-cols-3 gap-8 mt-6"
            role="region"
            aria-label="AI service categories"
          >
            {AI_EXPERTS_SERVICES.map((service, index) => (
              <article
                key={index}
                className="bg-[#181818] w-full px-6 py-8 rounded-xl"
              >
                {/* Service Icon */}
                <span
                  className="p-2 bg-gradient-to-tr from-[#ce89ca] via-[#5885bf] to-[#75eea3] inline-block rounded-lg"
                  aria-hidden="true"
                >
                  <Icon icon={service.icon} className="w-8 h-8" />
                </span>

                {/* Service Title */}
                <h3 className="text-2xl text-white mt-4">{service.title}</h3>

                {/* Service Links */}
                <nav
                  className="w-full flex flex-col items-start gap-1 mt-6"
                  aria-label={`${service.title} services`}
                >
                  <ul className="w-full flex flex-col items-start gap-1">
                    {service.items.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.path}
                          className="text-base text-white underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </article>
            ))}
          </div>
        </section>

        {/* Hiring Process Guide */}
        <section
          className="w-[70%] mx-auto"
          aria-labelledby="hiring-guide-title"
        >
          {/* Section Header */}
          <header className="w-2/3">
            <h2
              id="hiring-guide-title"
              className="text-4xl font-semibold text-[#0e183d]"
            >
              How to hire an AI professional on
              <br />
              Worklanc - Freelancer
            </h2>
          </header>

          {/* Process Steps */}
          <div className="w-full flex items-center mt-8">
            {/* Steps List */}
            <div
              className="w-1/2 flex flex-col items-start gap-8"
              role="list"
              aria-label="Hiring process steps"
            >
              {/* Step 1: Explore */}
              <div
                className="w-full flex flex-row items-start gap-4 overflow-hidden"
                role="listitem"
              >
                <Icon
                  icon="hugeicons:search-01"
                  className="w-7 h-7 mt-1"
                  aria-hidden="true"
                />
                <div className="w-full">
                  <h3 className="text-2xl">Explore</h3>
                  <p className="text-base mt-1">
                    See what services are offered by professionals to help
                    achieve your goal.
                  </p>
                </div>
              </div>

              {/* Step 2: Find */}
              <div
                className="w-full flex flex-row items-start gap-4 overflow-hidden"
                role="listitem"
              >
                <Icon
                  icon="hugeicons:computer-video-call"
                  className="w-7 h-7 mt-1"
                  aria-hidden="true"
                />
                <div className="w-full">
                  <h3 className="text-2xl">Find</h3>
                  <p className="text-base mt-1">
                    Book a consultation or send an invite with your project
                    details. If you haven't found a pro yet, post a job to
                    expand your search.
                  </p>
                </div>
              </div>

              {/* Step 3: Connect */}
              <div
                className="w-full flex flex-row items-start gap-4 overflow-hidden"
                role="listitem"
              >
                <Icon
                  icon="hugeicons:message-multiple-01"
                  className="w-7 h-7 mt-1"
                  aria-hidden="true"
                />
                <div className="w-full">
                  <h3 className="text-2xl">Connect</h3>
                  <p className="text-base mt-1">
                    Talk about your project goals, deliverables, and budget.
                  </p>
                </div>
              </div>

              {/* Step 4: Hire */}
              <div
                className="w-full flex flex-row items-start gap-4 overflow-hidden"
                role="listitem"
              >
                <Icon
                  icon="hugeicons:task-edit-01"
                  className="w-7 h-7 mt-1"
                  aria-hidden="true"
                />
                <div className="w-full">
                  <h3 className="text-2xl">Hire</h3>
                  <p className="text-base mt-1">
                    Start a new contract with the details you discussed.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2" aria-hidden="true"></div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className="w-[70%] mx-auto flex gap-10 mt-14 bg-[#f9f9f9] rounded-2xl p-10"
          aria-labelledby="faq-title"
        >
          {/* FAQ Header */}
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
          </div>
        </section>

        {/* AI Skills Directory */}
        <section
          className="w-[70%] mx-auto mt-14"
          aria-labelledby="skills-directory-title"
        >
          {/* Section Header */}
          <header className="w-2/3">
            <h2
              id="skills-directory-title"
              className="text-4xl font-semibold text-[#0e183d]"
            >
              Find trusted talent with the AI skills you need
            </h2>
          </header>

          {/* Skills Categories */}
          <div role="region" aria-labelledby="skills-directory-title">
            {CAT_AI_EXPERT_FREELANCER_CATEGORIES.map((cat, index) => (
              <article key={index} className="w-full mt-10">
                <h3 className="text-3xl font-semibold text-[#0e183d]">
                  {cat.title}
                </h3>
                <nav
                  className="w-full grid grid-cols-4 gap-4 mt-6"
                  aria-label={`${cat.title} skills`}
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
      </main>
    </IntroLayout>
  );
};

export default AIServices;

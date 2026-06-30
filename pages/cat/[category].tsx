import { CatLayout } from "@/components/layouts";
import { useRouter } from "next/router";
import type {
  TCatLayoutExpert,
  TCatLayoutFreelancerCategory,
  TCatLayoutIntro,
  TCatLayoutProfessionals,
  TCatLayoutProjectOverview,
  TCatLayoutService,
} from "@/components/layouts/cat";

// Intro Images
import DevIntroImage from "@/public/assets/webps/cat/dev-it/intro.webp";
import DesignCreativeIntroImage from "@/public/assets/webps/cat/design-creative/intro.webp";
import SalesAndMarketingIntroImage from "@/public/assets/webps/cat/sale-and-marketing/intro.webp";
import AdminCustomerSupportIntroImage from "@/public/assets/webps/cat/admin-customer-support/intro.webp";
import WritingTranslationIntroImage from "@/public/assets/webps/cat/writing-translation/intro.webp";
import FinanceAccountingIntroImage from "@/public/assets/webps/cat/finance-accounting/intro.webp";
import HrTrainingIntroImage from "@/public/assets/webps/cat/hr-training/intro.webp";
import LegalIntroImage from "@/public/assets/webps/cat/legal/intro.webp";
import EngineeringArchitectureIntroImage from "@/public/assets/webps/cat/engineering-architecture/intro.webp";

import {
  CAT_DEVELOPER_SERVICES,
  CAT_DEVELOPERS,
  CAT_DEVELOPER_PROJECT_OVERVIEW_SKILLS,
  CAT_DEVELOPER_FREELANCER_CATEGORIES,
} from "@/static/data/cat/dev-it";
import {
  CAT_DESIGN_FREELANCER_CATEGORIES,
  CAT_DESIGN_PROJECT_OVERVIEW_SKILLS,
  CAT_DESIGNE_SERVICES,
  CAT_DESIGNERS,
} from "@/static/data/cat/design-creative";

// Project Overview Images
import DevProjectOverviewImage from "@/public/assets/jpgs/cat/dev-it/dev_project_overview.jpg";
import DesignProjectOverviewImage from "@/public/assets/pngs/cat/design-creative/project_overview.png";
import SalesAndMarketingProjectOverviewImage from "@/public/assets/jpgs/cat/sales-and-marketing/project_overview.jpg";
import AdminCustomerSupportProjectOverviewImage from "@/public/assets/jpgs/cat/admin-customer-support/project_overview.jpg";
import WritingTranslationProjectOverviewImage from "@/public/assets/pngs/cat/writing-translation/project_overview.png";
import FinanceAccountingProjectOverviewImage from "@/public/assets/pngs/cat/finance-accounting/project_overview.png";
import HrTrainingProjectOverviewImage from "@/public/assets/jpgs/cat/hr-training/project_overview.jpg";
import LegalProjectOverviewImage from "@/public/assets/jpgs/cat/legal/project_overview.jpg";
import EngineeringArchitectureProjectOverviewImage from "@/public/assets/jpgs/cat/engineering-architecture/project_overview.jpeg";

import { IExpandableText, TSEO } from "@/types/components.types";
import {
  DevConnectionMethodsFaq,
  DevHiringBenefitsFaq,
  HiringDevCostIntroFaq,
} from "@/components/layouts/cat/faqs/DeveloperFaqs";
import {
  DesignCreativeConnectionMethodsFaq,
  DesignCreativeHiringBenefitsFaq,
  HiringDesignCostIntroFaq,
} from "@/components/layouts/cat/faqs/DesignCreativeFaqs";
import { getMonthName } from "@/utils/date";
import {
  CAT_SALES_AND_MARKETING_EXPERTS_CATEGORIES,
  CAT_SALES_AND_MARKETING_FREELANCER_CATEGORIES,
  CAT_SALES_AND_MARKETING_PROJECT_OVERVIEW_SKILLS,
  CAT_SALES_AND_MARKETING_SERVICES,
} from "@/static/data/cat/sales-and-marketing";
import {
  HiringSalesMarketingCostIntroFaq,
  SalesMarketingConnectionMethodsFaq,
  SalesMarketingHiringBenefitsFaq,
} from "@/components/layouts/cat/faqs/SalesMarketingFaqs";
import {
  CAT_ADMIN_CUSTOMER_SUPPORT_EXPERTS_CATEGORIES,
  CAT_ADMIN_CUSTOMER_SUPPORT_FREELANCER_CATEGORIES,
  CAT_ADMIN_CUSTOMER_SUPPORT_PROFESSIONALS,
  CAT_ADMIN_CUSTOMER_SUPPORT_PROJECT_OVERVIEW_SKILLS,
  CAT_ADMIN_CUSTOMER_SUPPORT_SERVICES,
} from "@/static/data/cat/admin-customer-support";
import {
  AdminCustomerSupportConnectionMethodsFaq,
  AdminCustomerSupportHiringBenefitsFaq,
  HiringAdminCustomerSupportCostIntroFaq,
} from "@/components/layouts/cat/faqs/AdminCustomerSupportFaqs";
import {
  CAT_WRITING_TRANSLATION_EXPERTS_CATEGORIES,
  CAT_WRITING_TRANSLATION_FREELANCER_CATEGORIES,
  CAT_WRITING_TRANSLATION_PROJECT_OVERVIEW_SKILLS,
  CAT_WRITING_TRANSLATION_SERVICES,
} from "@/static/data/cat/writing-translation";
import {
  HiringWritingTranslationCostIntroFaq,
  WritingTranslationConnectionMethodsFaq,
  WritingTranslationHiringBenefitsFaq,
} from "@/components/layouts/cat/faqs/WritingTranslationFaqs";
import {
  CAT_FINANCE_ACCOUNTING_EXPERTS_CATEGORIES,
  CAT_FINANCE_ACCOUNTING_FREELANCER_CATEGORIES,
  CAT_FINANCE_ACCOUNTING_PROJECT_OVERVIEW_SKILLS,
  CAT_FINANCE_ACCOUNTING_SERVICES,
} from "@/static/data/cat/finance-accounting";
import {
  CAT_HR_TRAINING_EXPERTS_CATEGORIES,
  CAT_HR_TRAINING_FREELANCER_CATEGORIES,
  CAT_HR_TRAINING_PROJECT_OVERVIEW_SKILLS,
  CAT_HR_TRAINING_SERVICES,
} from "@/static/data/cat/hr-training";
import {
  HiringHrTrainingCostIntroFaq,
  HrTrainingConnectionMethodsFaq,
  HrTrainingHiringBenefitsFaq,
} from "@/components/layouts/cat/faqs/HrTrainingFaqs";
import {
  CAT_LEGAL_EXPERTS_CATEGORIES,
  CAT_LEGAL_FREELANCER_CATEGORIES,
  CAT_LEGAL_PROJECT_OVERVIEW_SKILLS,
  CAT_LEGAL_SERVICES,
} from "@/static/data/cat/legal";
import {
  HiringLegalCostIntroFaq,
  LegalConnectionMethodsFaq,
  LegalHiringBenefitsFaq,
} from "@/components/layouts/cat/faqs/LegalFaqs";
import {
  CAT_ENGINEERING_ARCHITECTURE_EXPERTS_CATEGORIES,
  CAT_ENGINEERING_ARCHITECTURE_FREELANCER_CATEGORIES,
  CAT_ENGINEERING_ARCHITECTURE_PROJECT_OVERVIEW_SKILLS,
  CAT_ENGINEERING_ARCHITECTURE_SERVICES,
} from "@/static/data/cat/engineering-architecture";
import {
  EngineeringArchitectureConnectionMethodsFaq,
  EngineeringArchitectureHiringBenefitsFaq,
  HiringEngineeringArchitectureCostIntroFaq,
} from "@/components/layouts/cat/faqs/EngineeringArchitectureFaqs";

const Category = () => {
  const router = useRouter();
  const { category } = router.query;

  const now = new Date();

  if (!category && typeof category !== "string") {
    <div>Page Not Found</div>;
  }

  const getIntro = (): TCatLayoutIntro | null => {
    switch (category) {
      case "dev-it":
        return {
          title: "Dev and IT experts to scale your org",
          description:
            "Hire independent professionals to shorten development cycles, bury backlogs, and drive product growth.",
          image: DevIntroImage,
        };

      case "design-creative":
        return {
          title: "Hire freelance design and creative experts to help you scale",
          description:
            "Thousands of pros ready to kick-start your creative overhaul from day one.",
          image: DesignCreativeIntroImage,
        };

      case "sales-and-marketing":
        return {
          title: "Scale when you need to with marketing and sales experts",
          description:
            "Build some buzz around your business with professionals from the world’s work marketplace.",
          image: SalesAndMarketingIntroImage,
        };

      case "admin-customer-support":
        return {
          title: "Exceptional customer service creates happy customers",
          description:
            "Work with Worklanc - Freelancer to manage your organization’s customer service needs big or small.",
          image: AdminCustomerSupportIntroImage,
        };

      case "writing-translation":
        return {
          title: "Hire freelance writing and translation experts in moments",
          description:
            "Thousands of pros are ready to finesse your language and help you go global.",
          image: WritingTranslationIntroImage,
        };

      case "finance-accounting":
        return {
          title: "Adapt fast with freelance finance and accounting experts",
          description:
            "Thousands of pros are ready to help with invoicing, tax returns, bookkeeping, and more.",
          image: FinanceAccountingIntroImage,
        };

      case "hr-training":
        return {
          title: "Help your team thrive with HR and training experts",
          description:
            "Hundreds of independent professionals who’ll give your people the experience they deserve, and keep your organization running smoothly.",
          image: HrTrainingIntroImage,
        };

      case "legal":
        return {
          title: "Find legal experts to give you the guidance you need",
          description:
            "Hundreds of independent professionals to help you create, navigate, and translate legal documents; register a trademark; or get general advice.",
          image: LegalIntroImage,
        };

      case "engineering-architecture":
        return {
          title: "Scale up fast with engineering and architecture experts",
          description:
            "Hundreds of independent professionals who’ll design everything from floor plans to landscapes to interiors.",
          image: EngineeringArchitectureIntroImage,
        };

      default:
        return null;
    }
  };

  const getExpert = (): TCatLayoutExpert | null => {
    switch (category) {
      case "dev-it":
        return {
          title: "Trusted remote development and IT experts",
          categories: CAT_DEVELOPERS,
          rate: {
            value: "4.91",
            label: "Average rating for work with tech talent",
          },
          contracts: {
            value: "211",
            label: "Involving development and IT work in the past year",
          },
          skills: {
            value: "1,665",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      case "design-creative":
        return {
          title: "Specialized design and creative experts you can count on",
          categories: CAT_DESIGNERS,
          rate: {
            value: "4.92",
            label: "Average rating for work with design and creative talent",
          },
          contracts: {
            value: "184",
            label: "Involving design and creative work in the past year",
          },
          skills: {
            value: "468",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      case "sales-and-marketing":
        return {
          title:
            "Specialized sales experts and marketing professionals you can count on",
          categories: CAT_SALES_AND_MARKETING_EXPERTS_CATEGORIES,
          rate: {
            value: "4.78",
            label:
              "Average client rating for work with sales and marketing talent",
          },
          contracts: {
            value: "65",
            label: "Involving sales and marketing work in the past year",
          },
          skills: {
            value: "358",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      case "admin-customer-support":
        return {
          title:
            "Specialized admin and customer support professionals you can count on",
          categories: CAT_ADMIN_CUSTOMER_SUPPORT_EXPERTS_CATEGORIES,
          rate: {
            value: "4.87",
            label:
              "Average rating for work with admin and customer support talent",
          },
          contracts: {
            value: "60",
            label: "Involving admin and customer support work in the past year",
          },
          skills: {
            value: "332",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      case "writing-translation":
        return {
          title:
            "Specialized writing experts and translation professionals you can count on",
          categories: CAT_WRITING_TRANSLATION_EXPERTS_CATEGORIES,
          rate: {
            value: "4.86",
            label:
              "Average rating for work with writing and translation talent",
          },
          contracts: {
            value: "146",
            label: "Involving writing and translation work in the past year",
          },
          skills: {
            value: "331",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      case "finance-accounting":
        return {
          title: "Specialized accounting and finance experts you can count on",
          categories: CAT_FINANCE_ACCOUNTING_EXPERTS_CATEGORIES,
          rate: {
            value: "4.87",
            label: "Average rating for work with finance and accounting talent",
          },
          contracts: {
            value: "9.7",
            label: "Involving finance and accounting work in the past year",
          },
          skills: {
            value: "102",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      case "hr-training":
        return {
          title: "Specialized HR and training experts you can count on",
          categories: CAT_HR_TRAINING_EXPERTS_CATEGORIES,
          rate: {
            value: "4.9",
            label: "Average rating for work with HR professionals",
          },
          contracts: {
            value: "1,900",
            label: "Involving HR & training work in the last year",
          },
          skills: {
            value: "105",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      case "legal":
        return {
          title: "Specialized legal experts you can count on",
          categories: CAT_LEGAL_EXPERTS_CATEGORIES,
          rate: {
            value: "4.94",
            label: "Average rating for work with legal professionals",
          },
          contracts: {
            value: "7,700",
            label: "Involving legal work in the last year",
          },
          skills: {
            value: "136",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      case "engineering-architecture":
        return {
          title:
            "Specialized engineering and architecture experts you can count on",
          categories: CAT_ENGINEERING_ARCHITECTURE_EXPERTS_CATEGORIES,
          rate: {
            value: "4.9",
            label:
              "Average rating for work with engineering and architecture talent.",
          },
          contracts: {
            value: "34,500",
            label:
              "Involving engineering and architecture work in the last year",
          },
          skills: {
            value: "670",
            label: "Represented by talent on Worklanc - Freelancer",
          },
        };

      default:
        return null;
    }
  };

  const getServices = (): TCatLayoutService | null => {
    switch (category) {
      case "dev-it":
        return {
          title: "Development and IT projects for your most pressing work",
          items: CAT_DEVELOPER_SERVICES,
        };

      case "design-creative":
        return {
          title: "Design and creative projects for your most pressing work",
          items: CAT_DESIGNE_SERVICES,
        };

      case "sales-and-marketing":
        return {
          title: "Sales and marketing projects for your most pressing work",
          items: CAT_SALES_AND_MARKETING_SERVICES,
        };

      case "admin-customer-support":
        return {
          title:
            "Admin and customer support projects for your most pressing work",
          items: CAT_ADMIN_CUSTOMER_SUPPORT_SERVICES,
        };

      case "writing-translation":
        return {
          title: "Writing and translation projects for your most pressing work",
          items: CAT_WRITING_TRANSLATION_SERVICES,
        };

      case "finance-accounting":
        return {
          title: "Finance and accounting projects for your most pressing work",
          items: CAT_FINANCE_ACCOUNTING_SERVICES,
        };

      case "hr-training":
        return {
          title: "Get the job done fast with HR and training projects",
          items: CAT_HR_TRAINING_SERVICES,
        };

      case "legal":
        return {
          title: "Legal projects to help you get what you need, fast",
          items: CAT_LEGAL_SERVICES,
        };

      case "engineering-architecture":
        return {
          title: "Get your engineering and architecture projects done",
          items: CAT_ENGINEERING_ARCHITECTURE_SERVICES,
        };

      default:
        return null;
    }
  };

  const getProjectOverview = (): TCatLayoutProjectOverview | null => {
    switch (category) {
      case "dev-it":
        return {
          title: "Dev expertise at your fingertips",
          description:
            "An iOS/Android developer saved his client money, time, and stress",
          message:
            "Igor has great knowledge in mobile application development [and] always suggests a better and cost-effective solution. Superfast turnaround. Thank you Igor!",
          rate: 5,
          budget: 14520,
          skills: CAT_DEVELOPER_PROJECT_OVERVIEW_SKILLS,
          image: DevProjectOverviewImage,
        };

      case "design-creative":
        return {
          title: "The brand book your creatives need",
          description:
            "A graphic designer quickly created a robust brand guide for visual identity",
          message:
            "Working with Kostadin is incredible and I value him as an important member of my digital team.",
          rate: 5,
          budget: 4637,
          skills: CAT_DESIGN_PROJECT_OVERVIEW_SKILLS,
          image: DesignProjectOverviewImage,
        };

      case "sales-and-marketing":
        return {
          title: "How Worklanc - Freelancer works for clients",
          description:
            "A graphic design pro creates a logo, branding, and style guide",
          message:
            "If you have an opportunity to hire Felice, don't delay! He has great ideas, but is open to feedback and changes. He was always well prepared, kept me informed, met his timelines, and delivered what he said and more. My best experience on Worklanc - Freelancer. In fact, I've started up another project with him and am still working with him.",
          rate: 5,
          budget: 4637,
          skills: CAT_SALES_AND_MARKETING_PROJECT_OVERVIEW_SKILLS,
          image: SalesAndMarketingProjectOverviewImage,
        };

      case "admin-customer-support":
        return {
          title: "Project managers who make it look easy",
          description:
            "A project management pro aced a massive rebranding project",
          message:
            "Elham was exceptional in every way. Her project management is a 10 out of 10. Her communication is the same. She managed a highly complex project and made it look easy and it was not. She always had a positive attitude and kept her cool even during highly stressful periods in the project. Her team loved her. The project was on-time, on-budget and very profitable!",
          rate: 5,
          budget: 36000,
          skills: CAT_ADMIN_CUSTOMER_SUPPORT_PROJECT_OVERVIEW_SKILLS,
          image: AdminCustomerSupportProjectOverviewImage,
        };

      case "writing-translation":
        return {
          title: "Translation that connects cultures",
          description:
            "A translator works her way up to community support lead",
          message:
            "Angelica is a very professional translator and is committed to successfully delivering quality work. After working for us as a Latin Spanish translator for over a year, she is now leading our community support in Latin America. It's always a pleasure to work with her and I can strongly recommend Angelica.",
          rate: 5,
          budget: 6426,
          skills: CAT_WRITING_TRANSLATION_PROJECT_OVERVIEW_SKILLS,
          image: WritingTranslationProjectOverviewImage,
        };

      case "finance-accounting":
        return {
          title: "Financial analysis that shapes strategy",
          description:
            "A financial analyst tackles the details in SaaS financial modeling",
          message:
            "I really enjoyed working with Henry on two projects. He is very committed to the deadlines, excellent communicator, and detail oriented.",
          rate: 5,
          budget: 3850,
          skills: CAT_FINANCE_ACCOUNTING_PROJECT_OVERVIEW_SKILLS,
          image: FinanceAccountingProjectOverviewImage,
        };

      case "hr-training":
        return {
          title: "HR pros that help your organization thrive",
          description:
            "A human resources expert helped a small business get their process up and running",
          message:
            "Lindsey was a pleasure to work with! He was super helpful and very thorough in her work. Her guidance allowed us to be more confident in our new processes and tools.",
          rate: 5,
          budget: 1700,
          skills: CAT_HR_TRAINING_PROJECT_OVERVIEW_SKILLS,
          image: HrTrainingProjectOverviewImage,
        };

      case "legal":
        return {
          title: "Lawyers with deep expertise",
          description:
            "A small business lawyer enabled a quick valuation and exit of an LLC partner",
          message:
            "Ben was prompt and clear in communication. He helped to draft a few business legal documents with haste and modifications were quickly executed as well. Highly recommended to all.",
          rate: 5,
          budget: 2062,
          skills: CAT_LEGAL_PROJECT_OVERVIEW_SKILLS,
          image: LegalProjectOverviewImage,
        };

      case "engineering-architecture":
        return {
          title: "3D Modeling that brings your vision to life",
          description:
            "An architect leveraged Autodesk 3ds Max to model a client’s house",
          message:
            "Alaa is simply the best when it comes to 3D projects, most of all he is very reliable and has great communication.",
          rate: 5,
          budget: 3699,
          skills: CAT_ENGINEERING_ARCHITECTURE_PROJECT_OVERVIEW_SKILLS,
          image: EngineeringArchitectureProjectOverviewImage,
        };

      default:
        return null;
    }
  };

  const getProfessionals = (): TCatLayoutProfessionals | null => {
    switch (category) {
      case "admin-customer-support":
        return {
          title:
            "Professionals on Worklanc - Freelancer help the world’s best companies with customer service needs.",
          professionals: CAT_ADMIN_CUSTOMER_SUPPORT_PROFESSIONALS,
        };
      default:
        return null;
    }
  };

  const getFaqs = (): IExpandableText[] | null => {
    switch (category) {
      case "dev-it":
        return [
          {
            title:
              "What is the first step to hiring development and IT talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. Worklanc - Freelancer matches you with proven remote talent who can help you with all your development and IT needs, including:",
            children: <HiringDevCostIntroFaq />,
          },
          {
            title:
              "What are the various ways I can connect with development and IT talent through Worklanc - Freelancer?",
            description:
              "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your development and IT projects.",
            children: <DevConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for development and IT services?",
            description:
              "When it comes to development and IT, you may need a multidisciplinary team to handle the various components of your project. Examples of professionals you might need for development and IT projects include:",
            children: <DevHiringBenefitsFaq />,
          },
        ];

      case "design-creative":
        return [
          {
            title:
              "What is the first step to hiring design and creative talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. You know you need help with design and creative, but what specific things are you trying to do? Worklanc - Freelancer matches you with proven remote talent who can help you with all your design and creative needs, including: ",
            children: <HiringDesignCostIntroFaq />,
          },
          {
            title:
              "What are the various ways I can connect with design and creative talent through Worklanc - Freelancer?",
            description:
              "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your design and creative services projects.",
            children: <DesignCreativeConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for design and creative services?",
            description:
              "When it comes to development and IT, you may need a multidisciplinary team to handle the various components of your project. Examples of professionals you might need for development and IT projects include:",
            children: <DesignCreativeHiringBenefitsFaq />,
          },
        ];

      case "sales-and-marketing":
        return [
          {
            title:
              "What is the first step to hiring sales and marketing talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. You know you need help with sales and marketing, but what specific things are you trying to do? Worklanc - Freelancer matches you with proven remote talent who can help you with all your sales and marketing needs, including:",
            children: <HiringSalesMarketingCostIntroFaq />,
          },
          {
            title:
              "What are the various ways I can connect with sales and marketing talent through Worklanc - Freelancer?",
            description:
              "If you need help finding talent for your marketing project, Worklanc - Freelancer gives you the flexibility you need to succeed.",
            children: <SalesMarketingConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for sales and marketing services?",
            description:
              "When it comes to sales and marketing, you may need a multidisciplinary team of talent to handle the various components of your project. Examples of professionals you might need for a sales and marketing projects include:",
            children: <SalesMarketingHiringBenefitsFaq />,
          },
        ];

      case "admin-customer-support":
        return [
          {
            title:
              "What is the first step to hiring admin and customer support talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. You know you need help with admin and customer support, but what specific things are you trying to do? Worklanc - Freelancer matches you with proven remote talent who can help you with all your admin and customer support needs, including:",
            children: <HiringAdminCustomerSupportCostIntroFaq />,
          },
          {
            title:
              "What are the various ways I can connect with admin and customer support talent through Worklanc - Freelancer?",
            description:
              "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your admin and customer support projects.",
            children: <AdminCustomerSupportConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for admin and customer support services?",
            description:
              "When it comes to admin and customer support, you may need a multidisciplinary team to handle the various components of your project. Examples of professionals you might need for admin and customer support projects include:",
            children: <AdminCustomerSupportHiringBenefitsFaq />,
          },
        ];

      case "writing-translation":
        return [
          {
            title:
              "What is the first step to hiring writing and translation talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. You know you need help with writing and translation, but what specific things are you trying to do? Worklanc - Freelancer matches you with proven remote talent who can help you with all your writing and translation needs, including:",
            children: <HiringWritingTranslationCostIntroFaq />,
          },
          {
            title:
              "What are the various ways you can connect with writing and translation talent through Worklanc - Freelancer?",
            description:
              "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your writing and translation projects.",
            children: <WritingTranslationConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for writing and translation services?",
            description:
              "When it comes to writing and translation, you may need a multidisciplinary team of talent to handle the various components of your project. Examples of professionals you might need for writing and translation projects include:",
            children: <WritingTranslationHiringBenefitsFaq />,
          },
        ];

      case "finance-accounting":
        return [
          {
            title:
              "What is the first step to hiring finance and accounting talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. You know you need help with finance and accounting, but what specific things are you trying to do? Worklanc - Freelancer matches you with proven remote talent who can help you with all your finance and accounting needs, including:",
            children: <HiringWritingTranslationCostIntroFaq />,
          },
          {
            title:
              "What are the various ways I can connect with finance and accounting talent through Worklanc - Freelancer?",
            description:
              "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your finance and accounting projects.",
            children: <WritingTranslationConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for finance and accounting services?",
            description:
              "When it comes to finance and accounting, you may need a multidisciplinary team of talent to handle the various components of your project. Examples of professionals you might need for finance and accounting projects include:",
            children: <WritingTranslationHiringBenefitsFaq />,
          },
        ];

      case "hr-training":
        return [
          {
            title:
              "What is the first step to hiring HR talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. You know you need help with human resources, but what specific things are you trying to do? Worklanc - Freelancer matches you with proven remote talent who can help you with all your needs, including:",
            children: <HiringHrTrainingCostIntroFaq />,
          },
          {
            title:
              "What are the various ways I can connect with HR talent through Worklanc - Freelancer?",
            description:
              "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your projects.",
            children: <HrTrainingConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for HR services?",
            description:
              "When it comes to human resources, you may need a multidisciplinary team to handle the various components of your project. Examples of HR experts you might need for projects include:",
            children: <HrTrainingHiringBenefitsFaq />,
          },
        ];

      case "legal":
        return [
          {
            title:
              "What is the first step to hiring legal talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. You know you need help with legal, but what specific things are you trying to do? Worklanc - Freelancer matches you with proven remote talent who can help you with all your needs, including:",
            children: <HiringLegalCostIntroFaq />,
          },
          {
            title:
              "What are the various ways I can connect with legal talent through Worklanc - Freelancer?",
            description:
              "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your projects.",
            children: <LegalConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for legal services?",
            description:
              "When it comes to legal, you may need a multidisciplinary team to handle the various components of your project. Examples of legal professionals you might need for projects include:",
            children: <LegalHiringBenefitsFaq />,
          },
        ];

      case "engineering-architecture":
        return [
          {
            title:
              "What is the first step to hiring engineering and architecture talent and determining the project cost?",
            description:
              "One of the first steps in hiring any talent is to determine which skills you need for your project. You know you need help with engineering and architecture, but what specific things are you trying to do? Worklanc - Freelancer matches you with proven remote talent who can help you with all your needs, including:",
            children: <HiringEngineeringArchitectureCostIntroFaq />,
          },
          {
            title:
              "What are the various ways I can connect with engineering and architecture talent through Worklanc - Freelancer?",
            description:
              "Worklanc - Freelancer gives you the flexibility you need to find the right talent for your projects.",
            children: <EngineeringArchitectureConnectionMethodsFaq />,
          },
          {
            title:
              "Why should I use Worklanc - Freelancer to find talent for engineering and architecture services?",
            description:
              "When it comes to engineering and architecture, you may need a multidisciplinary team to handle the various components of your project. Examples of professionals you might need for engineering and architecture projects include:",
            children: <EngineeringArchitectureHiringBenefitsFaq />,
          },
        ];

      default:
        return null;
    }
  };

  const getFreelancerCategory = (): TCatLayoutFreelancerCategory | null => {
    switch (category) {
      case "dev-it":
        return {
          title: "Find freelancers with the dev and IT skills you need",
          categories: CAT_DEVELOPER_FREELANCER_CATEGORIES,
        };

      case "design-creative":
        return {
          title:
            "Find freelancers with the design and creative skills you need",
          categories: CAT_DESIGN_FREELANCER_CATEGORIES,
        };

      case "sales-and-marketing":
        return {
          title: "Find freelancers with the sales & marketing skills you need",
          categories: CAT_SALES_AND_MARKETING_FREELANCER_CATEGORIES,
        };

      case "admin-customer-support":
        return {
          title:
            "Find freelancers with the admin and customer support skills you need",
          categories: CAT_ADMIN_CUSTOMER_SUPPORT_FREELANCER_CATEGORIES,
        };

      case "writing-translation":
        return {
          title:
            "Find freelancers with the writing and translation skills you need",
          categories: CAT_WRITING_TRANSLATION_FREELANCER_CATEGORIES,
        };

      case "finance-accounting":
        return {
          title:
            "Find freelancers with the finance and accounting skills you need",
          categories: CAT_FINANCE_ACCOUNTING_FREELANCER_CATEGORIES,
        };

      case "hr-training":
        return {
          title: "Find freelancers with the HR & Training skills you need",
          categories: CAT_HR_TRAINING_FREELANCER_CATEGORIES,
        };

      case "legal":
        return {
          title: "Find freelancers with the Legal skills you need",
          categories: CAT_LEGAL_FREELANCER_CATEGORIES,
        };

      case "engineering-architecture":
        return {
          title:
            "Find freelancers with the Engineering & Architecture skills you need",
          categories: CAT_ENGINEERING_ARCHITECTURE_FREELANCER_CATEGORIES,
        };

      default:
        return null;
    }
  };

  const getSEO = (): TSEO | null => {
    switch (category) {
      case "dev-it":
        return {
          title: `Top Development & IT Experts for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Discover and hire top Development & IT experts on Worklanc - Freelancer. From web and mobile development to DevOps and data science, find the right freelancer for your project with ease. Learn how to get started, explore expert services, and streamline your development process.`,
          keywords:
            "development freelancers, IT experts for hire, web developers, mobile app developers, DevOps freelancers, hire developers, freelance IT services, software engineers, Worklanc, top development talent, remote developers, full-stack developers, freelance development services",
          url: "/cat/dev-it",
        };

      case "design-creative":
        return {
          title: `Top Designers & Creatives for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Find and hire top design and creative talent on Worklanc - Freelancer. From graphic design and branding to video editing and UX/UI design, connect with skilled freelancers to bring your vision to life. Learn how to start your project and explore our expert services today.`,
          keywords:
            "design freelancers, creative talent, graphic designers, UX UI designers, video editors, logo designers, branding experts, hire creatives, freelance design services, Worklanc, top designers for hire, digital artists, animation freelancers, web design freelancers",
          url: "/cat/design-creative",
        };

      case "sales-and-marketing":
        return {
          title: `Top Sales People & Marketers for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Connect with top freelance sales and marketing experts on Worklanc - Freelancer. From digital marketing and SEO to lead generation and brand strategy, find professionals to grow your business. Explore services, learn how to hire, and get started with proven sales and marketing talent.`,
          keywords:
            "sales freelancers, marketing experts, SEO specialists, digital marketing, social media managers, lead generation, email marketing, content marketing, hire sales professionals, freelance marketers, brand strategy consultants, PPC experts, Worklanc, top marketing talent",
          url: "/cat/sales-and-marketing",
        };

      case "admin-customer-support":
        return {
          title: `Top Admin & Customer Support Talent for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Hire top-rated admin support and customer service freelancers on Worklanc - Freelancer. From virtual assistants and data entry to email support and customer service management, find professionals who keep your business running smoothly. Explore services and start hiring today.`,
          keywords:
            "admin support freelancers, virtual assistants, data entry experts, customer service freelancers, email support, remote admin professionals, administrative tasks, customer support specialists, hire virtual assistant, freelance admin services, back-office support, Worklanc, top admin talent",
          url: "/cat/admin-customer-support",
        };

      case "writing-translation":
        return {
          title: `Top Writers & Translators for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Hire expert writers, editors, and translators on Worklanc - Freelancer. From blog and article writing to technical documents, resumes, and localization, find top freelance talent to meet all your content and translation needs. Start your writing or translation project today.`,
          keywords:
            "freelance writers, content writers, SEO writers, article writers, blog writers, technical writers, copywriters, creative writers, resume writers, translators, localization experts, proofreaders, ghostwriters, eBook writers, speech writers, Worklanc, hire writers and translators",
          url: "/cat/writing-translation",
        };

      case "finance-accounting":
        return {
          title: `Top Finance & Accounting Talent for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Hire top finance and accounting experts on Worklanc - Freelancer. From certified accountants and bookkeepers to tax consultants, financial analysts, and QuickBooks specialists, find the right professionals to manage your business finances. Start your project with trusted freelancers today.`,
          keywords:
            "freelance accountants, bookkeepers, CPAs, financial analysts, QuickBooks specialists, tax preparers, payroll experts, financial consultants, financial forecasting, business analysts, spreadsheet experts, financial modeling, legal advisors, finance freelancers, hire accounting talent, Worklanc",
          url: "/cat/finance-accounting",
        };

      case "hr-training":
        return {
          title: `Top HR & Training Experts for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Find skilled HR and training professionals on Worklanc - Freelancer. From technical recruiters and curriculum developers to employee engagement experts, onboarding specialists, and executive coaches—build a stronger workforce with top freelance talent today.`,
          keywords:
            "freelance HR experts, curriculum developers, employee engagement specialists, onboarding consultants, technical recruiters, executive coaches, resume writers, HR policy experts, SCORM specialists, LMS experts, leadership development, SAP SuccessFactors, compensation consultants, performance management, Worklanc, hire HR freelancers",
          url: "/cat/hr-training",
        };

      case "legal":
        return {
          title: `Top Legal Professionals for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Hire top legal professionals on Worklanc - Freelancer. From contract drafters and intellectual property consultants to employment law experts, legal researchers, and GDPR specialists—find trusted legal freelancers for your business or personal needs.`,
          keywords:
            "freelance legal experts, contract drafters, legal consultants, employment law, intellectual property, family law, criminal law, immigration law, corporate law, real estate law, arbitration law, patent law, legal assistants, GDPR specialists, legal transcription, legal writing, data protection, Worklanc, hire legal freelancers",
          url: "/cat/legal",
        };

      case "engineering-architecture":
        return {
          title: `Top Engineering & Architecture Experts for Hire in ${getMonthName(
            now.getMonth()
          )} ${now.getFullYear()} | Worklanc - Freelancer`,
          description: `Find top engineering and architecture freelancers on Worklanc - Freelancer. From AutoCAD experts and mechanical engineers to landscape architects, BIM specialists, and design consultants—build, design, and innovate with trusted talent across every engineering discipline.`,
          keywords:
            "AutoCAD experts, mechanical engineers, structural engineers, electrical engineers, lighting engineers, architectural rendering, 2D drafter, BIM modeling, home designers, interior architects, landscape architects, aerospace engineers, hydraulic engineers, CI/CD engineers, fire protection engineers, infrastructure engineers, naval architects, engineering consultants, Worklanc, hire engineers and architects",
          url: "/cat/engineering-architecture",
        };

      default:
        return null;
    }
  };

  return (
    <CatLayout
      intro={getIntro()}
      param={category as string}
      expert={getExpert()}
      services={getServices()}
      projectOverview={getProjectOverview()}
      freelancerCategory={getFreelancerCategory()}
      professionals={getProfessionals()}
      faqs={getFaqs()}
      seo={getSEO()}
    />
  );
};

export default Category;

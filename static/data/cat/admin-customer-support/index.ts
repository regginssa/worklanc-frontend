import { TCatLayoutProfessionalCardItem } from "@/components/layouts/cat";
import {
  ICatFreelancerCategory,
  TAccordionImageViewerItem,
  TCatLayoutExpertCategory,
} from "@/types/components.types";

export const CAT_ADMIN_CUSTOMER_SUPPORT_EXPERTS_CATEGORIES: TCatLayoutExpertCategory[] =
  [
    { name: "Virtual Assistants", rate: 4.8, experts: ["", "", ""], path: "#" },
    {
      name: "Data Entry Specialists",
      rate: 4.8,
      experts: ["", "", ""],
      path: "#",
    },
    {
      name: "Project Managers",
      rate: 4.8,
      experts: ["", "", ""],
      path: "#",
    },
    {
      name: "Amazon Store Administrators",
      rate: 4.8,
      experts: ["", "", ""],
      path: "#",
    },
    {
      name: "Customer Service Representatives",
      rate: 4.8,
      experts: ["", "", ""],
      path: "#",
    },
    {
      name: "Tech Support Specialists",
      rate: 4.8,
      experts: ["", "", ""],
      path: "#",
    },
    {
      name: "Zendesk Specialists",
      rate: 4.8,
      experts: ["", "", ""],
      path: "#",
    },
    {
      name: "Community Managers",
      rate: 4.8,
      experts: ["", "", ""],
      path: "#",
    },
  ];

export const CAT_ADMIN_CUSTOMER_SUPPORT_SERVICES: TAccordionImageViewerItem[] =
  [
    {
      id: "1",
      title: "Project Management",
      description:
        "Get your projects done on time and within your budget with expert management of the necessary tasks, people, and resources.",
      imageUrl:
        "https://cdn.prod.website-files.com/604761b6a7e539ea274cfd6b/604ca6b8198124cead12cfeb_5fc14c8ad1d75e72cfe6a6a6_project-management.png",
    },
    {
      id: "2",
      title: "Customer Support",
      description:
        "Attract and retain customers with chat, email, phone, or other assistance that creates an outstanding customer experience.",
      imageUrl:
        "https://cdn.prod.website-files.com/604761b6a7e539ea274cfd6b/604ca6b954f2aa3c19da70a4_5fc1496ff86aded58d7dbc5b_5f068ab4b875251c3200c725_T3_Presentation_Design_Jiajie_S.png",
    },
    {
      id: "3",
      title: "Virtual Assistance",
      description:
        "Get virtual assistance and free up your schedule from answering emails, scheduling meetings, and other tasks so you can focus on the work that you’re most skilled at.",
      imageUrl:
        "https://cdn.prod.website-files.com/604761b6a7e539ea274cfd6b/604ca6b863ae44d87b0c46b7_5fc14f52985889dd07176531_virtual-assistance.png",
    },
    {
      id: "4",
      title: "eCommerce Management",
      description:
        "A full suite of services ranging from product listings to store management that will ensure your eCommerce business flourishes.",
      imageUrl:
        "https://cdn.prod.website-files.com/604761b6a7e539ea274cfd6b/604ca6b772b9ab6036555062_5fc14ffeaaf9553ec274dc76_ecommerce.png",
    },
    {
      id: "5",
      title: "Data Entry",
      description:
        "Free up your time to focus on strategic tasks with data formatting, image annotation, list building, and more data entry services.",
      imageUrl:
        "https://cdn.prod.website-files.com/604761b6a7e539ea274cfd6b/604ca6b11dba1a9cdb2b7742_5fc153a3c7b8abe65504329e_data.png",
    },
    {
      id: "6",
      title: "Transcription",
      description:
        "Save yourself hours of tedious transcription work and convert your audio and video content into searchable text.",
      imageUrl:
        "https://cdn.prod.website-files.com/604761b6a7e539ea274cfd6b/614998aed30ba34b19e7fbe9_604ca6b0a837d31b62ea45cf_5fc1570b939434763a52ca45_transcription%20(1).jpg",
    },
  ];

export const CAT_ADMIN_CUSTOMER_SUPPORT_PROJECT_OVERVIEW_SKILLS: string[] = [
  "Decision Making",
  "Project Scheduling",
  "Conflict Resolution",
  "Time Management",
];

export const CAT_ADMIN_CUSTOMER_SUPPORT_PROFESSIONALS: TCatLayoutProfessionalCardItem[] =
  [
    {
      message:
        "I love helping people resolve their issues and/or going out of my way to find answers for people.",
      user: {
        name: "Debra F",
        pic: "https://cdn.prod.website-files.com/603fea6471d9d8559d077603/633697e7764cda54588c4c90_Ellipse%208%20(1)%20(1).png",
        badge: {
          type: "TOP_RATED_PLUS",
          iconUrl: "",
        },
        profession: "Customer Service Professional",
      },
    },
    {
      message:
        "I ensure to treat their concerns with high urgency. I respond right away. That is how I let them feel I value their time well.",
      user: {
        name: "Carlo Angelo O",
        pic: "https://cdn.prod.website-files.com/603fea6471d9d8559d077603/633697e55bf8c221e2733913_Ellipse%208%20(2)%20(1).png",
        badge: {
          type: "TOP_RATED_PLUS",
          iconUrl: "",
        },
        profession: "Customer Service Manager",
      },
    },
  ];

export const CAT_ADMIN_CUSTOMER_SUPPORT_FREELANCER_CATEGORIES: ICatFreelancerCategory[] =
  [
    {
      title: "Admin & Customer Support Roles",
      items: [
        { label: "Administrative Assistants", path: "#" },
        { label: "Appointment Setters", path: "#" },
        { label: "Bookkeepers", path: "#" },
        { label: "Customer Service Representatives", path: "#" },

        { label: "Customer Support Representatives", path: "#" },
        { label: "Data Entry Specialists", path: "#" },
        { label: "Data Miners", path: "#" },
        { label: "Editors", path: "#" },

        { label: "Email Handlers", path: "#" },
        { label: "Microsoft Excel Experts", path: "#" },
        { label: "Executive Assistants", path: "#" },
        { label: "Google Docs Experts", path: "#" },

        { label: "Google Sheets Experts", path: "#" },
        { label: "Google Slides Experts", path: "#" },
        { label: "Graphic Designers", path: "#" },
        { label: "HTML Developers", path: "#" },

        { label: "Internet Researchers", path: "#" },
        { label: "Intuit QuickBooks Specialists", path: "#" },
        { label: "Microsoft Office Specialists", path: "#" },
        { label: "Microsoft Outlook Specialists", path: "#" },

        { label: "Microsoft Word Experts", path: "#" },
        { label: "Personal Assistants", path: "#" },
        { label: "PowerPoint Experts", path: "#" },
        { label: "Project Managers", path: "#" },

        { label: "Proofreaders", path: "#" },
        { label: "Recruiters", path: "#" },
        { label: "Research Assistants", path: "#" },
        { label: "Social Media Managers", path: "#" },

        { label: "Transcriptionists", path: "#" },
        { label: "Typists", path: "#" },
        { label: "Virtual Assistants", path: "#" },
        { label: "Cold Callers", path: "#" },
      ],
    },

    {
      title: "Cross-functional Roles",
      items: [
        { label: "Account Managers", path: "#" },
        { label: "Digital Marketers", path: "#" },
        { label: "Virtual Assistants", path: "#" },
        { label: "Chat Support", path: "#" },

        { label: "Business Analysts", path: "#" },
        { label: "Full Stack Developers", path: "#" },
        { label: "Customer Service Representatives", path: "#" },
        { label: "Technical Support", path: "#" },

        { label: "Copywriters", path: "#" },
        { label: "SEO Specialists", path: "#" },
        { label: "Administrative Assistants", path: "#" },
        { label: "Google Suite Administrator", path: "#" },

        { label: "Data Analysts", path: "#" },
        { label: "Software QA Testers", path: "#" },
        { label: "Customer Service Representatives", path: "#" },
        { label: "Customer Support Representatives", path: "#" },
      ],
    },

    {
      title: "Admin & Customer Support Projects",
      items: [
        { label: "Data Entry Services", path: "#" },
        { label: "Project Management", path: "#" },
        { label: "Call Center & Calling", path: "#" },
        { label: "General Project Services", path: "#" },
        { label: "Other Admin & Customer Support", path: "#" },
        { label: "Transcripts", path: "#" },
        { label: "Administration", path: "#" },
        { label: "Digital Marketing Projects", path: "#" },

        { label: "File Conversion", path: "#" },
        { label: "Virtual Assistant", path: "#" },
        { label: "Research", path: "#" },
        { label: "Graphics & Design Projects", path: "#" },
        { label: "Flyer Distribution", path: "#" },
        { label: "Other Virtual Assistance", path: "#" },
        { label: "Customer Support", path: "#" },
        { label: "Writing & Translation Projects", path: "#" },
      ],
    },
  ];

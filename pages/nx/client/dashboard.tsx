import { Button } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import MailCheckIcon from "@/public/assets/svgs/icons/icons/mail_check.svg";
import DollarSheldIcon from "@/public/assets/svgs/icons/icons/dollar_sheld.svg";
import LaptopScanningFaceIcon from "@/public/assets/svgs/icons/other/laptop_scanning_face.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import TopRatedIcon from "@/public/assets/svgs/icons/badges/top_rated.svg";
import CardsIcon from "@/public/assets/svgs/icons/other/cards.svg";
import WorldwideIcon from "@/public/assets/svgs/icons/other/worldwide.svg";
import CardsLockIcon from "@/public/assets/svgs/icons/other/cards_lock.svg";
import RoketInHandIcon from "@/public/assets/svgs/icons/other/roket_in_hand.svg";

const resources = [
  {
    title: "Payments",
    description: "Everything you need to know about payments",
    icon: CardsLockIcon,
  },
  {
    title: "Payments",
    description: "How to set up your preferred billing method",
    icon: CardsIcon,
  },
  {
    title: "Trust & safety",
    description: "Keep yourself and others safe on Worklanc",
    icon: WorldwideIcon,
  },
];

export default function Dashboard() {
  const jobs = Array.from({ length: 1 });
  const consultations = Array.from({ length: 4 });

  // Each job fills 1/3 of the view. "Post a job" fills the remaining slots of
  // the current row of 3 (2/3 when one slot is taken, otherwise 1/3 and it
  // wraps to the next view).
  const postAJobBasis = jobs.length % 3 === 1 ? "lg:basis-2/3" : "lg:basis-1/3";

  return (
    <ClientLayout
      seo={{
        title: "Your dashboard - Worklanc",
        description: "Your dashboard - Worklanc",
        url: "/nx/client/dashboard",
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-8 freelancer-plus-alert p-4 rounded-md text-white">
          <div className="flex items-center gap-2">
            <Icon
              icon="material-symbols-light:diamond-outline"
              className="size-6"
            />
            <p className="text-sm font-light">
              Make hiring easier from day one. Try Business Plus for 30 days on
              us.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="underline text-sm cursor-pointer"
            >
              Upgrade now
            </motion.button>
            <button>
              <Icon icon="mdi:close" className="size-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8">
          <h1 className="text-2xl font-medium">Welcome back, John</h1>
          <Button
            type="primary"
            label="Post a job"
            icon="mdi:plus"
            classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-medium">Last steps before you can hire</h2>
        <div className="grid grid-cols-3 gap-8">
          <Link
            href="#"
            className="border border-slate-300 cursor-pointer rounded-3xl p-6 flex items-start justify-between gap-6"
          >
            <div className="space-y-4">
              <p className="text-sm font-light">Required to hire</p>
              <h4 className="text-xl font-medium underline">
                Verify your email
              </h4>
              <p className="text-sm font-light">
                Confirm it's you and establish trust with freelancers
              </p>
            </div>

            <Image src={MailCheckIcon} alt="Mail check" className="w-12 h-12" />
          </Link>

          <Link
            href="#"
            className="border border-slate-300 cursor-pointer rounded-3xl p-6 flex items-start justify-between gap-6"
          >
            <div className="space-y-4">
              <p className="text-sm font-light">Required to hire</p>
              <h4 className="text-xl font-medium underline">
                Add a billing method
              </h4>
              <p className="text-sm font-light">
                Confirm it's you and establish trust with freelancers
              </p>
            </div>

            <Image
              src={DollarSheldIcon}
              alt="Dollar sheld"
              className="w-12 h-12"
            />
          </Link>
        </div>
      </div>

      <div className="space-y-6 mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium">Overview</h2>
          <div className="flex items-center p-1 bg-slate-200 rounded-full max-w-52 h-10 w-full">
            <button className="flex-1 cursor-pointer h-full flex items-center justify-center rounded-full bg-white shadow-lg text-slate-600">
              <Icon icon="system-uicons:grid" className="size-6" />
            </button>

            <button className="flex-1 cursor-pointer h-full flex items-center justify-center rounded-full text-slate-600">
              <Icon icon="cil:list" className="size-6" />
            </button>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="flex items-stretch">
            {jobs.map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                <div className="border border-slate-300 rounded-3xl p-6 space-y-4 h-full">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-slate-300 flex items-center justify-center">
                        <Icon
                          icon="fe:list-task"
                          className="text-white size-6"
                        />
                      </div>
                      <h4 className="font-medium">Fintech SaaS Platform</h4>
                    </div>
                    <button className="text-slate-900 cursor-pointer p-1 rounded-full hover:bg-slate-200 transition-all duration-200">
                      <Icon icon="tabler:dots" className="size-6" />
                    </button>
                  </div>

                  <div>
                    <span className="py-1 px-2 text-xs font-light bg-blue-200 rounded-sm text-blue-800">
                      Draft job post
                    </span>
                  </div>

                  <p className="text-xl font-medium">
                    Add details to your draft
                  </p>

                  <Button
                    type="outline"
                    label="Fill in draft"
                    size="medium"
                    classname="py-2.5! font-medium! text-sm! rounded-full! w-full! mt-20"
                  />
                </div>
              </CarouselItem>
            ))}

            <CarouselItem
              key="post-a-job"
              className={`basis-1/2 ${postAJobBasis}`}
            >
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="border border-slate-300 rounded-3xl p-6 space-y-4 flex flex-col items-center justify-center h-full cursor-pointer transition-colors duration-200 hover:bg-slate-100"
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon icon="mdi:plus" className="size-6" />
                  <p className="font-light">Post a job</p>
                </div>
              </motion.div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="space-y-6 mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium">
            Review your project’s goals with an expert, one-on-one
          </h2>

          <Link href="#" className="flex items-center gap-2 text-blue-600">
            <span className="text-sm font-light cursor-pointer underline">
              Browse consultations
            </span>
            <Icon icon="mdi:arrow-right" className="size-5" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="flex items-stretch">
            <CarouselItem key="banner" className={`basis-1/2 lg:basis-1/4`}>
              <div className="h-full text-white flex flex-col justify-between rounded-3xl bg-zinc-800 space-y-4 p-6">
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light">Guided tour</span>
                    <button className="cursor-pointer">
                      <Icon icon="mdi:close" className="size-6" />
                    </button>
                  </div>

                  <h4 className="text-2xl font-medium">
                    Book a consultation with an expert to review your project’s
                    budget, timeline, and scope one-on-one.
                  </h4>
                </div>

                <div className="flex items-end justify-between gap-6">
                  <Link
                    href="#"
                    className="py-2.5 px-4 rounded-full bg-white text-zinc-800 font-medium text-sm"
                  >
                    Learn more
                  </Link>
                  <Image
                    src={LaptopScanningFaceIcon}
                    alt="Laptop scanning face"
                    className="w-[97px] h-[87px]"
                  />
                </div>
              </div>
            </CarouselItem>
            {consultations.map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/4">
                <div className="border border-slate-300 rounded-3xl p-6 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-4 w-full">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative size-12">
                          <Image
                            src={UserPic}
                            alt="User"
                            className="rounded-full object-cover w-12 h-12"
                          />
                          <Image
                            src={TopRatedIcon}
                            alt="Top rated"
                            className="absolute -top-1.5 -left-1.5 size-6"
                          />
                        </div>

                        <div>
                          <h5 className="text-xl">John D.</h5>
                          <p className="text-sm font-light">United States</p>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                      >
                        <Icon
                          icon="mdi:cards-heart-outline"
                          className="size-6 text-blue-600"
                        />
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="gap-1 flex flex-col items-center justify-center">
                        <h5 className="text-sm font-light">100%</h5>
                        <p className="text-xs font-light">Job Success</p>
                      </div>

                      <div className="gap-1 flex flex-col items-center justify-center">
                        <h5 className="text-sm font-light">20</h5>
                        <p className="text-xs font-light">Jobs</p>
                      </div>

                      <div className="gap-1 flex flex-col items-center justify-center">
                        <h5 className="text-sm font-light">$50/hr</h5>
                        <p className="text-xs font-light">Rate</p>
                      </div>
                    </div>

                    <h5 className="text-sm font-light">
                      Senior Flutter | React Native Expert
                    </h5>

                    <p className="text-sm font-light line-clamp-3">
                      I have 10 years of experience in mobile app development
                      and have worked on projects for startups and enterprises.
                      Collaborated with teams to deliver high-quality software
                      solutions on time and within budget.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-blue-600">
                    <Icon icon="pepicons-pencil:camera" className="size-6" />
                    <span>$60 per 30 minutes Zoom meeting</span>
                  </div>

                  <Link
                    href="#"
                    className="py-2.5 w-full flex items-center justify-center font-medium text-sm rounded-full cursor-pointer hover:bg-slate-100 border border-slate-400 transition-colors duration-200"
                  >
                    Book a consultation
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="space-y-6 mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium">Help and resources</h2>

          <Link href="#" className="flex items-center gap-2 text-blue-600">
            <span className="text-sm font-light cursor-pointer underline">
              View all resources
            </span>
            <Icon icon="mdi:arrow-right" className="size-5" />
          </Link>
        </div>

        <div className="border border-slate-300 rounded-3xl p-8 flex items-center justify-between">
          <div className="">
            <p className="text-sm text-slate-600">Get started</p>
            <h4 className="text-2xl font-medium mt-2 mb-8">
              Get started and connect with talent to get work done
            </h4>

            <Link
              href="#"
              target="_blank"
              className="cursor-pointer py-2.5 px-5 rounded-full border border-slate-300 text-blue-600 text-sm font-medium transition-colors duration-200 hover:bg-slate-100"
            >
              Learn more
            </Link>
          </div>
          <Image
            src={RoketInHandIcon}
            alt="Rocket in hand"
            className="w-[145px] h-[130px]"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="border border-slate-300 rounded-3xl p-6 gap-6 flex items-center justify-between"
            >
              <div>
                <h4 className="text-sm text-slate-600">{resource.title}</h4>
                <p className="text-xl font-medium mt-2">
                  {resource.description}
                </p>
              </div>
              <Image
                src={resource.icon}
                alt={resource.title}
                className="w-[100px] h-[90px]"
              />
            </div>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
}

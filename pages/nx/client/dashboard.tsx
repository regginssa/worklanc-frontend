import { Button } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import MailCheckIcon from "@/public/assets/svgs/icons/icons/mail_check.svg";
import DollarSheldIcon from "@/public/assets/svgs/icons/icons/dollar_sheld.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Dashboard() {
  const jobs = Array.from({ length: 1 });

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

      <div className="space-y-6">
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
    </ClientLayout>
  );
}

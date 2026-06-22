import { Button } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import MailCheckIcon from "@/public/assets/svgs/icons/icons/mail_check.svg";
import PhoneIcon from "@/public/assets/svgs/icons/icons/phone.svg";
import DollarSheldIcon from "@/public/assets/svgs/icons/icons/dollar_sheld.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardsIcon from "@/public/assets/svgs/icons/other/cards.svg";
import WorldwideIcon from "@/public/assets/svgs/icons/other/worldwide.svg";
import CardsLockIcon from "@/public/assets/svgs/icons/other/cards_lock.svg";
import RoketInHandIcon from "@/public/assets/svgs/icons/other/roket_in_hand.svg";
import {
  ViewToggle,
  DraftJobCard,
  JobListItem,
  ConsultationCard,
  ConsultationBanner,
  ResourceCard,
  HireStepCard,
  PhoneVerificationDialog,
} from "@/components/molecules";
import { useQueryClient } from "@tanstack/react-query";
import { useClientJobs, useJobPost } from "@/hooks/useJobPost";
import JobsAPI from "@/lib/api/jobs";
import type { Job } from "@/types/job";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useState } from "react";
import EmptyJobPostIcon from "@/public/assets/svgs/icons/other/bag_open.svg";

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
  const [openUpgradeAlert, setOpenUpgradeAlert] = useState(true);
  const [isListView, setIsListView] = useState(false);
  const [openPhoneVerificationDialog, setOpenPhoneVerificationDialog] =
    useState(false);
  const [pendingJobUid, setPendingJobUid] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { resumePath } = useJobPost();
  const { data: jobsData } = useClientJobs();
  const clientJobs: Job[] = jobsData?.jobs ?? [];
  const consultations = Array.from({ length: 4 });

  const postAJobBasis =
    clientJobs.length % 3 === 1 ? "lg:basis-2/3" : "lg:basis-1/3";

  const handleVerifyAndPublish = (jobUid: string) => {
    setPendingJobUid(jobUid);
    setOpenPhoneVerificationDialog(true);
  };

  return (
    <ClientLayout
      seo={{
        title: "Your dashboard - Worklanc",
        description: "Your dashboard - Worklanc",
        url: "/nx/client/dashboard",
      }}
    >
      {openUpgradeAlert && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-8 freelancer-plus-alert p-4 rounded-md text-white">
            <div className="flex items-center gap-2">
              <Icon
                icon="material-symbols-light:diamond-outline"
                className="size-6"
              />
              <p className="text-sm font-light">
                Make hiring easier from day one. Try Business Plus for 30 days
                on us.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="underline text-sm cursor-pointer"
              >
                Upgrade now
              </motion.button>
              <button
                className="cursor-pointer"
                onClick={() => setOpenUpgradeAlert(false)}
              >
                <Icon icon="mdi:close" className="size-6" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-8">
            <h1 className="text-2xl font-medium">
              Welcome back, {user?.firstName}
            </h1>
            <Button
              type="primary"
              label="Post a job"
              icon="mdi:plus"
              classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
              onClick={() => router.push("/nx/job-post/welcome")}
            />
          </div>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-3xl font-medium">Last steps before you can hire</h2>
        <div className="grid grid-cols-3 gap-6">
          <HireStepCard
            href="/nx/signup/please-verify"
            label="Required to hire"
            title={
              user?.emailVerified
                ? "Email address verified"
                : "Verify your email"
            }
            description="Confirm it's you and establish trust with freelancers"
            icon={MailCheckIcon}
            iconAlt="Mail check"
            completed={user?.emailVerified || false}
          />

          <HireStepCard
            href="/nx/signup/please-verify"
            label="Required to publish a job"
            title={
              user?.phoneVerified
                ? "Phone number verified"
                : "Verify your phone"
            }
            description="Confirm it's you, to be able to publish your first job post"
            icon={PhoneIcon}
            iconAlt="Phone"
            completed={user?.phoneVerified || false}
          />

          <HireStepCard
            href="#"
            label="Required to hire"
            title="Add a billing method"
            description="This can increase your hiring speed up to 3x. There's no cost until you hire"
            icon={DollarSheldIcon}
            iconAlt="Dollar sheld"
            completed={false}
          />
        </div>
      </div>

      <div className="space-y-6 mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium">Overview</h2>
          <ViewToggle isListView={isListView} onChange={setIsListView} />
        </div>

        {clientJobs.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center gap-8 py-10 bg-slate-50 border border-slate-300 rounded-3xl">
            <Image
              src={EmptyJobPostIcon}
              alt="Empty job post"
              className="w-[145px] h-[130px]"
            />
            <p className="text-lg font-medium">
              No job posts or contracts in progress right now
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                type="outline"
                label="Find a talent"
                size="medium"
                icon="mdi:search"
                classname="py-2.5! px-5! font-medium! text-sm! rounded-full! border!"
                onClick={() => router.push("/nx/search/talent")}
              />
              <Button
                type="primary"
                label="Post a job"
                icon="mdi:plus"
                classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
                onClick={() => router.push("/nx/job-post/welcome")}
              />
            </div>
          </div>
        )}

        {!isListView ? (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="flex items-stretch">
              {clientJobs.map((job) => (
                <CarouselItem key={job.uid} className="basis-1/2 lg:basis-1/3">
                  <DraftJobCard
                    title={job.title || "Untitled job post"}
                    status={job.status}
                    onFillInDraft={() => router.push(resumePath(job))}
                    onVerifyAndPublish={() => handleVerifyAndPublish(job.uid)}
                  />
                </CarouselItem>
              ))}

              <CarouselItem
                key="post-a-job"
                className={`basis-1/2 ${postAJobBasis}`}
              >
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="border border-slate-300 rounded-3xl p-6 space-y-4 flex flex-col items-center justify-center h-full cursor-pointer transition-colors duration-200 hover:bg-slate-100"
                  onClick={() => router.push("/nx/job-post/welcome")}
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
        ) : (
          <ul className="flex flex-col gap-4">
            {clientJobs.map((job) => (
              <JobListItem
                key={job.uid}
                title={job.title || "Untitled job post"}
                status={job.status}
                onFillInDraft={() => router.push(resumePath(job))}
                onVerifyAndPublish={() => handleVerifyAndPublish(job.uid)}
              />
            ))}
          </ul>
        )}
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
              <ConsultationBanner />
            </CarouselItem>
            {consultations.map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/4">
                <ConsultationCard />
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
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
            />
          ))}
        </div>
      </div>

      <PhoneVerificationDialog
        open={openPhoneVerificationDialog}
        onClose={() => setOpenPhoneVerificationDialog(false)}
        onSuccess={async (verifiedUser) => {
          dispatch(setUser(verifiedUser));
          setOpenPhoneVerificationDialog(false);
          if (pendingJobUid) {
            await JobsAPI.activate(pendingJobUid);
            setPendingJobUid(null);
            queryClient.invalidateQueries({ queryKey: ["client-jobs"] });
          }
        }}
      />
    </ClientLayout>
  );
}

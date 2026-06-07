import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { ArrowLeftIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  FreelancerProfileBookConsultation,
  FreelancerProfileEarnSummary,
  FreelancerProfileHeader,
  FreelancerProfileHoursPerWeek,
  FreelancerProfileLanguages,
  FreelancerProfileOverview,
  FreelancerProfileSidebarEducation,
  FreelancerProfileTitleRate,
  FreelancerProfileVerifications,
} from "../freelancer-profile";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import { useState } from "react";
import { Button, IconButton } from "@/components/atoms";

export default function FreelancerProfileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent size="lg">
        <DrawerHeader>
          <div className="flex items-center justify-between w-full">
            <button
              className="hover:text-blue-600 cursor-pointer"
              onClick={onClose}
            >
              <ArrowLeftIcon className="size-6" />
            </button>
            <Link
              href="#"
              target="_blank"
              className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline text-sm font-medium"
            >
              Open profile in a new window
              <ExternalLink className="size-5" />
            </Link>
          </div>
        </DrawerHeader>

        <div className="space-y-6 mx-6 p-6 no-scrollbar overflow-y-auto border border-slate-300 rounded-3xl">
          <FreelancerProfileHeader
            name="Marco N."
            avatar={UserPic}
            isOnline
            className="border-none!"
            location="London, United Kingdom"
            localTime="10:42 am local time"
            isSharable
            jobSuccessScore={100}
            badge="TOP_RATED_PLUS"
            isAvailableNow
          >
            <div className="flex items-center gap-4">
              <IconButton
                variant="outline"
                icon="mdi:dots-horizontal"
                className="border!"
                onClick={() => {}}
              />
              <Button
                type="primary"
                label="Hire"
                classname="rounded-full! px-5! py-2.5! text-sm! font-medium!"
              />
              <IconButton
                variant="outline"
                icon="mdi:heart-outline"
                className=""
                onClick={() => {}}
              />
            </div>
          </FreelancerProfileHeader>

          <div className="flex items-start gap-6">
            <div className="w-1/3">
              <div className="border-b border-slate-300 pb-6">
                <FreelancerProfileEarnSummary
                  earnedAmount={6200}
                  jobs={20}
                  hours={100}
                />
              </div>

              <div className="space-y-6 pt-6">
                <FreelancerProfileHoursPerWeek hours="More than 30 hrs/week" />

                <FreelancerProfileLanguages
                  languages={[
                    { name: "English", level: "Native or Bilingual" },
                  ]}
                />

                <FreelancerProfileVerifications
                  items={[
                    {
                      label: "ID:",
                      value: "Unverified",
                      verified: false,
                    },
                    {
                      label: "Phone number:",
                      value: "Verified",
                      verified: true,
                    },
                  ]}
                />

                <FreelancerProfileSidebarEducation
                  items={[
                    {
                      school: "University of London",
                      degree: "Bachelor of Accountancy (BAcc)",
                      fieldOfStudy: "Economics",
                      startedAt: 2018,
                      endAt: 2022,
                    },
                  ]}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-6 pb-6 border-b border-slate-300">
                <FreelancerProfileTitleRate
                  title="Full Stack Developer"
                  hourlyRate={52}
                  onLink={() => {}}
                />

                <FreelancerProfileOverview overview="Marco is a certified public accountant with over 10 years of experience in accounting and consulting. He has worked with a variety of clients, from small businesses to large corporations." />

                <FreelancerProfileBookConsultation />
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

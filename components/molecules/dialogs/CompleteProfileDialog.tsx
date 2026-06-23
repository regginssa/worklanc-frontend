"use client";

import { Button } from "@/components/atoms";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import { ChevronDown, ChevronRight, CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PROFILE_COMPLETENESS = 75;
const PROGRESS_SIZE = 200;
const PROGRESS_STROKE_WIDTH = 18;

function ProfileCompletenessRing({
  value,
  animate,
}: {
  value: number;
  animate: boolean;
}) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (PROGRESS_SIZE - PROGRESS_STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = PROGRESS_SIZE / 2;
  const targetOffset = circumference - (clampedValue / 100) * circumference;

  return (
    <svg
      width={PROGRESS_SIZE}
      height={PROGRESS_SIZE}
      viewBox={`0 0 ${PROGRESS_SIZE} ${PROGRESS_SIZE}`}
      className="absolute inset-0 -rotate-90"
      aria-hidden
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={PROGRESS_STROKE_WIDTH}
        className="text-slate-300"
      />
      {animate && (
        <motion.circle
          key="profile-completeness-progress"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={PROGRESS_STROKE_WIDTH}
          strokeDasharray={circumference}
          strokeLinecap="round"
          className="text-blue-600"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}
    </svg>
  );
}

export default function CompleteProfileDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [showCompleted, setShowCompleted] = useState(false);
  const freelancerUid = "123456678";

  const uncompletedFields = [
    {
      title: "Working style",
      description: "Complete a quick assessment (Optional)",
      href: "/nx/skills-assessment",
    },
    {
      title: "Employment history",
      description: "Post job experiences and positions (+20%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=employment`,
    },
    {
      title: "Portfolio",
      description: "Work samples, case studies, etc (+15%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=portfolio`,
    },
    {
      title: "Education",
      description: "Include degrees and diplomas (+10%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=education`,
    },
    {
      title: "Video introduction",
      description: "A short 30-60 seconds intro (+10%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=video-introduction`,
    },
    {
      title: "Certifications",
      description: "Recognized skills and knowledge (+10%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=certifications`,
    },
    {
      title: "Linked accounts",
      description: "Connect a social media profile (+10%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=linked-accounts`,
    },
    {
      title: "Other experiences",
      description: "Bootcamps, conferences, awards, etc (+5%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=other-experiences`,
    },
  ];

  const completedFields = [
    {
      title: "Profile photo",
      description: "Take a professional picture (+5%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=photo`,
    },
    {
      title: "Overview",
      description: "Add a bio highlighting your talent (+5%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=overview`,
    },
    {
      title: "Skills",
      description: "Showcase your expertise (+5%)",
      href: `/freelancers/${freelancerUid}?qpn-profile-completeness=skills`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col p-0! overflow-hidden!">
        <div className="flex items-stretch">
          <div className="w-2/5 bg-slate-200 flex flex-col items-center justify-center gap-2">
            <div
              className="relative flex size-[200px] items-center justify-center"
              role="progressbar"
              aria-valuenow={PROFILE_COMPLETENESS}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <ProfileCompletenessRing
                value={PROFILE_COMPLETENESS}
                animate={open}
              />
              <Image
                src={UserPic}
                alt="User"
                className="relative z-10 size-[158px] rounded-full object-cover"
              />
            </div>

            <span className="text-sm font-light mt-4">
              {PROFILE_COMPLETENESS}% complete
            </span>
            <span className="text-lg font-medium">You’re almost done!</span>
            <Link
              href="#"
              className="text-sm font-light underline cursor-pointer"
            >
              Learn more
            </Link>
          </div>

          <div className="flex-1 space-y-2 p-8">
            <h1 className="text-2xl font-medium text-blue-600">
              Complete your profile
            </h1>
            <p className="text-sm font-light">
              Freelancers with complete, quality profiles are{" "}
              <strong className="text-blue-600">4.5 times more likely</strong>{" "}
              to get hired by clients.
            </p>

            <div className="max-h-[50vh] overflow-y-auto no-scrollbar">
              <ul>
                {uncompletedFields.map((field, index) => (
                  <li
                    key={index}
                    className="p-3 border-b border-slate-300 cursor-pointer hover:bg-slate-100 transition-colors duration-200"
                  >
                    <Link
                      href={field.href}
                      className="flex items-start justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div className="border border-slate-700 rounded-full size-5"></div>
                        <div>
                          <h4 className="text-sm font-light">{field.title}</h4>
                          <p className="text-xs font-light text-slate-600">
                            {field.description}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="size-4 text-slate-600" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="p-3 mt-3 flex items-center gap-4 border-b border-slate-300">
                <div className="size-5"></div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowCompleted((previous) => !previous)}
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                  >
                    <span className="underline">
                      {showCompleted ? "Hide" : "Show"} completed (
                      {completedFields.length})
                    </span>
                    <motion.span
                      animate={{ rotate: showCompleted ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <ChevronDown className="size-4" />
                    </motion.span>
                  </button>
                  <p className="text-xs font-light text-slate-600">
                    Nicely done! These items are checked off the list.
                  </p>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {showCompleted && (
                  <motion.ul
                    key="completed-fields"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {completedFields.map((field, index) => (
                      <li
                        key={index}
                        className="p-3 border-b border-slate-300 flex items-start justify-between cursor-pointer hover:bg-slate-100 transition-colors duration-200"
                      >
                        <Link
                          href={field.href}
                          className="flex items-start justify-between w-full"
                        >
                          <div className="flex items-start gap-4">
                            <CircleCheck className="size-5 text-blue-600" />
                            <div>
                              <h4 className="text-sm font-light">
                                {field.title}
                              </h4>
                              <p className="text-xs font-light text-slate-600">
                                {field.description}
                              </p>
                            </div>
                          </div>

                          <ChevronRight className="size-4 text-slate-600" />
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 bg-white flex justify-end sticky bottom-0">
              <Button
                type="primary"
                label="Close"
                classname="px-5! py-2.5! rounded-full! text-sm! font-medium!"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

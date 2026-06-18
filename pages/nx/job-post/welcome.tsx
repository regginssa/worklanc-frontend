import { Button, Stepper } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import AIIcon from "@/public/assets/svgs/icons/other/ai.svg";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useJobPost } from "@/hooks/useJobPost";
import { useAppSelector } from "@/store/hooks";

export default function Welcome() {
  const { saving, startNewJob } = useJobPost();
  const { user } = useAppSelector((state) => state.user);

  return (
    <ClientLayout
      seo={{
        title: "Post a job - Worklanc",
        description: "Post a job - Worklanc",
        url: "/nx/job-post/welcome",
      }}
    >
      <div className="flex items-center justify-center">
        <Stepper
          steps={[
            { title: "Add business context" },
            { title: "Create job post" },
            { title: "Share with talent" },
          ]}
          currentStep={1}
        />
      </div>
      <div className="w-1/3 space-y-8">
        <Image
          src={AIIcon}
          alt="AI"
          className="w-[105px] h-[105px] object-cover"
        />

        <h1 className="text-5xl font-medium">
          Welcome, {user?.firstName || "there"}! Let's start with your first job
          post.
        </h1>

        <p className="text-sm">
          It's the fastest way to meet top talent. Get help from AI and be done
          in no time.
        </p>

        <div className="space-y-2">
          <Button
            type="primary"
            label="Get started using AI"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            disabled={saving}
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className="py-2.5 px-5 text-sm font-medium text-blue-600 cursor-pointer disabled:opacity-50"
            disabled={saving}
            onClick={() => startNewJob()}
          >
            {saving ? "Starting..." : "I'll do it without AI"}
          </motion.button>
        </div>

        <div>
          <p className="text-sm text-slate-600">
            Beta feature powered by Uma, Upwork's Mindful AI.
          </p>
          <Link
            href="#"
            className="text-black text-sm hover:underline cursor-pointer"
          >
            How it works
          </Link>
        </div>
      </div>
    </ClientLayout>
  );
}

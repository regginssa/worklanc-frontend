import { Button, Input } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";

export default function Title() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const router = useRouter();

  const validateTitle = () => {
    if (title.trim() === "") {
      setTitleError("Enter a title with at least 4 characters.");
    } else if (title.length > 62) {
      setTitleError("Title must be less than 62 characters");
    } else {
      setTitleError("");
    }
  };

  return (
    <CreateProfileLayout
      title="Got it. Now, add a title to tell the world what you do."
      description="It’s the very first thing clients see, so make it count. Stand out by describing your expertise in your own words."
      currentStep={4}
      totalSteps={10}
      seo={{
        title: "Got it. Now, add a title to tell the world what you do.",
        description:
          "It’s the very first thing clients see, so make it count. Stand out by describing your expertise in your own words.",
        url: "/nx/create-profile/title",
      }}
    >
      <div className="w-3/5">
        <Input
          label="Your professional role"
          placeholder="Example: Accounting & Consulting"
          type="text"
          name="title"
          classname="text-sm!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
        />
      </div>

      <div className="mt-36 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, your profile title"
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() => {
            validateTitle();
            if (titleError) return;
            router.push("/nx/create-profile/title");
          }}
        />
      </div>
    </CreateProfileLayout>
  );
}

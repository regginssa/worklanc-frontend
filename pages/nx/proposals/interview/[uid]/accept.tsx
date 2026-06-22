import { CollapsableText } from "@/components/common";
import { FreelancerLayout } from "@/components/layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { Calendar, CircleQuestionMark } from "lucide-react";
import { SkillsGroup } from "@/components/molecules";
import DollarShield from "@/public/assets/svgs/icons/other/dollar_sheld.svg";
import Image from "next/image";
import { useState } from "react";
import { Button, Dropdown, Input, Textarea } from "@/components/atoms";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "motion/react";
import PaintIcon from "@/public/assets/svgs/icons/other/paint.svg";
import MedalIcon from "@/public/assets/svgs/icons/other/medal.svg";

const JOB_DESCRIPTION = `We are hiring English (UK) voice actors to perform
multi-character dialogue recordings to help train internal
Text-to-Speech (TTS) models. You'll be voicing fictional
characters with varying styles, accents, and personalities.
This will be a SINGLE person recording project, but you will
be expected to perform different voices.. This is
non-broadcast, non-commercial work for internal research and
development purposes only. Your voice will not be used in
public-facing or paid media.. Project Scope :. - Record 3
hours of audio performing dialogues between 2+ characters -
Adjust voice, tone, and accent based on character
descriptions - Ensure clear differentiation between
characters - Deliver RAW, high-quality WAV files according
to project specs - Complete up to 2 rounds of revisions (for
talent errors) Audition & Selection Process:. - Submit an
audition using only ONE of the sample scripts attached
below. IMPORTANT: If your name starts (First Name) with A-K
please select ONE of the first three scripts. If it starts
with L-Z, please select ONE of the second three scripts for
your audition. - Please submit auditions with the following
audio specs: Format: 24-bit / 48 kHz / mono / unprocessed
.wav Minimum: -60 dB noise floor No plugins, compression, or
post-processing Clean recordings with minimal background
noise, breaths, and clicks - The audio MUST be narrated by a
human. AI is NOT allowed. - After you are selected, the
three hours of audio will need to be delivered within one
week. Skills Needed:. - Voice Acting - Character Voice Work
- Native English UK Speaker Few reminders while recording
the script in a . WAV format:. Please make sure to provide
the required emotions needed as mentioned in the script
Please read the full script including narrators not only
characters Please do not speak too close to the mic.`;

const durationOptions = [
  { label: "More than 6 months", value: "more_than_6_months" },
  { label: "3 to 6 months", value: "3_to_6_months" },
  { label: "1 to 3 months", value: "1_to_3_months" },
  { label: "Less than 1 month", value: "less_than_1_month" },
];

const mockPortfolioProjects = [
  {
    id: 1,
    title: "Portfolio Project 1",
    description: "Portfolio Project 1 description",
    image: "/assets/images/portfolio-project-1.jpg",
  },
];

export default function Accept() {
  const [formData, setFormData] = useState({
    bid: null,
    receive: null,
    duration: null,
    coverLetter: "",
  });
  const { uid } = useRouter().query as { uid: string };
  const portfolioProjects = mockPortfolioProjects;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <FreelancerLayout
      seo={{
        title: "Proposal",
        description: "Proposal",
        url: `/nx/proposals/interview/${uid}/accept`,
      }}
    >
      <h1 className="text-4xl font-semibold">Submit a Proposal</h1>

      <div className="space-y-8">
        <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
          <h2 className="text-2xl font-medium">Job details</h2>

          <div className="flex items-start gap-4 border-b border-slate-300 pb-8">
            <div className="w-3/4 space-y-6 pr-8 border-r border-slate-300">
              <h3 className="text-xl font-medium">
                NEW - English (UK) Voice Actors Needed for Fictional Character
                Recording
              </h3>

              <div className="flex">
                <span className="bg-slate-200 py-0.5 px-3 rounded-md text-sm">
                  Voice Talent
                </span>
              </div>

              <div className="space-y-1 text-sm">
                <p>Description:</p>
                <CollapsableText
                  text={JOB_DESCRIPTION}
                  maxLength={400}
                  textClassName="text-sm"
                />
              </div>
              <Link
                href="#"
                className="underline text-sm cursor-pointer hover:text-blue-600"
              >
                View job posting
              </Link>
            </div>

            <div className="flex-1">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Icon
                    icon="streamline-ultimate:tag-dollar"
                    className="size-4 text-slate-600"
                  />
                  <div className="">
                    <p className="text-sm font-medium">Propose your terms</p>
                    <p className="text-xs text-slate-600">Fixed-price</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Calendar className="size-4 text-slate-600" />
                  <p className="text-sm text-slate-600">Posted Feb 11, 2026</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-medium">Skills and expertise</h2>
            <SkillsGroup
              skills={[
                "Voice Acting",
                "Character Voice Work",
                "Native English UK Speaker",
              ]}
            />
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Terms</h2>
              <p className="text-sm font-medium">
                What is the full amount you'd like to bid for this job?
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex-1">
                <ul className="text-sm">
                  <li className="py-4 border-b border-slate-300 flex items-center justify-between gap-4">
                    <div className="space-y-4">
                      <p className="font-medium">Bid</p>
                      <p className="text-slate-600">
                        Total amount the client will see on your proposal
                      </p>
                    </div>

                    <Input
                      type="number"
                      name="bid"
                      placeholder="$0.00"
                      required
                      value={formData.bid}
                      onChange={handleInputChange}
                    />
                  </li>

                  <li className="py-4 border-b border-slate-300 flex items-center justify-between gap-4">
                    <div className="space-y-4">
                      <p className="font-medium">Freelancer Service Fee</p>
                      <div className="flex items-center gap-1">
                        <p className="text-slate-600">
                          Fixed for the entire contract
                        </p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CircleQuestionMark className="size-4 text-slate-600 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-sm p-2">
                              This fee is based on factors that promote fair and
                              competitive work across categories.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <Input
                      type="number"
                      name="fee"
                      placeholder="$0.00"
                      disabled
                      value={null}
                      onChange={() => {}}
                    />
                  </li>

                  <li className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-4">
                      <p className="font-medium">You'll Receive</p>
                      <div className="flex items-center gap-1">
                        <p className="text-slate-600">
                          The estimated amount you'll receive after service fees
                        </p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CircleQuestionMark className="size-4 text-slate-600 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-sm p-2">
                              Amount may vary slightly due to rounding.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <Input
                      type="number"
                      name="receive"
                      placeholder="$0.00"
                      required
                      value={formData.receive}
                      onChange={handleInputChange}
                    />
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 px-10">
                <Image
                  src={DollarShield}
                  alt="Dollar Shield"
                  className="w-[110px] h-[100px]"
                />
                <div className="space-y-1 text-sm text-center">
                  <p className="text-slate-600">
                    Includes Worklanc Fixed-Price Protection.
                  </p>
                  <Link
                    href="#"
                    className="underline cursor-pointer hover:text-blue-600"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border border-slate-300 rounded-3xl flex">
            <Dropdown
              name="duration"
              label="How long will this project take?"
              labelClassName="text-sm! font-medium! mb-2!"
              placeholder="Select a duration"
              classname="w-1/4!"
              options={durationOptions}
              value={formData.duration}
              onSelect={(value) =>
                setFormData({ ...formData, duration: value })
              }
            />
          </div>

          <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
            <h2 className="text-2xl font-medium">Additional details</h2>
            <Textarea
              name="coverLetter"
              label="Cover Letter"
              labelClassName="text-sm! font-medium! mb-2!"
              classname="w-full!"
              required
              value={formData.coverLetter}
              onChange={handleTextareaChange}
            />

            <Textarea
              name="coverLetter"
              label="What is your main or most fluent language?"
              labelClassName="text-sm! font-medium! mb-2!"
              classname="w-full!"
              value={formData.coverLetter}
              onChange={handleTextareaChange}
            />

            <Textarea
              name="coverLetter"
              label="Can you commit to submitting three hours of audio within one week of being selected?"
              labelClassName="text-sm! font-medium! mb-2!"
              classname="w-full!"
              value={formData.coverLetter}
              onChange={handleTextareaChange}
            />

            <Textarea
              name="coverLetter"
              label="Please describe your experience in Voice Acting/Audio/Acting."
              labelClassName="text-sm! font-medium! mb-2!"
              classname="w-full!"
              value={formData.coverLetter}
              onChange={handleTextareaChange}
            />

            <div className="space-y-4">
              <label className="text-sm font-medium block">Attachments</label>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="border border-dashed border-slate-300 rounded-3xl py-8 w-full text-sm text-slate-600 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors duration-200"
              >
                <span>
                  Drag or{" "}
                  <strong className="font-medium underline text-black">
                    upload
                  </strong>{" "}
                  project files
                </span>
              </motion.button>
            </div>
          </div>

          <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-medium">Profile highlights</h2>
              <p className="text-sm text-slate-600">
                Highlight the most relevant items from your profile to
                demonstrate your experience and skills. You can add up to four
                highlights total.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <button
                type="button"
                className={`py-10 flex flex-col items-center justify-center gap-2 rounded-xl ${
                  portfolioProjects
                    ? "cursor-pointer hover:bg-slate-100 transition-colors duration-200 border border-slate-300"
                    : "cursor-not-allowed bg-slate-100"
                }`}
              >
                <Image src={PaintIcon} alt="Paint" className="w-11 h-10" />
                <p className="text-sm text-slate-600">
                  {portfolioProjects
                    ? "Add a portfolio project"
                    : "You don't have any portfolio projects."}
                </p>
              </button>

              <button
                type="button"
                className="py-10 bg-slate-100 flex flex-col items-center justify-center gap-2 rounded-xl"
              >
                <Image src={MedalIcon} alt="Medal" className="w-11 h-10" />
                <p className="text-sm text-slate-600">
                  You don't have any certificates.
                </p>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="primary"
              isSubmit
              label="Submit proposal"
              classname="py-2.5! px-5! rounded-full! font-medium! text-sm!"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className="text-sm font-medium cursor-pointer hover:underline px-5 py-2.5"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </FreelancerLayout>
  );
}

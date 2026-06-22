import { FreelancerLayout } from "@/components/layouts";
import { useRouter } from "next/router";
import { Calendar, CircleCheck, DollarSign } from "lucide-react";
import { SkillsGroup } from "@/components/molecules";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/atoms";
import { CollapsableText } from "@/components/common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const PERSONAL_NOTE = `NOTE: No connects will be deducted from your account if you
accept this invitation. Hello Marco N., I'm a Talent Specialist
and I'm reaching out about a unique work opportunity with
Lifted, an Worklanc company! Based on your background and
skills, I thought you might be interested in applying. This new
Lifted program would allow you to perform a variety of similar
freelance tasks for one of our enterprise clients. I encourage
you to submit a proposal if you think it's a good fit for you.
You can find project details within the job post. Please make
sure to answer the required pre-screening questions included in
the job posting and complete the form below to be considered for
the role and kindly add a sample recording of your voice in the
related language using the script attached within the job post.
Google form (mandatory) - https://forms.gle/2Ccq194G31XMEoZm8
Submit an audition using only ONE of the sample scripts attached
below. IMPORTANT: If your name starts with A-K please select ONE
of the first three scripts. If it starts with L-Z, please select
ONE of the second three scripts for your audition. Names
starting from A-K: Please choose ONLY one script from below to
record: Third Person Mystery
https://www.worklanc.com/att/download/openings/2021302904239269042/attachments/762ec60a-5979-463d-8878-6f9a0f6eb7e8/download
Third Person Mystery 1
https://www.worklanc.com/att/download/openings/2021302904239269042/attachments/762ec60a-5979-463d-8878-6f9a0f6eb7e8/download
Third Person Romance
https://www.worklanc.com/att/download/openings/2021302904239269042/attachments/0db6ecd5-df8f-48f1-87fa-53ca39f1ee06/download
Names starting from L-Z: Please choose ONLY one script from
below to record: Third Person Romance 1
https://www.worklanc.com/att/download/openings/2021302904239269042/attachments/ad3c1e10-d03b-41e8-bf0e-13618885850e/download
Third Person Scifi
https://www.worklanc.com/att/download/openings/2021302904239269042/attachments/78ecffa9-4eaf-4fcd-b0ab-ba92d4e61be5/download
Third Person Scifi 1
https://www.worklanc.com/att/download/openings/2021302904239269042/attachments/78ecffa9-4eaf-4fcd-b0ab-ba92d4e61be5/download
Technical Requirements for the sample: Format: 24-bit / 48 kHz /
mono / unprocessed .wav Minimum: -60 dB noise floor No plugins,
compression, or post-processing Clean recordings with minimal
background noise, breaths, and clicks The audio MUST be narrated
by a human. AI is NOT allowed. Please only record the ones
highlighted in the script. No need to tell in the recording who
the speaker is, it should be identified by the listeners based
on the voice description listed on the script. These are
auditions reviewed by the Program Managers and they decide upon
that. Looking forward to hearing from you soon! Thank you,
Ezinne Orimoloye -Lifted Enterprise Talent Specialist`;
export default function Interview() {
  const { uid } = useRouter().query as { uid: string };

  return (
    <FreelancerLayout
      seo={{
        title: "Proposals",
        description: "Proposals",
        url: `/proposals/interview/${uid}`,
      }}
    >
      <h1 className="text-4xl font-semibold">Invitation to apply</h1>

      <div className="flex items-start gap-8">
        <div className="w-3/4 space-y-8">
          <div className="flex items-center gap-2 bg-green-100 p-4 rounded-lg">
            <CircleCheck className="size-4 text-green-600" />
            <p className="text-sm font-medium">
              The client viewed your profile and would like you to submit a
              proposal!
            </p>
          </div>

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
                    <p className="text-sm text-slate-600">
                      Posted Feb 11, 2026
                    </p>
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

          <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
            <h2 className="text-2xl font-medium">Personal note from client</h2>
            <CollapsableText text={PERSONAL_NOTE} maxLength={400} />{" "}
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <Button
              type="primary"
              label="Apply for free"
              classname="w-full py-2.5! font-medium! text-sm! rounded-full!"
            />
            <Button
              type="outline"
              label="Decline interview"
              size="medium"
              classname="w-full py-2.5! border! font-medium! text-sm! rounded-full!"
            />
            <Button
              type="outline"
              label="Refer a freelancer"
              size="medium"
              classname="w-full py-2.5! border! font-medium! text-sm! rounded-full!"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">About the client</h3>
            <ul className="space-y-4 text-slate-600 text-sm">
              <Tooltip>
                <TooltipTrigger asChild>
                  <li className="flex items-center gap-2 text-blue-600 text-sm cursor-pointer">
                    <Icon icon="solar:buildings-outline" className="size-4" />
                    <p className="text-xs font-medium underline">
                      WORKLANC ENTERPRISE CLIENT
                    </p>
                  </li>
                </TooltipTrigger>
                <TooltipContent side="left" className="py-8 max-w-xl">
                  <div className="flex flex-col items-center justify-center gap-6">
                    <h3 className="text-xl font-medium">
                      Unlock more opportunities
                    </h3>
                    <p className="text-sm">
                      The average Worklanc Enterprise client has:
                    </p>

                    <div className="flex items-center gap-8">
                      <div className="flex flex-col items-center justify-center gap-2 flex-1">
                        <Icon
                          icon="material-symbols-light:trending-up"
                          className="size-10"
                        />
                        <p className="text-5xl text-blue-600 font-medium">
                          10x
                        </p>
                        <p className="text-xl font-medium text-center">
                          More jobs posted
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2 flex-1">
                        <DollarSign className="size-10" />
                        <p className="text-5xl text-blue-600 font-medium">
                          15x
                        </p>
                        <p className="text-xl font-medium text-center">
                          More money spent
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2 flex-1">
                        <Icon icon="hugeicons:new-job" className="size-10" />
                        <p className="text-5xl text-blue-600 font-medium">
                          50%
                        </p>
                        <p className="text-xl font-medium text-center px-4">
                          More work done
                        </p>
                      </div>
                    </div>

                    <Link
                      href="#"
                      className="text-sm font-medium hover:underline text-blue-600 cursor-pointer"
                    >
                      Learn more
                    </Link>
                  </div>
                </TooltipContent>
              </Tooltip>

              <li className="flex items-center gap-2">
                <Icon
                  icon="solar:verified-check-bold"
                  className="text-blue-600 size-4"
                />
                <span className="text-xs text-slate-600 font-medium">
                  Payment method verified
                </span>
              </li>

              <li className="">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Icon
                        key={index}
                        icon="mynaui:star-solid"
                        className="text-[#ff5900] size-4"
                      />
                    ))}
                  </div>
                  <span className="text-base font-medium">4.9</span>
                </div>
                <p className="text-sm">4.91 of 3,519 reviews</p>
              </li>

              <li className="">
                <p className="font-medium">United States</p>
                <div className="flex items-center gap-1">
                  <span>San Francisco</span>
                  <span>8:02 AM</span>
                </div>
              </li>

              <li className="">
                <p className="font-medium">216 jobs posted</p>
                <p>100% hire rate, 14 open jobs</p>
              </li>

              <li className="">
                <p className="font-medium">$3.7M total spent</p>
                <p>13,340 hires, 1,938 active</p>
              </li>

              <li className="">
                <p className="font-medium">$20.40 /hr avg hourly rate paid</p>
                <p>43,175 hours</p>
              </li>

              <li className="text-xs mt-8">Member since Aug 14, 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}

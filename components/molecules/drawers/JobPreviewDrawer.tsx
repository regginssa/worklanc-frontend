import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import {
  ArrowLeftIcon,
  ChevronDown,
  CircleQuestionMark,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SkillsGroup from "../SkillsGroup";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, Input } from "@/components/atoms";

export default function JobPreviewDrawer({
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
          <div className="flex items-center justify-between w-full p-2">
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
              Open job in a new window
              <ExternalLink className="size-5" />
            </Link>
          </div>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto">
          <div className="flex items-start">
            <div className="w-2/3 border-r border-slate-300">
              <div className="p-8 border-b border-slate-300 space-y-8">
                <h1 className="text-xl font-medium">
                  📷 No Skills Required – Take a Product Photo & Get Paid $20
                </h1>

                <div className="flex items-center gap-8 text-sm text-slate-600">
                  <span>Posted 15 hours ago</span>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:map-marker-outline" className="size-5" />
                    <span>Worldwide</span>
                  </div>
                </div>
              </div>

              <div className="p-8 border-b border-slate-300">
                <p className="text-sm">
                  Summary
                  <br />I need an accountability coach who can help me lock in
                  with my habits, cut out food addiction, track my macros, and
                  get the correct sleep. The ideal candidate will have
                  experience in accountability coaching, particularly in areas
                  like habit formation and nutrition. The role involves
                  providing guidance and support to help me achieve my health
                  and wellness goals.
                </p>
              </div>

              <div className="p-8 border-b border-slate-300 grid grid-cols-3 gap-8">
                <div className="flex items-start gap-2">
                  <Icon icon="mdi:clock-outline" className="size-5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">
                      Less than 30 hrs/week
                    </h3>
                    <p className="text-xs text-slate-800">Hourly</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Icon icon="mdi:calendar-outline" className="size-5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">1 to 3 months</h3>
                    <p className="text-xs text-slate-800">Duration</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Icon icon="stash:user-cog-light" className="size-5" />
                  <div className="space-y-1 flex-1">
                    <h3 className="text-sm font-medium">Intermediate</h3>
                    <p className="text-xs text-slate-800">
                      I am looking for a mix of experience and value
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Icon icon="mdi:timer-check-outline" className="size-5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">$10.00 - $25.00</h3>
                    <p className="text-xs text-slate-800">Hourly</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-b border-slate-300">
                <p className="text-sm">
                  <strong className="font-medium">Project Type:</strong> Ongoing
                  project
                </p>
              </div>

              <div className="p-8 border-b border-slate-300 space-y-6">
                <h3 className="text-xl font-medium">Skills and Expertise</h3>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Mandatory skills</h4>
                  <SkillsGroup
                    skills={["Photography", "Product Photography"]}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Nice-to-have skills</h4>
                  <SkillsGroup
                    skills={["Photography", "Product Photography"]}
                  />
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="">
                    <h3 className="text-xl font-medium">
                      Preferred qualifications
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">
                      Activity on this job
                    </h3>

                    <ul className="space-y-2">
                      <li className="flex items-center gap-1">
                        <span>Proposals:</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-sm p-2">
                              This range includes relevant proposals, but does
                              not include proposals that are withdrawn,
                              declined, or archived. Please note that all
                              proposals are accessible to clients on their
                              applicants page.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <span>5 to 10</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <span>Interviewing:</span>
                        <span>0</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <span>Invites sent:</span>
                        <span>0</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <span>Unanswered invites:</span>
                        <span>0</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-medium">
                    Upgrade your membership to see the bid range
                  </h4>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-md">
                      <div className="space-y-4 p-4">
                        <h4 className="text-xl font-medium text-center">
                          Upgrade to a Plus plan for more Connects and other
                          perks.
                        </h4>

                        <div className="w-full grid grid-cols-3 gap-2">
                          <div className="flex items-center gap-1 text-lg font-medium">
                            <h5>High $</h5>
                            <div className="px-4 py-2.5 bg-slate-700 rounded-md"></div>
                          </div>

                          <div className="flex items-center gap-1 text-lg font-medium">
                            <h5>Avg $</h5>
                            <div className="px-4 py-2.5 bg-slate-700 rounded-md"></div>
                          </div>

                          <div className="flex items-center gap-1 text-lg font-medium">
                            <h5>Low $</h5>
                            <div className="px-4 py-2.5 bg-slate-700 rounded-md"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <Button
                            type="primary"
                            label="Upgrade Membership"
                            classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
                          />
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="p-8 space-y-8">
                <div className="bg-slate-100 rounded-lg p-4 flex items-start gap-2">
                  <Icon icon="grommet-icons:announce" className="size-6" />

                  <div className="space-y-1 text-sm flex-1">
                    <p>
                      You’ll need Connects to bid. They’re like credits that
                      show clients you’re serious.
                    </p>
                    <Link
                      href="#"
                      className="underline cursor-pointer hover:text-blue-600"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    type="primary"
                    label="Buy Connects to apply"
                    classname="py-2.5! w-full! rounded-full! font-medium! text-sm!"
                  />

                  <Button
                    type="outline"
                    label="Save job"
                    size="medium"
                    icon="mdi:heart-outline"
                    classname="py-2.5! w-full! border! rounded-full! font-medium! text-sm!"
                  />

                  <button className="flex items-center gap-2 text-sm text-blue-600 py-2.5 w-full hover:underline font-medium cursor-pointer">
                    <Icon icon="mdi:flag-variant-outline" className="size-5" />
                    <span>Flag as inappropriate</span>
                  </button>
                </div>

                <div className="space-y-2 text-sm text-slate-800">
                  <div className="flex items-center gap-1">
                    <span>Required Connects to submit a proposal:</span>
                    <span className="text-slate-900 font-medium">20</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-sm p-2">
                          This is the number of Connects required to submit a
                          proposal for this job.{" "}
                          <Link href="#" className="underline cursor-pointer">
                            Learn more
                          </Link>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Available Connects:</span>
                    <span className="text-slate-900 font-medium">0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-medium">About the client</h3>

                  <ul className="space-y-1 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <Icon
                        icon="solar:verified-check-bold"
                        className="text-blue-600 size-4"
                      />
                      <span>Payment method verified</span>
                    </li>

                    <li className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Icon
                            key={index}
                            icon="solar:star-bold"
                            className="text-[#ff5900] size-4"
                          />
                        ))}
                      </div>
                      <span className="text-base font-medium">4.8</span>
                    </li>
                    <li className="text-sm">4.89 of 13 reviews</li>
                  </ul>

                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="font-medium">United Kingdom</li>
                    <li>Melton Mowbray 4:32 PM</li>
                  </ul>

                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="font-medium">62 jobs posted</li>
                    <li>28% hire rate, 1 open job</li>
                  </ul>

                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="font-medium">$931 total spent</li>
                    <li>18 hires, 1 active</li>
                  </ul>

                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="font-medium">
                      $15.00 /hr avg hourly rate paid
                    </li>
                    <li>46 hours</li>
                  </ul>

                  <p className="text-sm text-slate-600">
                    Small company (2-9 people)
                  </p>

                  <p className="text-xs text-slate-600">
                    Member since Jan 4, 2020
                  </p>

                  <div className="space-y-2">
                    <Input
                      type="url"
                      name="jobLink"
                      label="Job link"
                      labelClassName="font-medium mb-2! block!"
                      disabled
                      value="https://www.worklanc.com/jobs/"
                      onChange={() => {}}
                    />
                    <button className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                      Copy link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLIENT's REVIEWS */}
          <div className="p-8">
            <div className="border border-slate-300 rounded-3xl">
              <div className="p-8 border-b border-slate-300 space-y-6">
                <h3 className="text-xl font-medium">
                  Client's recent history (16)
                </h3>

                <button className="cursor-pointer w-full flex items-center justify-between text-sm">
                  <span className="underline">Jobs in progress</span>
                  <ChevronDown className="size-6 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

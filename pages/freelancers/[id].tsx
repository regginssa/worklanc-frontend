import { FreelancerLayout } from "@/components/layouts";
import Image from "next/image";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import { Button, IconButton, TabBar } from "@/components/atoms";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  EducationDialog,
  EmploymentDialog,
  FreelancerPlusAlert,
  TitleDialog,
} from "@/components/molecules";
import { useState } from "react";
import BagOpenIcon from "@/public/assets/svgs/icons/other/bag_open.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TestimonialIcon from "@/public/assets/svgs/icons/other/testinimal.svg";
import PrizeIcon from "@/public/assets/svgs/icons/other/prize.svg";
import FolderIcon from "@/public/assets/svgs/icons/other/folder_open.svg";
import { Education, Employment } from "@/types/user";

export default function FreelancerProfil() {
  const [portfolioTabIdx, setPortfolioTabIdx] = useState(0);
  const [titleOpen, setTitleOpen] = useState(false);
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [employments, setEmployments] = useState<Employment[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [title, setTitle] = useState("");

  return (
    <FreelancerLayout
      seo={{
        title:
          "Marco N. - Accouting & Consulting - Worklanc Freelancer from London, United Kingdom",
        description: "",
        url: "/freelancers/1",
      }}
    >
      <div className="border border-slate-300 rounded-3xl">
        <div className="p-8 border-b border-slate-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-[96px] h-[96px]">
                <span className="absolute top-1 left-1 w-4 h-4 bg-green-600 border-2 border-white rounded-full"></span>
                <Image
                  src={UserPic}
                  alt="User"
                  className="w-[96px] h-[96px] object-contain rounded-full"
                />
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="absolute bottom-0 right-0 bg-white! p-1!"
                  onClick={() => {}}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-medium">Marco N.</h1>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:verified-check-bold-duotone"
                      className="w-6 h-6 text-slate-400"
                    />
                    <Link href="#" className="text-sm underline">
                      Verify your identity
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:map-marker-outline"
                    className="w-5 h-5 text-slate-400"
                  />
                  <span className="text-sm text-slate-600">
                    London, United Kingdom – 10:42 am local time
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="outline"
                label="See public view"
                size="medium"
                classname="px-5! py-2! rounded-full! text-sm! font-medium!"
              />
              <Button
                type="primary"
                label="Profile settings"
                classname="px-5! py-2! border-2 border-blue-600 rounded-full! text-sm! font-medium!"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 flex items-center gap-2 hover:text-blue-500 transition-all duration-200 cursor-pointer"
            >
              <span className="text-sm font-medium">Share</span>
              <Icon icon="mdi:ios-share" className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-1/3">
            <div className="p-8 border-b border-slate-300">
              <FreelancerPlusAlert />
            </div>

            <div className="p-8 space-y-8">
              <div className="p-6 rounded-2xl bg-slate-200 space-y-4">
                <h3 className="text-2xl font-medium">Promote with ads</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium">Availability badge</h4>
                    <span className="text-slate-600 text-sm">Off</span>
                  </div>

                  <Icon
                    icon="mdi:pencil-outline"
                    className="w-5 h-5 text-slate-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium">Boost your profile</h4>
                    <span className="text-slate-600 text-sm">Off</span>
                  </div>

                  <Icon
                    icon="mdi:pencil-outline"
                    className="w-5 h-5 text-slate-600"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-100 space-y-4">
                <h3 className="text-xl font-medium">Connects: 0</h3>

                <div className="flex items-center justify-between text-sm">
                  <Link href="#" className="hover:underline">
                    View details
                  </Link>
                  <div className="w-[1px] h-3 bg-black"></div>
                  <Link href="#" className="hover:underline">
                    Buy connects
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Video introduction</h3>
                <IconButton
                  variant="outline"
                  icon="mdi:plus"
                  className="p-1!"
                  onClick={() => {}}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Hours per week</h3>
                  <IconButton
                    variant="outline"
                    icon="mdi:pencil-outline"
                    className="p-1!"
                    onClick={() => {}}
                  />
                </div>

                <div className="text-sm mt-4">
                  <p>More than 30 hrs/week</p>
                  <p className="text-slate-600 mt-1">
                    No contract-to-hire preference set
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Languages</h3>
                  <div className="flex items-center gap-4">
                    <IconButton
                      variant="outline"
                      icon="mdi:plus"
                      className="p-1!"
                      onClick={() => {}}
                    />
                    <IconButton
                      variant="outline"
                      icon="mdi:pencil-outline"
                      className="p-1!"
                      onClick={() => {}}
                    />
                  </div>
                </div>

                <ul className="text-sm mt-4 space-y-2">
                  <li className="text-slate-600">
                    <span className="font-medium text-slate-900">
                      English:{" "}
                    </span>
                    Native or Bilingual
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">Verifications</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">ID:</span>
                    <div className="flex items-center gap-2">
                      <span>Unverified</span>
                      <Icon
                        icon="solar:verified-check-bold-duotone"
                        className="w-5 h-5 text-slate-400"
                      />
                      <Link href="#" className="text-sm underline">
                        Verify your identity
                      </Link>
                    </div>
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="font-medium">Phone number:</span>
                    <div className="flex items-center gap-2">
                      <span>Verified</span>
                      <Icon
                        icon="solar:verified-check-bold"
                        className="w-5 h-5 text-blue-600"
                      />
                    </div>
                  </li>

                  <li className="flex items-center justify-between">
                    <span className="font-medium">Military veteran:</span>
                    <IconButton
                      variant="outline"
                      icon="mdi:plus"
                      className="p-1!"
                      onClick={() => {}}
                    />
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Licenses</h3>
                <IconButton
                  variant="outline"
                  icon="mdi:plus"
                  className="p-1!"
                  onClick={() => {}}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Education</h3>
                  <IconButton
                    variant="outline"
                    icon="mdi:plus"
                    className="p-1!"
                    onClick={() => setEducationOpen(true)}
                  />
                </div>

                <ul className="text-sm mt-4 space-y-2">
                  <li className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h5 className="font-medium">University of London</h5>
                      <p className="text-slate-600">
                        Bachelor of Accountancy (BAcc), Economics
                      </p>
                      <p className="text-slate-600">2018 - 2022</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <IconButton
                        variant="outline"
                        icon="mdi:pencil-outline"
                        className="p-1!"
                        onClick={() => {}}
                      />
                      <IconButton
                        variant="outline"
                        icon="mdi:trash-can-outline"
                        className="p-1!"
                        onClick={() => {}}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="p-8 border-b border-slate-300 space-y-14">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-medium">
                    Accounting & Consulting
                  </h3>
                  <IconButton
                    variant="outline"
                    icon="mdi:pencil-outline"
                    className="p-1!"
                    onClick={() => setTitleOpen(true)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium">$52.00/hr</span>

                  <IconButton
                    variant="outline"
                    icon="mdi:pencil-outline"
                    className="p-1!"
                    onClick={() => {}}
                  />
                  <IconButton
                    variant="outline"
                    icon="solar:link-minimalistic-bold"
                    className="p-1!"
                    onClick={() => {}}
                  />
                </div>
              </div>

              <div className="flex items-start gap-8">
                <p className="text-sm">
                  Marco is a certified public accountant with over 10 years of
                  experience in accounting and consulting. He has worked with a
                  variety of clients, from small businesses to large
                  corporations.
                </p>
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="p-1!"
                  onClick={() => {}}
                />
              </div>
            </div>

            <div className="p-8 border-b border-slate-300 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium">Portfolio</h3>
                <IconButton
                  variant="outline"
                  icon="mdi:plus"
                  className="p-1!"
                  onClick={() => {}}
                />
              </div>

              <div className="">
                <TabBar
                  tabs={[
                    { label: "Published", value: "published" },
                    { label: "Drafts", value: "drafts" },
                  ]}
                  selectedTabIndex={portfolioTabIdx}
                  onTab={setPortfolioTabIdx}
                />

                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                  <Image
                    src={BagOpenIcon}
                    alt="Bag"
                    className="w-[145px] h-[130px] object-contain"
                  />
                  <p className="text-sm">
                    <button className="text-blue-600 cursor-pointer hover:underline">
                      Add a project.
                    </button>{" "}
                    Talent are hired 9x more often if they’ve published a
                    portfolio.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 border-b border-slate-300 space-y-6">
              <h3 className="text-2xl font-medium">Work history</h3>
              <ul className="text-sm">
                <li className="text-slate-600">No items</li>
              </ul>
            </div>

            <div className="p-8 border-b border-slate-300 space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-medium">Skills</h3>
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="p-1!"
                  onClick={() => {}}
                />
              </div>

              <div>
                <p className="text-sm text-slate-600">Self-reported</p>
                <ul className="flex flex-wrap items-center gap-2 mt-2">
                  {[
                    { label: "Accounting", value: "accounting" },
                    { label: "Consulting", value: "consulting" },
                  ].map((skill) => (
                    <li
                      key={skill.value}
                      className="py-1 px-4 rounded-md bg-slate-200 text-sm text-slate-800"
                    >
                      {skill.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1 text-slate-600">
                  <p className="text-sm">Working style</p>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon
                        icon="mdi:question-mark-circle-outline"
                        className="w-4 h-4"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-sm p-2">
                        This science-backed assessment helps you understand how
                        you work best and connect with the right clients. There
                        are no right or wrong answers, only insights into your
                        natural strengths and working style.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="p-4 rounded-xl bg-blue-100 flex items-start gap-4 mt-2">
                  <Icon
                    icon="mdi:account-star-outline"
                    className="w-6 h-6 text-blue-600"
                  />
                  <p className="text-sm font-medium">
                    Help clients see why you’re the right fit and boost your
                    chances of getting hired by highlighting strengths beyond
                    hard skills.{" "}
                    <Link href="#" className="underline cursor-pointer">
                      Take assessment
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <h3 className="text-2xl font-medium">Your project catalog</h3>
              <p className="text-sm">
                Projects are a new way to earn on Worklanc that helps you do
                more of the work you love to do. Create project offerings that
                highlight your strengths and attract more clients.
              </p>

              <Button
                type="outline"
                label="Manage projects"
                size="medium"
                classname="py-2! px-5! text-sm! font-medium! rounded-full!"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-medium">Testimonials</h3>
            <p className="mt-1 text-sm">Endorsements from past clients</p>
          </div>

          <IconButton
            variant="outline"
            icon="mdi:plus"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex flex-col items-center gap-6 py-10">
          <Image
            src={TestimonialIcon}
            alt="Testimonial"
            className="w-[145px] h-[130px] object-contain"
          />
          <div className="text-center text-sm">
            <p className="">
              Showcase your skills with non-Worklanc client testimonials
            </p>
            <button className="text-blue-600 font-medium hover:underline cursor-pointer mt-4">
              Request a testimonial
            </button>
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium">Certifications</h3>

          <IconButton
            variant="outline"
            icon="mdi:plus"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex flex-col items-center gap-6 py-10">
          <Image
            src={PrizeIcon}
            alt="Prize"
            className="w-[145px] h-[130px] object-contain"
          />
          <div className="text-center text-sm">
            <p className="">
              Listing your certifications can help prove your specific knowledge
              or abilities. (+10%)
            </p>
            <button className="text-blue-600 font-medium hover:underline cursor-pointer mt-4">
              Add certification
            </button>
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium">Employment history</h3>

          <IconButton
            variant="outline"
            icon="mdi:plus"
            className="p-1!"
            onClick={() => setEmploymentOpen(true)}
          />
        </div>

        <ul className="space-y-6">
          <li className="flex items-start justify-between">
            <div className="">
              <h5 className="text-lg font-medium">Accouting | Microsoft</h5>
              <p className="text-sm text-slate-600 mt-2">
                August 2021 - Present
              </p>
              <p className="text-sm text-slate-600 mt-4">
                Designed and implemented a new accounting system for the company
              </p>
            </div>
            <div className="flex items-center gap-4">
              <IconButton
                variant="outline"
                icon="mdi:pencil-outline"
                className="p-1!"
                onClick={() => {}}
              />
              <IconButton
                variant="outline"
                icon="mdi:trash-can-outline"
                className="p-1!"
                onClick={() => {}}
              />
            </div>
          </li>
        </ul>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium">Other experiences</h3>

          <IconButton
            variant="outline"
            icon="mdi:plus"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex flex-col items-center gap-6 py-10">
          <Image
            src={FolderIcon}
            alt="Other experiences"
            className="w-[145px] h-[130px] object-contain"
          />
          <div className="text-center text-sm">
            <p className="">
              Add any other experiences that help you stand out
            </p>
            <button className="text-blue-600 font-medium hover:underline cursor-pointer mt-4">
              Add an experience
            </button>
          </div>
        </div>
      </div>

      <EmploymentDialog
        open={employmentOpen}
        onClose={() => setEmploymentOpen(false)}
        onSave={() => {}}
        formData={employments[0]}
        onChangeFormData={(data) => setEmployments(data)}
      />

      <EducationDialog
        open={educationOpen}
        onClose={() => setEducationOpen(false)}
        onSave={() => {}}
        formData={educations[0]}
        onChangeFormData={(data) => {}}
      />

      <TitleDialog
        open={titleOpen}
        onClose={() => setTitleOpen(false)}
        title={title}
        onChangeTitle={setTitle}
        onSave={() => {}}
      />
    </FreelancerLayout>
  );
}

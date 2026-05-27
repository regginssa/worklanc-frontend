import { FreelancerLayout } from "@/components/layouts";
import Image from "next/image";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import { Button, IconButton } from "@/components/atoms";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "motion/react";
import { FreelancerPlusAlert } from "@/components/molecules";

export default function FreelancerProfil() {
  return (
    <FreelancerLayout
      seo={{
        title:
          "Marco N. - Accouting & Consulting - WorkLanc Freelancer from London, United Kingdom",
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
                    onClick={() => {}}
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
                    onClick={() => {}}
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
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}

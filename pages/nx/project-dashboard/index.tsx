import { Button } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import BannerPng from "@/public/assets/pngs/project-dashboard-banner.png";
import BannerSvg from "@/public/assets/svgs/project-dashboard-banner.svg";
import Image from "next/image";
import { Icon } from "@iconify/react";
import LaptopLib from "@/public/assets/svgs/icons/other/laptop_lib.svg";
import PaperHand from "@/public/assets/svgs/icons/other/paper_hand.svg";
import FlagCheck from "@/public/assets/svgs/icons/other/flag_check.svg";
import Tips1 from "@/public/assets/webps/tips-for-success-1.webp";
import Tips2 from "@/public/assets/webps/tips-for-success-2.webp";
import Tips3 from "@/public/assets/webps/tips-for-success-3.webp";
import Link from "next/link";

export default function ProjectDashboard() {
  return (
    <FreelancerLayout
      seo={{
        title: "Project List - Worklanc",
        description: "Manage your projects and get paid",
        url: "/nx/project-dashboard",
      }}
    >
      <div className="flex items-center justify-between gap-20">
        <div className="space-y-8 w-2/5">
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold">
              Create and manage your services
            </h2>
            <p className="text-base">
              Explore new ways to earn on Worklanc. With Catalog projects,
              clients come to you. So you can spend more time working on the
              things you love.
            </p>
          </div>

          <Button
            type="primary"
            label="Create a project"
            classname="rounded-md! text-base! font-medium! py-2.5! px-6!"
          />
        </div>
        <Image
          src={BannerPng}
          alt="Banner"
          className="w-[512px] h-auto object-cover"
        />
      </div>

      <div className="p-10 rounded-lg bg-slate-50 flex items-center justify-between gap-10 mt-10">
        <div className="space-y-8 w-3/5">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold">
              Create your first fixed-price project
            </h2>
            <p className="text-base">
              Package your most popular services to attract clients. You define
              the scope, timeline, and price for each project upfront.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <Icon icon="hugeicons:mail-open" className="size-5" />
              <span className="text-base">
                Build a portfolio doing what you do best
              </span>
            </li>

            <li className="flex items-center gap-4">
              <Icon icon="streamline-plump:bag-suitcase-4" className="size-5" />
              <span className="text-base">
                Get discovered by clients who are looking for your unique skills
              </span>
            </li>

            <li className="flex items-center gap-4">
              <Icon icon="tabler:checkbox" className="size-5" />
              <span className="text-base">No Connects needed</span>
            </li>
          </ul>

          <Button
            type="primary"
            label="Create a project"
            classname="rounded-md! text-base! font-medium! py-2.5! px-6!"
          />
        </div>

        <Image src={BannerSvg} alt="Banner svg" className="w-[407px] h-auto" />
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-4xl font-semibold">How it works</h2>

        <ul className="grid grid-cols-3 gap-8">
          <li className="space-y-6">
            <div className="flex items-center justify-center bg-slate-50 py-6">
              <Image
                src={PaperHand}
                alt="Paper hand"
                className="w-[145px] h-[130px]"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-medium">Get an order</h3>
              <p className="text-base">
                Someone purchased your project! 🎉 Take a look at the work they
                need done.
              </p>
            </div>
          </li>

          <li className="space-y-6">
            <div className="flex items-center justify-center bg-slate-50 py-6">
              <Image
                src={LaptopLib}
                alt="Laptop library"
                className="w-[145px] h-[130px]"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-medium">Work on the project</h3>
              <p className="text-base">
                Work on the client's project. Send a message or schedule a
                meeting if you need to connect.
              </p>
            </div>
          </li>

          <li className="space-y-6">
            <div className="flex items-center justify-center bg-slate-50 py-6">
              <Image
                src={FlagCheck}
                alt="Flag check"
                className="w-[145px] h-[130px]"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-medium">Finish up and get paid</h3>
              <p className="text-base">
                Send your work to the client. You'll get paid when they approve
                and close the contract.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-4xl font-semibold">Tips for success</h2>

        <ul className="grid grid-cols-3 gap-8">
          <li className="space-y-6">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={Tips1}
                alt="Tips 1"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-medium">
                Use high-quality images or videos
              </h3>
              <p className="text-base">
                Show off your professional skills by adding work from your
                portfolio.
              </p>
            </div>
          </li>

          <li className="space-y-6">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={Tips2}
                alt="Tips 2"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-medium">
                Respond quickly to clients
              </h3>
              <p className="text-base">
                Clients can send questions before they buy. Try responding to
                these messages quickly so you're more likely to get an order.
              </p>
            </div>
          </li>

          <li className="space-y-6">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={Tips3}
                alt="Tips 3"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-medium">
                Share with your social network
              </h3>
              <p className="text-base">
                Tell the world that you're open to new work. Send a link to
                anyone or share it directly on your social media feeds.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="space-y-6 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-semibold">More resources</h2>
          <Link
            href="#"
            className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
          >
            <span>See all articles</span>
            <Icon icon="mdi:arrow-right" className="size-5" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-8">
          <li className="">
            <Link
              href="#"
              className="rounded-lg border border-slate-300 shadow-lg p-6 flex items-center gap-6 cursor-pointer hover:shadow-xl"
            >
              <Icon icon="iconoir:page-edit" className="size-8" />
              <div className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">Project catalog</span>
                <span className="text-xl font-medium">
                  Tips for creating a project
                </span>
              </div>
            </Link>
          </li>

          <li className="">
            <Link
              href="#"
              className="rounded-lg border border-slate-300 shadow-lg p-6 flex items-center gap-6 cursor-pointer hover:shadow-xl"
            >
              <Icon icon="hugeicons:mail-open" className="size-8" />
              <div className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">Project catalog</span>
                <span className="text-xl font-medium">
                  Learn how we review your projects
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </FreelancerLayout>
  );
}

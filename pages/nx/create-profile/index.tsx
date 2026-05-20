import { Button } from "@/components/atoms";
import { OnboardingLayout } from "@/components/layouts/auth/OnboardingLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/router";

const TOP_RATED_PLUS = require("@/public/assets/svgs/icons/badges/top_rated_plus.svg");

export default function CreateProfile() {
  const router = useRouter();

  return (
    <OnboardingLayout
      seo={{
        title: "Hey John. Ready for your next big opportunity?",
        description: "",
        url: "/nx/create-profile",
      }}
    >
      <div className="w-7xl mx-auto flex items-stretch gap-20">
        <div className="flex-1 space-y-8 min-w-0">
          <h3 className="text-3xl">
            Hey John. Ready for your next big opportunity?
          </h3>

          <ul className="text-slate-900 text-sm">
            <li className="flex items-center gap-6 py-8 border-b border-slate-300">
              <Icon
                icon="material-symbols-light:account-circle-outline"
                width={32}
              />
              <p>Answer a few questions and start building your profile</p>
            </li>
            <li className="flex items-center gap-6 py-8 border-b border-slate-300">
              <Icon
                icon="material-symbols-light:hand-package-outline"
                width={32}
              />
              <p>Apply for open roles or list services for clients to buy</p>
            </li>
            <li className="flex items-center gap-6 py-8 border-b border-slate-300">
              <Icon
                icon="material-symbols-light:money-bag-outline"
                width={32}
              />
              <p>Get paid safely and know we’re there to help</p>
            </li>
          </ul>
          <div className="mt-8 flex items-center justify-between gap-8">
            <Button
              type="primary"
              label="Get started"
              classname="font-semibold! text-sm! rounded-full! py-3! px-5!"
              onClick={() => router.push("/nx/create-profile/experience")}
            />
            <p className="text-sm text-slate-600">
              It only takes 5-10 minutes and you can edit it later. We’ll save
              as you go.
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex">
          <Carousel className="w-full h-full border-none!">
            <CarouselContent className="h-full border-none!">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="h-full basis-full">
                  <ProfileCard />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </OnboardingLayout>
  );
}

function ProfileCard() {
  return (
    <Card className="w-full h-full border border-slate-200 rounded-4xl">
      <CardContent className="w-full h-full flex flex-col items-center justify-center gap-4 py-6 px-10">
        <div className="w-[150px] h-[150px] rounded-full relative">
          <Image
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
          <span className="w-6 h-6 rounded-full bg-green-600 absolute left-2 top-2 border-4 border-white"></span>
          <Image
            src={TOP_RATED_PLUS}
            alt="Top rated plus"
            width={24}
            height={24}
            className="absolute bottom-2 right-2"
          />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl">Sasheen M.</h1>
          <p className="text-sm font-light">Customer Experience Consultant</p>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Image
              src={TOP_RATED_PLUS}
              alt="Top rated plus"
              width={24}
              height={24}
            />
            <span>5.0</span>
          </div>
          <span>$65.00/hr</span>
          <div className="flex items-center gap-2">
            <Icon
              icon="material-symbols-light:checked-bag-outline-rounded"
              width={32}
            />
            <span>14 jobs</span>
          </div>
        </div>

        <p className="text-2xl text-center">
          “Upwork has enabled me to increase my rates. I know what I'm bringing
          to the table and love the feeling of being able to help a variety of
          clients.”
        </p>
      </CardContent>
    </Card>
  );
}

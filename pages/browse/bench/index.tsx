import { Button } from "@/components/atoms";
import { BenchLayout } from "@/components/layouts";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { TalentDiscoverItem } from "@/components/common";
import { useQuery } from "@tanstack/react-query";
import CategoriesAPI from "@/lib/api/categories";
import { motion } from "motion/react";
import { useState } from "react";

export default function Discover() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.getAll,
  });
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);

  return (
    <BenchLayout
      seo={{
        title: "Discover talent - Worklanc",
        description: "Discover talent - Worklanc",
        url: "/browse/bench",
      }}
    >
      <section>
        <h1 className="text-3xl font-medium">Discover</h1>
        <p className="text-sm text-slate-600">
          Tailored talent matches to help you hire the right person faster
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Recently viewed</h2>
          <Button
            type="secondary"
            label="See all recently viewed"
            icon="mdi:search"
            classname="rounded-full! text-sm! font-medium!"
          />
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="flex items-stretch">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                <TalentDiscoverItem
                  name="John Doe"
                  title="Software Engineer"
                  avatar="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  badge="TOP_RATED_PLUS"
                  earnedAmount={1000}
                  hourlyRate={100}
                  isJobSuccess={true}
                  isOnline={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 z-10 bg-white shadow-md size-10 disabled:bg-slate-200! disabled:opacity-100! disabled:text-slate-600!" />
          <CarouselNext className="right-0 z-10 bg-white shadow-md size-10 disabled:bg-slate-200! disabled:opacity-100! disabled:text-slate-600!" />
        </Carousel>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Talent in your area</h2>
          <Button
            type="secondary"
            label="See more from this area"
            icon="mdi:search"
            classname="rounded-full! text-sm! font-medium!"
          />
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="flex items-stretch">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                <TalentDiscoverItem
                  name="John Doe"
                  title="Software Engineer"
                  avatar="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  badge="TOP_RATED_PLUS"
                  earnedAmount={1000}
                  hourlyRate={100}
                  isJobSuccess={true}
                  isOnline={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 z-10 bg-white shadow-md size-10 disabled:bg-slate-200! disabled:opacity-100! disabled:text-slate-600!" />
          <CarouselNext className="right-0 z-10 bg-white shadow-md size-10 disabled:bg-slate-200! disabled:opacity-100! disabled:text-slate-600!" />
        </Carousel>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">
            Talent with high Job Success Scores
          </h2>
          <Button
            type="secondary"
            label="See more profiles"
            icon="mdi:search"
            classname="rounded-full! text-sm! font-medium!"
          />
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="flex items-stretch">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                <TalentDiscoverItem
                  name="John Doe"
                  title="Software Engineer"
                  avatar="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  badge="TOP_RATED_PLUS"
                  earnedAmount={1000}
                  hourlyRate={100}
                  isJobSuccess={true}
                  isOnline={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 z-10 bg-white shadow-md size-10 disabled:bg-slate-200! disabled:opacity-100! disabled:text-slate-600!" />
          <CarouselNext className="right-0 z-10 bg-white shadow-md size-10 disabled:bg-slate-200! disabled:opacity-100! disabled:text-slate-600!" />
        </Carousel>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-medium">Browse by category</h2>

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse h-10 bg-slate-100 rounded-md"
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-6">
            {categories?.map((category) => (
              <li key={category.slug} className="space-y-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`text-lg font-medium cursor-pointer ${
                    selectedCategorySlug === category.slug
                      ? "text-blue-600"
                      : ""
                  }`}
                  onClick={() => setSelectedCategorySlug(category.slug)}
                >
                  {category.name}
                </motion.button>

                {selectedCategorySlug === category.slug && (
                  <ul className="flex flex-wrap gap-2">
                    {category.children.map((child) => (
                      <li
                        key={child.slug}
                        className="border border-slate-600 py-1 px-2 cursor-pointer rounded-sm text-sm text-slate-600 hover:text-black hover:border-black transition-all duration-200"
                      >
                        {child.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </BenchLayout>
  );
}

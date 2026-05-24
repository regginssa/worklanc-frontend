import { Button, Checkbox } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import CategoriesAPI from "@/lib/api/categories";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useRouter } from "next/router";

export default function Categories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.getAll,
  });

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch categories", { position: "top-center" });
    }
  }, [error]);

  const activeCategory = useMemo(
    () => categories?.find((c) => c.slug === selectedCategorySlug),
    [categories, selectedCategorySlug]
  );

  const toggleSpecialty = (slug: string) => {
    setSelectedSpecialties((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) {
        setShowInfo(true);
        return prev;
      }
      setShowInfo(false);
      return [...prev, slug];
    });
  };

  return (
    <CreateProfileLayout
      title="Great, so what kind of work are you here to do?"
      description="Don't worry, you can change these choices later on."
      currentStep={2}
      totalSteps={10}
      seo={{
        title: "What are the main services you offer?",
        description: "What are the main services you offer?",
        url: "/nx/create-profile/categories",
      }}
    >
      <div className="flex items-start border-t border-slate-300 gap-6 py-6">
        <div className="w-1/4 min-w-[180px]">
          <p className="text-xs text-slate-500">Select 1 category</p>

          <ul className="border-r border-slate-300 mt-6 space-y-4 pr-6">
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <li
                    key={i}
                    className="text-sm animate-pulse p-2 rounded-md bg-slate-100 h-6"
                  />
                ))
              : categories?.map((category) => (
                  <li
                    key={category.slug}
                    className={`text-sm cursor-pointer hover:text-blue-600 transition-all duration-200 ${
                      selectedCategorySlug === category.slug
                        ? "text-blue-600"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCategorySlug(category.slug);
                      setSelectedSpecialties([]);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
          </ul>
        </div>

        <div className="flex-1 min-w-0">
          <div>
            <p className="text-xs text-slate-500 mb-6">
              Now, select 1 to 3 specialties
            </p>

            {!selectedCategorySlug ? (
              <p className="text-sm text-slate-400">
                Choose a category on the left to see specialties.
              </p>
            ) : (
              <ul className="space-y-4">
                {activeCategory?.children.map((child) => {
                  const isSelected = selectedSpecialties.includes(child.slug);
                  return (
                    <li
                      key={child.slug}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheck={() => toggleSpecialty(child.slug)}
                        className="w-5! h-5!"
                      />
                      <span>{child.name}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {selectedSpecialties.length > 0 && (
            <div className="mt-6 space-y-6 flel flex-col">
              {showInfo && (
                <div className="items-start gap-2 bg-yellow-50 p-5 inline-flex">
                  <Icon
                    icon="material-symbols-light:info-rounded"
                    className="w-5 h-5 text-yellow-500"
                  />
                  <p className="text-sm ">
                    Select up to 3 specialties. You’ll be able to change and add
                    to these later on.
                  </p>
                </div>
              )}

              <button
                className="flex items-center gap-2 hover:underline cursor-pointer"
                onClick={() => {
                  setSelectedSpecialties([]);
                }}
              >
                <Icon icon="mdi:times" className="w-5 h-5" />
                <span>Clear selections</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, add your skills"
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() => router.push("/nx/create-profile/goal")}
        />
      </div>
    </CreateProfileLayout>
  );
}

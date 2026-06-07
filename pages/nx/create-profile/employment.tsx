import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  Button,
  Checkbox,
  Input,
  SearchCombobox,
  Textarea,
} from "@/components/atoms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import type { EmploymentFormInput } from "@/types/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { countries } from "country-data-list";
import { DateDropdown } from "@/components/molecules";
import FolderIcon from "@/public/assets/svgs/icons/other/folder.svg";
import Image from "next/image";
import { formatMonthYear } from "@/utils/df";

export default function Employment() {
  const [experiences, setExperiences] = useState<EmploymentFormInput[]>([]);
  const [formData, setFormData] = useState<EmploymentFormInput>({
    title: "",
    company: "",
    city: "",
    country: "",
    isCurrent: false,
    startedAt: new Date(),
    endAt: new Date(),
    description: "",
  });
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { profile, saveStep, skipStep, saving, skipping } = useOnboarding();
  const seeded = useRef(false);

  useEffect(() => {
    if (!profile || seeded.current) return;
    seeded.current = true;
    if (profile.employment?.length) {
      setExperiences(
        profile.employment.map((item: any) => ({
          title: item.title || "",
          company: item.company || "",
          city: item.city || "",
          country: item.country || "",
          isCurrent: Boolean(item.isCurrent),
          startedAt: item.startedAt ? new Date(item.startedAt) : new Date(),
          endAt: item.endAt ? new Date(item.endAt) : new Date(),
          description: item.description || "",
        }))
      );
    }
  }, [profile]);

  const handleNext = () =>
    saveStep(
      {
        employment: experiences.map((experience) => ({
          title: experience.title,
          company: experience.company,
          city: experience.city,
          country: experience.country,
          startedAt: experience.startedAt,
          endAt: experience.endAt,
          isCurrent: experience.isCurrent,
          description: experience.description,
        })),
      },
      "/nx/create-profile/education"
    );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setExperiences([...experiences, formData]);
    setFormData({
      title: "",
      company: "",
      city: "",
      country: "",
      isCurrent: false,
      startedAt: new Date(),
      endAt: new Date(),
      description: "",
    });
    setOpen(false);
  };

  const handleDelete = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setFormData(experiences[index]);
    setOpen(true);
  };

  return (
    <CreateProfileLayout
      title="If you have relevant work experience, add it here."
      description="Freelancers who add their experience are twice as likely to win work. But if you’re just starting out, you can still create a great profile. Just head on to the next page."
      currentStep={5}
      totalSteps={10}
      seo={{
        title: "If you have relevant work experience, add it here.",
        description:
          "Freelancers who add their experience are twice as likely to win work. But if you’re just starting out, you can still create a great profile. Just head on to the next page.",
        url: "/nx/create-profile/employment",
      }}
    >
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {experiences.map((experience, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="border-2 border-dashed border-slate-400">
                  <CardContent className="p-6 relative aspect-square flex items-center">
                    <div className="flex items-start gap-2">
                      <Image
                        src={FolderIcon}
                        alt="Folder"
                        className="w-[60px] h-auto object-cover"
                      />
                      <div className="space-y-4">
                        <h3 className="text-2xl line-clamp-3">
                          {experience.title}
                        </h3>

                        <div className="space-y-2 text-sm">
                          <p className="font-medium text-slate-800">
                            {experience.company} |{" "}
                            {formatMonthYear(experience.startedAt)}
                            {experience.isCurrent
                              ? " - Present"
                              : ` - ${formatMonthYear(experience.endAt)}`}
                          </p>
                          <p className="text-slate-600">
                            {experience.city}, {experience.country}
                          </p>
                        </div>
                        <p className="text-slate-600 line-clamp-3 text-sm">
                          {experience.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute w-full top-0 right-0 flex items-center justify-end gap-2 p-4">
                      <Button
                        type="outline"
                        size="small"
                        icon="mdi:pencil-outline"
                        classname="p-2! rounded-full! border!"
                        onClick={() => handleEdit(index)}
                      />

                      <Button
                        type="outline"
                        size="small"
                        icon="mdi:trash-can-outline"
                        classname="p-2! rounded-full! border!"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card
                className="border-2 border-dashed border-slate-400 cursor-pointer bg-slate-50"
                onClick={() => setOpen(true)}
              >
                <CardContent className="flex flex-col gap-4 aspect-square items-center justify-center p-6">
                  <span className="flex items-center justify-center ronded-md bg-blue-600 rounded-full">
                    <Icon icon="mdi:plus" className="text-white w-6 h-6" />
                  </span>
                  <p className="text-xl font-medium text-slate-800">
                    Add experience
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-10 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <div className="flex items-center gap-4">
          {experiences.length === 0 && (
            <button
              disabled={skipping}
              className="py-2 px-4 text-sm font-medium hover:underline disabled:opacity-50"
              onClick={() => skipStep("/nx/create-profile/education")}
            >
              Skip for now
            </button>
          )}
          <Button
            type="primary"
            label="Next, add your education"
            loading={saving}
            classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
            onClick={handleNext}
          />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Add Work Experience</DialogTitle>
          </DialogHeader>

          <form className="space-y-6 p-4 no-scrollbar max-h-[60vh] overflow-y-auto">
            <Input
              type="text"
              name="title"
              label="Title"
              placeholder="Ex: Software Engineer"
              labelClassName="text-sm font-medium"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="company"
              label="Company"
              placeholder="Ex: Microsoft"
              labelClassName="text-sm font-medium"
              required
              value={formData.company}
              onChange={handleInputChange}
            />

            <div className="">
              <label className="text-sm font-medium">Location</label>
              <div className="flex items-center gap-6 mt-1">
                <div className="flex-1">
                  <Input
                    type="text"
                    name="city"
                    placeholder="Ex: London"
                    labelClassName="text-sm font-medium"
                    required
                    value={formData.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <SearchCombobox
                    name="country"
                    placeholder="Country"
                    options={countries.all.map((c) => c.name)}
                    defaultOption={formData.country}
                    onSelect={(v: string) =>
                      setFormData({
                        ...formData,
                        country: v,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.isCurrent}
                onCheck={(v: boolean) =>
                  setFormData({ ...formData, isCurrent: v })
                }
                className="w-5! h-5!"
              />
              <label className="text-sm">
                I am currently working in this role
              </label>
            </div>

            <div className="flex items-center gap-6">
              <DateDropdown
                label="Start Date"
                name="startedAt"
                required
                value={formData.startedAt}
                onChange={(v: Date) =>
                  setFormData({ ...formData, startedAt: v })
                }
                classname="flex-1"
              />
              <DateDropdown
                label="End Date"
                name="endAt"
                required
                value={formData.endAt}
                onChange={(v: Date) => setFormData({ ...formData, endAt: v })}
                classname="flex-1"
                disabled={formData.isCurrent}
              />
            </div>

            <Textarea
              name="description"
              label="Description"
              labelClassName="text-sm font-medium"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSave}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CreateProfileLayout>
  );
}

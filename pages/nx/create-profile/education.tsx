import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { Button, Dropdown, Input, Textarea } from "@/components/atoms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Education } from "@/types/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EducationDocIcon from "@/public/assets/svgs/icons/other/education_doc.svg";
import Image from "next/image";

export default function ProfileEducation() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Education>({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startedAt: null,
    endAt: null,
    description: "",
  });
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (selectedIndex !== null) {
      setEducations(
        educations.map((education, index) =>
          index === selectedIndex ? formData : education
        )
      );
    } else {
      setEducations([...educations, formData]);
    }
    setFormData({
      school: "",
      degree: "",
      fieldOfStudy: "",
      startedAt: null,
      endAt: null,
      description: "",
    });
    setOpen(false);
  };

  const handleDelete = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setFormData(educations[index]);
    setSelectedIndex(index);
    setOpen(true);
  };

  return (
    <CreateProfileLayout
      title="Clients like to know what you know - add your education here."
      description="You don’t have to have a degree. Adding any relevant education helps make your profile more visible."
      currentStep={5}
      totalSteps={10}
      seo={{
        title: "Clients like to know what you know - add your education here.",
        description:
          "You don’t have to have a degree. Adding any relevant education helps make your profile more visible.",
        url: "/nx/create-profile/education",
      }}
    >
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {educations.map((education, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="border-2 border-dashed border-slate-400">
                  <CardContent className="p-6 relative aspect-square flex items-center">
                    <div className="flex items-start gap-2">
                      <Image
                        src={EducationDocIcon}
                        alt="Folder"
                        className="w-[60px] h-auto object-cover"
                      />
                      <div className="space-y-4">
                        <h3 className="text-2xl line-clamp-3">
                          {education.school}
                        </h3>

                        <div className="text-sm">
                          <p className="">
                            {education.degree}, {education.fieldOfStudy}
                          </p>
                          <p className="">
                            {education.startedAt} - {education.endAt}
                          </p>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-3">
                          {education.description}
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
                    Add education
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
          {educations.length === 0 && (
            <button className="py-2 px-4 text-sm font-medium hover:underline">
              Skip for now
            </button>
          )}
          <Button
            type="primary"
            label="Next, add languages"
            classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
            onClick={() => router.push("/nx/create-profile/title")}
          />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">
              {selectedIndex !== null
                ? "Edit Education History"
                : "Add Education History"}
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6 p-4 no-scrollbar max-h-[60vh] overflow-y-auto">
            <Input
              type="text"
              name="school"
              label="School"
              placeholder="Ex: University of London"
              labelClassName="text-sm font-medium"
              required
              value={formData.school}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="degree"
              label="Degree"
              placeholder="Ex: Bachelors"
              labelClassName="text-sm font-medium"
              required
              value={formData.degree}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="fieldOfStudy"
              label="Field of Study"
              placeholder="Ex: Computer Science"
              labelClassName="text-sm font-medium"
              required
              value={formData.fieldOfStudy}
              onChange={handleInputChange}
            />

            <div>
              <label className="text-sm font-medium">Dates Attended</label>
              <div className="flex items-center gap-6 mt-1">
                <Dropdown
                  placeholder="From"
                  name="startedAt"
                  options={Array.from({ length: 20 }, (_, i) => i + 2005).map(
                    (year) => ({
                      label: year.toString(),
                      value: year.toString(),
                    })
                  )}
                  value={formData.startedAt?.toString() || ""}
                  onSelect={(v: string) =>
                    setFormData({ ...formData, startedAt: Number(v) })
                  }
                />

                <Dropdown
                  placeholder="To (or expected graduation year)"
                  name="endAt"
                  options={Array.from({ length: 20 }, (_, i) => i + 2005).map(
                    (year) => ({
                      label: year.toString(),
                      value: year.toString(),
                    })
                  )}
                  value={formData.endAt?.toString() || ""}
                  onSelect={(v: string) =>
                    setFormData({ ...formData, endAt: Number(v) })
                  }
                />
              </div>
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

import { Button, IconButton } from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import { Check, Image as ImageIcon, Video } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import Image from "next/image";

type GalleryFormData = {
  images: File[];
  video: File[];
  documents: File[];
};

export default function Gallery() {
  const [formData, setFormData] = useState<GalleryFormData>({
    images: [],
    video: [],
    documents: [],
  });
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData({ ...formData, images: [...formData.images, ...files] });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setFormData({ ...formData, video: [files[0]] });
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const remaining = 2 - formData.documents.length;
      const newDocs = Array.from(files).slice(0, remaining);
      setFormData({
        ...formData,
        documents: [...formData.documents, ...newDocs],
      });
    }
  };

  const handleImageRemove = (image: File) => {
    setFormData({
      ...formData,
      images: formData.images.filter((i) => i !== image),
    });
  };

  return (
    <ProjectDashboardOnboardingLayout
      seo={{
        title: "Project Catalog - Worklanc",
        description: "Project Catalog - Worklanc",
        url: "/nx/project-dashboard/pricing",
      }}
      currentStep={3}
    >
      <div className="flex items-start">
        <div className="w-3/4 pr-10 space-y-10 border-r border-slate-400">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">Create a project gallery</h1>
            <Button
              type="outline"
              label="Preview project"
              size="medium"
              icon="solar:eye-linear"
              classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
            />
          </div>

          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            className="hidden"
            ref={imageRef}
            onChange={handleImageChange}
          />
          <input
            type="file"
            name="video"
            accept="video/*"
            className="hidden"
            ref={videoRef}
            onChange={handleVideoChange}
          />
          <input
            type="file"
            name="documents"
            multiple
            accept="application/pdf"
            className="hidden"
            ref={documentRef}
            onChange={handleDocumentChange}
          />

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="text-xl font-medium">Project Images</h5>
                <p className="text-base text-slate-800">
                  Upload up to 20 images (.jpg or .png), up to 10MB each and
                  less than 4,000 pixels, in width or height.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {formData.images.map((image: File) => (
                  <div
                    key={`${image.name}-${image.lastModified}`}
                    className="aspect-square relative overflow-hidden rounded-md"
                  >
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />

                    <IconButton
                      variant="primary"
                      icon="mdi:trash-can-outline"
                      className="p-1! absolute! top-2! right-2!"
                      onClick={() => handleImageRemove(image)}
                    />
                  </div>
                ))}
                <div className="text-slate-800 aspect-square bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200 transition-colors duration-200 flex flex-col items-center justify-center gap-4">
                  <ImageIcon className="size-6" />
                  <p className="text-sm">
                    Drag image here or{" "}
                    <button
                      type="button"
                      className="text-blue-600 cursor-pointer hover:underline"
                      onClick={() => imageRef.current?.click()}
                    >
                      browse
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="text-xl font-medium">Project Video</h5>
                <p className="text-base text-slate-800">
                  Upload one video (.mp4), up to 100MB and less than 90 seconds.
                  We recommend a video less than 60 seconds.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {formData.video.map((file) => (
                  <div
                    key={`${file.name}-${file.lastModified}`}
                    className="aspect-square relative overflow-hidden rounded-md bg-black"
                  >
                    <video
                      src={URL.createObjectURL(file)}
                      className="size-full object-cover"
                      controls
                    />
                  </div>
                ))}
                {formData.video.length < 1 && (
                  <div className="text-slate-800 aspect-square bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200 transition-colors duration-200 flex flex-col items-center justify-center gap-4">
                    <Video className="size-6" />
                    <p className="text-sm text-center px-4">
                      Drag video here or{" "}
                      <button
                        type="button"
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => videoRef.current?.click()}
                      >
                        browse
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="text-xl font-medium">
                  Sample Documents (optional)
                </h5>
                <p className="text-base text-slate-800">
                  Add up to 2 PDF files that are less than 2 MB each. Clients
                  will only see the first 3 pages of your file.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {formData.documents.map((file) => (
                  <div
                    key={`${file.name}-${file.lastModified}`}
                    className="aspect-square relative overflow-hidden rounded-md bg-slate-50 flex flex-col items-center justify-center gap-3 p-4"
                  >
                    <Icon icon="hugeicons:pdf-01" className="size-10" />
                    <p className="text-sm text-center text-slate-800 line-clamp-2 wrap-break-word w-full">
                      {file.name}
                    </p>
                  </div>
                ))}
                {formData.documents.length < 2 && (
                  <div className="text-slate-800 aspect-square bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200 transition-colors duration-200 flex flex-col items-center justify-center gap-4">
                    <Icon icon="hugeicons:pdf-01" className="size-6" />
                    <p className="text-sm text-center px-4">
                      Drag document here or{" "}
                      <button
                        type="button"
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => documentRef.current?.click()}
                      >
                        browse
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                type="outline"
                label="Back"
                size="medium"
                classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
              />

              <div className="flex items-center gap-8">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  className="py-2.5 text-sm font-medium text-blue-600 cursor-pointer"
                >
                  Save & Exit
                </motion.button>
                <Button
                  type="primary"
                  isSubmit
                  label="Save & Continue"
                  classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
                  onClick={() => router.push("/nx/project-dashboard/pricing")}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1 pl-10 space-y-10">
          <h2 className="text-2xl font-semibold">Gallery guidelines</h2>

          <p className="text-base">
            Highlight your work with professional, high-quality images, videos,
            and/or documents.
            <br />
            <br />
            Only add work you own or have the right to use.
          </p>

          <ul className="space-y-2">
            <li className="text-base font-medium">What to avoid:</li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">Blurry or distorted work</span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">Poorly cropped images</span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">Text-heavy images</span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">Worklanc logos or badges</span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Referencing other companies or services
              </span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Work that’s not related to this project
              </span>
            </li>

            <li className="text-base">
              If you don't meet these guidelines, your project may be rejected.
            </li>
            <li>
              <Link
                href="#"
                className="text-blue-600 cursor-pointer underline text-base"
              >
                View all guidelines and examples
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </ProjectDashboardOnboardingLayout>
  );
}

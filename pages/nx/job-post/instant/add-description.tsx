import { Textarea } from "@/components/atoms";
import { JobPostLayout } from "@/components/layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { getFileIcon, formatFileSize } from "@/utils/file";

export default function JobPostDescription() {
  const [description, setDescription] = useState("");
  const [files, setFile] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <JobPostLayout
      seo={{
        title: "Add Description - Worklanc",
        description: "Add Description - Worklanc",
        url: "/nx/job-post/instant/description",
      }}
      step={6}
      nextLabel="Review Job Post"
      onNext={() => router.push("/nx/job-post/instant/review")}
    >
      <div className="flex items-start gap-10">
        <div className="flex-1 space-y-8">
          <h1 className="text-3xl font-medium">Start the conversation.</h1>
          <div className="space-y-4">
            <p className="text-sm">Talent are looking for:</p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Clear expectations about your task or deliverables</li>
              <li>The skills required for your work</li>
              <li>Good communication</li>
              <li>Details about how you or your team like to work</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <Textarea
            name="description"
            label="Describe what you need"
            placeholder="Already have a description? Paste it here!"
            labelClassName="text-sm! font-light! mb-2"
            subLabel="50,000 characters left"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            multiple
            onChange={(e) => setFile(Array.from(e.target.files || []))}
          />

          <div className="space-y-6 text-sm">
            <div className="space-y-2">
              <p className="">Need help?</p>
              <Link href="#" className="underline block">
                See examples of effective descriptions
              </Link>
            </div>

            <div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-5 rounded-full border border-slate-300 text-sm hover:bg-slate-100 cursor-pointer font-medium flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon icon="mdi:attach-file" className="w-5 h-5" /> Attach file
              </motion.button>
              <p className="text-xs text-slate-600 mt-4">
                Max file size: 100MB
              </p>
            </div>

            {files.length > 0 && (
              <>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="bg-slate-50 p-2 flex items-center justify-between rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-12 rounded-md bg-slate-200">
                          <Icon
                            icon={getFileIcon(file)}
                            className="w-6 h-6 text-slate-600"
                          />
                        </div>
                        <div className="text-sm font-light">
                          <h4>{file.name}</h4>
                          <p className="text-slate-600">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>

                      <Icon
                        icon="mdi:trash-can-outline"
                        className="w-5 h-5 cursor-pointer"
                        onClick={() =>
                          setFile(files.filter((_, i) => i !== index))
                        }
                      />
                    </li>
                  ))}
                </ul>

                <div className="rounded-lg bg-yellow-50 flex items-start gap-2 p-2">
                  <Icon
                    icon="mdi:information"
                    className="w-5 h-5 text-yellow-500"
                  />
                  <p className="text-sm font-medium">
                    These files will be scanned and any active objects will be
                    removed
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </JobPostLayout>
  );
}

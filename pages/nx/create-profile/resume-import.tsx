import { Button } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getProfileDraft } from "@/lib/profile-draft";
import ResumeImportImage from "@/public/assets/webps/avatars/resume-import.webp";
import ResumeIcon from "@/public/assets/svgs/icons/other/resume.svg";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ResumeViewer } from "@/components/molecules/ResumeViewer";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx", ".txt"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ResumeImport() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    const typeOk =
      ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(ext);

    if (!typeOk) {
      toast.error("Please upload a PDF, DOC, DOCX, or TXT file");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File must be 5MB or smaller");
      return false;
    }

    return true;
  };

  useEffect(() => {
    return () => {
      if (resumeUrl) URL.revokeObjectURL(resumeUrl);
    };
  }, [resumeUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file || !validateFile(file)) return;

    if (resumeUrl) URL.revokeObjectURL(resumeUrl);
    setResume(file);
    setResumeUrl(URL.createObjectURL(file));
  };

  const openFilePicker = () => {
    if (!uploading) fileInputRef.current?.click();
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
  };

  return (
    <CreateProfileLayout
      title="How would you like to tell us about yourself?"
      description="We need to get a sense of your education, experience and skills. It’s quickest to import your information — you can edit it before your profile goes live."
      currentStep={1}
      totalSteps={10}
      seo={{
        title: "How would you like to tell us about yourself?",
        description:
          "We need to get a sense of your education, experience and skills. It’s quickest to import your information — you can edit it before your profile goes live.",
        url: "/nx/create-profile/resume-import",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-start my-10">
        <div className="flex-1 space-y-4">
          <Button
            type="outline"
            size="medium"
            label="Import from LinkedIn"
            icon="mdi:linkedin"
            classname="font-medium! text-sm! py-2.5! w-full! rounded-full!"
          />

          <Button
            type="outline"
            size="medium"
            label={resume ? "Review your resume" : "Upload your resume"}
            icon="mdi:file-upload-outline"
            classname="font-medium! text-sm! py-2.5! w-full! rounded-full!"
            onClick={() => setDialogOpen(true)}
          />

          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogContent className="min-w-5xl">
              <DialogHeader className="p-4">
                <DialogTitle className="text-xl">
                  {resume ? "Review your resume" : "Add your resume"}
                </DialogTitle>
                <DialogDescription>
                  {resume
                    ? "Check the preview below, then continue."
                    : "Use a PDF, Word doc, or rich text file – make sure it’s 5MB or less."}
                </DialogDescription>
              </DialogHeader>
              <div
                className={`w-full min-w-0 px-4 pb-4 ${
                  resume && "h-1/3"
                } transition-all duration-200`}
              >
                {resume ? (
                  <div className="w-full min-w-0">
                    <ResumeViewer file={resume} />
                  </div>
                ) : (
                  <div className="w-full py-20 border-2 border-dashed border-slate-500 flex flex-col gap-4 items-center justify-center">
                    <Image
                      src={ResumeIcon}
                      alt="Resume"
                      className="w-[145px] h-[100px] object-cover"
                    />
                    <p className="text-sm text-slate-600 font-light">
                      Drag and drop or{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={openFilePicker}
                      >
                        choose file
                      </span>
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <Button
                    type="primary"
                    label="Continue"
                    classname="rounded-full! font-medium! text-sm! px-5! py-2.5!"
                    loading={uploading}
                    disabled={!resume || uploading}
                    onClick={() => {
                      setDialogOpen(false);
                      if (resume) {
                        toast.info(
                          "Resume saved — profile mapping coming next"
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            type="outline"
            size="medium"
            label="Fill out manually (15 min)"
            classname="font-medium! text-sm! py-2.5! w-full! rounded-full!"
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex-1 rounded-2xl bg-slate-100 p-6">
          <Image
            src={ResumeImportImage}
            alt="Avatar"
            className="h-[60px] w-[60px] rounded-full object-cover"
          />

          <p className="mt-6 text-xl">
            “Your WorkLanc profile is how you stand out from the crowd.It’s what
            you use to win work, so let’s make it a good one.”
          </p>
          <p className="mt-1 text-sm text-slate-800">WorkLanc Pro Tip</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="rounded-full border border-slate-400 px-4 py-2 text-sm"
          onClick={() => router.back()}
        >
          Back
        </motion.button>
      </div>
    </CreateProfileLayout>
  );
}

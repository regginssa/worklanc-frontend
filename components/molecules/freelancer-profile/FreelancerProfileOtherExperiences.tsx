import Image from "next/image";
import FolderIcon from "@/public/assets/svgs/icons/other/folder_open.svg";
import ProfileSectionActions from "./ProfileSectionActions";

export interface FreelancerProfileOtherExperiencesProps {
  onAdd?: () => void;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  children?: React.ReactNode;
}

export default function FreelancerProfileOtherExperiences({
  onAdd,
  emptyDescription = "Add any other experiences that help you stand out",
  emptyActionLabel = "Add an experience",
  onEmptyAction,
  children,
}: FreelancerProfileOtherExperiencesProps) {
  return (
    <div className="rounded-3xl border border-slate-300 p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-medium">Other experiences</h3>
        <ProfileSectionActions onAdd={onAdd} />
      </div>

      {children ?? (
        <div className="flex flex-col items-center gap-6 py-10">
          <Image
            src={FolderIcon}
            alt="Other experiences"
            className="h-[130px] w-[145px] object-contain"
          />
          <div className="text-center text-sm">
            <p>{emptyDescription}</p>
            {onEmptyAction && (
              <button
                type="button"
                className="mt-4 cursor-pointer font-medium text-blue-600 hover:underline"
                onClick={onEmptyAction}
              >
                {emptyActionLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

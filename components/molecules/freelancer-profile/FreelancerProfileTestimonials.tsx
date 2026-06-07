import Image from "next/image";
import TestimonialIcon from "@/public/assets/svgs/icons/other/testinimal.svg";
import ProfileSectionActions from "./ProfileSectionActions";

export interface FreelancerProfileTestimonialsProps {
  onAdd?: () => void;
  emptyTitle?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  children?: React.ReactNode;
}

export default function FreelancerProfileTestimonials({
  onAdd,
  emptyTitle = "Showcase your skills with non-Worklanc client testimonials",
  emptyActionLabel = "Request a testimonial",
  onEmptyAction,
  children,
}: FreelancerProfileTestimonialsProps) {
  return (
    <div className="rounded-3xl border border-slate-300 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-medium">Testimonials</h3>
          <p className="mt-1 text-sm">Endorsements from past clients</p>
        </div>
        <ProfileSectionActions onAdd={onAdd} />
      </div>

      {children ?? (
        <div className="flex flex-col items-center gap-6 py-10">
          <Image
            src={TestimonialIcon}
            alt="Testimonial"
            className="h-[130px] w-[145px] object-contain"
          />
          <div className="text-center text-sm">
            <p>{emptyTitle}</p>
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

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import TestimonialIcon from "@/public/assets/svgs/icons/other/testinimal.svg";
import ProfileSectionActions from "./ProfileSectionActions";
import type { Testimonial } from "@/types/user";

export type FreelancerProfileTestimonialItem = Pick<
  Testimonial,
  "uid" | "clientFirstName" | "clientLastName" | "status" | "testimonialText"
>;

export interface FreelancerProfileTestimonialsProps {
  testimonials?: FreelancerProfileTestimonialItem[];
  onAdd?: () => void;
  onRequestNew?: () => void;
  emptyTitle?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
}

function formatClientName(testimonial: FreelancerProfileTestimonialItem) {
  const lastInitial = testimonial.clientLastName.trim().charAt(0);
  return lastInitial
    ? `${testimonial.clientFirstName} ${lastInitial}.`
    : testimonial.clientFirstName;
}

function renderTestimonialContent(
  testimonial: FreelancerProfileTestimonialItem,
  clientName: string
) {
  if (testimonial.status === "pending") {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <Icon icon="mdi:clock-outline" className="h-5 w-5 text-slate-500" />
        <span>
          Your testimonial request is awaiting {clientName}&apos;s response
        </span>
      </div>
    );
  }

  if (testimonial.status === "declined") {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <Icon icon="mdi:close-circle-outline" className="h-5 w-5 text-slate-500" />
        <span>{clientName} declined your testimonial request</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-sm">
      <p className="font-medium text-slate-900">{clientName}</p>
      {testimonial.testimonialText && (
        <p className="text-slate-700">{testimonial.testimonialText}</p>
      )}
    </div>
  );
}

export default function FreelancerProfileTestimonials({
  testimonials = [],
  onAdd,
  onRequestNew,
  emptyTitle = "Showcase your skills with non-Worklanc client testimonials",
  emptyActionLabel = "Request a testimonial",
  onEmptyAction,
}: FreelancerProfileTestimonialsProps) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <div className="rounded-3xl border border-slate-300 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-medium">Testimonials</h3>
          <p className="mt-1 text-sm">Endorsements from past clients</p>
        </div>
        {!hasTestimonials && <ProfileSectionActions onAdd={onAdd} />}
      </div>

      {hasTestimonials ? (
        <div className="space-y-6 py-6">
          <ul className="space-y-4">
            {testimonials.map((testimonial) => {
              const clientName = formatClientName(testimonial);

              return (
                <li
                  key={testimonial.uid ?? `${clientName}-${testimonial.status}`}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  {renderTestimonialContent(testimonial, clientName)}
                </li>
              );
            })}
          </ul>

          {onRequestNew && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
              onClick={onRequestNew}
            >
              <Icon icon="mdi:plus" className="h-5 w-5" />
              Request a new testimonial
            </motion.button>
          )}
        </div>
      ) : (
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

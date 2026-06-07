import { IconButton } from "@/components/atoms";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type FreelancerProfileSkill = {
  label: string;
  value: string;
};

export interface FreelancerProfileSkillsProps {
  skills: FreelancerProfileSkill[];
  onEdit?: () => void;
  assessmentHref?: string;
}

export default function FreelancerProfileSkills({
  skills,
  onEdit,
  assessmentHref = "#",
}: FreelancerProfileSkillsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-medium">Skills</h3>
        {onEdit && (
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={onEdit}
          />
        )}
      </div>

      <div>
        <p className="text-sm text-slate-600">Self-reported</p>
        <ul className="mt-2 flex flex-wrap items-center gap-2">
          {skills.map((skill) => (
            <li
              key={skill.value}
              className="rounded-md bg-slate-200 px-4 py-1 text-sm text-slate-800"
            >
              {skill.label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-1 text-slate-600">
          <p className="text-sm">Working style</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Icon
                icon="mdi:question-mark-circle-outline"
                className="h-4 w-4"
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="p-2 text-sm">
                This science-backed assessment helps you understand how you work
                best and connect with the right clients. There are no right or
                wrong answers, only insights into your natural strengths and
                working style.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="mt-2 flex items-start gap-4 rounded-xl bg-blue-100 p-4">
          <Icon
            icon="mdi:account-star-outline"
            className="h-6 w-6 text-blue-600"
          />
          <p className="text-sm font-medium">
            Help clients see why you&apos;re the right fit and boost your
            chances of getting hired by highlighting strengths beyond hard
            skills.{" "}
            <Link href={assessmentHref} className="cursor-pointer underline">
              Take assessment
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

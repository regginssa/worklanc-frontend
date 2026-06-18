import { useState } from "react";
import type { JobSkill } from "@/types/job";

export const TITLE_MIN = 5;
export const TITLE_MAX = 255;
export const DESCRIPTION_MIN = 50;
export const DESCRIPTION_MAX = 50000;
export const SKILLS_MIN = 1;
export const SKILLS_MAX = 10;

export const validateTitle = (title: string): string | null => {
  const trimmed = title.trim();
  if (!trimmed) return "Job title is required";
  if (trimmed.length < TITLE_MIN) {
    return `Job title must be at least ${TITLE_MIN} characters`;
  }
  if (trimmed.length > TITLE_MAX) {
    return `Job title must be at most ${TITLE_MAX} characters`;
  }
  return null;
};

export const validateSkills = (skills: JobSkill[]): string | null => {
  if (skills.length < SKILLS_MIN) {
    return `Add at least ${SKILLS_MIN} skill`;
  }
  if (skills.length > SKILLS_MAX) {
    return `You can add at most ${SKILLS_MAX} skills`;
  }
  return null;
};

export const validateScope = (values: {
  projectSize: string | null;
  duration: string | null;
  experienceLevel: string | null;
  contractToHire: string | null;
}): string | null => {
  if (!values.projectSize) return "Project size is required";
  if (!values.duration) return "Project duration is required";
  if (!values.experienceLevel) return "Experience level is required";
  if (!values.contractToHire) return "Contract-to-hire selection is required";
  return null;
};

export const validateBudget = (values: {
  budgetType: "hourly" | "fixed";
  budgetMin: number;
  budgetMax: number;
  budgetFixed: number;
}): string | null => {
  if (values.budgetType === "hourly") {
    if (!values.budgetMin || !values.budgetMax) {
      return "Hourly rate range is required";
    }
    if (values.budgetMin < 1 || values.budgetMax < 1) {
      return "Hourly rate must be at least $1";
    }
    if (values.budgetMax < values.budgetMin) {
      return "Maximum rate must be greater than or equal to minimum";
    }
    return null;
  }

  if (!values.budgetFixed || values.budgetFixed < 5) {
    return "Fixed budget must be at least $5";
  }
  return null;
};

export const validateDescription = (description: string): string | null => {
  const trimmed = description.trim();
  if (!trimmed) return "Job description is required";
  if (trimmed.length < DESCRIPTION_MIN) {
    return `Description must be at least ${DESCRIPTION_MIN} characters`;
  }
  if (trimmed.length > DESCRIPTION_MAX) {
    return `Description must be at most ${DESCRIPTION_MAX} characters`;
  }
  return null;
};

export const useFieldError = () => {
  const [error, setError] = useState<string | null>(null);
  return { error, setError, clearError: () => setError(null) };
};

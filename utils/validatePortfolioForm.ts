import type { PortfolioForm } from "@/types/talent-profile";
import type { ValidationResult } from "@/utils/validateFreelancerProfileForms";

export type PortfolioFormErrors = {
  title?: string;
  description?: string;
  role?: string;
  skills?: string;
  assets?: string;
};

const MAX_TITLE_LENGTH = 255;
const MAX_ROLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 600;
const MAX_SKILLS = 5;

export function validatePortfolioForm(
  form: PortfolioForm,
  options?: { hasIncompleteUploads?: boolean }
): ValidationResult<keyof PortfolioFormErrors> {
  const errors: PortfolioFormErrors = {};

  const title = form.title.trim();
  if (!title) {
    errors.title = "Project title is required";
  } else if (title.length > MAX_TITLE_LENGTH) {
    errors.title = `Max ${MAX_TITLE_LENGTH} characters`;
  }

  const description = form.description.trim();
  if (!description) {
    errors.description = "Project description is required";
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Max ${MAX_DESCRIPTION_LENGTH} characters`;
  }

  const role = form.role.trim();
  if (role.length > MAX_ROLE_LENGTH) {
    errors.role = `Max ${MAX_ROLE_LENGTH} characters`;
  }

  if (form.skills.length === 0) {
    errors.skills = "Add at least one skill or deliverable";
  } else if (form.skills.length > MAX_SKILLS) {
    errors.skills = `Max ${MAX_SKILLS} skills`;
  }

  if (options?.hasIncompleteUploads) {
    errors.assets = "Complete or remove your in-progress portfolio item";
  } else if (form.assets.length === 0) {
    errors.assets = "Add at least one portfolio item";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

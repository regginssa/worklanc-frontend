import type { RadioOption } from "@/components/atoms/RadioGroup";
import type { Category } from "@/types/category";

export function formatCategoryPath(...segments: string[]): string {
  return segments.join(" > ");
}

export function categoriesToRadioOptions(
  categories: Category[]
): RadioOption[] {
  return categories.flatMap((category) =>
    category.children.map((child) => ({
      title: formatCategoryPath(category.name, child.name),
      value: `${category.slug}/${child.slug}`,
    }))
  );
}

export function parseCategoryRadioValue(value: string): {
  category: string;
  subCategory: string;
} {
  const [category = "", subCategory = ""] = value.split("/");
  return { category, subCategory };
}

export function toCategoryRadioValue(
  category?: string,
  subCategory?: string
): string {
  if (!category || !subCategory) return "";
  return `${category}/${subCategory}`;
}

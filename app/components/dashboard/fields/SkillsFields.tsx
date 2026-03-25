import type { Skill } from "@/app/types/dashboard";
import type { Field } from "@/app/types/Field";

export const skillFields: Field<Skill>[] = [
  { key: "id", label: "ID" },
  { key: "skillName", label: "Skill" },
  { key: "category", label: "Category" },
  { key: "description", label: "Description" },
  {
    key: "whereLearnt",
    label: "Where Learnt",
    render: (arr) => (arr as string[]).join(", "),
  },
  {
    key: "exampleUrls",
    label: "Examples",
    render: (arr) => (arr as string[]).length,
  },
  {
    key: "imageExampleUrls",
    label: "Images",
    render: (arr) => (arr as string[]).length,
  },
];

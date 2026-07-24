import type { SkillResponse } from "@/app/types/Dashboard";
import type { Field } from "@/app/types/Field";

export const skillFields: Field<SkillResponse>[] = [
  { key: "id", label: "ID", width: "0.5fr" },
  { key: "name", label: "Skill" },
  { key: "skill_type", label: "Category" },
  { key: "description", label: "Description" },
  {
    key: "experience_locations",
    label: "Where Learnt",
    render: (arr) => (arr as string[]).join(", "),
  },
  {
    key: "examples",
    label: "Examples",
    width: "0.5fr",
    render: (arr) => (arr as string[]).length,
  }
];

import type { Qualification } from "@/app/types/dashboard";
import type { Field } from "@/app/types/Field";

export const qualificationFields: Field<Qualification>[] = [
  { key: "id", label: "ID" },
  { key: "level", label: "Level" },
  { key: "subject", label: "Subject" },
  { key: "institution", label: "Institution" },
  { key: "grade", label: "Grade" },
  {
    key: "imageUrl",
    label: "Image",
    render: (url) => <img src={url as string} width={40} />,
  },
];

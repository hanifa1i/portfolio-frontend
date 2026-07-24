import type { ImageResponse, QualificationResponse } from "@/app/types/Dashboard";
import type { Field } from "@/app/types/Field";

export const qualificationFields: Field<QualificationResponse>[] = [
  { key: "id", label: "ID" },
  { key: "qualification", label: "Qualification" },
  { key: "institution", label: "Institution" },
  { key: "level", label: "Level" },
  { key: "grade", label: "Grade" },
  { key: "start_date", label: "Start Date" },
  { key: "end_date", label: "End Date" },
  { key: "description", label: "Description" },
  {
    key: "certificates",
    label: "Certificates",
    render: (value) => {
      if (!Array.isArray(value) || value.length === 0) return "-";
      const images = value as ImageResponse[];
      return <img src={images[0].image_url} width={40} />;
    }
  },
];

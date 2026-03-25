import type { Section } from "@/app/types/Section";
import type { Field } from "@/app/types/Field";

export const sectionFields: Field<Section>[] = [
  { key: "label", label: "Label" },
  {
    key: "image",
    label: "Image",
    render: (url) => <img src={url as string} width={40} />,
  },
  { key: "total", label: "Total" },
];

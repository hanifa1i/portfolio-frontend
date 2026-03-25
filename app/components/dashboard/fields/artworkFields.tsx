import type { Artwork } from "@/app/types/dashboard";
import type { Field } from "@/app/types/Field";

export const artworkFields: Field<Artwork>[] = [
  { key: "id", label: "ID", width: "0.5fr"},
  {
    key: "mainImageUrl",
    label: "Preview",
    render: (url) => <img src={url as string} width={50} />,
  },
  { key: "description", label: "Description", width: "2fr" },
  {
    key: "dateCreated",
    label: "Created",
    render: (date) =>
      new Date(date as Date).toLocaleDateString(),
  },
  { key: "toolUsed", label: "Tool" },
  { key: "category", label: "Category" },
  { key: "dimensions", label: "Dimensions" },
];

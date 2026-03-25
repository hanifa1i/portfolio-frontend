import type { Page } from "@/app/types/dashboard";
import type { Field } from "@/app/types/Field";

export const pageFields: Field<Page>[] = [
  { key: "id", label: "ID" },
  { key: "sketchbookId", label: "Sketchbook ID" },
  { key: "pageNumber", label: "Page #" },
  {
    key: "sketchUrl",
    label: "Sketch",
    render: (url) => <img src={url as string} width={50} />,
  },
];

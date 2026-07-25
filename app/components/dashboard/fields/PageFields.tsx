import type { Page } from "@/app/types/Dashboard";
import type { Field } from "@/app/types/Field";

export const pageFields: Field<Page>[] = [
  { key: "id", label: "ID" },
  { key: "book", label: "Book" },
  { key: "pageNumber", label: "Page #" },
  {
    key: "sketchUrl",
    label: "Sketch",
    render: (url) => <img src={url as string} width={50} />,
  },
];

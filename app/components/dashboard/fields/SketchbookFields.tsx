import type { Sketchbook } from "@/app/types/dashboard";
import type { Field } from "@/app/types/Field";

export const sketchbookFields: Field<Sketchbook>[] = [
  { key: "id", label: "ID" , width: "0.5fr" },
  { key: "title", label: "Title", width: "2fr"},
  { key: "description", label: "Description", width: "3fr" },
  { key: "year", label: "Year" },
  { key: "totalPages", label: "Pages" },
  { key: "pageSize", label: "Page Size" },
  {
    key: "pages",
    label: "Page Count",
    render: (_, row) => row.pages.length,
  },
];

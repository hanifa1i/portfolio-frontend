import type { Artwork, ImageResponse, ArtworkResponse, Page, Sketchbook } from "@/app/types/Dashboard";
import type { Field } from "@/app/types/Field";

export const SketchbookFields: Field<ArtworkResponse>[] = [
  { key: "id", label: "ID" , width: "0.5fr" },
  {
          key: "image_urls",
          label: "Preview",
          render: (value) => {
              if (!Array.isArray(value) || value.length === 0) return "-";
  
              const images = value as ImageResponse[];
  
              return <img src={images[0].image_url} width={50} />;
          }
  },
  { key: "title", label: "Book", width: "1fr"},

  { key: "page_number", label: "Page No", width: "1fr" },

  { key: "description", label: "Decription", width: "3fr" }
];

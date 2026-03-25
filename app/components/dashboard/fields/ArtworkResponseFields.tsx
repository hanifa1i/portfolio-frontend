import type { Artwork, ArtworkResponse } from "@/app/types/dashboard";
import type { Field } from "@/app/types/Field";

export const artworkResponseFields: Field<ArtworkResponse>[] = [
    { key: "id", label: "ID", width: "0.5fr" },

    {
        key: "image_urls",
        label: "Preview",
        render: (urls) => {
            if (!Array.isArray(urls) || urls.length === 0) return "—";
            return <img src={urls[0] as string} width={50} />;
        }
    },

    { key: "title", label: "Title", width: "1fr" },

    { key: "description", label: "Description", width: "2fr" },

    {
        key: "updated_at",
        label: "Updated",
        render: (date) =>
            new Date(date as string).toLocaleDateString(),
    },

    {
        key: "visible",
        label: "Visible",
        render: (value) => (value ? "Yes" : "No"),
    },

    {
        key: "tag_names",
        label: "Tags",
        render: (tags) => {
            if (!Array.isArray(tags) || tags.length === 0) return "—";
            return tags.join(", ");
        }
    },
];
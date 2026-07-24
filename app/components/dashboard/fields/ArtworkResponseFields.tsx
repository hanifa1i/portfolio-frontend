import type { Artwork, ImageResponse, ArtworkResponse } from "@/app/types/Dashboard";
import type { Field } from "@/app/types/Field";

export const artworkResponseFields: Field<ArtworkResponse>[] = [
    { key: "id", label: "ID", width: "0.5fr" },

    {
        key: "image_urls",
        label: "Preview",
        render: (value) => {
            if (!Array.isArray(value) || value.length === 0) return "-";

            const images = value as ImageResponse[];

            return <img src={images[0].image_url} width={50} />;
        }
    },

    { key: "title", label: "Title", width: "1fr" },

    { key: "description", label: "Description", width: "2fr" },

    { key: "tool", label: "Tool" },

    {
        key: "created_at",
        label: "Created",
        render: (date) =>
            new Date(date as string).toLocaleDateString(),
    },
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
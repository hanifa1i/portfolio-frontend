import { ArtworkResponse } from "../types/dashboard";

type ArtworkPayload = {
    title: string;
    description: string;
    image_urls: string[];
    tag_names: string[];
    book_page: boolean;
    page_number: number
}

export async function getArtwork(){
    const response = await fetch(`http://localhost:8080/api/artworks`)
    if(!response.ok) {
        throw new Error("Failed to get artworks")
    } 
    const data: ArtworkResponse[] = await response.json();
    console.log("Recieved", data);

    return data;
}
export async function createArtwork(artwork: ArtworkPayload) {
    const token = localStorage.getItem("token");

    console.log(artwork);

    const response = await fetch("http://localhost:8080/api/admin/artworks/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(artwork)
    });

    if (!response.ok) {
        throw new Error("Failed to create artwork");
    }

    return response.json();
}

export async function addArtworkToS3(artworkId: number, artworkFiles: File[]) {
    const token = localStorage.getItem("token");
    const urls = [];
    for (const file of artworkFiles) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`http://localhost:8080/api/admin/artworks/${artworkId}/image/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        if (!response.ok) {
            console.error("Upload Failed");
            continue;
        }

        const responseJson = await response.json();
        urls.push(responseJson.message);
        console.log("Uploaded", responseJson);
    }

    return urls
}
export async function updateArtwork(artworkId: number, artwork: ArtworkPayload) {
    /*const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:8080/api/admin/artworks/${artworkId}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(artwork)
    });

    if (!res.ok) {
        throw new Error("Failed to update artwork");
    }

    return res.json();*/
}
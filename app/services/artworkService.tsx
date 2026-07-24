import { ArtworkResponse, TagResponse } from "../types/Dashboard";

type ArtworkPayload = {
    title: string;
    description: string;
    image_urls: string[];
    tag_names: string[];
    tool: string;
    book_page: boolean;
    page_number: number
}
type ImageUrlPayload = {
    images: string[];
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
export async function getRecentArtwork(amount: number){
    const response = await fetch(`http://localhost:8080/api/artworks/recent/${amount}`)
    if(!response.ok) {
        throw new Error("Failed to get recent artworks")
    } 
    const data: ArtworkResponse[] = await response.json();
    console.log("Recieved", data);

    return data;
}

export async function getTags(){
    const response = await fetch(`http://localhost:8080/api/tags`)
    if(!response.ok) {
        throw new Error("Failed to get tags")
    } 
    const data: TagResponse[] = await response.json();
    console.log("Recieved", data);

    return data;
}

export async function getArtworkById(id: number) {
    const response = await fetch(`http://localhost:8080/api/artworks/${id}`)
    if(!response.ok) {
        throw new Error(`Failed to get artwork with id: ${id}`)
    }
    const data: ArtworkResponse = await response.json();
    console.log("Recieved", data);

    return data;
}
export async function getSketchbookArt(){
    const response = await fetch(`http://localhost:8080/api/artworks/sketchbooks`)
    if(!response.ok) {
        throw new Error("Failed to get sketchbook artworks")
    } 
    const data: ArtworkResponse[] = await response.json();
    console.log("Recieved", data);

    return data;
}
export async function getStandaloneArt(){
    const response = await fetch(`http://localhost:8080/api/artworks/standalone`)
    if(!response.ok) {
        throw new Error("Failed to get standalone artworks")
    } 
    const data: ArtworkResponse[] = await response.json();
    console.log("Recieved", data);

    return data;
}
export async function deleteArtwork(artworkId: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/admin/artworks/${artworkId}/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
    });
    if(!response.ok) {
        throw new Error("Failed to delete artwork")
    }
    console.log("Message: ", response);
}
export async function deleteArtworkImage(artworkId: number, imageId: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/admin/artworks/${artworkId}/image/delete/${imageId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
    });
    if(!response.ok) {
        throw new Error("Failed to delete artwork image")
    }
    console.log("Message: ", response);
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
    const token = localStorage.getItem("token");

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

    return res.json();
}

export async function updateArtworkImages(artworkId: number, imageUrls: ImageUrlPayload) {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/admin/artworks/${artworkId}/image/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(imageUrls)
    })
    if (!response.ok) {
        throw new Error("Failed to update artwork");
    }

    return response.json();
}


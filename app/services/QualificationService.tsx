import { artworks } from "../data/dashboard/Artworks"

type QualificationPayload = {
    qualification: string,
    institution: string,
    level: string,
    grade: string,
    start_date: string,
    end_date: string,
    description: string
}

export async function createQualification(qualification: QualificationPayload) {

    const token = localStorage.getItem("token")

    console.log(qualification)

    const response = await fetch(`http://localhost:8080/api/admin/education/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(qualification)
    });

    if (!response.ok) {
        throw new Error("Failed to create qualification")
    }

    return response.json();
}

export async function addCertificateToS3(id: number, files: File[]){
    const token = localStorage.getItem("token");
    const urls = [];

    for (const file of files) {
        const formData = new FormData();
        formData.append("certificate", file);

        const response = await fetch(`http://localhost:8080/api/admin/education/${id}/certificate/upload`, {
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
        console.log("Uploaded", responseJson)
    }

    return urls
}
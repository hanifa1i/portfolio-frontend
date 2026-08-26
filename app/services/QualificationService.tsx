import { QualificationResponse } from "../types/Dashboard"

type QualificationPayload = {
    qualification: string,
    institution: string,
    level: string,
    grade: string,
    start_date: string,
    end_date: string,
    description: string
}

type ImageUrlPayload = {
    images: string[];
}
export async function getQualifications() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/education`)
    if(!response.ok) {
        throw new Error("Failed to get qualifications")
    }
    const data: QualificationResponse[] = await response.json();
    console.log("Recieved", data);

    return data;
}

export async function getQualificationsById(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/education/${id}`)
    if(!response.ok) {
        throw new Error(`Failed to get education with id: ${id}`)
    }
    const data: QualificationResponse = await response.json();
    console.log("Recieved", data);

    return data;
}

export async function deleteQualification(qualificationId: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/education/${qualificationId}/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
    });
    if(!response.ok) {
        throw new Error("Failed to delete qualification")
    }
    console.log("Message: ", response);
}

export async function deleteCertificateImage(qualificationId: number, imageId: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/education/${qualificationId}/image/delete/${imageId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
    });
    if(!response.ok) {
        throw new Error("Failed to delete certificate image")
    }
    console.log("Message: ", response);
}

export async function createQualification(qualification: QualificationPayload) {

    const token = localStorage.getItem("token")

    console.log(qualification)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/education/create`, {
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/education/${id}/certificate/upload`, {
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

export async function updateQualification(id: number, qualification: QualificationPayload) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/education/${id}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(qualification)
    });

    if (!res.ok) {
        throw new Error("Failed to update qualification");
    }

    return res.json();
}

export async function updateCertificateImages(id: number, imageUrls: ImageUrlPayload) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/education/${id}/certificate/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(imageUrls)
    })
    if (!response.ok) {
        throw new Error("Failed to update qualification");
    }

    return response.json();
}
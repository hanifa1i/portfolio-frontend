import { WorkExperienceResponse } from "../types/Dashboard";
import { ExperiencePayload } from "../types/FormPayload";

export async function getExperience() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience`)
    if(!response.ok) {
        throw new Error("Failed to get experience")
    }
    const data: WorkExperienceResponse[] = await response.json();
    console.log("Recieved", data);

    return data;
}

export async function getExperienceById(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience/${id}`)
    if(!response.ok) {
        throw new Error(`Failed to get work experience with id: ${id}`)
    }
    const data: WorkExperienceResponse = await response.json();
    console.log("Recieved", data);

    return data;
}

export async function deleteExperience(experienceId: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/experience/${experienceId}/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
    });
    if(!response.ok) {
        throw new Error("Failed to delete experience")
    }
    console.log("Message: ", response);
}

export async function createExperience(jobExperience: ExperiencePayload) {
    const token = localStorage.getItem("token")
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/experience/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(jobExperience)
    });

    if (!response.ok) {
        throw new Error("Failed to create job experience")
    }

    return response.json();
}

export async function updateExperience(id: number, experience: ExperiencePayload) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/experience/${id}/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(experience)
    });

    if (!response.ok) {
        throw new Error("Failed to update experience");
    }

    return response.json();

}
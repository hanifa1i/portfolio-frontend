import { SkillResponse } from "../types/Dashboard"

type SkillPayload = {
    name: string,
    description: string,
    skill_type: string,
    experience_locations: string[],
    examples: ExamplePayload[]
}

type ExamplePayload = {
    type: string,
    url: string,
    note: string   
}
type ImageUrlPayload = {
    images: string[];
}

export async function getSkills() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`)
    if(!response.ok) {
        throw new Error("Failed to get skills")
    }
    const data: SkillResponse[] = await response.json();
    console.log("Recieved", data);

    return data;
}

export async function getSkillById(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`)
    if (!response.ok) {
        throw new Error(`Failed to get skill with id: ${id}`)
    }
    const data: SkillResponse = await response.json();
    console.log("Recieve", data);

    return data;
}

export async function deleteSkill(skillId: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/skills/${skillId}/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
    });
    if(!response.ok) {
        throw new Error("Failed to delete skill")
    }
    console.log("Message: ", response);
}

export async function deleteExampleImage(skillId: number, imageId: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/skills/${skillId}/image/delete/${imageId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
    });
    if(!response.ok) {
        throw new Error("Failed to delete example image")
    }
    console.log("Message: ", response);
}

export async function createSkill(skill: SkillPayload) {
    const token = localStorage.getItem("token")

    console.log("Skill to send:")
    console.log(skill)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/skills/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(skill)
    });

    if (!response.ok) {
        throw new Error("Failed to create skill");
    }

    return response.json();

}

export async function updateSkill(id: number, skill: SkillPayload) {
    const token = localStorage.getItem("token");
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/skills/${id}/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(skill)
    })

    return res.json();
}

export async function addExamplesToS3(skillId: number, skillFiles: File[]) {
    const token = localStorage.getItem("token");
    const urls = [];
    for(const file of skillFiles){
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/skills/${skillId}/image/upload`, {
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

export async function updateExampleImages(id: number, imageUrls: ImageUrlPayload) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/skills/${id}/image/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(imageUrls)
    })
    if (!response.ok) {
        throw new Error("Failed to update skill");
    }

    return response.json();
}

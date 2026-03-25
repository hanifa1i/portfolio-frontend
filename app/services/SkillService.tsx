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

export async function createSkill(skill: SkillPayload) {
    const token = localStorage.getItem("token")

    console.log("Skill to send:")
    console.log(skill)

    const response = await fetch("http://localhost:8080/api/admin/skills/create", {
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

export async function addExamplesToS3(skillId: number, skillFiles: File[]) {
    const token = localStorage.getItem("token");
    const urls = [];
    for(const file of skillFiles){
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`http://localhost:8080/api/admin/skills/${skillId}/image/upload`, {
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
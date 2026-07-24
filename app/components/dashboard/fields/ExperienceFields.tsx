import type { ActivityResponse, ProjectResponse, WorkExperienceResponse } from "@/app/types/Dashboard";
import type { Field } from "@/app/types/Field";

export const experienceFields: Field<WorkExperienceResponse>[] = [
    { key: "id", label: "ID", width: "0.3fr" },
    { key: "job_title", label: "Job Title" },
    { key: "company_name", label: "Company" },
    { key: "location", label: "Location" },
    { key: "start_date", label: "Start Date", width: "0.7fr"  },
    { key: "end_date", label: "End Date", width: "0.7fr" },
    {
        key: "projects",
        label: "Project",
        width: "0.5fr",
        render: (arr) => (arr as ProjectResponse[]).length,
    },
    {
        key: "activities",
        label: "Activites",
        width: "0.5fr",
        render: (arr) => (arr as ActivityResponse[]).length,
    },
    {
        key: "skills",
        label: "Skills",
        width: "0.5fr",
        render: (arr) => (arr as string[]).length,
    }
];

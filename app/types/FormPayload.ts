export type ExperiencePayload = {
    job_title: string,
    company_name: string,
    description: string,
    location: string,
    start_date: string,
    end_date: string,
    projects: WorkProject[],
    activities: WorkActivity[],
    skills: string[]
}

export type WorkProject = {
    title: string
    description: string
}
export type WorkActivity = {
    activity: string
    description: string
    day: string
    start_time: string
    end_time: string
}
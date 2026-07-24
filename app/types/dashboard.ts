import SketchbooksPage from "../sketchbooks/page";

export type Section = {
    label: string
    image: string
    total: number
}


export type Artwork = {
    id: number;
    mainImageUrl: string;
    description: string;
    dateCreated: Date;
    toolUsed: string;
    category: string;
    dimensions: string;
    bookPage: string;
    pageNumber: string;
}
export type ArtworkResponse = {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    visible: boolean;
    tool: string;
    image_urls: ImageResponse[];
    tag_names: string[];
    book_page: string;
    page_number: number;
};
export type ImageResponse = {
    id: number;
    image_url: string;
}

export type TagResponse = {
    id: number;
    name: string;
    type: string;
}

export type Sketchbook = {
    id: number;
    title: string;
    description: string;
    year: string;
    totalPages: number;
    pageSize: string;
    pages: Page[];
}

export type Page = {
    id: number;
    book: string;
    pageNumber: number;
    sketchUrl: string;
    description: string;
}

export type SkillResponse = {
    id: number;
    name: string;
    skill_type: string;
    description: string;
    experience_locations: string[];
    examples: ExampleResponse[];
}
export type ExampleResponse = {
    id: number;
    exampleType: string;
    url: string;
    note: string;
}

export type QualificationResponse = {
    id: number;
    qualification: string
    institution: string;
    level: string;
    grade: string;
    start_date: string;
    end_date: string;
    description: string;
    certificates: ImageResponse[];
}

export type WorkExperienceResponse = {
    id: number;
    job_title: string;
    company_name: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    projects: ProjectResponse[];
    activities: ActivityResponse[];
    skills: string[];
    created_at: string;
}
export type ProjectResponse = {
    id: number;
    title: string;
    description: string;
}
export type ActivityResponse = {
    id: number;
    activity: string;
    description: string;
    day: string;
    start_time: string;
    end_time: string;
}

export type TotalCount = {
    total_artworks: number;
	total_sketchbook_pages: number;
	total_skills: number;
	total_experience: number;
	total_qualifications: number;
}

export type RecentActivity = {
    id: number;
    entityId: number;
    entityType: string;
    actionType: string;
    description: string;
    createdAt: string;
    notes: string;
}
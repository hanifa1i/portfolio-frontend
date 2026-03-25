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
}
export type ArtworkResponse = {
  id: number;
  title: string;
  description: string;
  updated_at: string;
  visible: boolean;
  image_urls: string[];
  tag_names: string[];
};

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
    sketchbookId: number;
    pageNumber: number;
    sketchUrl: string
}

export type Skill = {
    id: number;
    skillName: string;
    category: string;
    description: string;
    whereLearnt: string[];
    exampleUrls: string[];
    imageExampleUrls: string[];
}

export type Qualification = {
    id: number;
    level: string;
    subject: string;
    institution: string;
    grade: string;
    imageUrl: string;
}
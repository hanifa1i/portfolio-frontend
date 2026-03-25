import type { Sketchbook } from "@/app/types/dashboard";
import { pages } from "./Pages"

export const sketchbooks: Sketchbook[] = [
  {
    id: 1,
    title: "Daily Sketches Vol. 1",
    description: "Practice sketches exploring form and composition.",
    year: "2023",
    totalPages: 120,
    pageSize: "A4",
    pages: pages.filter(p => p.sketchbookId === 1),
  },
  {
    id: 2,
    title: "Figure Studies",
    description: "Anatomy and gesture drawing practice.",
    year: "2024",
    totalPages: 80,
    pageSize: "A5",
    pages: pages.filter(p => p.sketchbookId === 2),
  },
];

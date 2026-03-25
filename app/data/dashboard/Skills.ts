import type { Skill } from "@/app/types/dashboard";

export const skills: Skill[] = [
  {
    id: 1,
    skillName: "React",
    category: "Frontend",
    description: "Building interactive user interfaces using components.",
    whereLearnt: ["Personal projects", "Online tutorials"],
    exampleUrls: ["https://example.com/react-demo"],
    imageExampleUrls: ["/images/mock/react-example.jpg"],
  },
  {
    id: 2,
    skillName: "Java",
    category: "Backend",
    description: "Object-oriented programming and API development.",
    whereLearnt: ["Practice projects"],
    exampleUrls: [],
    imageExampleUrls: [],
  },
];

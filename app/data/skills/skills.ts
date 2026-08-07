export type SkillSection = {
  id: string;
  title: string;
  items: string[];
};

export const skillsDummy: SkillSection[] = [
  {
    id: "languages-frameworks",
    title: "languages & framework",
    items: [
      "Java",
      "Python",
      "C++",
      "SQL",
      "JavaScript",
      "HTML",
      "CSS",
      "Springboot",
      "Drools",
    ],
  },
  {
    id: "backend-devops",
    title: "back-end & devOps",
    items: [
      "RESTFUL API",
      "CI/CD",
      "Openshift",
      "Jenkins",
      "Helm Chart",
      "Docker",
      "Gradle",
      "Maven",
      "Intellij",
    ],
  },
  {
    id: "testing",
    title: "testing",
    items: [
      "Unit testing",
      "Integration testing",
      "Acceptance testing",
      "Mocking frameworks",
      "Mockito",
      "jenkins test pipeline integration",
    ],
  },
  {
    id: "databases-message-brokers",
    title: "databases and message brokers",
    items: [
      "IBM DB2",
      "postgreSQL",
      "rabbitMQ",
      "DBeaver",
      "DB visualizer",
    ],
  },
  {
    id: "api-integration",
    title: "API & integration",
    items: [
      "REST APIs",
      "schemas & openAPI",
      "YAML",
      "JSON",
      "insomnia",
      "postman",
    ],
  },
  {
    id: "frontend-design",
    title: "front-end & design awareness",
    items: [
      "website design",
      "app dev",
      "UI/UX design",
      "layout design",
      "visual prototyping",
      "design tools",
    ],
  },
  {
    id: "security-best-practices",
    title: "security & best practices",
    items: [
      "API authentication (e.g. token-based access)",
      "environment variable management",
      "CI/CD pipeline integrity",
      "feature toggles",
      "input validation in API payloads",
      "dependency management (e.g. renovate)",
      "code quality awareness",
      "sandbox environments",
    ],
  },
  {
    id: "collaboration-workflow",
    title: "collaboration & workflow",
    items: [
      "agile (e.g. sprints, jira tickets)",
      "epic planning sessions",
      "ticket creation & refinement",
      "documentation writing",
      "code reviews",
      "pair programming & mentoring",
      "cross-team collaboration",
      "git",
    ],
  },
];

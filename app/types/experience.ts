export type ActivityItem = {
    day: string;
  title: string;
  description: string;
};

export type Project = {
  title: string;
  description: string;
};

export type WorkExperience = {
  id: number;
  title: string;
  company: string;
  period: string;
  summary: string;
  skillsLearned: string[];
  projects: Project[];
  weeklyActivities: Record<string, ActivityItem[]>;
};


export type WeeklyActivities = Record<
  string,
  ActivityItem[]
>;
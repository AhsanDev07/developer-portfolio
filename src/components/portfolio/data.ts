import taskflowImg from "@/assets/project-taskflow.jpg";
import aiImg from "@/assets/project-ai-assistant.jpg";
import dbImg from "@/assets/project-student-db.jpg";

export const PROFILE = {
  name: "Syed Ahsan Shah",
  email: "ahsan0370577@gmail.com",
  phoneDisplay: "0370 5778310",
  phoneHref: "tel:+923705778310",
  github: "https://github.com/AhsanDev07",
  githubHandle: "AhsanDev07",
};

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
};

export const PROJECTS: Project[] = [
  {
    title: "TaskFlow Dashboard",
    description:
      "A clean, responsive productivity dashboard for planning tasks, tracking progress and visualising weekly goals.",
    image: taskflowImg,
    tech: ["HTML", "CSS", "JavaScript"],
    github: PROFILE.github,
  },
  {
    title: "AI Study Assistant",
    description:
      "A chat-style helper that answers study questions and summarises notes, exploring how AI can support students.",
    image: aiImg,
    tech: ["JavaScript", "AI APIs", "CSS"],
    github: PROFILE.github,
  },
  {
    title: "Student Records System",
    description:
      "A console-based management system for student records with search, sorting and structured database storage.",
    image: dbImg,
    tech: ["C++", "SQL", "Database Design"],
    github: PROFILE.github,
  },
];

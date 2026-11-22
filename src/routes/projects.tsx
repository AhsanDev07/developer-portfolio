import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/portfolio/PageShell";
import { Projects } from "@/components/portfolio/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Syed Ahsan Shah" },
      { name: "description", content: "Web projects built by Syed Ahsan Shah, with live demos and source code on GitHub." },
      { property: "og:title", content: "Projects — Syed Ahsan Shah" },
      { property: "og:description", content: "Web projects built by Syed Ahsan Shah, with live demos and source code on GitHub." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell>
      <Projects />
    </PageShell>
  );
}

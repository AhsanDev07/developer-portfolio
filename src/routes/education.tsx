import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/portfolio/PageShell";
import { Education } from "@/components/portfolio/Education";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education — Syed Ahsan Shah" },
      { name: "description", content: "Syed Ahsan Shah's studies in Information Technology at the University of Balochistan." },
      { property: "og:title", content: "Education — Syed Ahsan Shah" },
      { property: "og:description", content: "Syed Ahsan Shah's studies in Information Technology at the University of Balochistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EducationPage,
});

function EducationPage() {
  return (
    <PageShell>
      <Education />
    </PageShell>
  );
}

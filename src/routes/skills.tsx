import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/portfolio/PageShell";
import { Skills } from "@/components/portfolio/Skills";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Syed Ahsan Shah" },
      { name: "description", content: "The languages, tools and technologies Syed Ahsan Shah works with, from HTML and CSS to JavaScript." },
      { property: "og:title", content: "Skills — Syed Ahsan Shah" },
      { property: "og:description", content: "The languages, tools and technologies Syed Ahsan Shah works with, from HTML and CSS to JavaScript." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <PageShell>
      <Skills />
    </PageShell>
  );
}

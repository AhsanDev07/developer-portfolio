import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/portfolio/PageShell";
import { Hero } from "@/components/portfolio/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Syed Ahsan Shah — IT Student & Aspiring Web Developer" },
      {
        name: "description",
        content:
          "Portfolio of Syed Ahsan Shah, IT student at the University of Balochistan and aspiring web developer.",
      },
      { property: "og:title", content: "Syed Ahsan Shah — IT Student & Aspiring Web Developer" },
      {
        property: "og:description",
        content: "Explore Ahsan's skills, projects and education — and get in touch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell offsetNav={false}>
      <Hero />
    </PageShell>
  );
}

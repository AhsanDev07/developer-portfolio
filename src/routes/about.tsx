import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/portfolio/PageShell";
import { About } from "@/components/portfolio/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Syed Ahsan Shah" },
      { name: "description", content: "Who Syed Ahsan Shah is: an IT student from Balochistan passionate about web development and AI." },
      { property: "og:title", content: "About — Syed Ahsan Shah" },
      { property: "og:description", content: "Who Syed Ahsan Shah is: an IT student from Balochistan passionate about web development and AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <About />
    </PageShell>
  );
}

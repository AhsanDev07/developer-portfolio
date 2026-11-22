import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/portfolio/PageShell";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Syed Ahsan Shah" },
      { name: "description", content: "Get in touch with Syed Ahsan Shah by message, email or phone for projects and collaboration." },
      { property: "og:title", content: "Contact — Syed Ahsan Shah" },
      { property: "og:description", content: "Get in touch with Syed Ahsan Shah by message, email or phone for projects and collaboration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <Contact />
    </PageShell>
  );
}

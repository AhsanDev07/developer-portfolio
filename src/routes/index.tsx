import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Syed Ahsan Shah — IT Student & Aspiring Web Developer" },
      {
        name: "description",
        content:
          "Portfolio of Syed Ahsan Shah, IT student at the University of Balochistan and aspiring web developer. Skills, projects and contact.",
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

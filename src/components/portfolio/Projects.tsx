import { type MouseEvent } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROFILE, PROJECTS, type Project } from "./data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const onLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tilt-card glass group relative flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <div className="tilt-shine pointer-events-none absolute inset-0 z-10" />
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          width={1586}
          height={992}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-xs text-cyan">
          0{index + 1}
        </span>
      </div>

      <div className="relative z-20 flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full bg-accent px-3 py-1 font-mono text-[11px] text-accent-foreground">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Button asChild variant="hero" size="sm" className="rounded-full px-4">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github /> GitHub
            </a>
          </Button>
          <Button asChild variant="glass" size="sm" className="rounded-full px-4">
            <a href={project.github} target="_blank" rel="noreferrer">
              Source <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="orb-cyan pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="Things I've built."
          subtitle="A selection of projects where I practised design, logic and problem solving."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button asChild variant="glass" size="xl">
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              <Github /> See more on GitHub
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

import { Brain, Braces, Database, FileCode2, Palette, Terminal } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SKILLS = [
  { icon: FileCode2, name: "HTML", text: "Semantic, accessible page structure.", tags: ["HTML5", "Forms", "SEO basics"] },
  { icon: Palette, name: "CSS", text: "Responsive layouts and smooth animations.", tags: ["Flexbox", "Grid", "Animations"] },
  { icon: Braces, name: "JavaScript", text: "Interactive, dynamic web experiences.", tags: ["DOM", "ES6+", "Events"] },
  { icon: Terminal, name: "C++", text: "Problem solving and programming fundamentals.", tags: ["OOP", "Data structures", "Logic"] },
  { icon: Database, name: "Database Management", text: "Designing and querying structured data.", tags: ["SQL", "ER design", "Normalization"] },
  { icon: Brain, name: "Artificial Intelligence", text: "Exploring how machines learn and assist.", tags: ["ML basics", "Prompting", "AI tools"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative bg-surface-gradient py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="My toolkit."
          subtitle="The languages and technologies I work with and keep growing in."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <Reveal key={s.name} delay={i * 70}>
              <div className="glass group relative h-full overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:glow-cyan">
                <div className="orb-primary pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-gradient text-primary-foreground glow-primary">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="relative mt-6 text-xl font-semibold text-foreground">{s.name}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-glass-border bg-muted/50 px-3 py-1 font-mono text-[11px] text-cyan">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

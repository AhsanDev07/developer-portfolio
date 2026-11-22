import { Code2, Cpu, Lightbulb, Rocket } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const HIGHLIGHTS = [
  { icon: Code2, title: "Programming", text: "Writing logic in C++ and JavaScript, and loving the moment it finally works." },
  { icon: Rocket, title: "Web Development", text: "Building responsive, fast and good-looking websites from scratch." },
  { icon: Cpu, title: "Technology", text: "Curious about how systems, databases and networks fit together." },
  { icon: Lightbulb, title: "Problem Solving", text: "Breaking big problems into small, clear steps — then shipping." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="01" eyebrow="About me" title="Student by day, builder by night." />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I'm <span className="font-semibold text-foreground">Syed Ahsan Shah</span>, an Information
              Technology student at the University of Balochistan. What started as curiosity about how websites
              work has grown into a real passion for programming and building things for the web.
            </p>
            <p>
              I enjoy turning ideas into clean, user-friendly interfaces and learning the technology behind
              them — from databases to artificial intelligence. Every project is a chance to learn something new
              and get a little better.
            </p>
            <p>
              Right now I'm focused on sharpening my web development skills, building real projects, and
              looking for opportunities to grow with a team.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "6+", label: "Core skills" },
                { value: "3", label: "Featured projects" },
                { value: "∞", label: "Curiosity" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center">
                  <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 90}>
                <div className="glass group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30">
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent text-cyan transition-all group-hover:bg-accent-gradient group-hover:text-primary-foreground">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

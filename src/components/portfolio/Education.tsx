import { BookOpen, GraduationCap, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="relative bg-surface-gradient py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="04" eyebrow="Education" title="Where I'm learning." />

        <div className="relative pl-8 sm:pl-12">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan via-primary to-transparent sm:left-5" />

          <Reveal>
            <div className="relative">
              <span className="absolute -left-8 top-8 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full bg-accent-gradient glow-primary sm:-left-12 sm:translate-x-[-25%]">
                <span className="h-2 w-2 rounded-full bg-primary-foreground" />
              </span>

              <div className="glass gradient-border rounded-3xl p-7 sm:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-gradient text-primary-foreground glow-primary">
                      <GraduationCap className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">University of Balochistan</h3>
                      <p className="mt-1 text-base font-medium text-cyan">Information Technology Department</p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" /> Quetta, Balochistan, Pakistan
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan/30 bg-accent px-4 py-1.5 font-mono text-xs text-cyan">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> Currently enrolled
                  </span>
                </div>

                <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
                  Studying Information Technology with a focus on programming, web technologies and database
                  systems — building a strong foundation in both theory and hands-on practice.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {["Programming Fundamentals", "Web Technologies", "Database Systems", "Artificial Intelligence", "Networking"].map(
                    (c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-muted/50 px-3 py-1.5 text-xs text-foreground/90"
                      >
                        <BookOpen className="h-3.5 w-3.5 text-cyan" /> {c}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

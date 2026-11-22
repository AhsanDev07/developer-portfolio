import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
        <span className="text-muted-foreground">{index}</span>
        <span className="h-px w-10 bg-accent-gradient" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

import { useEffect, useState } from "react";
import { ArrowRight, Github, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/ahsan-portrait.jpg.asset.json";
import { PROFILE } from "./data";

const PHRASES = [
  "build clean, modern websites.",
  "turn ideas into interfaces.",
  "explore artificial intelligence.",
  "write code that solves problems.",
];

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(PHRASES);

  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-36 sm:pt-40 lg:pb-32 lg:pt-44">
      <div className="grid-backdrop pointer-events-none absolute inset-0" />
      <div className="orb-primary animate-pulse-glow pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem]" />
      <div className="orb-cyan animate-pulse-glow pointer-events-none absolute -right-24 top-40 h-[24rem] w-[24rem]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Open to internships & collaborations
          </span>

          <h1 className="text-4xl font-bold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Hi, I'm <br className="hidden sm:block" />
            <span className="text-gradient">Syed Ahsan Shah</span>
          </h1>

          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-base font-medium text-foreground/90 sm:text-lg">
            <span>IT Student</span>
            <span className="h-1 w-1 rounded-full bg-cyan" />
            <span>Aspiring Web Developer</span>
            <span className="h-1 w-1 rounded-full bg-cyan" />
            <span>Tech Enthusiast</span>
          </p>

          <p className="mt-5 min-h-[1.75rem] font-mono text-sm text-muted-foreground sm:text-base" aria-live="polite">
            <span className="text-cyan">&gt;</span> I love to <span className="text-foreground">{typed}</span>
            <span className="caret ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-cyan" />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I'm studying Information Technology at the University of Balochistan and building my way into
            web development — one project, one line of code at a time.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl">
              <a href="#projects">
                View My Projects <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#contact">
                <Mail /> Contact Me
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-5 text-sm text-muted-foreground">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-cyan"
            >
              <Github className="h-4 w-4" /> {PROFILE.githubHandle}
            </a>
            <span className="h-4 w-px bg-border" />
            <a href={`mailto:${PROFILE.email}`} className="transition-colors hover:text-cyan">
              {PROFILE.email}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-in fade-in zoom-in-95 duration-1000 lg:max-w-none">
          <div className="animate-spin-slow absolute -inset-6 rounded-full border border-dashed border-cyan/25" />
          <div className="absolute -inset-2 rounded-[2.5rem] bg-accent-gradient opacity-40 blur-2xl" />
          <div className="animate-float relative">
            <div className="gradient-border glass overflow-hidden rounded-[2rem] p-2">
              <div className="relative">
                <img
                  src={portrait.url}
                  alt="Ahsan Shah wearing sunglasses and a blue gradient shirt"
                  width={828}
                  height={828}
                  className="aspect-square w-full rounded-[1.6rem] object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] bg-gradient-to-t from-background/55 via-transparent to-transparent" />
              </div>
            </div>

            <div className="glass absolute -left-4 top-8 rounded-2xl px-4 py-3 font-mono text-xs sm:-left-10">
              <span className="text-cyan">const</span> <span className="text-foreground">dev</span> ={" "}
              <span className="text-primary">"Ahsan"</span>;
            </div>
            <div className="glass absolute -right-3 bottom-10 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-right-8">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-gradient text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Currently learning</p>
                <p className="text-sm font-semibold text-foreground">Web & AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

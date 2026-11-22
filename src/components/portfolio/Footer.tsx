import { Link } from "@tanstack/react-router";
import { ArrowUp, Github, Lock, Mail, Phone } from "lucide-react";
import { NAV_LINKS, PROFILE } from "./data";

export function Footer() {
  return (
    <footer className="relative border-t border-glass-border bg-navy">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-60" />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-gradient font-display text-sm font-bold text-primary-foreground">
                SA
              </span>
              <span className="font-display text-lg font-semibold text-foreground">
                Syed Ahsan Shah
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              IT student and aspiring web developer, crafting clean digital experiences from Balochistan.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan">Navigate</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Github, href: PROFILE.github, label: "GitHub", external: true },
                { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email", external: false },
                { icon: Phone, href: PROFILE.phoneHref, label: "Phone", external: false },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noreferrer" : undefined}
                  className="glass grid h-11 w-11 place-items-center rounded-xl text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Syed Ahsan Shah. Designed & built with passion.</p>
          <div className="flex items-center gap-6">
            <Link to="/inbox" className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan">
              <Lock className="h-3 w-3" /> Owner inbox
            </Link>
            <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-cyan">
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

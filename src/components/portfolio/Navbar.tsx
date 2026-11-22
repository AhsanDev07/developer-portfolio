import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import portrait from "@/assets/ahsan-portrait.jpg.asset.json";
import { NAV_LINKS } from "./data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-3" : "py-5",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="glow-primary grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-accent-gradient">
            <img src={portrait.url} alt="" width={36} height={36} className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-base font-semibold text-foreground">
            Ahsan<span className="text-cyan">.dev</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                to={link.to}
                activeOptions={{ exact: true }}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-accent-gradient transition-transform duration-300 group-data-[status=active]:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden rounded-full border border-glass-border px-5 py-2 text-sm font-semibold text-foreground transition-all hover:border-cyan/50 hover:text-cyan md:inline-flex"
        >
          Let's talk
        </Link>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-glass-border text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="glass mx-5 mt-3 flex flex-col gap-1 rounded-2xl p-3">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                to={link.to}
                activeOptions={{ exact: true }}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

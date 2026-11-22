import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

/** Shared frame for every portfolio page: sticky menu on top, footer at the bottom. */
export function PageShell({ children, offsetNav = true }: { children: ReactNode; offsetNav?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className={cn("flex-1", offsetNav && "pt-16 sm:pt-12")}>{children}</main>
      <Footer />
    </div>
  );
}

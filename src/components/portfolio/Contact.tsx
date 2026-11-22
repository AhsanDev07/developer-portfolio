import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Github, Loader2, Mail, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PROFILE } from "./data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().max(150, "Subject is too long"),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000, "Message is too long"),
});

type Errors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

const CHANNELS = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: "Phone", value: PROFILE.phoneDisplay, href: PROFILE.phoneHref },
  { icon: Github, label: "GitHub", value: `github.com/${PROFILE.githubHandle}`, href: PROFILE.github },
];

const fieldClass =
  "h-12 rounded-xl border-glass-border bg-background/60 px-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:border-cyan/50 focus-visible:ring-cyan/30";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const update = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSending(false);
    if (error) {
      toast.error("Your message couldn't be sent. Please try again or email me directly.");
      return;
    }
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="orb-primary pointer-events-none absolute -left-20 bottom-0 h-96 w-96 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title="Let's build something together."
          subtitle="Have a project, an internship opportunity or just want to say hello? My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <a
                  href={c.href}
                  target={c.label === "GitHub" ? "_blank" : undefined}
                  rel={c.label === "GitHub" ? "noreferrer" : undefined}
                  className="glass group flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/30 hover:glow-cyan"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-cyan transition-all group-hover:bg-accent-gradient group-hover:text-primary-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">{c.label}</span>
                    <span className="block truncate font-medium text-foreground">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} noValidate className="glass gradient-border space-y-5 rounded-3xl p-6 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" value={form.name} onChange={(e) => update("name")(e.target.value)} placeholder="Ali Khan" className={fieldClass} aria-invalid={!!errors.name} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => update("email")(e.target.value)} placeholder="you@example.com" className={fieldClass} aria-invalid={!!errors.email} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={form.subject} onChange={(e) => update("subject")(e.target.value)} placeholder="Project idea, internship, collaboration…" className={fieldClass} />
                {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={6} value={form.message} onChange={(e) => update("message")(e.target.value)} placeholder="Tell me a bit about what you have in mind…" className="min-h-36 rounded-xl border-glass-border bg-background/60 p-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:border-cyan/50 focus-visible:ring-cyan/30" aria-invalid={!!errors.message} />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto" disabled={sending}>
                {sending ? <Loader2 className="animate-spin" /> : <Send />}
                {sending ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

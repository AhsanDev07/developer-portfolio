import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Ahsan's Inbox" },
      { name: "description", content: "Private sign-in for Syed Ahsan Shah to read portfolio messages." },
      { property: "og:title", content: "Sign in — Ahsan's Inbox" },
      { property: "og:description", content: "Private sign-in for the portfolio owner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function GoogleLogo() {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="!size-[18px]">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/inbox", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/inbox", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 6) {
      toast.error("Enter your email and a password of at least 6 characters.");
      return;
    }
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) toast.error(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      setBusy(false);
      if (error) toast.error(error.message);
      else if (!data.session) setCheckEmail(true);
    }
  };

  const social = async (provider: "google" | "lovable") => {
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}/auth`,
    });
    if (result.error) toast.error("Sign-in failed. Please try again.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16">
      <div className="grid-backdrop pointer-events-none absolute inset-0" />
      <div className="orb-primary pointer-events-none absolute -left-20 top-10 h-96 w-96" />
      <div className="orb-cyan pointer-events-none absolute -right-20 bottom-10 h-96 w-96" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan">
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <div className="glass gradient-border rounded-3xl p-8">
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent-gradient text-primary-foreground glow-primary">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-semibold text-foreground">
            {mode === "signin" ? "Sign in to your inbox" : "Create your owner account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Only the portfolio owner's account can read contact messages.
          </p>

          {checkEmail ? (
            <div className="mt-6 rounded-2xl border border-cyan/30 bg-accent p-5 text-sm text-foreground">
              Check <span className="font-semibold">{email}</span> for a confirmation link, then come back and sign in.
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-3">
                <Button
                  type="button"
                  onClick={() => social("google")}
                  className="h-11 gap-2.5 rounded-xl border border-google-border bg-google px-3 font-medium text-google-foreground hover:bg-google/90"
                >
                  <GoogleLogo /> Continue with Google
                </Button>
                <Button type="button" variant="outline" onClick={() => social("lovable")} className="h-11 rounded-xl border-glass-border bg-transparent">
                  <LovableMark /> Continue with Lovable
                </Button>
              </div>

              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="auth-email">Email</Label>
                  <Input id="auth-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl border-glass-border bg-background/60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auth-password">Password</Label>
                  <Input id="auth-password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-xl border-glass-border bg-background/60" />
                </div>
                <Button type="submit" variant="hero" className="h-11 w-full rounded-xl" disabled={busy}>
                  {busy && <Loader2 className="animate-spin" />}
                  {mode === "signin" ? "Sign in" : "Create account"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {mode === "signin" ? "First time here?" : "Already have an account?"}{" "}
                <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="font-semibold text-cyan hover:underline">
                  {mode === "signin" ? "Create account" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

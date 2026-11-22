import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Inbox as InboxIcon, LogOut, Mail, MailOpen, ShieldAlert, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inboxQuery = queryOptions({
  queryKey: ["inbox"],
  queryFn: async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return { email: null, isAdmin: false, messages: [] };
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin");
    if (!isAdmin) return { email: user.email ?? null, isAdmin, messages: [] };
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { email: user.email ?? null, isAdmin, messages: data };
  },
});

export const Route = createFileRoute("/_authenticated/inbox")({
  head: () => ({
    meta: [
      { title: "Inbox — Syed Ahsan Shah" },
      { name: "description", content: "Private inbox for messages sent through the portfolio contact form." },
      { property: "og:title", content: "Inbox — Syed Ahsan Shah" },
      { property: "og:description", content: "Private inbox for portfolio messages." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(inboxQuery),
  component: InboxPage,
});

function InboxPage() {
  const { data } = useSuspenseQuery(inboxQuery);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const toggleRead = useMutation({
    mutationFn: async ({ id, is_read }: { id: string; is_read: boolean }) => {
      const { error } = await supabase.from("contact_messages").update({ is_read }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inbox"] }),
    onError: () => toast.error("Couldn't update the message."),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Message deleted");
      queryClient.invalidateQueries({ queryKey: ["inbox"] });
    },
    onError: () => toast.error("Couldn't delete the message."),
  });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const unread = data.messages.filter((m) => !m.is_read).length;

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grid-backdrop pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan">
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{data.email}</span>
            <Button variant="glass" size="sm" className="rounded-full" onClick={signOut}>
              <LogOut /> Sign out
            </Button>
          </div>
        </div>

        {!data.isAdmin ? (
          <div className="glass rounded-3xl p-10 text-center">
            <ShieldAlert className="mx-auto h-10 w-10 text-cyan" />
            <h1 className="mt-4 text-2xl font-semibold text-foreground">No access</h1>
            <p className="mt-2 text-muted-foreground">
              This account can't read portfolio messages. Sign in with the owner's account instead.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Private</p>
                <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">Inbox</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.messages.length} messages · <span className="text-cyan">{unread} unread</span>
              </p>
            </div>

            {data.messages.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <InboxIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">No messages yet. They'll appear here when someone uses the contact form.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {data.messages.map((m) => (
                  <li
                    key={m.id}
                    className={cn(
                      "glass rounded-2xl p-6 transition-colors",
                      !m.is_read && "border-cyan/40",
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {!m.is_read && <span className="h-2 w-2 rounded-full bg-cyan" />}
                          <h2 className="truncate text-lg font-semibold text-foreground">{m.subject || "(No subject)"}</h2>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {m.name} ·{" "}
                          <a href={`mailto:${m.email}`} className="text-cyan hover:underline">
                            {m.email}
                          </a>
                        </p>
                      </div>
                      <time className="font-mono text-xs text-muted-foreground" dateTime={m.created_at}>
                        {new Date(m.created_at).toLocaleString()}
                      </time>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{m.message}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button asChild variant="hero" size="sm" className="rounded-full">
                        <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || "Your message"}`)}`}>
                          <Mail /> Reply
                        </a>
                      </Button>
                      <Button
                        variant="glass"
                        size="sm"
                        className="rounded-full"
                        onClick={() => toggleRead.mutate({ id: m.id, is_read: !m.is_read })}
                      >
                        <MailOpen /> {m.is_read ? "Mark unread" : "Mark read"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm("Delete this message?")) remove.mutate(m.id);
                        }}
                      >
                        <Trash2 /> Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

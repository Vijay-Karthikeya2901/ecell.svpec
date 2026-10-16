import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  FileText,
  Plus,
  Users,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Timer,
  Clock,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  getAllBlogs,
  getAllTeamMembers,
  getUpcomingEvents,
  getAllTestimonials,
  type FirebaseBlog,
  type FirebaseEvent,
  type FirebaseTeamMember,
  type FirebaseTestimonial,
} from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

const formatDate = (value: Date | null) =>
  value
    ? value.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

function AdminDashboard() {
  const [blogs, setBlogs] = useState<FirebaseBlog[]>([]);
  const [events, setEvents] = useState<FirebaseEvent[]>([]);
  const [team, setTeam] = useState<FirebaseTeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<FirebaseTestimonial[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.allSettled([
      getAllBlogs(),
      getUpcomingEvents(),
      getAllTeamMembers(),
      getAllTestimonials(),
    ])
      .then(([blogsRes, eventsRes, teamRes, testRes]) => {
        if (blogsRes.status === "fulfilled") setBlogs(blogsRes.value);
        if (eventsRes.status === "fulfilled") setEvents(eventsRes.value);
        if (teamRes.status === "fulfilled") setTeam(teamRes.value);
        if (testRes.status === "fulfilled") setTestimonials(testRes.value);
      })
      .catch((e) => setError(firebaseErrorMessage(e)));
  }, []);

  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const pendingTestimonials = testimonials.filter((t) => t.status === "pending").length;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Overview</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-brand-navy">
            E-Cell Executive CMS
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage student ventures, upcoming summits, blog publications, and leadership roster.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Link to="/admin/blogs/new">
              <Plus className="mr-1 size-3.5" /> Blog
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-border/80">
            <Link to="/admin/events/new">
              <Plus className="mr-1 size-3.5" /> Event
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-border/80">
            <Link to="/admin/team/new">
              <Plus className="mr-1 size-3.5" /> Team
            </Link>
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Metrics Strip */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
            <FileText className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-mono text-3xl font-black tracking-tight text-brand-navy tabular-nums">
            {blogs.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            <span className="font-semibold text-primary">{publishedBlogs}</span> published ·{" "}
            {blogs.length - publishedBlogs} drafts
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Scheduled Events</span>
            <CalendarDays className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-mono text-3xl font-black tracking-tight text-brand-navy tabular-nums">
            {events.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Live across campus calendar</p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Testimonials</span>
            <MessageSquare className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-mono text-3xl font-black tracking-tight text-brand-navy tabular-nums">
            {testimonials.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {pendingTestimonials > 0 ? (
              <span className="font-bold text-amber-600 animate-pulse">
                {pendingTestimonials} pending review
              </span>
            ) : (
              <span>All submissions reviewed</span>
            )}
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Team Roster</span>
            <Users className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-mono text-3xl font-black tracking-tight text-brand-navy tabular-nums">
            {team.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Council & department leads</p>
        </div>
      </div>

      {/* Quick Action Control Banners */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          to="/admin/testimonials"
          className="group rounded-xl border border-border/80 bg-card p-6 shadow-xs hover:border-primary/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <MessageSquare className="size-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-brand-navy">Moderate Testimonials</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Review student feedback. Allow or deny submissions before showcasing on the site.
              </p>
              {pendingTestimonials > 0 && (
                <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-amber-600">
                  <Clock className="size-3" /> {pendingTestimonials} waiting for approval
                </span>
              )}
            </div>
          </div>
          <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/admin/countdown"
          className="group rounded-xl border border-border/80 bg-card p-6 shadow-xs hover:border-primary/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Timer className="size-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-brand-navy">Flagship Event Countdown</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Set the upcoming conclave name, target date/time, prize pool and registration URL.
              </p>
            </div>
          </div>
          <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-8 rounded-xl border border-border/80 bg-card shadow-xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/80 p-5 bg-secondary/30">
          <h2 className="font-bold text-sm tracking-tight text-brand-navy">Recent Articles</h2>
          <Link
            to="/admin/blogs"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            Manage all <ArrowRight className="size-3" />
          </Link>
        </div>

        {blogs.slice(0, 5).map((blog) => (
          <div
            key={blog.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 p-5 last:border-0 hover:bg-muted/30 transition-colors"
          >
            <div>
              <Link
                to="/admin/blogs/edit/$id"
                params={{ id: blog.id }}
                className="font-bold text-sm text-brand-navy hover:text-primary transition-colors"
              >
                {blog.title}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="font-semibold text-primary">{blog.category}</span> · Created{" "}
                {formatDate(blog.createdAt?.toDate?.() ?? null)}
              </p>
            </div>
            <span
              className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                blog.status === "published"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {blog.status}
            </span>
          </div>
        ))}

        {blogs.length === 0 && (
          <div className="p-8 text-center text-xs text-muted-foreground">
            No dynamic blogs yet. Use "+ Blog" to draft your first post.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  CalendarDays,
  FileText,
  LogOut,
  Menu,
  Plus,
  Users,
  X,
  MessageSquare,
  Timer,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { logoutAdmin } from "@/lib/firebase-auth";
import { AdminGuard } from "./admin-auth";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    await logoutAdmin();
    await navigate({ to: "/admin/login" });
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-secondary/60 text-foreground">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-brand-navy p-6 text-white transition-transform lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link to="/admin" className="text-xl font-black tracking-tight">
              E-CELL <span className="text-primary font-bold">ADMIN</span>
            </Link>
            <button
              className="lg:hidden text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="mt-8 grid gap-1.5 text-sm font-semibold">
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/75 hover:bg-white/10 hover:text-white transition-colors"
              activeProps={{ className: "bg-white/15 text-white font-bold" }}
            >
              <BarChart3 className="size-4" /> Dashboard
            </Link>

            <Link
              to="/admin/events"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/75 hover:bg-white/10 hover:text-white transition-colors"
              activeProps={{ className: "bg-white/15 text-white font-bold" }}
            >
              <CalendarDays className="size-4" /> Events
            </Link>

            <Link
              to="/admin/countdown"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/75 hover:bg-white/10 hover:text-white transition-colors"
              activeProps={{ className: "bg-white/15 text-white font-bold" }}
            >
              <Timer className="size-4 text-[#38bdf8]" /> Event Countdown
            </Link>

            <Link
              to="/admin/testimonials"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/75 hover:bg-white/10 hover:text-white transition-colors"
              activeProps={{ className: "bg-white/15 text-white font-bold" }}
            >
              <MessageSquare className="size-4 text-[#38bdf8]" /> Testimonials
            </Link>

            <Link
              to="/admin/team"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/75 hover:bg-white/10 hover:text-white transition-colors"
              activeProps={{ className: "bg-white/15 text-white font-bold" }}
            >
              <Users className="size-4" /> Team
            </Link>

            <Link
              to="/admin/blogs"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/75 hover:bg-white/10 hover:text-white transition-colors"
              activeProps={{ className: "bg-white/15 text-white font-bold" }}
            >
              <FileText className="size-4" /> Blogs
            </Link>

            <div className="pt-4 mt-2 border-t border-white/10">
              <Link
                to="/admin/blogs/new"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 px-3 py-2.5 text-white font-bold shadow-xs transition-colors"
              >
                <Plus className="size-4" /> New Blog
              </Link>
            </div>
          </nav>

          <button
            onClick={signOut}
            className="absolute bottom-6 left-6 flex items-center gap-3 text-xs font-semibold text-white/60 hover:text-white transition-colors"
          >
            <LogOut className="size-4" /> Log out
          </button>
        </aside>

        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/80 bg-background/95 px-4 backdrop-blur lg:px-8">
            <div className="flex items-center gap-3">
              <button
                className="mr-2 lg:hidden text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Executive Content CMS
              </span>
            </div>

            <Link
              to="/"
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View Live Site ↗
            </Link>
          </header>
          <main className="mx-auto max-w-7xl p-4 md:p-8">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}

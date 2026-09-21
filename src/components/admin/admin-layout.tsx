import { Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, FileText, LogOut, Menu, Plus, X } from "lucide-react";
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
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r bg-brand-navy p-6 text-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Link to="/admin" className="text-xl font-black tracking-tight">
              E-CELL <span className="text-primary">ADMIN</span>
            </Link>
            <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>
          <nav className="mt-10 grid gap-2 text-sm font-semibold">
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-white/75 hover:bg-white/10 hover:text-white"
            >
              <BarChart3 className="size-4" /> Dashboard
            </Link>
            <Link
              to="/admin/blogs"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-white/75 hover:bg-white/10 hover:text-white"
            >
              <FileText className="size-4" /> Blogs
            </Link>
            <Link
              to="/admin/blogs/new"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg bg-primary px-3 py-3 text-white"
            >
              <Plus className="size-4" /> New Blog
            </Link>
          </nav>
          <button
            onClick={signOut}
            className="absolute bottom-6 left-6 flex items-center gap-3 text-sm font-semibold text-white/70 hover:text-white"
          >
            <LogOut className="size-4" /> Log out
          </button>
        </aside>
        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/90 px-4 backdrop-blur lg:px-8">
            <button className="mr-4 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu />
            </button>
            <span className="text-sm font-bold text-brand-navy">Content dashboard</span>
          </header>
          <main className="mx-auto max-w-7xl p-4 md:p-8">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}

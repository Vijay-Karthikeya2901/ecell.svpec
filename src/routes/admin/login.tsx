import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ArrowRight, ShieldCheck, Key } from "lucide-react";
import { firebaseErrorMessage, isFirebaseConfigured } from "@/lib/firebase";
import { loginAdmin } from "@/lib/firebase-auth";
import { useAdminAuth } from "@/components/admin/admin-auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/login")({ component: AdminLogin });

function AdminLogin() {
  const navigate = useNavigate();
  const auth = useAdminAuth();
  const [email, setEmail] = useState("admin@svpec.edu.in");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (auth.authorized) {
    void navigate({ to: "/admin" });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await loginAdmin(email, password);
      // Wait a tick for auth state update
      setTimeout(() => {
        void navigate({ to: "/admin" });
      }, 100);
    } catch (e) {
      setError(firebaseErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  async function handleDemoLogin() {
    setBusy(true);
    setError("");
    try {
      await loginAdmin("admin@svpec.edu.in", "admin123");
      setTimeout(() => {
        void navigate({ to: "/admin" });
      }, 100);
    } catch (e) {
      setError(firebaseErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-[#0B0A26] via-[#120F3E] to-[#201D70] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-card/95 p-8 shadow-2xl backdrop-blur-xl text-foreground md:p-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
        >
          ← Back to E-Cell Website
        </Link>

        <div className="mt-8 flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <Lock className="size-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
              Executive Authentication
            </p>
            <h1 className="text-2xl font-black tracking-tight text-brand-navy">Admin Portal</h1>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Sign in to manage conclaves, event countdowns, moderate student testimonials, and publish articles.
        </p>

        {/* Credentials Callout Card */}
        <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-brand-navy">
            <Key className="size-3.5 text-primary" />
            <span>Default Administrator Credentials:</span>
          </div>
          <div className="mt-2 space-y-1 font-mono text-[11px] text-muted-foreground">
            <div>
              Email: <strong className="text-foreground">admin@svpec.edu.in</strong>
            </div>
            <div>
              Password: <strong className="text-foreground">admin123</strong>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Administrator Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              placeholder="admin@svpec.edu.in"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={busy}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xs py-2.5"
          >
            {busy ? "Signing In…" : "Sign In to Admin CMS"} <ArrowRight className="ml-1.5 size-4" />
          </Button>

          <div className="relative my-4 flex items-center justify-center text-xs text-muted-foreground">
            <span className="w-full border-t border-border" />
            <span className="bg-card px-2 uppercase font-mono text-[10px]">or</span>
            <span className="w-full border-t border-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={handleDemoLogin}
            className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white font-semibold text-xs py-2"
          >
            <ShieldCheck className="mr-1.5 size-4" /> 1-Click Sign In (Demo Admin)
          </Button>
        </form>
      </div>
    </div>
  );
}

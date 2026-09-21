import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { firebaseErrorMessage, isFirebaseConfigured } from "@/lib/firebase";
import { loginAdmin } from "@/lib/firebase-auth";
import { useAdminAuth } from "@/components/admin/admin-auth";

export const Route = createFileRoute("/admin/login")({ component: AdminLogin });
function AdminLogin() {
  const navigate = useNavigate();
  const auth = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      await navigate({ to: "/admin" });
    } catch (e) {
      setError(firebaseErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-7 shadow-sm md:p-10">
        <Link to="/" className="text-sm font-bold text-primary">
          ← Back to E-Cell site
        </Link>
        <p className="eyebrow mt-10">Administrator access</p>
        <h1 className="mt-3 text-3xl font-black text-brand-navy">Welcome back</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Sign in to publish E-Cell stories and updates.
        </p>
        {!isFirebaseConfigured && (
          <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            Firebase is not configured yet. Copy <code>.env.example</code> to <code>.env</code> and
            add your project values.
          </div>
        )}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={submit} className="mt-7 grid gap-5">
          <label className="form-label">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 rounded-md border bg-background px-3 font-normal"
              placeholder="admin@ecell.example"
            />
          </label>
          <label className="form-label">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-11 rounded-md border bg-background px-3 font-normal"
            />
          </label>
          <button
            disabled={busy || !isFirebaseConfigured}
            className="h-11 rounded-md bg-primary font-bold text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

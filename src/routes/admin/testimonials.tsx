import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, X, Trash2, MessageSquare, Plus, Clock, CheckCircle2, XCircle } from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  getAllTestimonials,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
  createTestimonial,
  type FirebaseTestimonial,
  type TestimonialStatus,
} from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonialsPage,
});

function AdminTestimonialsPage() {
  const [items, setItems] = useState<FirebaseTestimonial[]>([]);
  const [filter, setFilter] = useState<"all" | TestimonialStatus>("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [saving, setSaving] = useState(false);

  const refresh = () => {
    setLoading(true);
    getAllTestimonials()
      .then(setItems)
      .catch((e) => setMessage(firebaseErrorMessage(e)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveTestimonial(id);
      setMessage("Testimonial approved and published to website.");
      refresh();
    } catch (e) {
      setMessage(firebaseErrorMessage(e));
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectTestimonial(id);
      setMessage("Testimonial marked as denied/rejected.");
      refresh();
    } catch (e) {
      setMessage(firebaseErrorMessage(e));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setMessage("Testimonial permanently deleted.");
      refresh();
    } catch (e) {
      setMessage(firebaseErrorMessage(e));
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createTestimonial({
        name,
        role: role || "Student Founder",
        quote,
        status: "approved", // Admin direct add is approved by default
      });
      setMessage("Testimonial created and approved!");
      setOpenAddModal(false);
      setName("");
      setRole("");
      setQuote("");
      refresh();
    } catch (e) {
      setMessage(firebaseErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const filtered = filter === "all" ? items : items.filter((item) => item.status === filter);
  const pendingCount = items.filter((i) => i.status === "pending").length;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Moderation</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-brand-navy">
            Testimonials & Founder Reviews
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review incoming submissions. Allow or deny student testimonials to showcase on the live website.
          </p>
        </div>

        <Button
          onClick={() => setOpenAddModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <Plus className="mr-1.5 size-4" /> Add Testimonial
        </Button>
      </div>

      {message && (
        <div className="mt-6 rounded-lg border border-primary/20 bg-secondary/80 p-3.5 text-xs font-semibold text-brand-navy flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {[
          { key: "all", label: "All Testimonials", count: items.length },
          { key: "pending", label: "Pending Review", count: pendingCount, highlight: pendingCount > 0 },
          { key: "approved", label: "Approved (Showcased)", count: items.filter((i) => i.status === "approved").length },
          { key: "rejected", label: "Denied / Hidden", count: items.filter((i) => i.status === "rejected").length },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key as any)}
            className={`flex items-center gap-2 rounded-md border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === tab.key
                ? "border-primary bg-primary text-primary-foreground shadow-xs"
                : "border-border/80 bg-card text-muted-foreground hover:border-primary/50"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                tab.highlight
                  ? "bg-amber-400 text-amber-950 font-bold animate-pulse"
                  : filter === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-8 grid gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border/80 bg-card p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <strong className="text-base font-bold text-brand-navy">{item.name}</strong>
                <span className="text-xs text-muted-foreground font-medium">· {item.role}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : item.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {item.status === "approved" && <CheckCircle2 className="size-3" />}
                  {item.status === "rejected" && <XCircle className="size-3" />}
                  {item.status === "pending" && <Clock className="size-3" />}
                  <span>{item.status}</span>
                </span>
              </div>
              <p className="text-sm italic text-foreground/85 leading-relaxed bg-muted/30 p-3 rounded-md">
                "{item.quote}"
              </p>
            </div>

            {/* Moderation Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {item.status !== "approved" && (
                <Button
                  size="sm"
                  onClick={() => handleApprove(item.id)}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold gap-1"
                >
                  <Check className="size-3.5" /> Allow / Publish
                </Button>
              )}
              {item.status !== "rejected" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(item.id)}
                  className="border-amber-300 text-amber-800 hover:bg-amber-50 text-xs font-semibold gap-1"
                >
                  <X className="size-3.5" /> Deny
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:bg-red-50 text-xs font-semibold"
                aria-label="Delete testimonial"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}

        {!loading && filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-12 text-center text-sm text-muted-foreground">
            <MessageSquare className="size-8 mx-auto text-muted-foreground/50 mb-3" />
            <p>No testimonials found in this filter.</p>
            <p className="text-xs mt-1">Student submissions will appear here automatically for your approval.</p>
          </div>
        )}
      </div>

      {/* Admin Direct Add Modal */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-background p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-brand-navy">Add Approved Testimonial</h3>
              <button
                onClick={() => setOpenAddModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Founder / Student Name *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sneha Varma"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Role / Venture / Batch *
                </label>
                <input
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Co-Founder, AgriTech · Batch '26"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  required
                  rows={4}
                  minLength={20}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Enter the student's quote or experience with E-Cell SVPEC..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={() => setOpenAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-primary text-white font-semibold">
                  {saving ? "Publishing…" : "Publish Live to Website"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

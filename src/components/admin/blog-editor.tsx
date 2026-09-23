import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  createBlog,
  getBlogById,
  updateBlog,
  type BlogInput,
  type FirebaseBlog,
} from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";

type Props = { id?: string };
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-");
const empty: BlogInput = {
  title: "",
  slug: "",
  category: "Startups",
  author: "",
  excerpt: "",
  coverImageUrl: "",
  content: "",
  status: "draft",
  publishedAt: new Date(),
};
const dateInput = (date: Date | null) =>
  date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    : "";
export function BlogEditor({ id }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<BlogInput>(empty);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const editor = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const pendingContent = useRef<string | null>(null);
  useEffect(() => {
    if (id)
      getBlogById(id)
        .then((blog) => {
          if (!blog) {
            setError("This blog no longer exists.");
            return;
          }
          setForm({
            title: blog.title,
            slug: blog.slug,
            category: blog.category,
            author: blog.author,
            excerpt: blog.excerpt,
            coverImageUrl: blog.coverImageUrl,
            content: blog.content,
            status: blog.status,
            publishedAt: blog.publishedAt,
          });
          pendingContent.current = blog.content;
        })
        .catch((e) => setError(firebaseErrorMessage(e)))
        .finally(() => setLoading(false));
  }, [id]);
  const set = (key: keyof BlogInput, value: string | BlogInput["status"] | Date | null) =>
    setForm((old) => ({ ...old, [key]: value }) as BlogInput);
  const rememberSelection = () => {
    const target = editor.current;
    const current = window.getSelection();
    if (target && current?.rangeCount && target.contains(current.anchorNode)) {
      savedRange.current = current.getRangeAt(0).cloneRange();
    }
  };
  const restoreSelection = () => {
    const target = editor.current;
    if (!target) return;
    target.focus();
    if (savedRange.current) {
      const current = window.getSelection();
      current?.removeAllRanges();
      current?.addRange(savedRange.current);
    }
  };
  const command = (name: string, value?: string) => {
    restoreSelection();
    document.execCommand(name, false, value);
    if (editor.current) set("content", editor.current.innerHTML);
  };
  const handleEditorInput = () => {
    if (editor.current) set("content", editor.current.innerHTML);
  };
  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    restoreSelection();
    const current = window.getSelection();
    if (!current?.rangeCount) return;
    const range = current.getRangeAt(0);
    range.deleteContents();
    const fragment = document.createDocumentFragment();
    const html = event.clipboardData.getData("text/html");
    if (html) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      wrapper
        .querySelectorAll("script, style, iframe, object, embed")
        .forEach((node) => node.remove());
      wrapper.querySelectorAll("*").forEach((node) => {
        Array.from(node.attributes).forEach((attribute) => {
          if (attribute.name.toLowerCase().startsWith("on")) node.removeAttribute(attribute.name);
          if (
            (attribute.name === "href" || attribute.name === "src") &&
            attribute.value.trim().toLowerCase().startsWith("javascript:")
          )
            node.removeAttribute(attribute.name);
        });
      });
      Array.from(wrapper.childNodes).forEach((node) => fragment.appendChild(node));
    } else {
      const text = event.clipboardData.getData("text/plain").replace(/\r\n?/g, "\n");
      text.split("\n").forEach((line, index) => {
        if (index > 0) fragment.appendChild(document.createElement("br"));
        fragment.appendChild(document.createTextNode(line));
      });
    }
    range.insertNode(fragment);
    range.collapse(false);
    savedRange.current = range.cloneRange();
    handleEditorInput();
  };
  useEffect(() => {
    if (!loading && editor.current && pendingContent.current !== null) {
      editor.current.innerHTML = pendingContent.current;
      pendingContent.current = null;
    }
  }, [loading]);
  const handleToolbarMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    rememberSelection();
    if ((event.target as HTMLElement).closest("button")) event.preventDefault();
  };
  async function submit(event: FormEvent, status: BlogInput["status"]) {
    event.preventDefault();
    setSaving(true);
    setError("");
    if (
      !form.title.trim() ||
      !form.slug.trim() ||
      !form.author.trim() ||
      !form.excerpt.trim() ||
      !form.content.replace(/<[^>]*>/g, "").trim()
    ) {
      setError("Title, slug, author, excerpt, and content are required.");
      setSaving(false);
      return;
    }
    try {
      const input = {
        ...form,
        status,
        publishedAt: status === "published" ? (form.publishedAt ?? new Date()) : null,
      };
      const blogId = id ?? (await createBlog(input));
      await updateBlog(blogId, input);
      await navigate({ to: "/admin/blogs" });
    } catch (e) {
      setError(firebaseErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }
  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading blog…</p>;
  return (
    <form
      onSubmit={(e) => void submit(e, form.status)}
      className="grid gap-7 lg:grid-cols-[1fr_320px]"
    >
      <div className="rounded-xl border bg-background p-5 md:p-7">
        <div className="grid gap-5">
          <label className="form-label">
            Title
            <input
              required
              value={form.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (!id || !form.slug) set("slug", slugify(e.target.value));
              }}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
            />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="form-label">
              Slug
              <input
                required
                value={form.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
                className="mt-2 h-11 rounded-md border px-3 font-normal"
              />
            </label>
            <label className="form-label">
              Category
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="mt-2 h-11 rounded-md border bg-background px-3 font-normal"
              >
                {["Startups", "Innovation", "Events", "Mentorship", "Community"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="form-label">
            Author
            <input
              required
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
              placeholder="Name, E-Cell"
            />
          </label>
          <label className="form-label">
            Excerpt
            <textarea
              required
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={3}
              className="mt-2 rounded-md border p-3 font-normal"
            />
          </label>
          <label className="form-label">
            Content
            <div
              className="mt-2 flex flex-wrap items-center gap-2 rounded-t-md border border-b-0 bg-secondary p-2"
              onMouseDown={handleToolbarMouseDown}
            >
              <button
                type="button"
                onClick={() => command("formatBlock", "<h2>")}
                className="rounded border bg-background px-2 py-1 text-xs font-bold"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => command("bold")}
                className="rounded border bg-background px-2 py-1 text-xs font-bold"
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => command("italic")}
                className="rounded border bg-background px-2 py-1 text-xs italic"
              >
                Italic
              </button>
              <button
                type="button"
                onClick={() => command("insertUnorderedList")}
                className="rounded border bg-background px-2 py-1 text-xs"
              >
                List
              </button>
              <button
                type="button"
                onClick={() => command("createLink", "https://")}
                className="rounded border bg-background px-2 py-1 text-xs"
              >
                Link
              </button>
              <select
                aria-label="Font family"
                defaultValue="inherit"
                onChange={(e) => command("fontName", e.target.value)}
                className="h-8 rounded border bg-background px-2 text-xs font-normal"
              >
                <option value="inherit">Font</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="Courier New, monospace">Monospace</option>
              </select>
              <select
                aria-label="Font size"
                defaultValue="inherit"
                onChange={(e) => command("fontSize", e.target.value)}
                className="h-8 rounded border bg-background px-2 text-xs font-normal"
              >
                <option value="inherit">Size</option>
                <option value="2">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
                <option value="7">Heading</option>
              </select>
              <label
                className="flex h-8 items-center gap-1 rounded border bg-background px-2 text-xs font-normal"
                title="Font color"
              >
                <span>Text</span>
                <input
                  aria-label="Font color"
                  type="color"
                  defaultValue="#17206B"
                  onChange={(e) => command("foreColor", e.target.value)}
                  className="size-5 cursor-pointer border-0 bg-transparent p-0"
                />
              </label>
              <label
                className="flex h-8 items-center gap-1 rounded border bg-background px-2 text-xs font-normal"
                title="Highlight color"
              >
                <span>Highlight</span>
                <input
                  aria-label="Highlight color"
                  type="color"
                  defaultValue="#FFF3B0"
                  onChange={(e) => command("hiliteColor", e.target.value)}
                  className="size-5 cursor-pointer border-0 bg-transparent p-0"
                />
              </label>
            </div>
            <div
              ref={editor}
              contentEditable
              role="textbox"
              aria-multiline="true"
              onInput={handleEditorInput}
              onPaste={handlePaste}
              onKeyUp={rememberSelection}
              onMouseUp={rememberSelection}
              className="min-h-80 whitespace-pre-wrap rounded-b-md border p-3 text-sm font-normal outline-none focus:ring-2 focus:ring-primary"
              data-placeholder="Write your story here. Use the toolbar to format selected text."
            />
          </label>
        </div>
      </div>
      <aside className="grid content-start gap-5">
        <div className="rounded-xl border bg-background p-5">
          <h2 className="font-bold text-brand-navy">Publishing</h2>
          <label className="form-label mt-5">
            Publish date
            <input
              type="datetime-local"
              value={dateInput(form.publishedAt)}
              onChange={(e) => set("publishedAt", e.target.value ? new Date(e.target.value) : null)}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
            />
          </label>
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={(e) => void submit(e, "draft")}
              className="h-11 rounded-md border font-bold text-brand-navy"
            >
              Save draft
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={(e) => void submit(e, "published")}
              className="h-11 rounded-md bg-primary font-bold text-primary-foreground"
            >
              {saving ? "Saving…" : id ? "Publish changes" : "Publish"}
            </button>
          </div>
        </div>
        <div className="rounded-xl border bg-background p-5">
          <h2 className="font-bold text-brand-navy">Cover image URL</h2>
          <input
            type="url"
            value={form.coverImageUrl}
            onChange={(e) => set("coverImageUrl", e.target.value)}
            className="mt-4 h-11 w-full rounded-md border px-3 font-normal"
            placeholder="https://images.example.com/cover.jpg"
          />
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Paste a publicly accessible image URL. Images are not uploaded to Firebase.
          </p>
          {form.coverImageUrl && (
            <img
              src={form.coverImageUrl}
              alt="Cover preview"
              className="mt-4 aspect-video w-full rounded-md object-cover"
            />
          )}
        </div>
      </aside>
      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700 lg:col-span-2">{error}</p>
      )}
    </form>
  );
}

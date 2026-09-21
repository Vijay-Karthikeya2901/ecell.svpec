import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore";
import { db, requireFirebase } from "./firebase";

export type BlogStatus = "draft" | "published";
export type BlogInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  coverImageUrl: string;
  status: BlogStatus;
  publishedAt: Date | null;
};
export type FirebaseBlog = BlogInput & {
  id: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};
const blogsRef = () => collection(requireFirebase(db, "Firestore"), "blogs");
const toBlog = (
  snapshot: QueryDocumentSnapshot<DocumentData> | { id: string; data: () => DocumentData },
): FirebaseBlog => {
  const value = snapshot.data();
  return {
    id: snapshot.id,
    title: value["title"] ?? "",
    slug: value["slug"] ?? "",
    excerpt: value["excerpt"] ?? "",
    content: value["content"] ?? "",
    category: value["category"] ?? "Innovation",
    author: value["author"] ?? "E-Cell SVPEC",
    coverImageUrl: value["coverImageUrl"] ?? "",
    status: value["status"] === "published" ? "published" : "draft",
    publishedAt: value["publishedAt"]?.toDate?.() ?? null,
    createdAt: value["createdAt"] ?? null,
    updatedAt: value["updatedAt"] ?? null,
  };
};
const clean = (input: BlogInput) => ({
  ...input,
  publishedAt: input.status === "published" ? (input.publishedAt ?? new Date()) : null,
  updatedAt: serverTimestamp(),
  createdAt: serverTimestamp(),
});

export async function getPublishedBlogs(): Promise<FirebaseBlog[]> {
  const result = await getDocs(
    query(blogsRef(), where("status", "==", "published"), orderBy("publishedAt", "desc")),
  );
  return result.docs.map(toBlog);
}
export async function getAllBlogs(): Promise<FirebaseBlog[]> {
  const result = await getDocs(query(blogsRef(), orderBy("createdAt", "desc")));
  return result.docs.map(toBlog);
}
export async function getBlogById(id: string): Promise<FirebaseBlog | null> {
  const result = await getDoc(doc(requireFirebase(db, "Firestore"), "blogs", id));
  return result.exists() ? toBlog({ id: result.id, data: () => result.data() }) : null;
}
export async function getBlogBySlug(
  slug: string,
  includeDrafts = false,
): Promise<FirebaseBlog | null> {
  const constraints = includeDrafts
    ? [where("slug", "==", slug), limit(1)]
    : [where("slug", "==", slug), where("status", "==", "published"), limit(1)];
  const result = await getDocs(query(blogsRef(), ...constraints));
  return result.docs[0] ? toBlog(result.docs[0]) : null;
}
async function assertUniqueSlug(slug: string, excludeId?: string) {
  const result = await getDocs(query(blogsRef(), where("slug", "==", slug), limit(2)));
  if (result.docs.some((item) => item.id !== excludeId))
    throw new Error("That slug is already in use. Choose a unique slug.");
}
export async function createBlog(input: BlogInput): Promise<string> {
  await assertUniqueSlug(input.slug);
  const result = await addDoc(blogsRef(), clean(input));
  return result.id;
}
export async function updateBlog(id: string, input: BlogInput): Promise<void> {
  await assertUniqueSlug(input.slug, id);
  const values = clean(input);
  delete (values as Partial<typeof values>).createdAt;
  await updateDoc(doc(requireFirebase(db, "Firestore"), "blogs", id), values);
}
export async function publishBlog(id: string): Promise<void> {
  await updateDoc(doc(requireFirebase(db, "Firestore"), "blogs", id), {
    status: "published",
    publishedAt: new Date(),
    updatedAt: serverTimestamp(),
  });
}
export async function unpublishBlog(id: string): Promise<void> {
  await updateDoc(doc(requireFirebase(db, "Firestore"), "blogs", id), {
    status: "draft",
    publishedAt: null,
    updatedAt: serverTimestamp(),
  });
}
export async function deleteBlog(id: string): Promise<void> {
  await deleteDoc(doc(requireFirebase(db, "Firestore"), "blogs", id));
}

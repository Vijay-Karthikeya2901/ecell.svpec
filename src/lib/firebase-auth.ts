import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, requireFirebase, isFirebaseConfigured } from "./firebase";

export async function loginAdmin(email: string, password: string): Promise<User> {
  // If Firebase is configured with API keys, use real Firebase Auth
  if (isFirebaseConfigured && auth && db) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (!(await isAdmin(result.user.uid))) {
      await signOut(auth);
      throw new Error("This account is not authorized as an E-Cell administrator.");
    }
    return result.user;
  }

  // Developer / Demo local authentication fallback
  if (
    (email === "admin@svpec.edu.in" && password === "admin123") ||
    password === "admin123" ||
    !isFirebaseConfigured
  ) {
    if (typeof window !== "undefined") {
      localStorage.setItem("ecell_admin_session", "true");
    }
    return {
      uid: "demo-admin",
      email: email || "admin@svpec.edu.in",
      displayName: "E-Cell Administrator",
    } as User;
  }

  throw new Error("Invalid administrator credentials. Use admin@svpec.edu.in / admin123");
}

export function watchAuth(callback: (user: User | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => undefined;
  }
  return onAuthStateChanged(auth, callback);
}

export async function isAdmin(uid: string): Promise<boolean> {
  if (uid === "demo-admin") return true;
  if (!db) return true;
  try {
    const adminDoc = await getDoc(doc(requireFirebase(db, "Firestore"), "admins", uid));
    return adminDoc.exists();
  } catch {
    return true; // Fallback during local development
  }
}

export async function logoutAdmin(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ecell_admin_session");
  }
  if (auth) {
    try {
      await signOut(auth);
    } catch {}
  }
}

import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, requireFirebase } from "./firebase";

export async function loginAdmin(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(
    requireFirebase(auth, "authentication"),
    email,
    password,
  );
  if (!(await isAdmin(result.user.uid))) {
    await signOut(requireFirebase(auth, "authentication"));
    throw new Error("This account is not authorized as an E-Cell administrator.");
  }
  return result.user;
}

export function watchAuth(callback: (user: User | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => undefined;
  }
  return onAuthStateChanged(auth, callback);
}

export async function isAdmin(uid: string): Promise<boolean> {
  const adminDoc = await getDoc(doc(requireFirebase(db, "Firestore"), "admins", uid));
  return adminDoc.exists();
}

export async function logoutAdmin(): Promise<void> {
  await signOut(requireFirebase(auth, "authentication"));
}

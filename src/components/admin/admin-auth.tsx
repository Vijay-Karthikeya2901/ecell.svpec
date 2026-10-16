import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "@tanstack/react-router";
import type { User } from "firebase/auth";
import { isAdmin, watchAuth } from "@/lib/firebase-auth";
import { firebaseErrorMessage, isFirebaseConfigured } from "@/lib/firebase";

type AuthState = {
  user: User | null;
  loading: boolean;
  authorized: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  authorized: false,
  error: null,
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    // Check for local demo admin session
    const demoSession = typeof window !== "undefined" && localStorage.getItem("ecell_admin_session") === "true";
    if (demoSession) {
      return {
        user: { email: "admin@svpec.edu.in", uid: "demo-admin", displayName: "E-Cell Administrator" } as any,
        loading: false,
        authorized: true,
        error: null,
      };
    }
    return {
      user: null,
      loading: isFirebaseConfigured,
      authorized: false,
      error: null,
    };
  });

  useEffect(() => {
    // If local demo session is active, keep authorized
    if (localStorage.getItem("ecell_admin_session") === "true") {
      setState({
        user: { email: "admin@svpec.edu.in", uid: "demo-admin", displayName: "E-Cell Administrator" } as any,
        loading: false,
        authorized: true,
        error: null,
      });
      return;
    }

    if (!isFirebaseConfigured) {
      setState({ user: null, loading: false, authorized: false, error: null });
      return;
    }

    return watchAuth((user) => {
      if (!user) {
        setState({ user: null, loading: false, authorized: false, error: null });
        return;
      }
      isAdmin(user.uid)
        .then((authorized) =>
          setState({
            user,
            loading: false,
            authorized,
            error: authorized ? null : "This account is not an authorized administrator.",
          }),
        )
        .catch((error) =>
          setState({
            user,
            loading: false,
            authorized: false,
            error: firebaseErrorMessage(error),
          }),
        );
    });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  return useContext(AuthContext);
}

export function AdminGuard({ children }: { children: ReactNode }) {
  const auth = useAdminAuth();
  const location = useLocation();

  if (auth.loading)
    return (
      <div className="grid min-h-screen place-items-center bg-secondary text-muted-foreground">
        Checking administrator access…
      </div>
    );

  if (!auth.authorized)
    return <Navigate to="/admin/login" search={{ redirect: location.href }} />;

  return <>{children}</>;
}

"use client";

import * as React from "react";

import { safeJsonParse } from "@/lib/storage";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  createAccount: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

const USER_KEY = "tth.auth.user.v1";
const PASS_KEY = "tth.auth.pass.v1";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const parsed = safeJsonParse<User>(localStorage.getItem(USER_KEY));
    if (parsed?.email) setUser(parsed);
  }, []);

  const value = React.useMemo<AuthContextValue>(() => {
    return {
      user,
      createAccount: async (name, email, password) => {
        const normalized = normalizeEmail(email);
        if (!name.trim()) throw new Error("Name is required.");
        if (!normalized.includes("@")) throw new Error("Enter a valid email.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        const newUser: User = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: normalized,
        };
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        localStorage.setItem(PASS_KEY, password);
        setUser(newUser);
      },
      signIn: async (email, password) => {
        const normalized = normalizeEmail(email);
        const stored = safeJsonParse<User>(localStorage.getItem(USER_KEY));
        const storedPass = localStorage.getItem(PASS_KEY);
        if (!stored || stored.email !== normalized || storedPass !== password) {
          throw new Error("Invalid email or password.");
        }
        setUser(stored);
      },
      signOut: () => {
        setUser(null);
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


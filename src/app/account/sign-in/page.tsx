"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/state/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user) router.replace("/products");
  }, [router, user]);

  return (
    <div className="container-page py-12">
      <p className="text-sm font-medium text-emerald-200/90">Account</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Sign in
      </h1>
      <p className="mt-3 max-w-2xl text-white/70">
        Sign in to your Tobias Tech Hub account to manage your cart and request quotes faster.
      </p>

      <div className="mt-10 max-w-lg rounded-2xl border border-white/10 bg-black/20 p-6">
        <form
          className="grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            const form = new FormData(e.currentTarget);
            const email = String(form.get("email") ?? "");
            const password = String(form.get("password") ?? "");
            try {
              await signIn(email, password);
              router.push("/products");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Sign-in failed.");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>
          {error ? (
            <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-100">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-sm text-white/60">
            Don’t have an account?{" "}
            <Link className="font-semibold text-emerald-200 hover:text-emerald-100" href="/account/create">
              Create one
            </Link>
            .
          </p>
          <p className="text-xs text-white/40">
            Demo auth: this stores credentials in your browser (localStorage). Replace with real auth for production.
          </p>
        </form>
      </div>
    </div>
  );
}


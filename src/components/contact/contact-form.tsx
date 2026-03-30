"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sent">("idle");

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sent");
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your name" required />
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="+233…" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us what you need (budget, preferred brand, use case)…"
          required
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit">{status === "sent" ? "Sent" : "Send message"}</Button>
        {status === "sent" ? (
          <p className="text-sm text-emerald-200/90">
            Message queued. We’ll get back to you shortly.
          </p>
        ) : (
          <p className="text-sm text-white/60">We typically respond within business hours.</p>
        )}
      </div>
    </form>
  );
}


"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { WHATSAPP_PHONE_E164 } from "@/lib/site";
import { cn } from "@/lib/utils";

export function WhatsAppFab({
  phoneE164 = WHATSAPP_PHONE_E164,
  message = "Hi Tobias Tech Hub, I’m interested in your products.",
  className,
}: {
  phoneE164?: string;
  message?: string;
  className?: string;
}) {
  const href = `https://wa.me/${phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full",
        "bg-emerald-400 text-black shadow-[0_18px_40px_rgba(52,211,153,0.25)] ring-1 ring-emerald-300/50",
        "transition hover:translate-y-[-1px] hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200",
        className,
      )}
    >
      <MessageCircle className="h-5 w-5" />
    </Link>
  );
}


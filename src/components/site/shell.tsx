"use client";

import * as React from "react";

import { SiteFooter } from "@/components/site/footer";
import { SiteNavbar } from "@/components/site/navbar";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { useCart } from "@/components/state/cart";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { count } = useCart();
  return (
    <>
      <SiteNavbar cartCount={count} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}


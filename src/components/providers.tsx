"use client";

import * as React from "react";

import { AuthProvider } from "@/components/state/auth";
import { CartProvider } from "@/components/state/cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}


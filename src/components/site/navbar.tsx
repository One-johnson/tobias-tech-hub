"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, ShoppingCart, User } from "lucide-react";

import { SiteLogo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/state/auth";

const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition",
        active ? "text-white" : "text-white/70 hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}

export function SiteNavbar({ cartCount = 0 }: { cartCount?: number }) {
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <SiteLogo />

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((i) => (
            <NavLink key={i.href} href={i.href}>
              {i.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="secondary">
            <Link href="/products">Shop</Link>
          </Button>
          <Button asChild variant="outline" className="relative">
            <Link href="/cart" aria-label="Cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Cart</span>
              {cartCount > 0 ? (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-xs font-semibold text-black">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" aria-label="Account menu">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="grid">
                    <span className="text-sm font-semibold text-white">{user.name}</span>
                    <span className="text-xs text-white/60">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/products">Browse products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => signOut()}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/account/sign-in" aria-label="Account">
                <User className="h-4 w-4" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <SheetBody className="flex flex-col gap-4">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  {i.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button asChild variant="secondary">
                  <Link href="/products">Shop</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link href="/cart">Cart</Link>
                </Button>
                {user ? (
                  <Button variant="ghost" onClick={() => signOut()}>
                    Sign out
                  </Button>
                ) : (
                  <Button asChild variant="ghost">
                    <Link href="/account/sign-in">Account</Link>
                  </Button>
                )}
              </div>
            </SheetBody>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}


import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const social = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Twitter/X", href: "#", icon: Twitter },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/20">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-base font-semibold tracking-tight text-white">
              Tobias Tech Hub
            </p>
            <p className="mt-2 max-w-md text-sm text-white/70">
              A premium tech retail company in Accra, Ghana—laptops, computer
              accessories, and networking devices for work, school, and business.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white/90">Shop</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  <Link className="hover:text-white" href="/products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/cart">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">Company</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  <Link className="hover:text-white" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">Account</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  <Link className="hover:text-white" href="/account/sign-in">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/account/create">
                    Create account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Tobias Tech Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {social.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


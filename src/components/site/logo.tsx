import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)}>
      <span className="relative h-9 w-11 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
        <Image
          src="/logo.png"
          alt="Tobias Tech Hub logo"
          fill
          className="object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight text-white">
          Tobias <span className="text-white/70">Tech Hub</span>
        </span>
        <span className="text-xs text-white/50">Accra, Ghana</span>
      </span>
    </Link>
  );
}


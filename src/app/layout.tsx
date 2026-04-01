import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteAnalytics } from "@/components/site/analytics";
import { AppShell } from "@/components/site/shell";
import { getMetadataBase, getSiteOrigin } from "@/lib/env-public";

const siteDescription =
  "Premium laptops, accessories, monitors, and storage in Accra, Ghana. Powering your digital world.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Tobias Tech Hub | Accra, Ghana",
    template: "%s · Tobias Tech Hub",
  },
  description: siteDescription,
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Tobias Tech Hub | Accra, Ghana",
    description: siteDescription,
    url: getSiteOrigin(),
    siteName: "Tobias Tech Hub",
    type: "website",
  },
  keywords: [
    "Tobias Tech Hub",
    "Accra Ghana laptops",
    "computer accessories Accra",
    "computer monitors Ghana",
    "HP Dell Lenovo Apple",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteAnalytics />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

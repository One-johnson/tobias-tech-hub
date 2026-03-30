import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppShell } from "@/components/site/shell";

export const metadata: Metadata = {
  title: "Tobias Tech Hub | Accra, Ghana",
  description:
    "Premium laptops, accessories, and networking devices in Accra, Ghana. Powering your digital world.",
  metadataBase: new URL("https://tobiastechhub.com"),
  openGraph: {
    title: "Tobias Tech Hub | Accra, Ghana",
    description:
      "Premium laptops, accessories, and networking devices in Accra, Ghana. Powering your digital world.",
    url: "https://tobiastechhub.com",
    siteName: "Tobias Tech Hub",
    type: "website",
  },
  keywords: [
    "Tobias Tech Hub",
    "Accra Ghana laptops",
    "computer accessories Accra",
    "networking devices Ghana",
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
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

export type ProductCategory =
  | "Laptops"
  | "Accessories"
  | "Networking"
  | "Monitors"
  | "Storage";

export type Brand = "HP" | "Dell" | "Lenovo" | "Apple" | "ASUS" | "Acer" | "TP-Link";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  brand: Brand;
  priceGhs: number;
  rating: number; // 0-5
  inStock: boolean;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: Array<{ label: string; value: string }>;
  images: Array<{ src: string; alt: string }>;
};

export const brands: Brand[] = ["HP", "Dell", "Lenovo", "Apple", "ASUS", "Acer", "TP-Link"];

export const categories: ProductCategory[] = [
  "Laptops",
  "Accessories",
  "Networking",
  "Monitors",
  "Storage",
];

export const products: Product[] = [
  {
    id: "p_hp_840g8",
    slug: "hp-elitebook-840-g8",
    name: "HP EliteBook 840 G8 (i7, 16GB, 512GB SSD)",
    category: "Laptops",
    brand: "HP",
    priceGhs: 12999,
    rating: 4.7,
    inStock: true,
    shortDescription: "Premium business laptop built for performance and portability.",
    description:
      "A powerful, sleek business laptop for professionals. Ideal for work, school, and everyday productivity with fast SSD storage and reliable build quality.",
    highlights: ["Intel Core i7", "16GB RAM", "512GB NVMe SSD", "14-inch FHD display"],
    specs: [
      { label: "Processor", value: "Intel Core i7 (11th Gen)" },
      { label: "Memory", value: "16GB DDR4" },
      { label: "Storage", value: "512GB NVMe SSD" },
      { label: "Display", value: "14-inch FHD (1920×1080)" },
      { label: "OS", value: "Windows 11 Pro" },
    ],
    images: [
      {
        src: "/products/p1-1.jpg",
        alt: "Laptop on a desk",
      },
      {
        src: "/products/p1-2.jpg",
        alt: "Laptop angled view",
      },
      {
        src: "/products/p1-3.jpg",
        alt: "Workspace with laptop",
      },
    ],
  },
  {
    id: "p_dell_7420",
    slug: "dell-latitude-7420",
    name: "Dell Latitude 7420 (i5, 8GB, 256GB SSD)",
    category: "Laptops",
    brand: "Dell",
    priceGhs: 8999,
    rating: 4.5,
    inStock: true,
    shortDescription: "Reliable, lightweight laptop for work and travel.",
    description:
      "A dependable Latitude with a clean design and great battery life. Perfect for students and office productivity with smooth everyday performance.",
    highlights: ["Intel Core i5", "8GB RAM", "256GB SSD", "Wi‑Fi 6"],
    specs: [
      { label: "Processor", value: "Intel Core i5 (11th Gen)" },
      { label: "Memory", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Connectivity", value: "Wi‑Fi 6, Bluetooth" },
      { label: "Ports", value: "USB‑C, USB‑A, HDMI" },
    ],
    images: [
      {
        src: "/products/p2-1.jpg",
        alt: "Laptop open on a desk",
      },
      {
        src: "/products/p2-2.jpg",
        alt: "Laptop side profile",
      },
    ],
  },
  {
    id: "p_lenovo_t14",
    slug: "lenovo-thinkpad-t14",
    name: "Lenovo ThinkPad T14 (Ryzen 7, 16GB, 512GB SSD)",
    category: "Laptops",
    brand: "Lenovo",
    priceGhs: 11999,
    rating: 4.8,
    inStock: true,
    shortDescription: "Legendary ThinkPad durability with modern performance.",
    description:
      "The ThinkPad T-series is built for serious work. Rugged reliability, excellent keyboard comfort, and snappy performance for demanding tasks.",
    highlights: ["AMD Ryzen 7", "16GB RAM", "512GB SSD", "Backlit keyboard"],
    specs: [
      { label: "Processor", value: "AMD Ryzen 7" },
      { label: "Memory", value: "16GB DDR4" },
      { label: "Storage", value: "512GB NVMe SSD" },
      { label: "Security", value: "Fingerprint reader" },
      { label: "Build", value: "Military-grade durability" },
    ],
    images: [
      {
        src: "/products/p3-1.jpg",
        alt: "Business laptop",
      },
      {
        src: "/products/p3-2.jpg",
        alt: "Laptop keyboard close-up",
      },
    ],
  },
  {
    id: "p_macbook_air_m2",
    slug: "apple-macbook-air-m2",
    name: "Apple MacBook Air (M2, 8GB, 256GB)",
    category: "Laptops",
    brand: "Apple",
    priceGhs: 16999,
    rating: 4.9,
    inStock: true,
    shortDescription: "Ultra-thin, silent, and incredibly fast with Apple silicon.",
    description:
      "A premium everyday machine with exceptional efficiency and a gorgeous display. Ideal for creative work, study, and professional productivity.",
    highlights: ["Apple M2", "Retina display", "All-day battery", "Fanless design"],
    specs: [
      { label: "Chip", value: "Apple M2" },
      { label: "Memory", value: "8GB unified memory" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: "13.6-inch Liquid Retina" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
    images: [
      {
        src: "/products/p4-1.jpg",
        alt: "Premium laptop close-up",
      },
      {
        src: "/products/p4-2.jpg",
        alt: "Laptop on a minimal desk",
      },
    ],
  },
  {
    id: "p_tplink_ax53",
    slug: "tp-link-archer-ax53-wifi6-router",
    name: "TP-Link Archer AX53 Wi‑Fi 6 Router",
    category: "Networking",
    brand: "TP-Link",
    priceGhs: 899,
    rating: 4.6,
    inStock: true,
    shortDescription: "Fast, stable Wi‑Fi 6 for homes and small offices.",
    description:
      "Upgrade your network with Wi‑Fi 6 speed and better coverage. Great for streaming, video calls, and multiple device households.",
    highlights: ["Wi‑Fi 6", "Dual-band", "MU‑MIMO", "Beamforming"],
    specs: [
      { label: "Standard", value: "Wi‑Fi 6 (802.11ax)" },
      { label: "Bands", value: "Dual-band 2.4GHz + 5GHz" },
      { label: "Coverage", value: "Beamforming + high-gain antennas" },
      { label: "Security", value: "WPA3" },
    ],
    images: [
      {
        src: "/products/router-1.svg",
        alt: "Networking router",
      },
      {
        src: "/products/router-2.svg",
        alt: "Wi‑Fi device close-up",
      },
    ],
  },
  {
    id: "p_switch_8port",
    slug: "gigabit-switch-8-port",
    name: "8‑Port Gigabit Ethernet Switch",
    category: "Networking",
    brand: "TP-Link",
    priceGhs: 249,
    rating: 4.4,
    inStock: true,
    shortDescription: "Plug-and-play switching for fast wired networks.",
    description:
      "A compact switch for expanding your wired network in the office or at home. Ideal for CCTV, desktops, and routers.",
    highlights: ["8× Gigabit ports", "Fanless", "Metal housing", "Energy efficient"],
    specs: [
      { label: "Ports", value: "8× RJ45 Gigabit" },
      { label: "Design", value: "Fanless, silent" },
      { label: "Setup", value: "Unmanaged (plug & play)" },
      { label: "Housing", value: "Metal" },
    ],
    images: [
      {
        src: "/products/p6-1.jpg",
        alt: "Ethernet and networking equipment",
      },
      {
        src: "/products/p6-2.jpg",
        alt: "Networking cables and hardware",
      },
    ],
  },
  {
    id: "p_mouse_wireless",
    slug: "wireless-mouse-silent",
    name: "Wireless Silent Mouse",
    category: "Accessories",
    brand: "Dell",
    priceGhs: 149,
    rating: 4.3,
    inStock: true,
    shortDescription: "Comfortable, quiet clicks for office productivity.",
    description:
      "A simple, reliable mouse with silent clicks and smooth tracking. Great for workspaces and study environments.",
    highlights: ["Silent clicks", "2.4GHz wireless", "Long battery life"],
    specs: [
      { label: "Connection", value: "2.4GHz USB receiver" },
      { label: "Buttons", value: "3" },
      { label: "Noise", value: "Silent click" },
    ],
    images: [
      {
        src: "/products/p7-1.jpg",
        alt: "Computer mouse and accessories",
      },
      {
        src: "/products/p7-2.jpg",
        alt: "Desk accessories close-up",
      },
    ],
  },
  {
    id: "p_ssd_1tb",
    slug: "portable-ssd-1tb",
    name: "Portable SSD 1TB (USB‑C)",
    category: "Storage",
    brand: "ASUS",
    priceGhs: 699,
    rating: 4.5,
    inStock: true,
    shortDescription: "High-speed storage for backups and creative workflows.",
    description:
      "Fast transfers and compact portability. Ideal for photographers, editors, students, and anyone who needs reliable extra storage.",
    highlights: ["1TB", "USB‑C", "High speed", "Compact"],
    specs: [
      { label: "Capacity", value: "1TB" },
      { label: "Interface", value: "USB‑C" },
      { label: "Use case", value: "Backups, media, work files" },
    ],
    images: [
      {
        src: "/products/p8-1.jpg",
        alt: "Portable SSD storage",
      },
      {
        src: "/products/p8-2.jpg",
        alt: "External storage with cable",
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}


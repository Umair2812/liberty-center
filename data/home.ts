export type HomeCategory = {
  slug: string;
  label: string;
  tagline: string;
  image: string;
};

export type HomeProduct = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  href: string;
  badge?: string;
};

export type HomeCollection = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  span?: "large" | "medium";
};

export const heroContent = {
  eyebrow: "Spring / Summer 2026",
  title: "The Art of\nEffortless Grace",
  description:
    "Discover lawn, unstitched silks, and pret pieces designed for celebrations, everyday elegance, and everything in between.",
  primaryCta: { label: "Shop new arrivals", href: "/shop" },
  secondaryCta: { label: "View collections", href: "/collections" },
  image:
    "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
  imageAlt: "Curated garments on hangers in a softly lit boutique",
};

export const homeCategories: HomeCategory[] = [
  {
    slug: "lawn",
    label: "Lawn",
    tagline: "Breathable prints",
    image:
      "https://images.unsplash.com/photo-1581044777550-aa7750db9da7?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "unstitched",
    label: "Unstitched",
    tagline: "Luxe yardage",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1f57b?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "pret",
    label: "Pret",
    tagline: "Ready to wear",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "kurtas",
    label: "Kurtas",
    tagline: "Everyday refined",
    image:
      "https://images.unsplash.com/photo-1515372031174-ab54a49f10ed?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "luxury",
    label: "Luxury",
    tagline: "Limited editions",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
  },
];

export const featuredCollections: HomeCollection[] = [
  {
    id: "noor",
    title: "Noor Edit",
    subtitle: "Hand‑touch embroideries on pure cotton net",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=80",
    href: "/collections/noor-edit",
    span: "large",
  },
  {
    id: "garden",
    title: "Garden Muse",
    subtitle: "Pastel lawns for daytime soirées",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    href: "/collections/garden-muse",
  },
  {
    id: "velvet",
    title: "Velvet Hour",
    subtitle: "Evening pret in jewel tones",
    image:
      "https://images.unsplash.com/photo-1594633313593-bab3825d0977?auto=format&fit=crop&w=800&q=80",
    href: "/collections/velvet-hour",
  },
];

export const newArrivals: HomeProduct[] = [
  {
    id: "1",
    name: "Zahra 3‑Piece Lawn",
    price: 12990,
    category: "Lawn",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    href: "/product/zahra-3-piece-lawn",
    badge: "New",
  },
  {
    id: "2",
    name: "Mehra Unstitched Silk",
    price: 24990,
    category: "Unstitched",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1f57b?auto=format&fit=crop&w=800&q=80",
    href: "/product/mehra-unstitched-silk",
  },
  {
    id: "3",
    name: "Aila Embroidered Kurta",
    price: 8990,
    category: "Kurtas",
    image:
      "https://images.unsplash.com/photo-1515372031174-ab54a49f10ed?auto=format&fit=crop&w=800&q=80",
    href: "/product/aila-embroidered-kurta",
  },
  {
    id: "4",
    name: "Sapphire Pret Set",
    price: 15990,
    category: "Pret",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d22?auto=format&fit=crop&w=800&q=80",
    href: "/product/sapphire-pret-set",
    badge: "Limited",
  },
];

export const editorialBlock = {
  eyebrow: "Craft & care",
  title: "Woven in Karachi, loved worldwide",
  body: "Each piece is sourced from trusted mills and finished by artisans who understand drape, stitch, and the quiet luxury of a well‑cut silhouette. We believe your wardrobe should feel as good as it looks — season after season.",
  cta: { label: "Our story", href: "/about" },
  image:
    "https://images.unsplash.com/photo-1562157873-818bc075b908?auto=format&fit=crop&w=1200&q=80",
  imageAlt: "Close‑up of soft folded fabric in neutral tones",
};

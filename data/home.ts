export type HomeCategory = {
  slug: string;
  label: string;
  tagline: string;
  image: string;
  href: string;
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
  title: "Quiet luxury,\nmade to wear",
  description:
    "Lawn, unstitched silks, and pret — curated for celebrations, workdays, and every moment worth dressing for.",
  primaryCta: { label: "Shop new arrivals", href: "/new-arrivals" },
  secondaryCta: { label: "Explore categories", href: "#categories" },
  image:
    "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
  imageAlt: "Curated garments on hangers in a softly lit boutique",
};

export const homeCategories: HomeCategory[] = [
  {
    slug: "lawn",
    label: "Lawn",
    tagline: "Breathable prints",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1581044777550-aa7750db9da7?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "unstitched",
    label: "Unstitched",
    tagline: "Luxe yardage",
    href: "/unstitched-clothes",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1f57b?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "pret",
    label: "Pret",
    tagline: "Ready to wear",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "kurtas",
    label: "Kurtas",
    tagline: "Everyday refined",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1515372031174-ab54a49f10ed?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "accessories",
    label: "Accessories",
    tagline: "Finish the look",
    href: "/accessories",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
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

export const featuredProducts: HomeProduct[] = [
  {
    id: "fp-1",
    name: "Noor Embroidered Lawn",
    price: 14990,
    category: "Lawn",
    image:
      "https://images.unsplash.com/photo-1596783074918-c7cb2e69d32a?auto=format&fit=crop&w=800&q=80",
    href: "/product/noor-embroidered-lawn",
    badge: "Featured",
  },
  {
    id: "fp-2",
    name: "Riva Silk Dupatta Set",
    price: 18990,
    category: "Unstitched",
    image:
      "https://images.unsplash.com/photo-1550614000-4b9519e02a4d?auto=format&fit=crop&w=800&q=80",
    href: "/product/riva-silk-dupatta-set",
  },
  {
    id: "fp-3",
    name: "Lina Chiffon Pret",
    price: 16990,
    category: "Pret",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d22?auto=format&fit=crop&w=800&q=80",
    href: "/product/lina-chiffon-pret",
  },
  {
    id: "fp-4",
    name: "Mira Block-Print Kurta",
    price: 7990,
    category: "Kurtas",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    href: "/product/mira-block-print-kurta",
  },
];

export const promoBanner = {
  eyebrow: "Limited time",
  title: "Mid-season refinement",
  description:
    "Take up to 30% off selected pret and lawn. Online and in-store — while pieces last.",
  cta: { label: "Shop the sale", href: "/sale" },
  secondaryCta: { label: "View lookbook", href: "/collections" },
  image:
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=80",
  spotlightImage:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
  spotlightAlt: "Elegant folded garments in warm tones",
};

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

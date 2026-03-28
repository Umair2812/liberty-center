export type HomeCategory = {
  slug: string;
  label: string;
  image: string;
  href: string;
  /** Optional subtitle under the title on category cards */
  tagline?: string;
};

export type HomeProduct = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  href: string;
  badge?: string;
  /** Alternate image for hover crossfade (optional) */
  hoverImage?: string;
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
  title: "Elegance in Every Thread",
  description: "Discover timeless Pakistani dresses with perfectly matched Indian accessories.",
  primaryCta: { label: "Shop Now", href: "/shop" },
  secondaryCta: { label: "Explore Collection", href: "/collections" },
  image:
    "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
  imageAlt: "Curated garments on hangers in a softly lit boutique",
};

export const homeCategories: HomeCategory[] = [
  {
    slug: "unstitched",
    label: "Unstitched",
    href: "/unstitched-clothes",
    image:
      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "stitched",
    label: "Stitched",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "luxury",
    label: "Luxury",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "party-wear",
    label: "Party Wear",
    href: "/shop",
    image:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=format&fit=crop&w=900&q=80",
  },
];

export const featuredCollections: HomeCollection[] = [
  {
    id: "noor",
    title: "Noor Edit",
    subtitle: "Hand‑touch embroideries on pure cotton net",
    image:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/noor-embroidered-lawn",
    badge: "Featured",
  },
  {
    id: "fp-2",
    name: "Riva Silk Dupatta Set",
    price: 18990,
    category: "Unstitched",
    image:
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/riva-silk-dupatta-set",
  },
  {
    id: "fp-3",
    name: "Lina Chiffon Pret",
    price: 16990,
    category: "Pret",
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=800&q=80",
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
  title: "Summer Collection 2026",
  offer: "Up to 30% Off",
  description: "Lawn, pret, and unstitched edits — refreshed for the season.",
  cta: { label: "Shop the collection", href: "/sale" },
  /** Split-panel / mobile hero image */
  image:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Summer fashion — light fabrics and soft tones",
};

export const newArrivals: HomeProduct[] = [
  {
    id: "1",
    name: "Zahra 3‑Piece Lawn",
    price: 12990,
    category: "Lawn",
    image:
      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/zahra-3-piece-lawn",
    badge: "New",
  },
  {
    id: "2",
    name: "Mehra Unstitched Silk",
    price: 24990,
    category: "Unstitched",
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/mehra-unstitched-silk",
  },
  {
    id: "3",
    name: "Aila Embroidered Kurta",
    price: 8990,
    category: "Kurtas",
    image:
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/aila-embroidered-kurta",
  },
  {
    id: "4",
    name: "Sapphire Pret Set",
    price: 15990,
    category: "Pret",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=800&q=80",
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

import type { HomeProduct } from "@/data/home";

/** All products in the catalog, with a `slugs` array of every route that should show them. */
export type CatalogProduct = HomeProduct & {
  /** List of route slug strings (e.g. "stitched/new-in") this product appears in */
  slugs: string[];
};

export const catalogProducts: CatalogProduct[] = [
  // ─── Ready to Wear / Stitched ──────────────────────────────────────────────
  {
    id: "rtw-1",
    name: "Blossom Embroidered Kurta",
    price: 9990,
    category: "Ready to Wear",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d22?auto=format&fit=crop&w=800&q=80",
    href: "/product/blossom-embroidered-kurta",
    wearType: "stitched",
    badge: "New In",
    slugs: ["stitched/new-in", "stitched/embroidered", "stitched/blossom-collection"],
  },
  {
    id: "rtw-2",
    name: "Aila Printed Lawn Set",
    price: 7490,
    category: "Ready to Wear",
    image:
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/aila-printed-lawn-set",
    wearType: "stitched",
    badge: "New In",
    slugs: ["stitched/new-in", "stitched/printed"],
  },
  {
    id: "rtw-3",
    name: "Sana Chiffon Printed Kurta",
    price: 8990,
    category: "Ready to Wear",
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    href: "/product/sana-chiffon-printed-kurta",
    wearType: "stitched",
    slugs: ["stitched/printed"],
  },
  {
    id: "rtw-4",
    name: "Nyla Blossom Embroidered Pret",
    price: 12490,
    category: "Ready to Wear",
    image:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/nyla-blossom-embroidered-pret",
    wearType: "stitched",
    badge: "New",
    slugs: ["stitched/blossom-collection", "stitched/embroidered"],
  },
  {
    id: "rtw-5",
    name: "Mira Floral Embroidered Shirt",
    price: 10990,
    category: "Ready to Wear",
    image:
      "https://images.unsplash.com/photo-1596783074918-c7cb2e69d32a?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/mira-floral-embroidered-shirt",
    wearType: "stitched",
    slugs: ["stitched/embroidered", "stitched/blossom-collection"],
  },
  {
    id: "rtw-6",
    name: "Rania Block Print Co-ord",
    price: 11990,
    category: "Ready to Wear",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    href: "/product/rania-block-print-coord",
    wearType: "stitched",
    slugs: ["stitched/printed", "stitched/new-in"],
  },
  {
    id: "rtw-7",
    name: "Zara Stitched Lawn Three-Piece",
    price: 13490,
    category: "Ready to Wear",
    image:
      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/zara-stitched-lawn-three-piece",
    wearType: "stitched",
    badge: "New In",
    slugs: ["stitched/new-in"],
  },
  {
    id: "rtw-8",
    name: "Hana Garden Printed Dupatta Set",
    price: 6990,
    category: "Ready to Wear",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    href: "/product/hana-garden-printed-dupatta-set",
    wearType: "stitched",
    slugs: ["stitched/printed", "stitched/blossom-collection"],
  },

  // ─── Unstitched ────────────────────────────────────────────────────────────
  {
    id: "uns-1",
    name: "Zahra 3-Piece Lawn",
    price: 12990,
    category: "Unstitched",
    image:
      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/zahra-3-piece-lawn",
    wearType: "unstitched",
    badge: "New",
    slugs: ["unstitched/new-in"],
  },
  {
    id: "uns-2",
    name: "Mehra Unstitched Silk",
    price: 24990,
    category: "Unstitched",
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/mehra-unstitched-silk",
    wearType: "unstitched",
    slugs: ["unstitched/new-in", "unstitched/printed"],
  },
  {
    id: "uns-3",
    name: "Noor Embroidered Lawn",
    price: 14990,
    category: "Unstitched",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/noor-embroidered-lawn",
    wearType: "unstitched",
    badge: "Featured",
    slugs: ["unstitched/embroidered", "unstitched/new-in"],
  },
  {
    id: "uns-4",
    name: "Riva Silk Printed Dupatta Set",
    price: 18990,
    category: "Unstitched",
    image:
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/riva-silk-printed-dupatta-set",
    wearType: "unstitched",
    slugs: ["unstitched/printed"],
  },
  {
    id: "uns-5",
    name: "Ariya Embroidered Cambric",
    price: 13990,
    category: "Unstitched",
    image:
      "https://images.unsplash.com/photo-1596783074918-c7cb2e69d32a?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1581044777550-aa7750db9da7?auto=format&fit=crop&w=800&q=80",
    href: "/product/ariya-embroidered-cambric",
    wearType: "unstitched",
    slugs: ["unstitched/embroidered"],
  },
  {
    id: "uns-6",
    name: "Sana Chiffon Embroidered 3-Piece",
    price: 21990,
    category: "Unstitched",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    href: "/product/sana-chiffon-embroidered-3-piece",
    wearType: "unstitched",
    badge: "New",
    slugs: ["unstitched/embroidered", "unstitched/new-in"],
  },
  {
    id: "uns-7",
    name: "Layla Block-Print Cotton",
    price: 9490,
    category: "Unstitched",
    image:
      "https://images.unsplash.com/photo-1550614000-4b9519e02a4d?auto=format&fit=crop&w=800&q=80",
    href: "/product/layla-block-print-cotton",
    wearType: "unstitched",
    slugs: ["unstitched/printed"],
  },
  {
    id: "uns-8",
    name: "Inara Digital Printed Lawn",
    price: 11490,
    category: "Unstitched",
    image:
      "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?auto=format&fit=crop&w=800&q=80",
    href: "/product/inara-digital-printed-lawn",
    wearType: "unstitched",
    slugs: ["unstitched/printed", "unstitched/new-in"],
  },

  // ─── Luxury / Premium ──────────────────────────────────────────────────────
  {
    id: "lux-1",
    name: "Zeenat Velvet Bridal Set",
    price: 49990,
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    href: "/product/zeenat-velvet-bridal-set",
    wearType: "stitched",
    badge: "New In",
    slugs: ["premium/new-in", "premium/wedding-wear"],
  },
  {
    id: "lux-2",
    name: "Leena Party Ensemble",
    price: 38990,
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1594633313593-bab3825d0977?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    href: "/product/leena-party-ensemble",
    wearType: "stitched",
    slugs: ["premium/party-wear", "premium/new-in"],
  },
  {
    id: "lux-3",
    name: "Rumi Embroidered Formals",
    price: 32990,
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d22?auto=format&fit=crop&w=800&q=80",
    href: "/product/rumi-embroidered-formals",
    wearType: "stitched",
    slugs: ["premium/embroidered", "premium/party-wear"],
  },
  {
    id: "lux-4",
    name: "Bloom Affair Embroidered Gown",
    price: 55990,
    category: "Luxury",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/bloom-affair-embroidered-gown",
    wearType: "stitched",
    badge: "Exclusive",
    slugs: ["premium/embroidered", "premium/wedding-wear", "premium/new-in"],
  },
  {
    id: "lux-5",
    name: "Noor Wedding Embellished Lehenga",
    price: 89990,
    category: "Luxury",
    image:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/noor-wedding-embellished-lehenga",
    wearType: "stitched",
    badge: "Bridal",
    slugs: ["premium/wedding-wear"],
  },
  {
    id: "lux-6",
    name: "Aiza Velvet Party Sharara",
    price: 42990,
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    href: "/product/aiza-velvet-party-sharara",
    wearType: "stitched",
    slugs: ["premium/party-wear", "premium/new-in"],
  },
  {
    id: "lux-7",
    name: "Shaheen Embroidered Net Dupatta",
    price: 28990,
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc075b908?auto=format&fit=crop&w=800&q=80",
    href: "/product/shaheen-embroidered-net-dupatta",
    wearType: "stitched",
    slugs: ["premium/embroidered"],
  },
  {
    id: "lux-8",
    name: "Gulbahar Silk Wedding Gharara",
    price: 74990,
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1f57b?auto=format&fit=crop&w=800&q=80",
    href: "/product/gulbahar-silk-wedding-gharara",
    wearType: "stitched",
    badge: "Bridal",
    slugs: ["premium/wedding-wear", "premium/embroidered"],
  },

  // ─── Accessories / Fabric ─────────────────────────────────────────────────
  {
    id: "acc-1",
    name: "Golden Lace Trim Border",
    price: 1490,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    href: "/product/golden-lace-trim-border",
    wearType: "ready-to-wear",
    slugs: ["accessories/lace"],
  },
  {
    id: "acc-2",
    name: "Pearl Tussle Embellishment",
    price: 990,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1515372031174-ab54a49f10ed?auto=format&fit=crop&w=800&q=80",
    href: "/product/pearl-tussle-embellishment",
    wearType: "ready-to-wear",
    slugs: ["accessories/tussle"],
  },
  {
    id: "acc-3",
    name: "Antique Button Set (24 pcs)",
    price: 590,
    category: "Accessories",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/antique-button-set",
    wearType: "ready-to-wear",
    slugs: ["accessories/buttons"],
  },
  {
    id: "acc-4",
    name: "Pure Silk Fabric (1 meter)",
    price: 4990,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1562157873-818bc075b908?auto=format&fit=crop&w=800&q=80",
    href: "/product/pure-silk-fabric",
    wearType: "ready-to-wear",
    badge: "Premium",
    slugs: ["accessories/silk"],
  },
  {
    id: "acc-5",
    name: "Chiffon Dupatta Fabric (2.5m)",
    price: 2490,
    category: "Accessories",
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/chiffon-dupatta-fabric",
    wearType: "ready-to-wear",
    slugs: ["accessories/chiffon"],
  },
  {
    id: "acc-6",
    name: "Embroidered Net Panel (1m)",
    price: 3490,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1596783074918-c7cb2e69d32a?auto=format&fit=crop&w=800&q=80",
    href: "/product/embroidered-net-panel",
    wearType: "ready-to-wear",
    slugs: ["accessories/net"],
  },
  {
    id: "acc-7",
    name: "Organza Ruffle Fabric (1m)",
    price: 2990,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    href: "/product/organza-ruffle-fabric",
    wearType: "ready-to-wear",
    slugs: ["accessories/organza"],
  },
  {
    id: "acc-8",
    name: "Silver Lace Dupatta Border",
    price: 1790,
    category: "Accessories",
    image:
      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/silver-lace-dupatta-border",
    wearType: "ready-to-wear",
    slugs: ["accessories/lace"],
  },
  {
    id: "acc-9",
    name: "Color Tussle Tassel Pack",
    price: 790,
    category: "Accessories",
    image:
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/color-tussle-tassel-pack",
    wearType: "ready-to-wear",
    slugs: ["accessories/tussle"],
  },

  // ─── Sale ─────────────────────────────────────────────────────────────────
  {
    id: "sale-1",
    name: "Sapphire Pret Set",
    price: 7990,
    category: "Pret",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/sapphire-pret-set",
    wearType: "ready-to-wear",
    badge: "50% Off",
    slugs: ["sale/up-to-50-off", "sale/women", "sale"],
  },
  {
    id: "sale-2",
    name: "Lina Chiffon Pret",
    price: 8990,
    category: "Pret",
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=800&q=80",
    href: "/product/lina-chiffon-pret",
    wearType: "ready-to-wear",
    badge: "30% Off",
    slugs: ["sale/up-to-50-off", "sale/women", "sale"],
  },
  {
    id: "sale-3",
    name: "Mira Block-Print Kurta",
    price: 4990,
    category: "Kurtas",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    href: "/product/mira-block-print-kurta",
    wearType: "ready-to-wear",
    badge: "70% Off",
    slugs: ["sale/up-to-70-off", "sale/clearance", "sale"],
  },
  {
    id: "sale-4",
    name: "Haya Organza Dupatta",
    price: 2990,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1515372031174-ab54a49f10ed?auto=format&fit=crop&w=800&q=80",
    href: "/product/haya-organza-dupatta",
    wearType: "ready-to-wear",
    badge: "40% Off",
    slugs: ["sale/accessories", "sale"],
  },
  {
    id: "sale-5",
    name: "Naima Printed Cotton 2-Piece",
    price: 5990,
    category: "Unstitched",
    image:
      "https://images.unsplash.com/photo-1550614000-4b9519e02a4d?auto=format&fit=crop&w=800&q=80",
    href: "/product/naima-printed-cotton-2-piece",
    wearType: "unstitched",
    badge: "Clearance",
    slugs: ["sale/clearance", "sale/up-to-70-off", "sale"],
  },
];

/** Route slug label map — used for breadcrumbs and page titles */
export const slugLabels: Record<string, string> = {
  stitched: "Ready to Wear",
  "stitched/new-in": "New In",
  "stitched/blossom-collection": "Blossom Collection",
  "stitched/printed": "Printed",
  "stitched/embroidered": "Embroidered",

  unstitched: "Unstitched",
  "unstitched/new-in": "New In",
  "unstitched/printed": "Printed",
  "unstitched/embroidered": "Embroidered",

  premium: "Luxury",
  "premium/new-in": "New In",
  "premium/embroidered": "Embroidered",
  "premium/party-wear": "Party Wear",
  "premium/wedding-wear": "Wedding Wear",

  accessories: "Accessories",
  "accessories/lace": "Lace",
  "accessories/tussle": "Tussle",
  "accessories/buttons": "Buttons",
  "accessories/silk": "Silk",
  "accessories/chiffon": "Chiffon",
  "accessories/net": "Net",
  "accessories/organza": "Organza",

  sale: "Sale",
  "sale/up-to-50-off": "Up to 50% Off",
  "sale/up-to-70-off": "Up to 70% Off",
  "sale/clearance": "Clearance",
  "sale/women": "Women's Sale",
  "sale/men": "Men's Sale",
  "sale/accessories": "Accessories Sale",
};

/** Parent slug map — used for breadcrumb parent label */
export const slugParent: Record<string, string> = {
  "stitched/new-in": "stitched",
  "stitched/blossom-collection": "stitched",
  "stitched/printed": "stitched",
  "stitched/embroidered": "stitched",

  "unstitched/new-in": "unstitched",
  "unstitched/printed": "unstitched",
  "unstitched/embroidered": "unstitched",

  "premium/new-in": "premium",
  "premium/embroidered": "premium",
  "premium/party-wear": "premium",
  "premium/wedding-wear": "premium",

  "accessories/lace": "accessories",
  "accessories/tussle": "accessories",
  "accessories/buttons": "accessories",
  "accessories/silk": "accessories",
  "accessories/chiffon": "accessories",
  "accessories/net": "accessories",
  "accessories/organza": "accessories",

  "sale/up-to-50-off": "sale",
  "sale/up-to-70-off": "sale",
  "sale/clearance": "sale",
  "sale/women": "sale",
  "sale/men": "sale",
  "sale/accessories": "sale",
};

/** Get products for a given slug */
export function getProductsBySlug(slug: string): CatalogProduct[] {
  return catalogProducts.filter((p) =>
    p.slugs.some((s) => s === slug || s.startsWith(`${slug}/`))
  );
}

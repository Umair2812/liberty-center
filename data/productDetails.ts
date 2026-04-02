import type { HomeProduct, ProductWearType } from "@/data/home";
import { featuredProducts, newArrivals } from "@/data/home";
import { showcaseProducts } from "@/data/products";
import { showSizeGuideAndSizes } from "@/lib/wearType";

export type ProductDetailBlock = {
  heading: string;
  lines: string[];
};

export type ProductDetail = {
  slug: string;
  title: string;
  price: number;
  sku: string;
  wearType: ProductWearType;
  images: string[];
  sizes?: string[];
  detailBlocks: ProductDetailBlock[];
  description: string;
  badge?: string;
};

function hrefToSlug(href: string): string {
  return href.replace(/^\/product\//, "");
}

const RTW_SIZES = ["XS", "S", "M", "L", "XL"] as const;

function mergeUniqueByHref(products: HomeProduct[]): Map<string, HomeProduct> {
  const map = new Map<string, HomeProduct>();
  for (const p of products) {
    map.set(hrefToSlug(p.href), p);
  }
  return map;
}

const catalogBySlug = mergeUniqueByHref([
  ...showcaseProducts,
  ...featuredProducts,
  ...newArrivals,
]);

const EXTRA_IMAGES: Record<string, string[]> = {
  "lina-chiffon-pret": [
    "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=format&fit=crop&w=900&q=80",
    "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=format&fit=crop&w=900&q=80",
  ],
  "sapphire-pret-set": [
    "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=900&q=80",
    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=900&q=80",
  ],
  "aila-embroidered-kurta": [
    "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1515372031174-ab54a49f10ed?auto=format&fit=crop&w=900&q=80",
  ],
};

const DETAIL_OVERRIDES: Partial<
  Record<
    string,
    Partial<
      Omit<ProductDetail, "slug" | "price" | "wearType" | "images"> & {
        images?: string[];
      }
    >
  >
> = {
  "lina-chiffon-pret": {
    sku: "001683952105",
    detailBlocks: [
      {
        heading: "Product detail",
        lines: [
          "Chiffon pret shirt with embroidered neckline and straight trousers.",
        ],
      },
      {
        heading: "SHIRT",
        lines: [
          "Embroidered chiffon front and back",
          "Fabric: Chiffon",
          "Color: As shown",
        ],
      },
      {
        heading: "TROUSERS",
        lines: ["Dyed raw silk trouser", "Fabric: Raw silk", "Color: Matching"],
      },
    ],
    description:
      "Wear comfort and quiet luxury with this ready-to-wear chiffon set — ideal for evenings and celebrations.\n\nThe silhouette is cut for ease of movement, with finishing that holds up wash after wash when cared for gently.",
  },
  "sapphire-pret-set": {
    sku: "001699882103",
    detailBlocks: [
      {
        heading: "Product detail",
        lines: ["2 piece digital printed pret co-ord set."],
      },
      {
        heading: "KURTA",
        lines: ["Printed lawn kurta", "Fabric: Lawn", "Length: Medium"],
      },
      {
        heading: "TROUSERS",
        lines: ["Printed lawn trousers", "Fabric: Lawn"],
      },
    ],
    description:
      "A coordinated ready-to-wear set with breathable lawn and a refined silhouette for everyday elegance.\n\nPair with minimal accessories to let the print take centre stage, or layer for transitional weather.",
  },
  "aila-embroidered-kurta": {
    sku: "001712004421",
    detailBlocks: [
      {
        heading: "Product detail",
        lines: ["Single stitched kurta with schiffli embroidery."],
      },
      {
        heading: "KURTA",
        lines: [
          "Embroidered lawn front panels",
          "Fabric: Lawn",
          "Style: Straight cut",
        ],
      },
    ],
    description:
      "Stitched for a flattering fit — pair with your favourite trousers or dupatta.",
  },
  "zahra-3-piece-lawn": {
    detailBlocks: [
      {
        heading: "Product detail",
        lines: ["Floral style shirt with dupatta and trousers — unstitched."],
      },
      {
        heading: "SHIRT",
        lines: ["Printed lawn shirt: 3 meter", "Fabric: Lawn"],
      },
      {
        heading: "DUPATTA",
        lines: ["Digital printed chiffon dupatta: 2.5 meter", "Fabric: Chiffon"],
      },
      {
        heading: "TROUSERS",
        lines: ["Printed lawn trouser: 2.5 meter", "Fabric: Lawn"],
      },
    ],
    description:
      "Celebrate tradition with this digitally printed three-piece from our unstitched summer collection.",
  },
};

function galleryImages(slug: string, p: HomeProduct): string[] {
  const extra = EXTRA_IMAGES[slug] ?? [];
  const base = [p.image, p.hoverImage, p.image, p.hoverImage].filter(
    (u, i, a) => u && a.indexOf(u) === i,
  ) as string[];
  const merged = [...base, ...extra];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of merged) {
    if (!seen.has(u)) {
      seen.add(u);
      out.push(u);
    }
  }
  while (out.length < 4) {
    out.push(p.image);
  }
  return out.slice(0, 8);
}

function defaultBlocks(p: HomeProduct): ProductDetailBlock[] {
  return [
    {
      heading: "Product detail",
      lines: [`${p.category} — ${p.name}.`],
    },
    {
      heading: "Care",
      lines: ["Dry clean recommended.", "Cool iron on reverse where applicable."],
    },
  ];
}

function syntheticSku(slug: string): string {
  const n = slug
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0)
    .toString()
    .padStart(9, "0");
  return `00${n.slice(0, 9)}`;
}

export function getProductDetail(slug: string): ProductDetail | null {
  const p = catalogBySlug.get(slug);
  if (!p) return null;

  const override = DETAIL_OVERRIDES[slug] ?? {};
  const defaultSizes = showSizeGuideAndSizes(p.wearType)
    ? [...RTW_SIZES]
    : undefined;

  return {
    slug,
    title: override.title ?? p.name.toUpperCase(),
    price: p.price,
    sku: override.sku ?? syntheticSku(slug),
    wearType: p.wearType,
    images: override.images ?? galleryImages(slug, p),
    sizes: override.sizes ?? defaultSizes,
    detailBlocks: override.detailBlocks ?? defaultBlocks(p),
    description:
      override.description ??
      "Thoughtfully curated for Liberty Center — quality fabrics and timeless silhouettes.",
    badge: p.badge,
  };
}

/**
 * Same product order as the homepage (featured → new arrivals → showcase) so image URLs match home grids.
 */
export function getYouMayAlsoLike(currentSlug: string, limit = 8): HomeProduct[] {
  const homeOrder = [...featuredProducts, ...newArrivals, ...showcaseProducts];
  const seen = new Set<string>();
  const unique: HomeProduct[] = [];
  for (const p of homeOrder) {
    const s = hrefToSlug(p.href);
    if (s === currentSlug || seen.has(s)) continue;
    seen.add(s);
    unique.push(p);
  }
  return unique.slice(0, limit);
}

export type AddonInputKind = "meters" | "quantity";

export type ProductAddonDef = {
  id: string;
  label: string;
  shortLabel: string;
  input: AddonInputKind;
  /** PKR per meter or per unit */
  pricePerUnit: number;
  /**
   * Thumbnail — URLs match imagery used on the homepage catalog
   * (featuredProducts, newArrivals, featuredCollections, showcaseProducts).
   */
  image: string;
  /** Shown in the addon detail popup */
  description: string;
};

/** Pricing placeholders; images align with `data/home.ts` + `data/products.ts` */
export const PRODUCT_ADDONS: ProductAddonDef[] = [
  {
    id: "lace",
    label: "Lace",
    shortLabel: "Lace",
    input: "meters",
    pricePerUnit: 450,
    // featuredProducts — Noor Embroidered Lawn
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=format&fit=crop&w=900&q=80",
    description:
      "Delicate lace by the meter — ideal for necklines, hems, sleeves, or dupatta edges. We source trims that pair cleanly with your main fabric.",
  },
  {
    id: "tassels",
    label: "Tassels",
    shortLabel: "Tassels",
    input: "quantity",
    pricePerUnit: 120,
    // featuredCollections — Garden Muse
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    description:
      "Statement tassels for dupattas, ties, or borders. Choose quantity to match your design — each piece is picked for weight and finish.",
  },
  {
    id: "buttons",
    label: "Buttons",
    shortLabel: "Buttons",
    input: "quantity",
    pricePerUnit: 35,
    // featuredProducts — Mira Block-Print Kurta
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
    description:
      "Coordinating buttons for plackets, cuffs, or embellishment. Sold per unit so you can match your pattern exactly.",
  },
  {
    id: "chiffon",
    label: "Extra same color chiffon",
    shortLabel: "Chiffon",
    input: "meters",
    pricePerUnit: 890,
    // featuredProducts — Lina Chiffon Pret
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=900&q=80",
    description:
      "Colors may vary slightly, but they match beautifully, and we carefully recommend the most suitable, high-quality additions.",
  },
  {
    id: "silk",
    label: "Same color silk",
    shortLabel: "Silk",
    input: "meters",
    pricePerUnit: 1250,
    // featuredProducts — Riva Silk Dupatta Set (home)
    image:
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=format&fit=crop&w=900&q=80",
    description:
      "Colors may vary slightly, but they match beautifully, and we carefully recommend the most suitable, high-quality additions.",
  },
];

export function getAddonById(id: string): ProductAddonDef | undefined {
  return PRODUCT_ADDONS.find((a) => a.id === id);
}

export function addonUnitLabel(input: AddonInputKind): string {
  return input === "meters" ? "meter" : "unit";
}

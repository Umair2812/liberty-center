import type { ProductWearType } from "@/data/home";

const LABELS: Record<ProductWearType, string> = {
  "ready-to-wear": "READY TO WEAR",
  unstitched: "UNSTITCHED",
  stitched: "STITCHED",
};

export function wearTypeLabel(wearType: ProductWearType): string {
  return LABELS[wearType];
}

/** Size guide + size selector for finished garments */
export function showSizeGuideAndSizes(wearType: ProductWearType): boolean {
  return wearType === "ready-to-wear" || wearType === "stitched";
}

import { getBrand, type BrandConfig } from "@/lib/brand-config";

let cachedBrand: BrandConfig | null = null;

export function useBrand(): BrandConfig {
  if (!cachedBrand) {
    cachedBrand = getBrand();
  }
  return cachedBrand;
}

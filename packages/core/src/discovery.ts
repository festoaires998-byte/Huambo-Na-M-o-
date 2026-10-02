import type { DiscoveryEntityType, DiscoveryQuery } from "@huambo-online/types";

export const DISCOVERY_TYPES: readonly DiscoveryEntityType[] = [
  "business",
  "provider",
  "service",
  "product"
] as const;

export function normalizeDiscoveryQuery(query: DiscoveryQuery): DiscoveryQuery {
  return {
    ...query,
    text: query.text?.trim() || undefined,
    radiusKm: query.radiusKm && query.radiusKm > 0 ? query.radiusKm : undefined
  };
}
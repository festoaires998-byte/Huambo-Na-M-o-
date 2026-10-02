export type DiscoveryEntityType = "business" | "provider" | "service" | "product";

export interface DiscoveryQuery {
  text?: string;
  entityType?: DiscoveryEntityType;
  category?: string;
  municipalityId?: string;
  neighborhoodId?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
}

export interface DiscoveryResult {
  id: string;
  type: DiscoveryEntityType;
  title: string;
  subtitle?: string;
  category?: string;
  verified?: boolean;
  rating?: number;
  reviewCount?: number;
  distanceKm?: number;
}
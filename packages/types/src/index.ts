export type UserRole =
  | "customer"
  | "provider"
  | "seller"
  | "business_owner"
  | "business_staff"
  | "courier"
  | "admin";

export type ListingType = "product" | "service" | "classified";

export interface Location {
  latitude?: number;
  longitude?: number;
  province?: string;
  municipality?: string;
  neighborhood?: string;
  street?: string;
  address?: string;
}

export interface BusinessSummary {
  id: string;
  name: string;
  category: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  location?: Location;
}

export interface ServiceSummary {
  id: string;
  title: string;
  providerId: string;
  category: string;
  priceFrom?: number;
  currency: "AOA";
  location?: Location;
}

export interface ProductSummary {
  id: string;
  name: string;
  sellerId: string;
  price: number;
  currency: "AOA";
  stock: number;
}

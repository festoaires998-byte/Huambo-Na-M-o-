import type { ListingType } from "@huambo-online/types";

export * from "./discovery";
export * from "./identity";
export * from "./onboarding";
export * from "./location";
export * from "./listings";
export * from "./marketplace";
export * from "./checkout";

export const PLATFORM_NAME = "Huambo Online";

export function getListingLabel(type: ListingType): string {
  switch (type) {
    case "product": return "Produto";
    case "service": return "Serviço";
    case "classified": return "Classificado";
  }
}
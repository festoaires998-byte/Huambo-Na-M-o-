import type { ListingType } from "@huambo-online/types";

export const PLATFORM_NAME = "Huambo Online";

export function getListingLabel(type: ListingType): string {
  switch (type) {
    case "product":
      return "Produto";
    case "service":
      return "Serviço";
    case "classified":
      return "Classificado";
  }
}

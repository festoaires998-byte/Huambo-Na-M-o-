import type { DiscoveryEntityType, DiscoveryQuery } from "@huambo-online/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export const DISCOVERY_TYPES: readonly DiscoveryEntityType[] = ["business","provider","service","product"] as const;

export function normalizeDiscoveryQuery(query: DiscoveryQuery): DiscoveryQuery {
  return {...query,text:query.text?.trim()||undefined,radiusKm:query.radiusKm&&query.radiusKm>0?query.radiusKm:undefined};
}

export async function searchBusinesses(client: SupabaseClient, query = "") {
  let request=client.from("businesses").select("id,name,description,category_id,address_id,verified").eq("active",true);
  if(query.trim()) request=request.ilike("name",`%${query.trim()}%`);
  return request.order("name");
}
export async function searchServices(client: SupabaseClient, query = "") {
  let request=client.from("services").select("id,title,description,provider_id,category_id,price_from,currency,address_id").eq("active",true);
  if(query.trim()) request=request.ilike("title",`%${query.trim()}%`);
  return request.order("title");
}
export async function searchProducts(client: SupabaseClient, query = "") {
  let request=client.from("products").select("id,name,description,seller_id,category_id,price,currency,stock,address_id").eq("active",true).gt("stock",0);
  if(query.trim()) request=request.ilike("name",`%${query.trim()}%`);
  return request.order("name");
}
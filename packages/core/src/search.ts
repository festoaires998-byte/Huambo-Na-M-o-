import type { SupabaseClient } from "@supabase/supabase-js";

export async function searchHuamboOnline(client:SupabaseClient,query="",limit=30){
  return client.rpc("search_huambo_online",{p_query:query.trim(),p_limit:Math.max(1,Math.min(limit,100))});
}
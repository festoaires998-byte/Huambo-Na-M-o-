import type { SupabaseClient } from "@supabase/supabase-js";

export async function createSavedClassifiedSearch(client:SupabaseClient,name:string,filters:Record<string,unknown>){
 return client.rpc("create_classified_saved_search",{p_name:name.trim(),p_filters:filters});
}
export async function listSavedClassifiedSearches(client:SupabaseClient){
 return client.from("classified_saved_searches").select("*").order("created_at",{ascending:false});
}
export async function updateSavedClassifiedSearch(client:SupabaseClient,id:string,patch:{name?:string;filters?:Record<string,unknown>;active?:boolean;notification_frequency?:"immediate"|"daily";notification_quiet_until?:string|null}){
 return client.from("classified_saved_searches").update({...patch,updated_at:new Date().toISOString()}).eq("id",id).select().single();
}
export async function deleteSavedClassifiedSearch(client:SupabaseClient,id:string){
 return client.from("classified_saved_searches").delete().eq("id",id);
}
export function savedSearchNotificationTarget(data:Record<string,unknown>){
 const v=data?.listing_id;
 return typeof v==="string"&&v.length>0?{listingId:v,savedSearchId:typeof data.saved_search_id==="string"?data.saved_search_id:null}:null;
}
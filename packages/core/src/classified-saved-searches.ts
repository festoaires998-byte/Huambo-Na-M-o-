import type { SupabaseClient } from "@supabase/supabase-js";

export async function createSavedClassifiedSearch(client:SupabaseClient,name:string,filters:Record<string,unknown>){
 return client.rpc("create_classified_saved_search",{p_name:name.trim(),p_filters:filters});
}
export async function listSavedClassifiedSearches(client:SupabaseClient){
 return client.from("classified_saved_searches").select("*").order("created_at",{ascending:false});
}
export async function updateSavedClassifiedSearch(client:SupabaseClient,id:string,patch:{name?:string;filters?:Record<string,unknown>;active?:boolean}){
 return client.from("classified_saved_searches").update({...patch,updated_at:new Date().toISOString()}).eq("id",id).select().single();
}
export async function deleteSavedClassifiedSearch(client:SupabaseClient,id:string){
 return client.from("classified_saved_searches").delete().eq("id",id);
}
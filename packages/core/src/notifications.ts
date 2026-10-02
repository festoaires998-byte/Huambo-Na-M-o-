import type { SupabaseClient } from "@supabase/supabase-js";
import type { NotificationType } from "@huambo-online/types";

export async function listNotifications(client:SupabaseClient){
  return client.from("notifications").select("id,user_id,type,title,body,data,read_at,created_at").order("created_at",{ascending:false});
}
export async function markNotificationRead(client:SupabaseClient,id:string){
  return client.from("notifications").update({read_at:new Date().toISOString()}).eq("id",id).select().single();
}
export async function markAllNotificationsRead(client:SupabaseClient){
  return client.from("notifications").update({read_at:new Date().toISOString()}).is("read_at",null);
}
export async function createNotification(client:SupabaseClient,input:{userId:string;type:NotificationType;title:string;body:string;data?:Record<string,unknown>}){
  return client.rpc("create_notification",{p_user_id:input.userId,p_type:input.type,p_title:input.title,p_body:input.body,p_data:input.data||{}});
}
export async function listSavedSearchNotifications(client:SupabaseClient){
  return client.from("notifications")
    .select("id,user_id,type,title,body,data,read_at,created_at")
    .eq("type","saved_search")
    .order("created_at",{ascending:false});
}

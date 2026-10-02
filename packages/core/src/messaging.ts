import type { SupabaseClient } from "@supabase/supabase-js";

export async function createConversation(client:SupabaseClient,userId:string,input:{
  subject?:string; contextType?:string; businessId?:string; providerId?:string; serviceId?:string; productId?:string; orderId?:string; classifiedListingId?:string; participantIds:string[];
}) {
  const created=await client.from("conversations").insert({
    created_by:userId,subject:input.subject?.trim()||null,context_type:input.contextType||"general",
    business_id:input.businessId||null,provider_id:input.providerId||null,service_id:input.serviceId||null,
    product_id:input.productId||null,order_id:input.orderId||null,classified_listing_id:input.classifiedListingId||null
  }).select().single();
  if(created.error) return created;
  const ids=[...new Set([userId,...input.participantIds])].map(user_id=>({conversation_id:created.data.id,user_id}));
  const participants=await client.from("conversation_participants").insert(ids);
  if(participants.error) return {data:null,error:participants.error};
  return created;
}

export async function listConversations(client:SupabaseClient){
  return client.from("conversations").select("id,created_by,subject,context_type,business_id,provider_id,service_id,product_id,order_id,created_at,updated_at").order("updated_at",{ascending:false});
}

export async function listMessages(client:SupabaseClient,conversationId:string){
  return client.from("messages").select("id,conversation_id,sender_id,body,created_at,edited_at").eq("conversation_id",conversationId).order("created_at");
}

export async function sendMessage(client:SupabaseClient,conversationId:string,senderId:string,body:string){
  return client.from("messages").insert({conversation_id:conversationId,sender_id:senderId,body:body.trim()}).select().single();
}
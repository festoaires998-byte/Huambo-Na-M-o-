"use client";
import { useEffect,useState } from "react";
import { createSupabaseClient } from "@huambo-online/supabase";
import { countUnreadNotifications,subscribeToNotifications } from "@huambo-online/core";

const url=process.env.NEXT_PUBLIC_SUPABASE_URL??"";const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";

export function NotificationBell(){
 const [count,setCount]=useState(0);
 async function refresh(){const c=createSupabaseClient(url,key);const r=await countUnreadNotifications(c);setCount(r.count);}
 useEffect(()=>{void refresh();},[]);
 return <a href="/notificacoes" aria-label="Notificações" style={{position:"fixed",right:20,bottom:20,padding:"12px 16px",borderRadius:999,border:"1px solid #ddd",background:"#fff",textDecoration:"none"}}>🔔 {count>0?<strong>{count}</strong>:null}</a>;
}

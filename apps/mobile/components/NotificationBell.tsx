import { useEffect,useState } from "react";
import { Link } from "expo-router";
import { Text,StyleSheet } from "react-native";
import { createSupabaseClient } from "@huambo-online/supabase";
import { countUnreadNotifications,subscribeToNotifications } from "@huambo-online/core";
const url=process.env.EXPO_PUBLIC_SUPABASE_URL??"";const key=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
export function NotificationBell(){const [count,setCount]=useState(0);useEffect(()=>{const c=createSupabaseClient(url,key);let stop=()=>{};const refresh=async()=>{const r=await countUnreadNotifications(c);setCount(r.count??0);};void (async()=>{await refresh();const u=await c.auth.getUser();if(u.data.user)stop=subscribeToNotifications(c,u.data.user.id,()=>{void refresh();});})();return()=>stop();},[]);return <Link href="/notificacoes" style={s.link}><Text>🔔 {count>0?count:""}</Text></Link>}
const s=StyleSheet.create({link:{padding:12}});
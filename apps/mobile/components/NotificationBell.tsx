import { useEffect,useState } from "react";
import { Link } from "expo-router";
import { Text,View,StyleSheet } from "react-native";
import { createSupabaseClient } from "@huambo-online/supabase";
import { countUnreadNotifications } from "@huambo-online/core";
const url=process.env.EXPO_PUBLIC_SUPABASE_URL??"";const key=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
export function NotificationBell(){const [count,setCount]=useState(0);useEffect(()=>{(async()=>{const c=createSupabaseClient(url,key);const r=await countUnreadNotifications(c);setCount(r.count);})();},[]);return <Link href="/notificacoes" style={s.link}><Text>🔔 {count>0?count:""}</Text></Link>}
const s=StyleSheet.create({link:{padding:12}});
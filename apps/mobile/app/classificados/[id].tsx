import { useEffect,useState } from "react";
import { Stack,useLocalSearchParams } from "expo-router";
import { StyleSheet,Text,View,ScrollView,Image } from "react-native";
import { createSupabaseClient } from "@huambo-online/supabase";
import { getClassifiedListing } from "@huambo-online/core";
const url=process.env.EXPO_PUBLIC_SUPABASE_URL??"";const key=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
export default function ClassifiedDetail(){const {id}=useLocalSearchParams<{id:string}>();const [item,setItem]=useState<any>(null);const [error,setError]=useState("");
useEffect(()=>{if(!id)return;(async()=>{const c=createSupabaseClient(url,key);const r=await getClassifiedListing(c,id);if(r.error)setError(r.error.message);else if(!r.data)setError("Anúncio não encontrado ou já não está publicado.");else setItem(r.data);})()},[id]);
if(error)return <View style={s.container}><Text>{error}</Text></View>;if(!item)return <View style={s.container}><Text>A carregar anúncio…</Text></View>;
return <ScrollView contentContainerStyle={s.container}><Stack.Screen options={{title:item.title}}/><Text style={s.title}>{item.title}</Text><Text>{item.description}</Text><Text style={s.price}>{item.price??"Preço sob consulta"} {item.currency}</Text><Text>{item.purpose} · {item.listing_type}</Text>{Array.isArray(item.media)&&item.media.map((m:string,i:number)=><Image key={i} source={{uri:m}} style={s.image}/>)}</ScrollView>}
const s=StyleSheet.create({container:{padding:24,gap:16},title:{fontSize:30,fontWeight:"800"},price:{fontSize:22,fontWeight:"700"},image:{width:"100%",height:260,borderRadius:12}});
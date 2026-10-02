import { useState } from "react";
import { StyleSheet,Text,TextInput,View,Pressable,ScrollView } from "react-native";
import { createSupabaseClient } from "@huambo-online/supabase";
import { getClassifiedListing } from "@huambo-online/core";
const url=process.env.EXPO_PUBLIC_SUPABASE_URL??"";const key=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
export default function Explorar(){const [id,setId]=useState("");const [item,setItem]=useState<any>(null);
async function open(){if(!id.trim())return;const c=createSupabaseClient(url,key);const r=await getClassifiedListing(c,id.trim());if(!r.error)setItem(r.data);}
return <ScrollView contentContainerStyle={s.container}><Text style={s.title}>Explorar Huambo</Text><Text>Negócios · Profissionais · Serviços · Marketplace · Classificados · B2B</Text><Text style={s.subtitle}>Abrir anúncio</Text><TextInput value={id} onChangeText={setId} placeholder="ID do anúncio" style={s.input}/><Pressable onPress={open}><Text>Abrir</Text></Pressable>{item&&<View style={s.card}><Text style={s.strong}>{item.title}</Text><Text>{item.description}</Text><Text>{item.price??"Preço sob consulta"} {item.currency}</Text><Text>{item.purpose} · {item.listing_type}</Text></View>}</ScrollView>}
const s=StyleSheet.create({container:{padding:28,gap:18},title:{fontSize:30,fontWeight:"800"},subtitle:{fontSize:20,fontWeight:"700"},input:{borderWidth:1,borderColor:"#ccc",padding:12,borderRadius:10},card:{borderWidth:1,borderColor:"#ddd",padding:16,borderRadius:14,gap:8},strong:{fontWeight:"800"}});
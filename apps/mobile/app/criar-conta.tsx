import { useState } from "react";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { createSupabaseClient, signUp } from "@huambo-online/supabase";

export default function CriarConta() {
  const [f,setF]=useState({fullName:"",email:"",phone:"",municipality:"",password:""}); const [message,setMessage]=useState("");
  const set=(k:keyof typeof f)=>(v:string)=>setF(x=>({...x,[k]:v}));
  async function submit(){try{const c=createSupabaseClient(process.env.EXPO_PUBLIC_SUPABASE_URL??"",process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"");const {data,error}=await signUp(c,f);if(error)throw error;setMessage(data.session?"Conta criada com sucesso.":"Conta criada. Verifique o email para confirmar.");}catch(e){setMessage(e instanceof Error?e.message:"Não foi possível criar a conta.");}}
  return <View style={s.container}><Link href="/" style={s.back}>← Huambo Online</Link><Text style={s.title}>Criar conta</Text>
    <TextInput placeholder="Nome completo" value={f.fullName} onChangeText={set("fullName")} style={s.input}/><TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={f.email} onChangeText={set("email")} style={s.input}/><TextInput placeholder="Telefone" value={f.phone} onChangeText={set("phone")} style={s.input}/><TextInput placeholder="Município" value={f.municipality} onChangeText={set("municipality")} style={s.input}/><TextInput placeholder="Palavra-passe" secureTextEntry value={f.password} onChangeText={set("password")} style={s.input}/>
    <Pressable onPress={submit} style={s.button}><Text style={s.buttonText}>Criar conta</Text></Pressable>{!!message&&<Text>{message}</Text>}<Link href="/login">Já tenho conta</Link></View>
}
const s=StyleSheet.create({container:{flex:1,padding:28,paddingTop:56,gap:12},back:{fontWeight:"700"},title:{fontSize:34,fontWeight:"800"},input:{borderWidth:1,borderColor:"#ccc",borderRadius:12,padding:14,fontSize:16},button:{padding:15,borderRadius:12,alignItems:"center",backgroundColor:"#111"},buttonText:{color:"#fff",fontWeight:"800"}});
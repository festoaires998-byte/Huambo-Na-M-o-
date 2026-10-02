"use client";
import {useEffect,useState} from "react";
import {createSupabaseClient} from "@huambo-online/supabase";
import {listSavedClassifiedSearches,updateSavedClassifiedSearch} from "@huambo-online/core";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL??"";const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
export default function SavedSearches(){const [items,setItems]=useState<any[]>([]);const [error,setError]=useState("");
async function load(){const c=createSupabaseClient(url,key);const u=await c.auth.getUser();if(!u.data.user){setError("Inicie sessão para gerir as suas pesquisas guardadas.");return;}const r=await listSavedClassifiedSearches(c);if(r.error)setError(r.error.message);else setItems(r.data??[]);}
useEffect(()=>{void load()},[]);
async function frequency(x:any,v:"immediate"|"daily"){const c=createSupabaseClient(url,key);const r=await updateSavedClassifiedSearch(c,x.id,{notification_frequency:v});if(r.error)setError(r.error.message);else setItems(a=>a.map(i=>i.id===x.id?{...i,notification_frequency:v}:i));}
return <main style={{maxWidth:900,margin:"0 auto",padding:32}}><a href="/explorar">← Explorar</a><h1>Pesquisas guardadas</h1><p>Escolha com que frequência quer receber alertas de novos anúncios compatíveis.</p>{error&&<p>{error}</p>}{items.map(x=><section key={x.id} style={{border:"1px solid #ddd",borderRadius:12,padding:18,marginTop:12}}><h2>{x.name}</h2><p>{x.active?"Ativa":"Pausada"}</p><label>Alertas: <select value={x.notification_frequency??"immediate"} onChange={e=>void frequency(x,e.target.value as any)}><option value="immediate">Imediatos</option><option value="daily">Resumo diário</option></select></label></section>)}{!items.length&&!error&&<p>Nenhuma pesquisa guardada.</p>}</main>}
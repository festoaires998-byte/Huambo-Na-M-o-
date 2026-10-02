"use client";
import { useEffect,useState } from "react";
import { createSupabaseClient } from "@huambo-online/supabase";
import { getClassifiedListing,contactListingOwner } from "@huambo-online/core";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL??"";const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
export default function ClassifiedDetail({params}:{params:{id:string}}){
 const [item,setItem]=useState<any>(null);const [error,setError]=useState("");const [message,setMessage]=useState("");const [sent,setSent]=useState(false);const [busy,setBusy]=useState(false);
 useEffect(()=>{(async()=>{const c=createSupabaseClient(url,key);const r=await getClassifiedListing(c,params.id);if(r.error)setError(r.error.message);else if(!r.data)setError("Anúncio não encontrado ou já não está publicado.");else setItem(r.data);})()},[params.id]);
 async function contact(){if(!message.trim())return;setBusy(true);const c=createSupabaseClient(url,key);const r=await contactListingOwner(c,params.id,message);setBusy(false);if(r.error)setError(r.error.message);else{setSent(true);setMessage("");}}
 if(error)return <main style={{padding:32}}><a href="/explorar">← Explorar</a><h1>Anúncio</h1><p>{error}</p></main>;
 if(!item)return <main style={{padding:32}}><p>A carregar anúncio…</p></main>;
 return <main style={{maxWidth:900,margin:"0 auto",padding:32}}><a href="/explorar">← Explorar</a><h1>{item.title}</h1><p>{item.description}</p><h2>{item.price??"Preço sob consulta"} {item.currency}</h2><p>{item.purpose} · {item.listing_type}</p>{Array.isArray(item.media)&&item.media.length>0&&<section>{item.media.map((m:string,i:number)=><img key={i} src={m} alt="" style={{maxWidth:"100%",borderRadius:12,marginTop:12}}/>)}</section>}<section style={{marginTop:32,borderTop:"1px solid #ddd",paddingTop:24}}><h2>Contactar anunciante</h2><textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Escreva a sua mensagem" rows={5} style={{width:"100%",maxWidth:700}}/><br/><button disabled={busy||!message.trim()} onClick={contact}>{busy?"A enviar…":"Enviar mensagem"}</button>{sent&&<p>Mensagem enviada. A conversa foi criada.</p>}</section></main>;
}
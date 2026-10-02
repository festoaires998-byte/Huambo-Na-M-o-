"use client";
import { useEffect,useState } from "react";
import { createSupabaseClient } from "@huambo-online/supabase";
import { getClassifiedListing } from "@huambo-online/core";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL??""; const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
export default function ExplorarPage(){
 const [id,setId]=useState(""); const [item,setItem]=useState<any>(null); const [error,setError]=useState("");
 async function open(){if(!id.trim())return;const c=createSupabaseClient(url,key);const r=await getClassifiedListing(c,id.trim());if(r.error)setError(r.error.message);else setItem(r.data);}
 return <main style={{maxWidth:1120,margin:"0 auto",padding:"40px 24px"}}><a href="/">← Huambo Online</a><h1>Explorar</h1><p>Encontre negócios, profissionais, serviços, marketplace e classificados.</p><section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16,marginTop:28}}>{["Negócios","Profissionais","Serviços","Marketplace","Classificados","B2B"].map(x=><article key={x} style={{border:"1px solid #ddd",borderRadius:18,padding:22}}><h2>{x}</h2></article>)}</section><hr style={{margin:"32px 0"}}/><h2>Abrir anúncio</h2><input value={id} onChange={e=>setId(e.target.value)} placeholder="ID do anúncio"/><button onClick={open}>Abrir</button>{error&&<p>{error}</p>}{item&&<article style={{marginTop:20,border:"1px solid #ddd",borderRadius:18,padding:20}}><h2>{item.title}</h2><p>{item.description}</p><strong>{item.price??"Preço sob consulta"} {item.currency}</strong><p>{item.purpose} · {item.listing_type}</p></article>}</main>;
}
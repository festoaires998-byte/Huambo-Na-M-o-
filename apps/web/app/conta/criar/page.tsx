"use client";

import { FormEvent, useState } from "react";
import { createSupabaseClient, signUp } from "@huambo-online/supabase";

export default function CriarContaPage() {
  const [form, setForm] = useState({ fullName:"", email:"", phone:"", municipality:"", password:"" });
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    try {
      const client = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "");
      const { data, error } = await signUp(client, form);
      if (error) throw error;
      setMessage(data.session ? "Conta criada com sucesso." : "Conta criada. Verifique o seu email para confirmar.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível criar a conta.");
    }
  }

  const field=(label:keyof typeof form,type="text")=><label>{label}<input required={label!=="phone"&&label!=="municipality"} type={type} value={form[label]} onChange={e=>setForm({...form,[label]:e.target.value})} style={{display:"block",width:"100%",padding:12,marginTop:6,boxSizing:"border-box"}} /></label>;

  return <main style={{maxWidth:480,margin:"0 auto",padding:"56px 24px"}}>
    <a href="/">← Huambo Online</a><h1>Criar conta</h1><p>Uma conta para descobrir, comprar, vender e prestar serviços.</p>
    <form onSubmit={submit} style={{display:"grid",gap:14}}>
      {field("fullName")} {field("email","email")} {field("phone")} {field("municipality")} {field("password","password")}
      <button type="submit" style={{padding:12}}>Criar conta</button>
      {message&&<p role="status">{message}</p>}
    </form>
    <p><a href="/conta/login">Já tenho conta</a></p>
  </main>;
}
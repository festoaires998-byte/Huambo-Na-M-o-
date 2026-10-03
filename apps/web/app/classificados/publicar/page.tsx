"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@huambo-online/supabase";
import { createClassifiedListing } from "@huambo-online/core";

export default function PublicarClassificado() {
  const router = useRouter();
  const [media, setMedia] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [addressId, setAddressId] = useState("");
  const [listingType, setListingType] = useState("classified");
  const [purpose, setPurpose] = useState("sale");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim()) { setError("Indique um título."); return; }
    setBusy(true);
    try {
      const client = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "");
      const user = await client.auth.getUser();
      if (!user.data.user) { setError("Inicie sessão para publicar."); return; }
      const result = await createClassifiedListing(client, {
        ownerId: user.data.user.id,
        listingType: listingType as any,
        purpose: purpose as any,
        title,
        description,
        price: price ? Number(price) : undefined,
        categoryId: categoryId || undefined,
        addressId: addressId || undefined,
        media: media.split("\n").map(v => v.trim()).filter(Boolean)
      });
      if (result.error) { setError(result.error.message); return; }
      router.push("/classificados/" + (result.data as any).id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível publicar o anúncio.");
    } finally {
      setBusy(false);
    }
  }

  return <main style={{maxWidth:760,margin:"0 auto",padding:32}}>
    <a href="/explorar">← Voltar</a>
    <h1>Publicar classificado</h1>
    <form onSubmit={submit} style={{display:"grid",gap:14}}>
      <label>Tipo<select value={listingType} onChange={e=>setListingType(e.target.value)}>
        <option value="classified">Classificado</option><option value="product">Produto</option><option value="vehicle">Veículo</option><option value="real_estate">Imóvel</option><option value="service">Serviço</option>
      </select></label>
      <label>Finalidade<select value={purpose} onChange={e=>setPurpose(e.target.value)}>
        <option value="sale">Venda</option><option value="rent">Arrendamento</option><option value="lease">Aluguer</option><option value="wanted">Procuro</option><option value="service">Serviço</option>
      </select></label>
      <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título"/>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descrição" rows={7}/>
      <input value={categoryId} onChange={e=>setCategoryId(e.target.value)} placeholder="ID da categoria (opcional)"/>
      <input value={addressId} onChange={e=>setAddressId(e.target.value)} placeholder="ID da localização (opcional)"/>
      <textarea value={media} onChange={e=>setMedia(e.target.value)} placeholder="URLs das imagens, uma por linha" rows={4}/>
      <input type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Preço em AOA"/>
      {error && <p>{error}</p>}
      <button type="submit" disabled={busy}>{busy ? "A publicar…" : "Publicar anúncio"}</button>
    </form>
  </main>;
}
const sections = [
  ["Negócios", "Empresas, lojas, escolas, clínicas, farmácias e oficinas."],
  ["Profissionais", "Advogados, contabilistas, professores, domésticas e outros especialistas."],
  ["Serviços", "Encontre e solicite serviços no Huambo."],
  ["Marketplace", "Produtos, lojas, vendedores e compras locais."],
  ["Classificados", "Anúncios de compra, venda e oportunidades."],
  ["B2B", "Fornecedores, empresas e pedidos comerciais."]
];

export default function ExplorarPage() {
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px" }}>
      <a href="/">← Huambo Online</a>
      <h1>Explorar</h1>
      <p>Escolha o que procura no ecossistema Huambo Online.</p>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginTop: 28 }}>
        {sections.map(([title, description]) => (
          <article key={title} style={{ border: "1px solid #ddd", borderRadius: 18, padding: 22 }}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
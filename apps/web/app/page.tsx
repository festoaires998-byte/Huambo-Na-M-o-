export default function Home() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <p>HUAMBO ONLINE</p>
      <h1>Encontre negócios, serviços e produtos no Huambo.</h1>
      <p>
        A fundação da plataforma está pronta para crescer em torno de empresas,
        profissionais, marketplace, B2B e logística.
      </p>
      <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {["Negócios", "Serviços", "Marketplace", "Classificados", "B2B"].map((item) => (
          <span key={item} style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: 12 }}>
            {item}
          </span>
        ))}
      </nav>
    </main>
  );
}

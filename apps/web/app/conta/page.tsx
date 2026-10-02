const capabilities = [
  ["Cliente", "Comprar, contratar e pedir serviços."],
  ["Profissional", "Oferecer os seus conhecimentos e serviços."],
  ["Vendedor", "Vender produtos no marketplace."],
  ["Empresa", "Representar uma empresa ou organização."]
];

export default function ContaPage() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <a href="/">← Huambo Online</a>
      <h1>A sua conta</h1>
      <p>Uma conta pode ter várias atividades. Não precisa criar contas diferentes para cada atividade.</p>
      <section style={{ display: "grid", gap: 12, marginTop: 28 }}>
        {capabilities.map(([title, description]) => (
          <article key={title} style={{ border: "1px solid #ddd", borderRadius: 16, padding: 20 }}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
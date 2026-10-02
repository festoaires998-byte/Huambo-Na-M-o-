import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Huambo Online",
  description: "Comércio, serviços e negócios do Huambo."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-AO">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}

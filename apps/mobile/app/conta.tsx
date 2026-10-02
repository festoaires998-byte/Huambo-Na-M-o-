import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const capabilities = [
  ["Cliente", "Comprar, contratar e pedir serviços."],
  ["Profissional", "Oferecer conhecimentos e serviços."],
  ["Vendedor", "Vender produtos."],
  ["Empresa", "Representar uma organização."]
];

export default function Conta() {
  return (
    <View style={styles.container}>
      <Link href="/" style={styles.back}>← Huambo Online</Link>
      <Text style={styles.title}>A sua conta</Text>
      <Text style={styles.subtitle}>Uma conta pode ter várias atividades.</Text>
      {capabilities.map(([title, description]) => (
        <View key={title} style={styles.card}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text>{description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, paddingTop: 54, gap: 12 },
  back: { fontWeight: "700", marginBottom: 8 },
  title: { fontSize: 34, fontWeight: "800" },
  subtitle: { fontSize: 17, marginBottom: 8 },
  card: { borderWidth: 1, borderColor: "#ddd", borderRadius: 16, padding: 18, gap: 6 },
  cardTitle: { fontSize: 19, fontWeight: "800" }
});
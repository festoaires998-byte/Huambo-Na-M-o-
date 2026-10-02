import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>HUAMBO ONLINE</Text>
      <Text style={styles.title}>Tudo o que o Huambo tem para oferecer.</Text>
      <Text style={styles.body}>Negócios, profissionais, produtos, serviços, marketplace e entregas num único ecossistema.</Text>
      <Link href="/explorar" style={styles.link}>Explorar</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, justifyContent: "center", gap: 16 },
  eyebrow: { fontSize: 13, fontWeight: "700", letterSpacing: 1 },
  title: { fontSize: 34, fontWeight: "800" },
  body: { fontSize: 17, lineHeight: 25 },
  link: { fontSize: 17, fontWeight: "700", marginTop: 8 }
});
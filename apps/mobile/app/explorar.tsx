import { Text, View } from "react-native";

export default function Explorar() {
  return (
    <View style={{ flex: 1, padding: 28, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>Explorar Huambo</Text>
      <Text>Negócios · Serviços · Marketplace · Classificados · B2B</Text>
    </View>
  );
}
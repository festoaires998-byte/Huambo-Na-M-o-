import { Link } from "expo-router";
import { StyleSheet,Text,View } from "react-native";
export default function Notificacoes(){return <View style={s.container}><Link href="/">← Huambo Online</Link><Text style={s.title}>Notificações</Text><Text>As notificações de pesquisas guardadas aparecerão aqui quando houver novos anúncios compatíveis.</Text></View>}
const s=StyleSheet.create({container:{flex:1,padding:28,gap:18},title:{fontSize:30,fontWeight:"800"}});
import { View, Text, Button } from "react-native";

export default function MenuScreen({ navigation }) {
    return (
        <View style={{ padding: 20, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Oficina Mecânica</Text>
            <Button title="Clientes" onPress={() =>
                navigation.navigate("ClienteList")
            } />
            <Button title="Cadastrar Clientes" onPress={() =>
                navigation.navigate("ClienteForm")
            } />
            {/* repita para Veículos, Funcionários, Serviços, Ordens de Serviço */}
        </View>
    );
}
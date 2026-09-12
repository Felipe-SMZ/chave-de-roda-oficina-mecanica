import { View, Text, Button } from "react-native";

export default function MenuScreen({ navigation }) {
    return (
        <View style={{ padding: 20, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>Oficina Mecânica</Text>
            <Button title="Clientes" onPress={() =>
                navigation.navigate("ClienteList")
            } />
            <Button title="Cadastrar Clientes" onPress={() =>
                navigation.navigate("ClienteForm")
            } />
            <Button title="Veículos" onPress={() =>
                navigation.navigate("VeiculoList")
            } />
            <Button title="Cadastrar Veículos" onPress={() =>
                navigation.navigate("VeiculoForm")
            } />
            <Button title="Funcionários" onPress={() =>
                navigation.navigate("FuncionarioList")
            } />
            <Button title="Cadastrar Funcionários" onPress={() =>
                navigation.navigate("FuncionarioForm")
            } />
            {/* repita para Veículos, Funcionários, Serviços, Ordens de Serviço */}
        </View>
    );
}
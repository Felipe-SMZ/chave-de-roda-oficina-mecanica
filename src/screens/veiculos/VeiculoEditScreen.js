import { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { atualizarVeiculo } from "../../services/veiculoService";
import { carregarClientes } from "../../services/clienteService";

export default function VeiculoEditScreen({ route, navigation }) {
    const { veiculo } = route.params;

    const [modelo, setModelo] = useState(veiculo.modelo);
    const [placa, setPlaca] = useState(veiculo.placa);
    const [ano, setAno] = useState(String(veiculo.ano));
    const [marca, setMarca] = useState(veiculo.marca);
    const [clienteId, setClienteId] = useState(veiculo.clientes_REF);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        carregarClientes().then((lista) => setClientes(lista));
    }, []);

    async function salvarEdicao() {
        try {
            await atualizarVeiculo(veiculo.id, {
                modelo,
                placa,
                ano: Number(ano),
                marca,
                clientes_REF: clienteId,
            });
            Alert.alert("Sucesso", "Veículo atualizado!");
            navigation.goBack();
        } catch (erro) {
            Alert.alert("Erro", erro.message);
        }
    }

    return (
        <View style={{ padding: 20, gap: 10 }}>
            <TextInput value={modelo} onChangeText={setModelo} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput value={placa} onChangeText={setPlaca} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput value={ano} onChangeText={setAno} style={{ borderWidth: 1, padding: 8 }} keyboardType="numeric" />
            <TextInput value={marca} onChangeText={setMarca} style={{ borderWidth: 1, padding: 8 }} />
            <Picker selectedValue={clienteId} onValueChange={setClienteId}>
                {clientes.map((cliente) => (
                    <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
                ))}
            </Picker>
            <Button title="Salvar alterações" onPress={salvarEdicao} />
        </View>
    );
}
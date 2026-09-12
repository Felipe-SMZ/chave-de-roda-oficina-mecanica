import { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { criarVeiculo } from "../../services/veiculoService";
import { carregarClientes } from "../../services/clienteService";

export default function VeiculoFormScreen({ navigation }) {
    const [modelo, setModelo] = useState("");
    const [placa, setPlaca] = useState("");
    const [ano, setAno] = useState("");
    const [marca, setMarca] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        carregarClientes().then((lista) => setClientes(lista));
    }, []);

    async function salvarVeiculo() {
        if (!modelo || !placa || !ano || !marca || !clienteId) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        try {
            await criarVeiculo({
                modelo,
                placa,
                ano: Number(ano),
                marca,
                clientes_REF: clienteId,
            });
            Alert.alert("Sucesso", "Veículo cadastrado com sucesso.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", error.message);
        }
    }

    return (
        <View style={{ padding: 20, gap: 10 }}>
            <TextInput placeholder="Modelo" value={modelo} onChangeText={setModelo} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Placa" value={placa} onChangeText={setPlaca} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Ano" value={ano} onChangeText={setAno} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} style={{ borderWidth: 1, padding: 8 }} />
            <Picker selectedValue={clienteId} onValueChange={setClienteId}>
                <Picker.Item label="Selecione um cliente" value="" />
                {clientes.map((cliente) => (
                    <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
                ))}
            </Picker>
            <Button title="Salvar" onPress={salvarVeiculo} />
        </View>
    );
}
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { criarVeiculo } from "../../services/veiculoService";
import { carregarClientes } from "../../services/clienteService";
import { formatarPlaca, capitalizarNome } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

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
                modelo: capitalizarNome(modelo),
                placa: formatarPlaca(placa),
                ano: Number(ano),
                marca: capitalizarNome(marca),
                clientes_REF: clienteId,
            });
            Alert.alert("Sucesso", "Veículo cadastrado com sucesso.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", error.message);
        }
    }

    return (
        <ScrollView style={estilosBase.container} contentContainerStyle={estilosBase.conteudo}>
            <View style={estilosBase.conteudoCentralizado}>
                <View>
                    <Text style={estilosBase.label}>Modelo</Text>
                    <TextInput value={modelo} onChangeText={setModelo} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Placa</Text>
                    <TextInput
                        value={placa}
                        onChangeText={(texto) => setPlaca(formatarPlaca(texto))}
                        style={estilosBase.input}
                    />
                </View>

                <View>
                    <Text style={estilosBase.label}>Ano</Text>
                    <TextInput value={ano} onChangeText={setAno} keyboardType="numeric" style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Marca</Text>
                    <TextInput value={marca} onChangeText={setMarca} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Cliente</Text>
                    <View style={estilosBase.pickerWrapper}>
                        <Picker selectedValue={clienteId} onValueChange={setClienteId} style={estilosBase.picker}>
                            <Picker.Item label="Selecione um cliente" value="" />
                            {clientes.map((cliente) => (
                                <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarVeiculo}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { atualizarVeiculo } from "../../services/veiculoService";
import { carregarClientes } from "../../services/clienteService";
import { formatarPlaca, capitalizarNome } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

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
                modelo: capitalizarNome(modelo),
                placa: formatarPlaca(placa),
                ano: Number(ano),
                marca: capitalizarNome(marca),
                clientes_REF: clienteId,
            });
            Alert.alert("Sucesso", "Veículo atualizado!");
            navigation.goBack();
        } catch (erro) {
            Alert.alert("Erro", erro.message);
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
                            {clientes.map((cliente) => (
                                <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarEdicao}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar alterações</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
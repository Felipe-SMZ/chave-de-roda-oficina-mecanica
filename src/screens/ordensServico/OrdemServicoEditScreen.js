import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { atualizarOrdemServico } from "../../services/ordemServicoService";
import { carregarFuncionarios } from "../../services/funcionarioService";
import { carregarServicos } from "../../services/servicoService";
import { carregarVeiculos } from "../../services/veiculoService";
import { paraNumeroDecimal } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

export default function OrdemServicoEditScreen({ route, navigation }) {
    const { ordem } = route.params;

    const [veiculoId, setVeiculoId] = useState(ordem.veiculos_REF);
    const [servicoId, setServicoId] = useState(ordem.servicos_REF);
    const [funcionarioId, setFuncionarioId] = useState(ordem.funcionarios_REF);
    const [data, setData] = useState(ordem.data);
    const [status, setStatus] = useState(ordem.status);
    const [valorTotal, setValor] = useState(String(ordem.valorTotal));
    const [veiculos, setVeiculos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        carregarVeiculos().then((lista) => setVeiculos(lista));
        carregarServicos().then((lista) => setServicos(lista));
        carregarFuncionarios().then((lista) => setFuncionarios(lista));
    }, []);

    async function salvarEdicao() {
        try {
            await atualizarOrdemServico(ordem.id, {
                veiculos_REF: veiculoId,
                servicos_REF: servicoId,
                funcionarios_REF: funcionarioId,
                data,
                status,
                valorTotal: paraNumeroDecimal(valorTotal),
            });
            Alert.alert("Sucesso", "Ordem de serviço atualizada!");
            navigation.goBack();
        } catch (erro) {
            Alert.alert("Erro", erro.message);
        }
    }

    return (
        <ScrollView style={estilosBase.container} contentContainerStyle={estilosBase.conteudo}>
            <View style={estilosBase.conteudoCentralizado}>
                <View>
                    <Text style={estilosBase.label}>Veículo</Text>
                    <View style={estilosBase.pickerWrapper}>
                        <Picker selectedValue={veiculoId} onValueChange={setVeiculoId} style={estilosBase.picker}>
                            {veiculos.map((veiculo) => (
                                <Picker.Item key={veiculo.id} label={`${veiculo.modelo} - ${veiculo.placa}`} value={veiculo.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={estilosBase.label}>Serviço</Text>
                    <View style={estilosBase.pickerWrapper}>
                        <Picker selectedValue={servicoId} onValueChange={setServicoId} style={estilosBase.picker}>
                            {servicos.map((servico) => (
                                <Picker.Item key={servico.id} label={servico.descricao} value={servico.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={estilosBase.label}>Funcionário</Text>
                    <View style={estilosBase.pickerWrapper}>
                        <Picker selectedValue={funcionarioId} onValueChange={setFuncionarioId} style={estilosBase.picker}>
                            {funcionarios.map((funcionario) => (
                                <Picker.Item key={funcionario.id} label={funcionario.nome} value={funcionario.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={estilosBase.label}>Data</Text>
                    <TextInput value={data} onChangeText={setData} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Status</Text>
                    <TextInput value={status} onChangeText={setStatus} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Valor Total</Text>
                    <TextInput
                        value={valorTotal}
                        onChangeText={setValor}
                        keyboardType="decimal-pad"
                        style={estilosBase.input}
                    />
                </View>

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarEdicao}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar alterações</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
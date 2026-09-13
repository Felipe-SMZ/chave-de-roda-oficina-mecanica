import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { criarOrdemServico } from "../../services/ordemServicoService";
import { carregarVeiculos } from "../../services/veiculoService";
import { carregarServicos } from "../../services/servicoService";
import { carregarFuncionarios } from "../../services/funcionarioService";
import { paraNumeroDecimal } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

export default function OrdemServicoFormScreen({ navigation }) {
    const [veiculoId, setVeiculoId] = useState("");
    const [servicoId, setServicoId] = useState("");
    const [funcionarioId, setFuncionarioId] = useState("");
    const [data, setData] = useState("");
    const [status, setStatus] = useState("");
    const [valorTotal, setValor] = useState("");
    const [veiculos, setVeiculos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        carregarVeiculos().then((lista) => setVeiculos(lista));
        carregarServicos().then((lista) => setServicos(lista));
        carregarFuncionarios().then((lista) => setFuncionarios(lista));
    }, []);

    async function salvarOrdemServico() {
        if (!veiculoId || !servicoId || !funcionarioId || !data || !status || !valorTotal) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        try {
            await criarOrdemServico({
                veiculos_REF: veiculoId,
                servicos_REF: servicoId,
                funcionarios_REF: funcionarioId,
                data,
                status,
                valorTotal: paraNumeroDecimal(valorTotal),
            });
            Alert.alert("Sucesso", "Ordem de serviço cadastrada com sucesso.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", error.message);
        }
    }

    return (
        <ScrollView style={estilosBase.container} contentContainerStyle={estilosBase.conteudo}>
            <View style={estilosBase.conteudoCentralizado}>
                <View>
                    <Text style={estilosBase.label}>Veículo</Text>
                    <View style={estilosBase.pickerWrapper}>
                        <Picker selectedValue={veiculoId} onValueChange={setVeiculoId} style={estilosBase.picker}>
                            <Picker.Item label="Selecione um veículo" value="" />
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
                            <Picker.Item label="Selecione um serviço" value="" />
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
                            <Picker.Item label="Selecione um funcionário" value="" />
                            {funcionarios.map((funcionario) => (
                                <Picker.Item key={funcionario.id} label={funcionario.nome} value={funcionario.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={estilosBase.label}>Data</Text>
                    <TextInput placeholder="DD/MM/AAAA" value={data} onChangeText={setData} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Status</Text>
                    <TextInput placeholder="Ex: Em andamento" value={status} onChangeText={setStatus} style={estilosBase.input} />
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

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarOrdemServico}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
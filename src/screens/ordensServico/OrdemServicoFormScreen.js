import { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { criarOrdemServico } from "../../services/ordemServicoService";
import { carregarVeiculos } from "../../services/veiculoService";
import { carregarServicos } from "../../services/servicoService";
import { carregarFuncionarios } from "../../services/funcionarioService";
import { paraNumeroDecimal } from "../../utils/formatters";

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
        <View style={{ padding: 20, gap: 10 }}>
            <Picker selectedValue={veiculoId} onValueChange={setVeiculoId}>
                <Picker.Item label="Selecione um veículo" value="" />
                {veiculos.map((veiculo) => (
                    <Picker.Item key={veiculo.id} label={veiculo.modelo} value={veiculo.id} />
                ))}
            </Picker>
            <Picker selectedValue={servicoId} onValueChange={setServicoId}>
                <Picker.Item label="Selecione um serviço" value="" />
                {servicos.map((servico) => (
                    <Picker.Item key={servico.id} label={servico.descricao} value={servico.id} />
                ))}
            </Picker>
            <Picker selectedValue={funcionarioId} onValueChange={setFuncionarioId}>
                <Picker.Item label="Selecione um funcionário" value="" />
                {funcionarios.map((funcionario) => (
                    <Picker.Item key={funcionario.id} label={funcionario.nome} value={funcionario.id} />
                ))}
            </Picker>
            <TextInput placeholder="Data" value={data} onChangeText={setData} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Status" value={status} onChangeText={setStatus} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Valor Total" value={valorTotal} onChangeText={setValor} keyboardType="numeric" style={{ borderWidth: 1, padding: 8 }} />

            <Button title="Salvar" onPress={salvarOrdemServico} />
        </View>
    );
}

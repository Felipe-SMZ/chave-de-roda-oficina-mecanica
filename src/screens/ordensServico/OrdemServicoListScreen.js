import { useCallback, useState } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { carregarOrdensServico, excluirOrdemServico } from "../../services/ordemServicoService";
import { carregarVeiculos } from "../../services/veiculoService";
import { carregarFuncionarios } from "../../services/funcionarioService";
import { carregarServicos } from "../../services/servicoService";



export default function OrdemServicoListScreen({ navigation }) {
    const [ordens, setOrdens] = useState([]);

    async function atualizarLista() {
        const [listaOrdens, listaVeiculos, listaFuncionarios, listaServicos] = await Promise.all([
            carregarOrdensServico(),
            carregarVeiculos(),
            carregarFuncionarios(),
            carregarServicos(),
        ]);

        const ordensCompletas = listaOrdens.map((ordem) => {
            const veiculo = listaVeiculos.find((v) => v.id === ordem.veiculos_REF);
            const funcionario = listaFuncionarios.find((f) => f.id === ordem.funcionarios_REF);
            const servico = listaServicos.find((s) => s.id === ordem.servicos_REF);

            return {
                ...ordem,
                veiculo,
                funcionario,
                servico,
            };
        });

        setOrdens(ordensCompletas);
    }

    useFocusEffect(
        useCallback(() => {
            atualizarLista();
        }, [])
    );

    async function handleExcluir(id) {
        await excluirOrdemServico(id);
        atualizarLista();
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={ordens}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12 }}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhuma ordem de serviço cadastrada.</Text>}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.nome}>{item.veiculo?.modelo}</Text>
                        <Text style={styles.nome}>{item.veiculo?.placa}</Text>
                        <Text style={styles.detalhe}>Funcionário: {item.funcionario?.nome}</Text>
                        <Text style={styles.detalhe}>Serviço: {item.servico?.descricao}</Text>
                        <Text style={styles.detalhe}>Data: {item.data}</Text>
                        <Text style={styles.detalhe}>Status: {item.status}</Text>
                        <Text style={styles.detalhe}>Valor Total: {item.valorTotal}</Text>
                        <View style={styles.acoes}>
                            <View style={styles.botaoWrapper}>
                                <Button title="Editar" onPress={() => navigation.navigate("OrdemServicoEdit", { ordem: item })} />
                            </View>
                            <View style={styles.botaoWrapper}>
                                <Button title="Excluir" color="#d11a2a" onPress={() => handleExcluir(item.id)} />
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f2f2f2",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 14,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    nome: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    detalhe: {
        fontSize: 13,
        color: "#666",
        marginBottom: 10,
    },
    acoes: {
        flexDirection: "row",
        gap: 8,
    },
    botaoWrapper: {
        flex: 1,
    },
    vazio: {
        textAlign: "center",
        color: "#999",
        marginTop: 40,
    },
});
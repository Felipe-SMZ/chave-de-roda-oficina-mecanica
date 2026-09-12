import { useCallback, useState } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { carregarFuncionarios, excluirFuncionario } from "../../services/funcionarioService";

export default function FuncionarioListScreen({ navigation }) {
    const [funcionarios, setFuncionarios] = useState([]);

    async function atualizarLista() {
        const lista = await carregarFuncionarios();
        setFuncionarios(lista);
    }

    useFocusEffect(
        useCallback(() => {
            atualizarLista();
        }, [])
    );

    async function handleExcluir(id) {
        await excluirFuncionario(id);
        atualizarLista();
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={funcionarios}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12 }}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhum funcionário cadastrado.</Text>}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.detalhe}>Cargo: {item.cargo}</Text>
                        <Text style={styles.detalhe}>Telefone: {item.telefone}</Text>
                        <Text style={styles.detalhe}>Admissão: {item.dataAdmissao}</Text>
                        <View style={styles.acoes}>
                            <View style={styles.botaoWrapper}>
                                <Button title="Editar" onPress={() => navigation.navigate("FuncionarioEdit", { funcionario: item })} />
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
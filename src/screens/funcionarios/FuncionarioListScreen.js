import { useCallback, useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { carregarFuncionarios, excluirFuncionario } from "../../services/funcionarioService";
import { estilosBase } from "../../styles/theme";
import InfoCard from "../../components/InfoCard";

// Configuração do grid responsivo 
const LARGURA_CARD_REFERENCIA = 340;
const MAX_COLUNAS = 4;
const LARGURA_MAXIMA_GRID = 1440;
const ESPACAMENTO = 16;
const PADDING_LATERAL = 20;

export default function FuncionarioListScreen({ navigation }) {
    const [funcionarios, setFuncionarios] = useState([]);
    const { width } = useWindowDimensions();

    const larguraUtil = Math.min(width, LARGURA_MAXIMA_GRID);
    const numColunas = Math.min(
        MAX_COLUNAS,
        Math.max(1, Math.floor(larguraUtil / LARGURA_CARD_REFERENCIA))
    );

    const larguraConteudo = larguraUtil - PADDING_LATERAL * 2;
    const larguraCard = (larguraConteudo - ESPACAMENTO * (numColunas - 1)) / numColunas;

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
        <View style={estilosBase.container}>
            <View style={{ width: "100%", maxWidth: LARGURA_MAXIMA_GRID, alignSelf: "center", flex: 1 }}>
                <View style={estilosBase.cabecalhoLista}>
                    <Text style={estilosBase.cabecalhoTitulo}>Funcionários</Text>
                    <Text style={estilosBase.cabecalhoContagem}>
                        {funcionarios.length} {funcionarios.length === 1 ? "cadastrado" : "cadastrados"}
                    </Text>
                </View>

                <FlatList
                    key={numColunas}
                    data={funcionarios}
                    keyExtractor={(item) => item.id}
                    numColumns={numColunas}
                    columnWrapperStyle={numColunas > 1 ? { gap: ESPACAMENTO } : undefined}
                    contentContainerStyle={{ padding: PADDING_LATERAL, gap: ESPACAMENTO }}
                    ListEmptyComponent={<Text style={estilosBase.listaVazia}>Nenhum funcionário cadastrado.</Text>}
                    renderItem={({ item }) => (
                        <InfoCard
                            titulo={item.nome}
                            width={larguraCard}
                            infoRows={[
                                { label: "Cargo", value: item.cargo },
                                { label: "Telefone", value: item.telefone },
                                { label: "Admissão", value: item.dataAdmissao },
                            ]}
                            acoes={[
                                { label: "Editar", onPress: () => navigation.navigate("FuncionarioEdit", { funcionario: item }) },
                                { label: "Excluir", variante: "perigo", onPress: () => handleExcluir(item.id) },
                            ]}
                        />
                    )}
                />
            </View>
        </View>
    );
}
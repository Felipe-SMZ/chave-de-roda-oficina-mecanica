import { useCallback, useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { carregarServicos, excluirServico } from "../../services/servicoService";
import { estilosBase } from "../../styles/theme";
import InfoCard from "../../components/InfoCard";

const LARGURA_CARD_REFERENCIA = 340;
const MAX_COLUNAS = 4;
const LARGURA_MAXIMA_GRID = 1440;
const ESPACAMENTO = 16;
const PADDING_LATERAL = 20;

export default function ServicoListScreen({ navigation }) {
    const [servicos, setServicos] = useState([]);
    const { width } = useWindowDimensions();

    const larguraUtil = Math.min(width, LARGURA_MAXIMA_GRID);
    const numColunas = Math.min(
        MAX_COLUNAS,
        Math.max(1, Math.floor(larguraUtil / LARGURA_CARD_REFERENCIA))
    );

    const larguraConteudo = larguraUtil - PADDING_LATERAL * 2;
    const larguraCard = (larguraConteudo - ESPACAMENTO * (numColunas - 1)) / numColunas;

    async function atualizarLista() {
        const listaServicos = await carregarServicos();
        setServicos(listaServicos);
    }

    useFocusEffect(
        useCallback(() => {
            atualizarLista();
        }, [])
    );

    async function handleExcluir(id) {
        await excluirServico(id);
        atualizarLista();
    }

    return (
        <View style={estilosBase.container}>
            <View style={{ width: "100%", maxWidth: LARGURA_MAXIMA_GRID, alignSelf: "center", flex: 1 }}>
                <View style={estilosBase.cabecalhoLista}>
                    <Text style={estilosBase.cabecalhoTitulo}>Serviços</Text>
                    <Text style={estilosBase.cabecalhoContagem}>
                        {servicos.length} {servicos.length === 1 ? "cadastrado" : "cadastrados"}
                    </Text>
                </View>

                <FlatList
                    key={numColunas}
                    data={servicos}
                    keyExtractor={(item) => item.id}
                    numColumns={numColunas}
                    columnWrapperStyle={numColunas > 1 ? { gap: ESPACAMENTO } : undefined}
                    contentContainerStyle={{ padding: PADDING_LATERAL, gap: ESPACAMENTO }}
                    ListEmptyComponent={<Text style={estilosBase.listaVazia}>Nenhum serviço cadastrado.</Text>}
                    renderItem={({ item }) => (
                        <InfoCard
                            titulo={item.descricao}
                            width={larguraCard}
                            infoRows={[
                                { label: "Categoria", value: item.categoria },
                                { label: "Valor Médio", value: `R$ ${Number(item.valorMedio).toFixed(2)}` },
                            ]}
                            acoes={[
                                { label: "Editar", onPress: () => navigation.navigate("ServicoEdit", { servico: item }) },
                                { label: "Excluir", variante: "perigo", onPress: () => handleExcluir(item.id) },
                            ]}
                        />
                    )}
                />
            </View>
        </View>
    );
}
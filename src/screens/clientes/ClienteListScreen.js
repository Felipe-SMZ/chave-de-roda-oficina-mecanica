import { useCallback, useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { carregarClientes, excluirCliente } from "../../services/clienteService";
import { estilosBase } from "../../styles/theme";
import InfoCard from "../../components/InfoCard";

// Configuração do grid responsivo.
const LARGURA_CARD_REFERENCIA = 340;
const MAX_COLUNAS = 4;
const LARGURA_MAXIMA_GRID = 1440;
const ESPACAMENTO = 16;
const PADDING_LATERAL = 20;

export default function ClienteListScreen({ navigation }) {
    const [clientes, setClientes] = useState([]);
    const { width } = useWindowDimensions();

    const larguraUtil = Math.min(width, LARGURA_MAXIMA_GRID);
    const numColunas = Math.min(
        MAX_COLUNAS,
        Math.max(1, Math.floor(larguraUtil / LARGURA_CARD_REFERENCIA))
    );

    // Largura fixa de cada card, calculada a partir do espaço disponível.
    // Isso evita que o último card de uma linha incompleta estique para preencher o espaço sozinho.
    const larguraConteudo = larguraUtil - PADDING_LATERAL * 2;
    const larguraCard = (larguraConteudo - ESPACAMENTO * (numColunas - 1)) / numColunas;

    async function atualizarLista() {
        const lista = await carregarClientes();
        setClientes(lista);
    }

    useFocusEffect(
        useCallback(() => {
            atualizarLista();
        }, [])
    );

    async function handleExcluir(id) {
        await excluirCliente(id);
        atualizarLista();
    }

    return (
        <View style={estilosBase.container}>
            <View style={{ width: "100%", maxWidth: LARGURA_MAXIMA_GRID, alignSelf: "center", flex: 1 }}>
                <View style={estilosBase.cabecalhoLista}>
                    <Text style={estilosBase.cabecalhoTitulo}>Clientes</Text>
                    <Text style={estilosBase.cabecalhoContagem}>
                        {clientes.length} {clientes.length === 1 ? "cadastrado" : "cadastrados"}
                    </Text>
                </View>

                <FlatList
                    key={numColunas} // recria o grid quando o número de colunas muda
                    data={clientes}
                    keyExtractor={(item) => item.id}
                    numColumns={numColunas}
                    columnWrapperStyle={numColunas > 1 ? { gap: ESPACAMENTO } : undefined}
                    contentContainerStyle={{ padding: PADDING_LATERAL, gap: ESPACAMENTO }}
                    ListEmptyComponent={<Text style={estilosBase.listaVazia}>Nenhum cliente cadastrado.</Text>}
                    renderItem={({ item }) => (
                        <InfoCard
                            titulo={item.nome}
                            width={larguraCard}
                            infoRows={[
                                { label: "Telefone", value: item.telefone },
                                { label: "Email", value: item.email },
                            ]}
                            acoes={[
                                { label: "Editar", onPress: () => navigation.navigate("ClienteEdit", { cliente: item }) },
                                { label: "Excluir", variante: "perigo", onPress: () => handleExcluir(item.id) },
                            ]}
                        />
                    )}
                />
            </View>
        </View>
    );
}
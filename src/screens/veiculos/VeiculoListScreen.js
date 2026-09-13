import { useCallback, useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { carregarVeiculos, excluirVeiculo } from "../../services/veiculoService";
import { carregarClientes } from "../../services/clienteService";
import { estilosBase } from "../../styles/theme";
import InfoCard from "../../components/InfoCard";

const LARGURA_CARD_REFERENCIA = 340;
const MAX_COLUNAS = 4;
const LARGURA_MAXIMA_GRID = 1440;
const ESPACAMENTO = 16;
const PADDING_LATERAL = 20;

export default function VeiculoListScreen({ navigation }) {
    const [veiculos, setVeiculos] = useState([]);
    const { width } = useWindowDimensions();

    const larguraUtil = Math.min(width, LARGURA_MAXIMA_GRID);
    const numColunas = Math.min(
        MAX_COLUNAS,
        Math.max(1, Math.floor(larguraUtil / LARGURA_CARD_REFERENCIA))
    );

    const larguraConteudo = larguraUtil - PADDING_LATERAL * 2;
    const larguraCard = (larguraConteudo - ESPACAMENTO * (numColunas - 1)) / numColunas;

    async function atualizarLista() {
        const [listaVeiculos, listaClientes] = await Promise.all([
            carregarVeiculos(),
            carregarClientes(),
        ]);

        const veiculosComDono = listaVeiculos.map((veiculo) => {
            const dono = listaClientes.find((cliente) => cliente.id === veiculo.clientes_REF);
            return {
                ...veiculo,
                nomeCliente: dono ? dono.nome : "Cliente não encontrado",
            };
        });

        setVeiculos(veiculosComDono);
    }

    useFocusEffect(
        useCallback(() => {
            atualizarLista();
        }, [])
    );

    async function handleExcluir(id) {
        await excluirVeiculo(id);
        atualizarLista();
    }

    return (
        <View style={estilosBase.container}>
            <View style={{ width: "100%", maxWidth: LARGURA_MAXIMA_GRID, alignSelf: "center", flex: 1 }}>
                <View style={estilosBase.cabecalhoLista}>
                    <Text style={estilosBase.cabecalhoTitulo}>Veículos</Text>
                    <Text style={estilosBase.cabecalhoContagem}>
                        {veiculos.length} {veiculos.length === 1 ? "cadastrado" : "cadastrados"}
                    </Text>
                </View>

                <FlatList
                    key={numColunas}
                    data={veiculos}
                    keyExtractor={(item) => item.id}
                    numColumns={numColunas}
                    columnWrapperStyle={numColunas > 1 ? { gap: ESPACAMENTO } : undefined}
                    contentContainerStyle={{ padding: PADDING_LATERAL, gap: ESPACAMENTO }}
                    ListEmptyComponent={<Text style={estilosBase.listaVazia}>Nenhum veículo cadastrado.</Text>}
                    renderItem={({ item }) => (
                        <InfoCard
                            titulo={`${item.modelo} - ${item.placa}`}
                            width={larguraCard}
                            infoRows={[
                                { label: "Ano", value: String(item.ano) },
                                { label: "Marca", value: item.marca },
                                { label: "Proprietário", value: item.nomeCliente },
                            ]}
                            acoes={[
                                { label: "Editar", onPress: () => navigation.navigate("VeiculoEdit", { veiculo: item }) },
                                { label: "Excluir", variante: "perigo", onPress: () => handleExcluir(item.id) },
                            ]}
                        />
                    )}
                />
            </View>
        </View>
    );
}
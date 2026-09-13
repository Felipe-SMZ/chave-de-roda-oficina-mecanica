import { useCallback, useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { carregarOrdensServico, excluirOrdemServico } from "../../services/ordemServicoService";
import { carregarVeiculos } from "../../services/veiculoService";
import { carregarFuncionarios } from "../../services/funcionarioService";
import { carregarServicos } from "../../services/servicoService";
import { estilosBase } from "../../styles/theme";
import InfoCard from "../../components/InfoCard";

// Configuração do grid responsivo (mesmo padrão usado nas outras listagens).
const LARGURA_CARD_REFERENCIA = 340;
const MAX_COLUNAS = 4;
const LARGURA_MAXIMA_GRID = 1440;
const ESPACAMENTO = 16;
const PADDING_LATERAL = 20;

export default function OrdemServicoListScreen({ navigation }) {
    const [ordens, setOrdens] = useState([]);
    const { width } = useWindowDimensions();

    const larguraUtil = Math.min(width, LARGURA_MAXIMA_GRID);
    const numColunas = Math.min(
        MAX_COLUNAS,
        Math.max(1, Math.floor(larguraUtil / LARGURA_CARD_REFERENCIA))
    );

    const larguraConteudo = larguraUtil - PADDING_LATERAL * 2;
    const larguraCard = (larguraConteudo - ESPACAMENTO * (numColunas - 1)) / numColunas;

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
        <View style={estilosBase.container}>
            <View style={{ width: "100%", maxWidth: LARGURA_MAXIMA_GRID, alignSelf: "center", flex: 1 }}>
                <View style={estilosBase.cabecalhoLista}>
                    <Text style={estilosBase.cabecalhoTitulo}>Ordens de Serviço</Text>
                    <Text style={estilosBase.cabecalhoContagem}>
                        {ordens.length} {ordens.length === 1 ? "registrada" : "registradas"}
                    </Text>
                </View>

                <FlatList
                    key={numColunas}
                    data={ordens}
                    keyExtractor={(item) => item.id}
                    numColumns={numColunas}
                    columnWrapperStyle={numColunas > 1 ? { gap: ESPACAMENTO } : undefined}
                    contentContainerStyle={{ padding: PADDING_LATERAL, gap: ESPACAMENTO }}
                    ListEmptyComponent={<Text style={estilosBase.listaVazia}>Nenhuma ordem de serviço cadastrada.</Text>}
                    renderItem={({ item }) => (
                        <InfoCard
                            titulo={item.veiculo ? `${item.veiculo.modelo} - ${item.veiculo.placa}` : "Veículo não encontrado"}
                            width={larguraCard}
                            infoRows={[
                                { label: "Funcionário", value: item.funcionario?.nome ?? "—" },
                                { label: "Serviço", value: item.servico?.descricao ?? "—" },
                                { label: "Data", value: item.data },
                                { label: "Status", value: item.status },
                                { label: "Valor Total", value: `R$ ${Number(item.valorTotal).toFixed(2)}` },
                            ]}
                            acoes={[
                                { label: "Editar", onPress: () => navigation.navigate("OrdemServicoEdit", { ordem: item }) },
                                { label: "Excluir", variante: "perigo", onPress: () => handleExcluir(item.id) },
                            ]}
                        />
                    )}
                />
            </View>
        </View>
    );
}
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { atualizarServico } from "../../services/servicoService";
import { capitalizarNome, paraNumeroDecimal } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

export default function ServicoEditScreen({ route, navigation }) {
    const { servico } = route.params;
    const [descricao, setDescricao] = useState(servico.descricao);
    const [categoria, setCategoria] = useState(servico.categoria);
    const [valorMedio, setValorMedio] = useState(String(servico.valorMedio));

    async function salvarEdicao() {
        try {
            await atualizarServico(servico.id, {
                descricao: capitalizarNome(descricao),
                categoria: capitalizarNome(categoria),
                valorMedio: paraNumeroDecimal(valorMedio),
            });
            Alert.alert("Sucesso", "Serviço atualizado!");
            navigation.goBack();
        } catch (erro) {
            Alert.alert("Erro", erro.message);
        }
    }

    return (
        <ScrollView style={estilosBase.container} contentContainerStyle={estilosBase.conteudo}>
            <View style={estilosBase.conteudoCentralizado}>
                <View>
                    <Text style={estilosBase.label}>Descrição</Text>
                    <TextInput value={descricao} onChangeText={setDescricao} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Categoria</Text>
                    <TextInput value={categoria} onChangeText={setCategoria} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Valor Médio</Text>
                    <TextInput
                        value={valorMedio}
                        onChangeText={setValorMedio}
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
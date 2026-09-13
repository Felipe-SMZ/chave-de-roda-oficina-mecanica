import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { criarServico } from "../../services/servicoService";
import { capitalizarNome, paraNumeroDecimal } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

export default function ServicoFormScreen({ navigation }) {
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [valorMedio, setValorMedio] = useState("");

    async function salvarServico() {
        if (!descricao || !categoria || !valorMedio) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        try {
            await criarServico({
                descricao: capitalizarNome(descricao),
                categoria: capitalizarNome(categoria),
                valorMedio: paraNumeroDecimal(valorMedio),
            });
            Alert.alert("Sucesso", "Serviço cadastrado!");
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

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarServico}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
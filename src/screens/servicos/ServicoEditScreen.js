import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { atualizarServico } from "../../services/servicoService";
import { capitalizarNome, paraNumeroDecimal } from "../../utils/formatters";


export default function ServicoEditScreen({ route, navigation }) {
    const { servico } = route.params; // dado recebido da tela de listagem
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
        <View style={{ padding: 20, gap: 10 }}>
            <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Categoria" value={categoria} onChangeText={setCategoria} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput
                placeholder="Valor Médio"
                value={valorMedio}
                onChangeText={setValorMedio}
                keyboardType="decimal-pad"
                style={{ borderWidth: 1, padding: 8 }}
            />
            <Button title="Salvar Alterações" onPress={salvarEdicao} />
        </View>
    );
}
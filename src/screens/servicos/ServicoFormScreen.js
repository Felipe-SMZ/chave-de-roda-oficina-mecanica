import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { criarServico } from "../../services/servicoService";
import { capitalizarNome, paraNumeroDecimal } from "../../utils/formatters";

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
            <Button title="Salvar" onPress={salvarServico} />
        </View>
    );
}

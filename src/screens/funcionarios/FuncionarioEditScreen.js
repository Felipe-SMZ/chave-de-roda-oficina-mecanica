import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { atualizarFuncionario } from "../../services/funcionarioService";
import { capitalizarNome, formatarTelefone } from "../../utils/formatters";

export default function FuncionarioEditScreen({ route, navigation }) {
    const { funcionario } = route.params; // dado recebido da tela de listagem
    const [nome, setNome] = useState(funcionario.nome);
    const [cargo, setCargo] = useState(funcionario.cargo);
    const [telefone, setTelefone] = useState(funcionario.telefone);
    const [dataAdmissao, setDataAdmissao] = useState(funcionario.dataAdmissao);


    async function salvarEdicao() {
        try {
            await atualizarFuncionario(funcionario.id, {
                nome: capitalizarNome(nome),
                cargo: capitalizarNome(cargo),
                telefone: formatarTelefone(telefone),
                dataAdmissao,
            });
            Alert.alert("Sucesso", "Funcionário atualizado!");
            navigation.goBack();
        } catch (erro) {
            Alert.alert("Erro", erro.message);
        }
    }

    return (
        <View style={{ padding: 20, gap: 10 }}>
            <TextInput value={nome} onChangeText={setNome} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput
                placeholder="Telefone"
                value={telefone}
                onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 8 }}
            />
            <TextInput value={cargo} onChangeText={setCargo} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput value={dataAdmissao} onChangeText={setDataAdmissao} style={{ borderWidth: 1, padding: 8 }} />
            <Button title="Salvar alterações" onPress={salvarEdicao} />
        </View>
    );
}
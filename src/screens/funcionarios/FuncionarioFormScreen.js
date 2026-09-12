import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { criarFuncionario } from "../../services/funcionarioService";
import { capitalizarNome, formatarTelefone } from "../../utils/formatters";

export default function FuncionarioFormScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [cargo, setCargo] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataAdmissao, setDataAdmissao] = useState("");

    async function salvarFuncionario() {
        if (!nome || !cargo || !telefone || !dataAdmissao) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        try {
            await criarFuncionario({
                nome: capitalizarNome(nome),
                cargo: capitalizarNome(cargo),
                telefone: formatarTelefone(telefone),
                dataAdmissao,
            });
            Alert.alert("Sucesso", "Funcionário cadastrado!");
            navigation.goBack();
        } catch (erro) {
            Alert.alert("Erro", erro.message);
        }
    }

    return (
        <View style={{ padding: 20, gap: 10 }}>
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Cargo" value={cargo} onChangeText={setCargo} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput
                placeholder="Telefone"
                value={telefone}
                onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 8 }}
            />
            <TextInput placeholder="Data de Admissão (DD/MM/AAAA)"
                value={dataAdmissao}
                onChangeText={setDataAdmissao}
                style={{ borderWidth: 1, padding: 8 }}
                keyboardType="numeric" />
            <Button title="Salvar" onPress={salvarFuncionario} />
        </View>
    );
}
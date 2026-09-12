import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { atualizarCliente } from "../../services/clienteService";
import { capitalizarNome, formatarTelefone } from "../../utils/formatters";

export default function ClienteEditScreen({ route, navigation }) {
    const { cliente } = route.params; // dado recebido da tela de listagem
    const [nome, setNome] = useState(cliente.nome);
    const [telefone, setTelefone] = useState(cliente.telefone);
    const [email, setEmail] = useState(cliente.email);

    async function salvarEdicao() {
        try {
            await atualizarCliente(cliente.id, {
                nome: capitalizarNome(nome),
                telefone: formatarTelefone(telefone),
                email: email.trim().toLowerCase(),
            });
            Alert.alert("Sucesso", "Cliente atualizado!");
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
            <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 8 }} />
            <Button title="Salvar alterações" onPress={salvarEdicao} />
        </View>
    );
}
import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { criarCliente } from "../../services/clienteService";
import { capitalizarNome, formatarTelefone, emailValido } from "../../utils/formatters";

export default function ClienteFormScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    async function salvarCliente() {

        if (!emailValido(email)) {
            Alert.alert("Email inválido", "Digite um email no formato nome@dominio.com");
            return;
        }

        try {
            await criarCliente({
                nome: capitalizarNome(nome),
                telefone: formatarTelefone(telefone),
                email: email.trim().toLowerCase(),
            });
            Alert.alert("Sucesso", "Cliente cadastrado!");
            navigation.goBack();
        } catch (erro) {
            Alert.alert("Erro", erro.message);
        }
    }

    return (
        <View style={{ padding: 20, gap: 10 }}>
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput
                placeholder="Telefone"
                value={telefone}
                onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 8 }}
            />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 8 }} />
            <Button title="Salvar" onPress={salvarCliente} />
        </View>
    );
}
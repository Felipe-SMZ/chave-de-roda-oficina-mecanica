import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

export default function ClienteFormScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    async function salvarCliente() {
        try {
            await addDoc(collection(db, "clientes"), {
                nome,
                telefone,
                email,
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
            <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={{ borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 8 }} />
            <Button title="Salvar" onPress={salvarCliente} />
        </View>
    );
}
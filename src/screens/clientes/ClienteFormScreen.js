import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { criarCliente } from "../../services/clienteService";
import { capitalizarNome, formatarTelefone, emailValido } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

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
        <ScrollView style={estilosBase.container} contentContainerStyle={estilosBase.conteudo}>
            <View style={estilosBase.conteudoCentralizado}>
                <View>
                    <Text style={estilosBase.label}>Nome</Text>
                    <TextInput value={nome} onChangeText={setNome} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Telefone</Text>
                    <TextInput
                        value={telefone}
                        onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
                        keyboardType="numeric"
                        style={estilosBase.input}
                    />
                </View>

                <View>
                    <Text style={estilosBase.label}>Email</Text>
                    <TextInput value={email} onChangeText={setEmail} style={estilosBase.input} />
                </View>

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarCliente}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
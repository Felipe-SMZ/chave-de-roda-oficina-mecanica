import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { atualizarCliente } from "../../services/clienteService";
import { capitalizarNome, formatarTelefone } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

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

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarEdicao}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar alterações</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
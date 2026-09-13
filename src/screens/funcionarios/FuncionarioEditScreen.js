import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { atualizarFuncionario } from "../../services/funcionarioService";
import { capitalizarNome, formatarTelefone } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

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
        <ScrollView style={estilosBase.container} contentContainerStyle={estilosBase.conteudo}>
            <View style={estilosBase.conteudoCentralizado}>
                <View>
                    <Text style={estilosBase.label}>Nome</Text>
                    <TextInput value={nome} onChangeText={setNome} style={estilosBase.input} />
                </View>

                <View>
                    <Text style={estilosBase.label}>Cargo</Text>
                    <TextInput value={cargo} onChangeText={setCargo} style={estilosBase.input} />
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
                    <Text style={estilosBase.label}>Data de Admissão (DD/MM/AAAA)</Text>
                    <TextInput
                        value={dataAdmissao}
                        onChangeText={setDataAdmissao}
                        keyboardType="numeric"
                        style={estilosBase.input}
                    />
                </View>

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarEdicao}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar alterações</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
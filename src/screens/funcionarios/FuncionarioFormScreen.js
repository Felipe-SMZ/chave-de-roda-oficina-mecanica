import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { criarFuncionario } from "../../services/funcionarioService";
import { capitalizarNome, formatarTelefone } from "../../utils/formatters";
import { estilosBase } from "../../styles/theme";

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

                <TouchableOpacity style={estilosBase.botaoPreenchido} onPress={salvarFuncionario}>
                    <Text style={estilosBase.textoBotaoPreenchido}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
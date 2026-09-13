import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const SECOES = [
    { titulo: "Clientes", listRoute: "ClienteList", formRoute: "ClienteForm" },
    { titulo: "Veículos", listRoute: "VeiculoList", formRoute: "VeiculoForm" },
    { titulo: "Funcionários", listRoute: "FuncionarioList", formRoute: "FuncionarioForm" },
    { titulo: "Serviços", listRoute: "ServicoList", formRoute: "ServicoForm" },
    { titulo: "Ordens de Serviço", listRoute: "OrdemServicoList", formRoute: "OrdemServicoForm" },
];

export default function MenuScreen({ navigation }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
            <View style={styles.conteudoCentralizado}>
                <Text style={styles.titulo}>Chave de Roda</Text>
                <Text style={styles.subtitulo}>Oficina Mecânica</Text>

                {SECOES.map((secao, index) => (
                    <View
                        key={secao.titulo}
                        style={[styles.secao, index === SECOES.length - 1 && styles.ultimaSecao]}
                    >
                        <Text style={styles.secaoTitulo}>{secao.titulo}</Text>
                        <View style={styles.linhaBotoes}>
                            <TouchableOpacity
                                style={styles.botaoContorno}
                                onPress={() => navigation.navigate(secao.listRoute)}
                            >
                                <Text style={styles.textoContorno}>Listar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botaoPreenchido}
                                onPress={() => navigation.navigate(secao.formRoute)}
                            >
                                <Text style={styles.textoPreenchido}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const COR_FUNDO = "#f7f6f3";
const COR_TEXTO = "#2b2b2b";
const COR_TEXTO_SUAVE = "#8a8a86";
const COR_ACENTO = "#a8461c";
const COR_LINHA = "#e3e0da";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COR_FUNDO,
    },
    conteudo: {
        padding: 24,
        paddingBottom: 40,
        alignItems: "center",
    },
    conteudoCentralizado: {
        width: "100%",
        maxWidth: 420,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        color: COR_TEXTO,
    },
    subtitulo: {
        fontSize: 13,
        color: COR_TEXTO_SUAVE,
        textAlign: "center",
        marginBottom: 28,
        letterSpacing: 0.3,
    },
    secao: {
        paddingBottom: 18,
        marginBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: COR_LINHA,
    },
    ultimaSecao: {
        borderBottomWidth: 0,
        marginBottom: 0,
    },
    secaoTitulo: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 10,
        color: COR_TEXTO,
    },
    linhaBotoes: {
        flexDirection: "row",
        gap: 10,
    },
    botaoContorno: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#c9c5bd",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    textoContorno: {
        color: COR_TEXTO,
        fontWeight: "600",
        fontSize: 14,
    },
    botaoPreenchido: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: 5,
        backgroundColor: COR_ACENTO,
        alignItems: "center",
    },
    textoPreenchido: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
});
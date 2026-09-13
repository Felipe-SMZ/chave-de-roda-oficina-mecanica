// src/styles/theme.js
// Paleta e estilos compartilhados do app "Chave de Roda".
// Centralizar aqui evita repetir as mesmas cores/valores em cada tela.

export const cores = {
    fundo: "#f7f6f3",
    texto: "#2b2b2b",
    textoSuave: "#8a8a86",
    acento: "#a8461c",
    linha: "#e3e0da",
    bordaInput: "#c9c5bd",
    perigo: "#8c3a2b",
    cardFundo: "#ffffff",
};

export const estilosBase = {
    container: {
        flex: 1,
        backgroundColor: cores.fundo,
    },
    conteudo: {
        padding: 20,
        paddingBottom: 40,
        alignItems: "center",
    },
    conteudoCentralizado: {
        width: "100%",
        maxWidth: 420,
        gap: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: cores.texto,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: cores.bordaInput,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fff",
        color: cores.texto,
    },
    botaoPreenchido: {
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: cores.acento,
        alignItems: "center",
        marginTop: 6,
    },
    textoBotaoPreenchido: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    botaoContorno: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: cores.bordaInput,
        alignItems: "center",
    },
    textoContorno: {
        color: cores.texto,
        fontWeight: "600",
        fontSize: 14,
    },
    botaoPerigo: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: cores.perigo,
        alignItems: "center",
    },
    textoPerigo: {
        color: cores.perigo,
        fontWeight: "600",
        fontSize: 14,
    },
    card: {
        backgroundColor: cores.cardFundo,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: cores.linha,
        borderLeftWidth: 4,
        borderLeftColor: cores.acento,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    cardTitulo: {
        fontSize: 19,
        fontWeight: "700",
        color: cores.texto,
        marginBottom: 10,
    },
    cardInfoLinha: {
        flexDirection: "row",
        marginBottom: 6,
    },
    cardInfoLabel: {
        fontSize: 13,
        color: cores.textoSuave,
        width: 90,
    },
    cardInfoValor: {
        fontSize: 13,
        color: cores.texto,
        fontWeight: "500",
        flex: 1,
    },
    cardDetalhe: {
        fontSize: 13,
        color: cores.textoSuave,
        marginBottom: 10,
    },
    linhaAcoes: {
        flexDirection: "row",
        gap: 10,
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: cores.linha,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: cores.bordaInput,
        borderRadius: 5,
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    picker: {
        height: 44,
    },
    cabecalhoLista: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 4,
    },
    cabecalhoTitulo: {
        fontSize: 22,
        fontWeight: "700",
        color: cores.texto,
    },
    cabecalhoContagem: {
        fontSize: 13,
        color: cores.textoSuave,
        marginTop: 2,
    },
    listaVazia: {
        textAlign: "center",
        color: cores.textoSuave,
        marginTop: 40,
    },
};
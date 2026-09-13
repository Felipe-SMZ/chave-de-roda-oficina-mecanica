import { View, Text, TouchableOpacity } from "react-native";
import { estilosBase } from "../styles/theme";

export default function InfoCard({ titulo, infoRows, acoes, width }) {
    return (
        <View style={[estilosBase.card, width ? { width } : { flex: 1 }]}>
            <Text style={estilosBase.cardTitulo}>{titulo}</Text>

            {infoRows.map((linha) => (
                <View key={linha.label} style={estilosBase.cardInfoLinha}>
                    <Text style={estilosBase.cardInfoLabel}>{linha.label}</Text>
                    <Text style={estilosBase.cardInfoValor}>{linha.value}</Text>
                </View>
            ))}

            <View style={estilosBase.linhaAcoes}>
                {acoes.map((acao) => (
                    <TouchableOpacity
                        key={acao.label}
                        style={acao.variante === "perigo" ? estilosBase.botaoPerigo : estilosBase.botaoContorno}
                        onPress={acao.onPress}
                    >
                        <Text style={acao.variante === "perigo" ? estilosBase.textoPerigo : estilosBase.textoContorno}>
                            {acao.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
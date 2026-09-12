import { useEffect, useState } from "react";
import { View, FlatList, Text, Button } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

export default function ClienteListScreen({ navigation }) {
    const [clientes, setClientes] = useState([]);

    async function carregarClientes() {
        const snapshot = await getDocs(collection(db, "clientes"));
        const lista = snapshot.docs.map((documento) => ({
            id: documento.id,
            ...documento.data(),
        }));
        setClientes(lista);
    }

    useEffect(() => {
        carregarClientes();
    }, []);

    async function excluirCliente(id) {
        await deleteDoc(doc(db, "clientes", id));
        carregarClientes(); 
    }

    return (
        <View style={{ padding: 20 }}>
            <FlatList
                data={clientes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 12, borderBottomWidth: 1, paddingBottom: 8 }}>
                        <Text>{item.nome} — {item.telefone}</Text>
                        <Button title="Editar" onPress={() => navigation.navigate("ClienteEdit", { cliente: item })} />
                        <Button title="Excluir" color="red" onPress={() => excluirCliente(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}
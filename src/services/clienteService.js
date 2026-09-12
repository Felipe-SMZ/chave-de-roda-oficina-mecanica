import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function carregarClientes() {
    const snapshot = await getDocs(collection(db, "clientes"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function criarCliente(dados) {
    return addDoc(collection(db, "clientes"), dados);
}

export async function atualizarCliente(id, dados) {
    return updateDoc(doc(db, "clientes", id), dados);
}

export async function excluirCliente(id) {
    return deleteDoc(doc(db, "clientes", id));
}
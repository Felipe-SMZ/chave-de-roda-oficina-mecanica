import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function carregarFuncionarios() {
    const snapshot = await getDocs(collection(db, "funcionarios"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function criarFuncionario(dados) {
    return addDoc(collection(db, "funcionarios"), dados);
}

export async function atualizarFuncionario(id, dados) {
    return updateDoc(doc(db, "funcionarios", id), dados);
}

export async function excluirFuncionario(id) {
    return deleteDoc(doc(db, "funcionarios", id));
}
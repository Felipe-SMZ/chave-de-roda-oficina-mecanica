import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function carregarServicos() {
    const snapshot = await getDocs(collection(db, "servicos"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function criarServico(dados) {
    return addDoc(collection(db, "servicos"), dados);
}

export async function atualizarServico(id, dados) {
    return updateDoc(doc(db, "servicos", id), dados);
}

export async function excluirServico(id) {
    return deleteDoc(doc(db, "servicos", id));
}
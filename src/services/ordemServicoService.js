import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function carregarOrdensServico() {
    const snapshot = await getDocs(collection(db, "ordensServico"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function criarOrdemServico(dados) {
    return addDoc(collection(db, "ordensServico"), dados);
}

export async function atualizarOrdemServico(id, dados) {
    return updateDoc(doc(db, "ordensServico", id), dados);
}

export async function excluirOrdemServico(id) {
    return deleteDoc(doc(db, "ordensServico", id));
}
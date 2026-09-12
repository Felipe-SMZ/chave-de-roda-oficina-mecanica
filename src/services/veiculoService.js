import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function carregarVeiculos() {
    const snapshot = await getDocs(collection(db, "veiculos"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function criarVeiculo(dados) {
    return addDoc(collection(db, "veiculos"), dados);
}

export async function atualizarVeiculo(id, dados) {
    return updateDoc(doc(db, "veiculos", id), dados);
}

export async function excluirVeiculo(id) {
    return deleteDoc(doc(db, "veiculos", id));
}
export function formatarPlaca(placa) {
    // remove tudo que não for letra ou número, e deixa maiúsculo
    return placa.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

export function capitalizarNome(nome) {
    return nome
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((palavra) => palavra.length > 0)
        .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(" ");
}

export function formatarTelefone(telefone) {
    return telefone.replace(/\D/g, "");
}

export function emailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
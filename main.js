const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem(itens)) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = e.target.elements["nome"];
    const quantidade = e.target.elements["quantidade"];
    
    criaElemento(nome.value, quantidade.value);
    
    nome.value = "";
    quantidade.value = "";
})

function criaElemento(nome, quantidade) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");
    
    const quantidadeItem = document.createElement("strong");
    quantidadeItem.innerHTML = quantidade;
    
    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += nome;
    
    lista.appendChild(novoItem);

    const itemAtual = {
        "nome" : nome,
        "quantidade" : quantidade
    }

    itens.push(itemAtual);

    localStorage.setItem("itens", JSON.stringify(itens));

}
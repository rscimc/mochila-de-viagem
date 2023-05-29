const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(element => {
    criaElemento(element)
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = e.target.elements["nome"];
    const quantidade = e.target.elements["quantidade"];
    
    const itemAtual = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    criaElemento(itemAtual);

    itens.push(itemAtual);

    localStorage.setItem("itens", JSON.stringify(itens));

    
    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");
    
    const quantidadeItem = document.createElement("strong");
    quantidadeItem.innerHTML = item.quantidade;
    
    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += item.nome;
    
    lista.appendChild(novoItem);
}
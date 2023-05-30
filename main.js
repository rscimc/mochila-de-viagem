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
    const existe = itens.find(element => element.nome === nome.value);

    const itemAtual = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    if(existe) {
        itemAtual.id = existe.id;
        itens[itemAtual.id] = itemAtual;
        console.log(itens);
        atualizaElemento(itemAtual);
    } else {
        itemAtual.id = itens.length;
        criaElemento(itemAtual);
    
        itens.push(itemAtual);
    }


    localStorage.setItem("itens", JSON.stringify(itens));

    
    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");
    
    const quantidadeItem = document.createElement("strong");
    quantidadeItem.innerHTML = item.quantidade;
    quantidadeItem.dataset.id = item.id;
    
    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += item.nome;
    
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    const alteraItem = document.querySelector("[data-id='"+item.id+"']");
    alteraItem.innerHTML = item.quantidade;
}
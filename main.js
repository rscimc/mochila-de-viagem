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
        
        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
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

    novoItem.appendChild(botaoDeleta(item.id));
    
    lista.appendChild(novoItem);

}

function atualizaElemento(item) {
    const alteraItem = document.querySelector("[data-id='"+item.id+"']");
    alteraItem.innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";
    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento(item, id) {
    item.remove(item);
    
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}
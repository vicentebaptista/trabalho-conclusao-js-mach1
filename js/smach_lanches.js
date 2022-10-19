let listaProdutos = [
    {
        codigo: 1001,
        produto: "Super SMACH COMBO Programado - Hamburguer + fritas",
        preco: 55.00
    },
    {
        codigo: 1002,
        produto: "SMACH VariavelBurguer - Hambúrguer com bacon",
        preco: 45.00
    },
    {
        codigo: 1003,
        produto: "SMACH BUG EM PROD - Hambúrguer meio torto",
        preco: 25.00
    },
    {
        codigo: 1004,
        produto: "Combo Econômico SMACH Char 1 - Pão com carne",
        preco: 15.00
    },
    {
        codigo: 1005,
        produto: "Especial SMACH CSS - Hambúrguer colorido e alinhado",
        preco: 65.00
    },
    {
        codigo: 2001,
        produto: "Refrigerante 350ml",
        preco: 8.00
    },
    {
        codigo: 2002,
        produto: "Água 500ml",
        preco: 5.00
    },
    {
        codigo: 2003,
        produto: "Suco 350ml",
        preco: 7.00
    },
    {
        codigo: 3001,
        produto: "Sorvete 300ml",
        preco: 15.00
    },
    {
        codigo: 3002,
        produto: "Sobremesa doce SMACH ARRAY",
        preco: 50.00
    }
];
let codInserido = document.getElementById('product_code_input');
let btnPesquisarProduto = document.getElementById('button_search');
let campoQuantidade = document.getElementById('product_qty_input');
let campoProductName = document.getElementById('product_name_output');
let campoProductPrice = document.getElementById('product_price_output');
let btnAddProduct = document.getElementById('button_add_product');
let btnCancel = document.getElementById('button_orders_cancel');
let btnNewOrder = document.getElementById('button_new_order');
let btnSave = document.getElementById('button_order_save');
let blankImg = document.getElementById('no_order_img');
let erro = document.getElementById('erro');
let addedItems = document.getElementById('items');
let totalPedido = document.getElementById('total_amount');
let savedOrder = document.getElementById('order_items');
let sessao1 = document.getElementById('sessao1');
let sessao2 = document.getElementById('sessao2');
let filtroTipo = document.getElementById('filter_type');
let filterStatus = document.getElementById('filter_status');
let formFilter = document.getElementById('form_filter');
let campoOptions = document.getElementById('options');
let btnEdit = document.getElementById('edit');
let btnRemove = document.getElementById('remove');
let nPedido = Math.floor(Math.random() * 5000);
let arraypedidoitens = [];



let arrPedido = [];
let arrEditar = [];
let arrFiltro = [];
function funcaoNovoPedido() {
    sessao1.setAttribute("class", "inactive");
    sessao2.setAttribute("class", "active");
    addedItems.innerHTML = `<tr>
                                <th>Código</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor</th>
                            </tr>`;
    totalPedido.innerHTML = "";
}


function funcaoPesquisarProduto() {
    let codigoproduto = codInserido.value;
    let filtrado = listaProdutos.filter(function filtraitem(item) {
        return item.codigo == codigoproduto;
    })
    let produtoFiltrado = filtrado.map(function (item) {
        return item.produto
    })
    let precoFiltrado = filtrado.map(function (item) {
        return item.preco
    })
    if (filtrado.length === 0) {
        erro.innerHTML = `Nenhum item encontrado`;
        campoProductName.value = "";
        campoProductPrice.value = "";
    } else {
        erro.innerHTML = "";
        campoProductName.value = produtoFiltrado;
        campoProductPrice.value = `R$${precoFiltrado},00`;
        btnAddProduct.removeAttribute("disabled");
    }

};

function funcaoAdicionarProduto() {
    let codigoproduto = codInserido.value;
    let quantidadeItem = campoQuantidade.value;
    let campoProduto = campoProductName.value;
    let campoPreco = campoProductPrice.value;
    if (quantidadeItem.length === 0) {
        erro.innerHTML = `Quantidade não inserida` // verifica se foi inserida a quantidade de intens para adicionar ao pedido
    } else { // daqui pra baixo vai adicionar os itens na tabela do HTML
        let precoFinal = parseFloat(campoPreco.replace('R$', "")) * parseFloat(quantidadeItem);
        arraypedidoitens.push({
            codigo: codigoproduto,
            item: campoProduto,
            quantidade: quantidadeItem,
            preco: precoFinal
        });
        codInserido.value = "";
        campoQuantidade.value = "";
        campoProductName.value = "";
        campoProductPrice.value = "";
        btnAddProduct.setAttribute("disabled", true);
        erro.innerHTML = ``;
        exibirItensPedido(arraypedidoitens);

    }
};
function exibirItensPedido(arrItens) {
     
    let valorTotalPedido = 0;
    arrItens.forEach(function (item) {
        addedItems.innerHTML += `
                    
                    <tr>
                        <td>${item.codigo}</td>
                        <td>${item.item}</td>
                        <td>${item.quantidade}</td>
                        <td>R$${item.preco}</td>
                    </tr>`;
        valorTotalPedido += item.preco;
        salvapedido = {
            codigo:item.codigo,
            item:item.item,
            quantidade:item.quantidade,
            preco:item.preco,
            numero: nPedido
        }
    })
    arrEditar.push(salvapedido);
    totalPedido.innerHTML = `VALOR TOTAL DO PEDIDO: R$${valorTotalPedido}`;

}
function funcaoCancelar() {
    addedItems.innerHTML = "";
    codInserido.value = "";
    totalPedido.innerHTML = ``;
    sessao1.setAttribute("class", "active");
    sessao2.setAttribute("class", "inactive");
};



function funcaoSalvaPedido() {
    sessao1.setAttribute("class", "active");
    sessao2.setAttribute("class", "inactive");

    arrPedido.push({
        numero: nPedido,
        itens: arraypedidoitens,
        tipo: document.querySelector('input[name="consumo"]:checked').value,
        status: `<select id="filter_status_pedido">
        <option>Recebido</option>
        <option>Pronto</option>
        <option>Entregue</option>
            </select>`
    });
    arrFiltro.push({
        numero: nPedido,
        itens: arraypedidoitens,
        tipo: document.querySelector('input[name="consumo"]:checked').value,
        status: `<select id="filter_status_pedido">
        <option>Recebido</option>
        <option>Pronto</option>
        <option>Entregue</option>
            </select>`
    });
    arraypedidoitens = [];
    exibirTabelaPedidos(arrPedido);
    nPedido += 1;
    console.log(arrEditar)
    addedItems.innerHTML = "";
    totalPedido.innerHTML = "";
};
function exibirTabelaPedidos(arrTotal) {
    let HTML = "<tr>";
    arrTotal.forEach(function (item) {
        let itensnopedido = item.itens.map(function (val) { return val.quantidade + " - " + val.item });
        HTML += `<td><input type="checkbox" name="pedidoID" onClick="funcaoCheckbox()" id="${item.numero}">${item.numero}</td>`;
        HTML += "<td>"
        itensnopedido.forEach((elemento) => {
            HTML += `${elemento}<br>`
        })
        HTML += "</td>"
        HTML += `
        <td>${item.tipo}</td>
        <td>R$${item.itens.reduce((prev, elem) => prev + elem.preco, 0)}</td>
        <td>${item.status}</td></tr>`
    })
    savedOrder.innerHTML += HTML;
    arrPedido = [];
};
let arrStatus = [];
function funcaoOBterStatus(){
    let statusFiltrado = document.querySelectorAll('#filter_status_pedido');
    statusFiltrado.forEach((selected)=>{arrStatus.push(selected.value)})
    console.log(arrStatus);
}
function funcaoFiltrar(){
    let valorSelectFilter = filtroTipo.value;
    let valorStatus = filterStatus.value;
    let filtradoTipo = arrFiltro.filter(function(item){
        return item.tipo == valorSelectFilter.toLowerCase() || valorSelectFilter == ""
    })
    funcaoOBterStatus();
    filtradoTipo = filtradoTipo.filter(function(item){
        return arrStatus == valorStatus || valorStatus ==""
    })
    if (filtradoTipo !== []){
        savedOrder.innerHTML = ``;
        let HTML = `<tr>
        <th>Nº do pedido</th>
        <th>Itens</th>
        <th>Tipo</th>
        <th>Valor</th>
        <th>Status</th>
        </tr><tr>`;
        filtradoTipo.forEach(function (item) {
        let itensnopedido = item.itens.map(function (val) { return val.quantidade + " - " + val.item });
        HTML += `<td><input type="checkbox" name="pedidoID" onClick="funcaoCheckbox()" id="${item.numero}">${item.numero}</td>`;
        HTML += "<td>"
        itensnopedido.forEach((elemento) => {
            HTML += `${elemento}<br>`
        })
        HTML += "</td>"
        HTML += `
        <td>${item.tipo}</td>
        <td>R$${item.itens.reduce((prev, elem) => prev + elem.preco, 0)}</td>
        <td>${arrStatus}</td></tr>`
        arrStatus = [];
    })
    savedOrder.innerHTML += HTML;
    }
    if (filtradoTipo == []){
        savedOrder.innerHTML = ``;
        let HTML =  `<tr>
        <th>Nº do pedido</th>
        <th>Itens</th>
        <th>Tipo</th>
        <th>Valor</th>
        <th>Status</th>
    </tr><tr>`;
    arrFiltro.forEach(function (item) {
        let itensnopedido = item.itens.map(function (val) { return val.quantidade + " - " + val.item });
        HTML += `<td><input type="checkbox" name="pedidoID" onClick="funcaoCheckbox()" id="${item.numero}">${item.numero}</td>`;
        HTML += "<td>"
        itensnopedido.forEach((elemento) => {
            HTML += `${elemento}<br>`
        })
        HTML += "</td>"
        HTML += `
        <td>${item.tipo}</td>
        <td>R$${item.itens.reduce((prev, elem) => prev + elem.preco, 0)}</td>
        <td>${arrStatus}</td></tr>`
    })
    savedOrder.innerHTML += HTML;

    }

};
function funcaoCheckbox(){
    let checkboxes = document.querySelectorAll('input[name="pedidoID"]:checked')
    let valores = [];
    checkboxes.forEach((checkbox)=>{
        valores.push(checkbox.id);
    })
    if(valores.length > 0){
        formFilter.setAttribute("hidden","")
        campoOptions.removeAttribute("hidden");
    } else {
        formFilter.removeAttribute("hidden")
        campoOptions.setAttribute("hidden","");
    }
    console.log(valores); 
}
function funcaoEditarPedido(){
    sessao1.setAttribute("class", "inactive");
    sessao2.setAttribute("class", "active");
    nPedido += -1;
    addedItems.innerHTML = `<tr>
                                <th>Código</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor</th>
                            </tr>`;
    totalPedido.innerHTML = "";
    let pedidoSelecionado = document.getElementsByName('pedidoID');
    var arr = [];
    for(var i = pedidoSelecionado.length; i--; arr.unshift(pedidoSelecionado[i]));
    let idFiltrado = arr.map(function(item){return item.id})
    let filtrado = arrEditar.filter(function(item){
        return item.numero == idFiltrado
    })
    filtrado.forEach(function(item){
        let valorTotalPedido = 0;
        addedItems.innerHTML += `
                    
        <tr>
            <td>${item.codigo}</td>
            <td>${item.item}</td>
            <td>${item.quantidade}</td>
            <td>R$${item.preco}</td>
        </tr>`;
        valorTotalPedido += item.preco;
        totalPedido.innerHTML = `VALOR TOTAL DO PEDIDO: R$${valorTotalPedido}`;
    })
    
    
    console.log(filtrado);
}
function funcaoRemover(event){
    let pedidoSelecionado = document.getElementsByName('pedidoID');
    var arr = [];
    for(var i = pedidoSelecionado.length; i--; arr.unshift(pedidoSelecionado[i]));
    let idFiltrado = arr.map(function(item){return item.id});
    let itemlistado = document.getElementById(idFiltrado);
    var celula = itemlistado.parentNode;
    var linha = celula.parentNode;
    console.log(linha)
    // linha.remove();
    formFilter.removeAttribute("hidden")
    campoOptions.setAttribute("hidden","");


}

btnNewOrder.addEventListener("click", () => funcaoNovoPedido());
btnCancel.addEventListener("click", () => funcaoCancelar());
btnAddProduct.addEventListener("click", () => funcaoAdicionarProduto());
btnPesquisarProduto.addEventListener("click", () => funcaoPesquisarProduto());
btnSave.addEventListener("click", () => funcaoSalvaPedido());
filtroTipo.addEventListener("change", () => funcaoFiltrar());
filterStatus.addEventListener("change", () => funcaoFiltrar());
btnEdit.addEventListener("click",()=> funcaoEditarPedido());
btnRemove.addEventListener("click",()=> funcaoRemover());

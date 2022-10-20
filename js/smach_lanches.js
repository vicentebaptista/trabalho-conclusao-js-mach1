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
let selectStatus = document.getElementById('change_status_select');
let btnStatus = document.getElementById('change_status');
let btnSetStatus = document.getElementById('set_status');
let filtroSelect = document.getElementById('filtro_select');
let nPedido = Math.floor(Math.random() * 5000);
let arraypedidoitens = [];

let arrCorrige = [];
let arrTroca = [];
let arrFiltro = [];
let arrPedido = [];
let arrPed = [];
let arrSalvaPedidos = [];
let arrStatus = [];
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
    arrTotal = [];
    arrPedido = [];
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
        for (var i = 0; i < arraypedidoitens.length; i++) {
            arrPed.push(arraypedidoitens[i]);
        }
        exibirItensPedido(arraypedidoitens);
        arraypedidoitens = [];

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
        valorTotalPedido = valorTotalPedido + item.preco;
    });
    totalPedido.innerHTML = `VALOR TOTAL DO PEDIDO: R$${arrPed.reduce((prev, elem) => prev + elem.preco, 0)}`;
    arrItens = [];
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
        itens: arrPed,
        tipo: document.querySelector('input[name="consumo"]:checked').value,
        status: "Recebido"
    });
    exibirTabelaPedidos(arrPedido);
    nPedido += 1;
    addedItems.innerHTML = "";
    totalPedido.innerHTML = "";

};
function exibirTabelaPedidos(arrTotal) {
    for (var i = 0; i < arrTotal.length; i++) {
        arrSalvaPedidos.push(arrTotal[i]);
    }
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
    arrPed = [];

};
function funcaoStatus() {
    selectStatus.removeAttribute('hidden');
    btnRemove.setAttribute("hidden","");
    btnStatus.setAttribute("hidden","");
    var arr = [];
    let checkboxes = document.querySelectorAll('input[name="pedidoID"]:checked');
    checkboxes.forEach((checkbox) => {
        arr.push(checkbox.id);
    })
    filtrado = arr.map(function (item) { return item });
    arrSalvaPedidos = arrSalvaPedidos.filter((pedido) => {
        const estaSelecionado = filtrado.some((checked) => checked == pedido.numero);
        if (estaSelecionado) {
            return pedido
        }
    })
    for (var i = 0; i < arrSalvaPedidos.length; i++) {
        arrTroca.push(arrSalvaPedidos[i]);
    }
    
}
function funcaoConfirmarTroca(){
    filtroselecionado = filtroSelect.value;
    corrigeFiltro();
    savedOrder.innerHTML = `<tr>
    <th>Nº do pedido</th>
    <th>Itens</th>
    <th>Tipo</th>
    <th>Valor</th>
    <th>Status</th>
</tr><tr>`;
    let HTML = "<tr>";
    arrTroca.forEach(function (item) {
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
        <td>${filtroselecionado}</td></tr>`
    })
    savedOrder.innerHTML += HTML;
    formFilter.removeAttribute("hidden")
    campoOptions.setAttribute("hidden", "");
    selectStatus.setAttribute('hidden',"");
    btnRemove.removeAttribute("hidden");
    btnStatus.removeAttribute("hidden");
    arrTroca = [];
    
}
// function corrigeFiltro(){
//     var arr = [];
//     let checkboxes = document.querySelectorAll('input[name="pedidoID"]:checked');
//     checkboxes.forEach((checkbox) => {
//         arr.push(checkbox.id);
//     })
//     filtrado = arr.map(function (item) { return item });
//     arrSalvaPedidos = arrSalvaPedidos.filter((pedido) => {
//         const estaSelecionado = filtrado.some((checked) => checked == pedido.numero);
//         if (!estaSelecionado) {
//             return pedido
//         }
//     })
//     for (var i = 0; i < arrSalvaPedidos.length; i++) {
//         arrCorrige.push(arrSalvaPedidos[i]);}
//         let HTML = "<tr>";
//         arrCorrige.forEach(function (item) {
//             let itensnopedido = item.itens.map(function (val) { return val.quantidade + " - " + val.item });
//             HTML += `<td><input type="checkbox" name="pedidoID" onClick="funcaoCheckbox()" id="${item.numero}">${item.numero}</td>`;
//             HTML += "<td>"
//             itensnopedido.forEach((elemento) => {
//                 HTML += `${elemento}<br>`
//             })
//             HTML += "</td>"
//             HTML += `
//             <td>${item.tipo}</td>
//             <td>R$${item.itens.reduce((prev, elem) => prev + elem.preco, 0)}</td>
//             <td>${item.status}</td></tr>`
//         })
//         savedOrder.innerHTML += HTML;
    
// }
function funcaoFiltrar() {
    let valorSelectFilter = filtroTipo.value;
    let valorStatus = filterStatus.value;
    let filtradoTipo = arrSalvaPedidos.filter(function (item) {
        return item.tipo == valorSelectFilter.toLowerCase() || valorSelectFilter == ""
    })
    filtradoTipo = filtradoTipo.filter(function (item) {
        return item.status == valorStatus || valorStatus == ""
    })
    if (filtradoTipo !== []) {
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
        <td>${item.status}</td></tr>`
            arrStatus = [];
        })
        savedOrder.innerHTML += HTML;
    }
    if (filtradoTipo == []) {
        savedOrder.innerHTML = ``;
        let HTML = `<tr>
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
        <td>${item.status}</td></tr>`
        })
        savedOrder.innerHTML += HTML;

    }

};
function funcaoCheckbox() {
    let checkboxes = document.querySelectorAll('input[name="pedidoID"]:checked')
    let valoresMarcados = [];
    checkboxes.forEach((checkbox) => {
        valoresMarcados.push(checkbox.id);

    })
    if (valoresMarcados.length > 0) {
        formFilter.setAttribute("hidden", "")
        campoOptions.removeAttribute("hidden");
    } else {
        formFilter.removeAttribute("hidden")
        campoOptions.setAttribute("hidden", "");
    }

}
function funcaoRemover() {
    var arr = [];
    let checkboxes = document.querySelectorAll('input[name="pedidoID"]:checked');
    checkboxes.forEach((checkbox) => {
        arr.push(checkbox.id);
    })
    filtrado = arr.map(function (item) { return item });
    arrSalvaPedidos = arrSalvaPedidos.filter((pedido) => {
        const estaSelecionado = filtrado.some((checked) => checked == pedido.numero);
        if (!estaSelecionado) {
            return pedido
        }
    })
    console.log(arrSalvaPedidos);

    savedOrder.innerHTML = `<tr>
    <th>Nº do pedido</th>
    <th>Itens</th>
    <th>Tipo</th>
    <th>Valor</th>
    <th>Status</th>
</tr><tr>`;
    let HTML = "<tr>";
    arrSalvaPedidos.forEach(function (item) {
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
    formFilter.removeAttribute("hidden")
    campoOptions.setAttribute("hidden", "");
}

btnNewOrder.addEventListener("click", () => funcaoNovoPedido());
btnCancel.addEventListener("click", () => funcaoCancelar());
btnAddProduct.addEventListener("click", () => funcaoAdicionarProduto());
btnPesquisarProduto.addEventListener("click", () => funcaoPesquisarProduto());
btnSave.addEventListener("click", () => funcaoSalvaPedido());
filtroTipo.addEventListener("change", () => funcaoFiltrar());
filterStatus.addEventListener("change", () => funcaoFiltrar());
btnRemove.addEventListener("click", () => funcaoRemover());
btnStatus.addEventListener("click", ()=> funcaoStatus());
btnSetStatus.addEventListener("click", ()=> funcaoConfirmarTroca());

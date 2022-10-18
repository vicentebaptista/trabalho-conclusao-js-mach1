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
let arraypedidoitens = [];



let arrPedido = [];
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
    addedItems.innerHTML = "";
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
    })
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
        numero: Math.floor(Math.random() * 5000),
        itens: arraypedidoitens,
        tipo: document.querySelector('input[name="consumo"]:checked').value,
        status: "recebido"
    });
    arraypedidoitens = [];
    console.log(arrPedido);
    exibirTabelaPedidos(arrPedido);
};
function exibirTabelaPedidos(arrTotal) {
    arrTotal.forEach(function (item) {
        let qty = item.itens.map(function(val){return val.quantidade});
        let itensnopedido = item.itens.map(function(val){return val.item});
        let campodeitens = {
            itens:itensnopedido,
            quantidade:qty
        }
        savedOrder.innerHTML += `<tr><td>${item.numero}</td>
        <td id="item_qty">${campodeitens.quantidade} - ${campodeitens.itens}</td>
        <td>${item.tipo}</td>
        <td>R$${item.itens.reduce((prev, elem) => prev + elem.preco, 0)}</td>
        <td>${item.status}</td></tr>
        `
        
        console.log(campodeitens);
    })
    arrPedido = [];
    
    
    
};



// function funcaoFiltrarTipo(){
//     let tipoSelecionado = filtroTipo.value;
// let elementos = document.getElementsByClassName("pedido");
// let valores = [];
// for (let i = 0; i < elementos.length; i++) {
//   valores.push(elementos[i].innerHTML.replace('<input type="checkbox">', ""));
// //   console.log(valores);
// };
// var arrayfiltrado = valores.filter(function(item){
//     return item.toLowerCase() == tipoSelecionado.toLowerCase()
// })
//     console.log(tipoSelecionado);

// };


btnNewOrder.addEventListener("click", () => funcaoNovoPedido());
btnCancel.addEventListener("click", () => funcaoCancelar());
btnAddProduct.addEventListener("click", () => funcaoAdicionarProduto());
btnPesquisarProduto.addEventListener("click", () => funcaoPesquisarProduto());
btnSave.addEventListener("click", () => funcaoSalvaPedido());
filtroTipo.addEventListener("change", () => funcaoFiltrarTipo());

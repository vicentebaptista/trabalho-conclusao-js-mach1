let listaProdutos = [
    {
        codigo:1001,
        produto:"Super SMACH COMBO Programado - Hamburguer + fritas",
        preco:55.00
    },
    {
        codigo:1002,
        produto:"SMACH VariavelBurguer - Hambúrguer com bacon",
        preco:45.00
    },
    {
        codigo:1003,
        produto:"SMACH BUG EM PROD - Hambúrguer meio torto",
        preco:25.00
    },
    {
        codigo:1004,
        produto:"Combo Econômico SMACH Char 1 - Pão com carne",
        preco:15.00
    },
    {
        codigo:1005,
        produto:"Especial SMACH CSS - Hambúrguer colorido e alinhado",
        preco:65.00
    },
    {
        codigo:2001,
        produto:"Refrigerante 350ml",
        preco:8.00
    },
    {
        codigo:2002,
        produto:"Água 500ml",
        preco:5.00
    },
    {
        codigo:2003,
        produto:"Suco 350ml",
        preco:7.00
    },
    {
        codigo:3001,
        produto:"Sorvete 300ml",
        preco:15.00
    },
    {
        codigo:3002,
        produto:"Sobremesa doce SMACH ARRAY",
        preco:50.00
    }
];
let codInserido = document.getElementById('product_code_input');
let btnPesquisarProduto = document.getElementById('button_search');
let campoQuantidade = document.getElementById('product_qty_input');
let campoProductName = document.getElementById('product_name_output');
let campoProductPrice = document.getElementById('product_price_output');
let btnAddProduct = document.getElementById('button_add_product');
let btnCancel = document.getElementById('button_orders_cancel');
let btnSave = document.getElementById('button_order_save');
let blankImg = document.getElementById('no_order_img');
let erro = document.getElementById('erro');
let addedItems = document.getElementById('items');
let totalPedido = document.getElementById('total_amount')



;
function funcaoPesquisarProduto(){
    let codigoproduto = codInserido.value;
    let filtrado = listaProdutos.filter(function filtraitem(item){
        return item.codigo == codigoproduto;})
    let produtoFiltrado = filtrado.map(function(item){
        return item.produto
    }) 
    let precoFiltrado = filtrado.map(function(item){
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
let arrPedido = [];
function funcaoAdicionarProduto(){
    let codigoproduto = codInserido.value;
    let quantidadeItem = campoQuantidade.value;
    let campoProduto = campoProductName.value;
    let campoPreco = campoProductPrice.value;
    let tipoConsumo = document.querySelector('input[name="consumo"]:checked').value;
    if (quantidadeItem.length === 0){
        erro.innerHTML = `Quantidade não inserida` // verifica se foi inserida a quantidade de intens para adicionar ao pedido
    } else { // daqui pra baixo vai adicionar os itens na tabela do HTML
    let precoFinal = parseFloat(campoPreco.replace('R$',"")) * parseFloat(quantidadeItem);
    addedItems.innerHTML += `<tr><td>${codigoproduto}</td>
    <td>${campoProduto}</td>
    <td>${quantidadeItem}</td>
    <td class="valor-calculado">R$${precoFinal}</td></tr>`;
    codInserido.value = "";
    campoQuantidade.value = "";
    campoProductName.value = "";
    campoProductPrice.value = "";
    btnAddProduct.setAttribute("disabled",true);
    erro.innerHTML = ``;
    var els = document.getElementsByClassName("valor-calculado");
    var valorcalculado = 0;
    [].forEach.call(els, function (item) 
  {
    valorcalculado += parseFloat(item.innerHTML.replace("R$",""));
  });
    totalPedido.innerHTML=`VALOR TOTAL DO PEDIDO: R$${valorcalculado}`;

    let pedido  = {
        numero:Math.floor(Math.random() * 5000),
        itens:campoProduto,
        quantidade:quantidadeItem,
        tipo:tipoConsumo,
        valortotal:valorcalculado,
        status:"recebido"
    }
    arrPedido.push(pedido);
    console.log(arrPedido);
           
}};
function funcaoCancelar(){
    addedItems.innerHTML = "";
    codInserido.value = "";
    totalPedido.innerHTML = ``;
};

    

function funcaoSalvaPedido(){

}




















btnCancel.addEventListener("click", ()=> funcaoCancelar());
btnAddProduct.addEventListener("click", ()=> funcaoAdicionarProduto());
// btnAddProduct.addEventListener("click", ()=> funcaoPrecoFinal());
btnPesquisarProduto.addEventListener("click", ()=> funcaoPesquisarProduto());
btnSave.addEventListener("click",()=> funcaoSalvaPedido());

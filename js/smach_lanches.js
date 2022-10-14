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
let elementoConsumo = document.getElementById('consume');
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
        erro.innerHTML = `Nenhum item encontrado ou quantidade não inserida`;
        campoProductName.value = "";
        campoProductPrice.value = "";
    } else {
        erro.innerHTML = "";
        campoProductName.value = produtoFiltrado;
        campoProductPrice.value = `R$${precoFiltrado},00`;
        btnAddProduct.removeAttribute("disabled");
    }
    
};
function funcaoAdicionarProduto(){
    let codigoproduto = codInserido.value;
    let quantidadeItem = campoQuantidade.value;
    let campoProduto = campoProductName.value;
    let campoPreco = campoProductPrice.value;
    if (quantidadeItem.length === 0){
        erro.innerHTML = `Quantidade não inserida`
    } else {
    let precoFinal = parseFloat(campoPreco.replace('R$',"")) * parseFloat(quantidadeItem);
    addedItems.innerHTML += `<tr><td>${codigoproduto}</td>
    <td>${campoProduto}</td>
    <td>${quantidadeItem}</td>
    <td>R$${precoFinal}</td></tr>`;
    codInserido.value = "";
    campoQuantidade.value = "";
    campoProductName.value = "";
    campoProductPrice.value = "";
    btnAddProduct.setAttribute("disabled",true);
    erro.innerHTML = ``; 
    totalPedido.innerHTML += `<h2>TOTAL DO PEDIDO:R$${precoFinal}</h2>`              
}};
function funcaoCancelar(){
    addedItems.innerHTML = "";
    codInserido.value = "";
};






















btnCancel.addEventListener("click", ()=> funcaoCancelar());
btnAddProduct.addEventListener("click", ()=> funcaoAdicionarProduto());
btnPesquisarProduto.addEventListener("click", ()=> funcaoPesquisarProduto());
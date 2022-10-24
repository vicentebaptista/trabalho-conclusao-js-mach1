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
let btnProductRegistration = document.getElementById('btn_product_registration');
let sessao3 = document.getElementById('sessao3');
let botoesRegistro = document.getElementById('registration_btns');
let botaoNovoProduto = document.getElementById('set_product');
let tabelaCadastrados = document.getElementById('table_registration');
let telaCadastroProduto = document.getElementById('new_product');
let novoCod = document.getElementById('new_cod');
let novoItem = document.getElementById('new_item');
let novoPreco = document.getElementById('new_price');
let botaoSalvaProduto = document.getElementById('btn_save_new_product');
let botaoCancelaRegistro = document.getElementById('cancel_new_registration')
let botaoFinalizaRegistro = document.getElementById('finish_registration');
let newItemsTable = document.getElementById('new_items');
let tableItems = document.getElementById('all_items');
let btnMenuPrincipal = document.getElementById('main_menu');
let dataAtual = document.getElementById('date')
const dataHora = new Date().toLocaleString();
let nPedido = Math.floor(Math.random() * 5000);
let arraypedidoitens = [];
onload = insereHora();
let arrFiltro = [];
let arrPedido = [];
let arrPed = [];
let arrGlobal = [];
// ==================================================================================================================================================================================
//                                                                            DECLARAÇÃO DAS VARIAVEIS
// ==================================================================================================================================================================================
// ==================================================================================================================================================================================
//                                                                    TELA DE INICIAL + CADASTRO DE ITENS NO PEDIDO 
// ==================================================================================================================================================================================
function funcaoNovoPedido() {                                   // Esta função é iniciada quando o usuario clica em "Novo Pedido" e é responsável                                                                
    sessao1.setAttribute("class", "inactive");                 //                por mudar a tela para o ambiente de cadastro de pedidos
    sessao2.setAttribute("class", "active");
    addedItems.innerHTML = `<tr>                
                                <th>Código</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor</th> 
                            </tr>`; //Reseta o header da tabela de cadastro de pedidos
    totalPedido.innerHTML = "";    //Reseta o valor somado do pedido atual                     
    arrPedido = [];                                  
}
function insereHora(){
    dataAtual.innerHTML = `Data:${dataHora}`; //Insere data e hora na área do funcionário
}

function funcaoPesquisarProduto() {       //Essa função realiza a pesquisa dos produtos baseado no código inserido e realiza as devidas validações
    let codigoproduto = codInserido.value;
    let filtrado = listaProdutos.filter(function filtraitem(item) { //Pega o código inserido e compara com os itens do array de produtos
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
        btnAddProduct.removeAttribute("disabled"); //Insere as informações do produto na área indicada (input fields)
    }

};

function funcaoAdicionarProduto() { //Funcao que inicia ao clicar em adicionar produto e é responsavel por criar o objeto que será inserido na tabela final
    let codigoproduto = codInserido.value;
    let quantidadeItem = campoQuantidade.value;
    let campoProduto = campoProductName.value;
    let campoPreco = campoProductPrice.value;
    if (quantidadeItem.length === 0) {
        erro.innerHTML = `Quantidade não inserida` // verifica se foi inserida a quantidade de intens para adicionar ao pedido
    } else { // daqui pra baixo vai adicionar os itens na tabela do HTML
        let precoFinal = parseFloat(campoPreco.replace('R$', "")) * parseFloat(quantidadeItem);//Retira o campo de cifrão do preço e realiza a conta de quantidade x preço
        arraypedidoitens.push({ //objeto contendo o item adicionado pelo cliente
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
        for (var i = 0; i < arraypedidoitens.length; i++) { //copia o objeto do produto para um array de pedido que será usado porteriormente
            arrPed.push(arraypedidoitens[i]);               // pois sempre é zerado o objeto no final da função
        }
        exibirItensPedido(arraypedidoitens);
        arraypedidoitens = [];

    }
};
function exibirItensPedido(arrItens) { //Essa função escreve os itens salvos no array dentro da tabela HTML
    arrItens.forEach(function (item) {
        addedItems.innerHTML += `
                                <tr>
                                    <td>${item.codigo}</td>
                                    <td>${item.item}</td>
                                    <td>${item.quantidade}</td>
                                    <td>R$${item.preco}</td>
                                </tr>`;
    });
    totalPedido.innerHTML = `VALOR TOTAL DO PEDIDO: R$${arrPed.reduce((prev, elem) => prev + elem.preco, 0)}`; //Realiza a soma dos valores de todos os itens dentro do array de Pedido
    arrItens = []; //Limpa novamente uma referencia de memória
}
function funcaoCancelar() { //Função básica somente pra zerar os itens já inputados e voltar para pagina inicial
    addedItems.innerHTML = "";
    codInserido.value = "";
    totalPedido.innerHTML = ``;
    sessao1.setAttribute("class", "active");
    sessao2.setAttribute("class", "inactive");
};



function funcaoSalvaPedido() { //Essa função troca novamente para tela inicial e grava todos os itens inseridos no pedido na tela inicial
    sessao1.setAttribute("class", "active");
    sessao2.setAttribute("class", "inactive");
    arrPedido.push({     //objeto gerado pra conter todos os pedidos, nota:o campo itens recebe o array com todos os itens do pedido(inlui cod, produto e preço)
        numero: nPedido,
        itens: arrPed,
        tipo: document.querySelector('input[name="consumo"]:checked').value,
        status: "Recebido"
    });
    exibirTabelaPedidos(arrPedido); //Envia o array e chama a função que grava o pedido na tela inicial
    nPedido += 1;
    addedItems.innerHTML = "";
    totalPedido.innerHTML = "";

};
function exibirTabelaPedidos(arrPedidoFinal) { //Função que grava o pedido na tabela da tela inicial
    for (var i = 0; i < arrPedidoFinal.length; i++) {
        arrGlobal.push(arrPedidoFinal[i]);
    }
    let HTML = "<tr>";
    arrPedidoFinal.forEach(function (item) {
        let itensnopedido = item.itens.map(function (val) { return val.quantidade + " - " + val.item });
        HTML += `<td><input type="checkbox" name="pedidoID" onClick="funcaoCheckbox()" id="${item.numero}">${item.numero}</td>`;
        HTML += "<td class='td_itens'>"
        itensnopedido.forEach((elemento) => {
            HTML += `${elemento}<br>`})
        HTML += "</td>"
        HTML += `
        <td>${item.tipo}</td>
        <td>R$${item.itens.reduce((prev, elem) => prev + elem.preco, 0)}</td>
        <td><button type="button" class="${item.numero} btn_status ${validStatus(item.status)}" id="${item.numero * 4}"</button>${item.status}</td></tr>`
    })
    
    savedOrder.innerHTML += HTML;
    alertify.success('Pedido cadastrado com sucesso',2); 
    arrPed = []; //Zera o array contendo os itens pra evitar bug na inserção dos itens (e dá bug mesmo)

};
// ==================================================================================================================================================================================
//                                                                 FIM DO CADASTRO DE PEDIDOS // FUNÇÃO FILTRAR
// ==================================================================================================================================================================================
  
function gravaPedido(arrGravar){ //Essa função grava a tabela de pedidos baseado no array em uso (será reutilizada várias vezes)
        savedOrder.innerHTML = ``;
        let HTML = `<tr>
                        <th>Nº do pedido</th>
                        <th>Itens</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Status</th>
                    </tr><tr>`;
        arrGravar.forEach(function (item) {
            let itensnopedido = item.itens.map(function (val) { return val.quantidade + " - " + val.item });
                HTML += `<td><input type="checkbox" name="pedidoID" onClick="funcaoCheckbox()" id="${item.numero}">${item.numero}</td>`;
                HTML += "<td>"
                    itensnopedido.forEach((elemento) => {
                        HTML += `${elemento}<br>`})
                        HTML += "</td>"
                        HTML += `<td>${item.tipo}</td>
                                 <td>R$${item.itens.reduce((prev, elem) => prev + elem.preco, 0)}</td>
                                 <td><button type="button" class="${item.numero} btn_status ${validStatus(item.status)}" id="${item.numero * 4}"</button>${item.status}</td></tr>` })
       
        savedOrder.innerHTML += HTML;
}
function funcaoFiltrar() { //Função realiza o filtro dos campos select da tela inicial (Tipo e Status)
    let valorSelectFilter = filtroTipo.value;
    let valorStatus = filterStatus.value;
    let filtroSelect = arrGlobal.filter(function (item) {
        return item.tipo == valorSelectFilter.toLowerCase() || valorSelectFilter == "" //Checa se o tipo do pedido corresponde a algum valor do filtro TIPO (Delivery ou Salão)
    })
    filtroSelect = filtroSelect.filter(function (item) {
        return item.status == valorStatus || valorStatus == "" //Dentro do primeiro filtro checa se existe um valor para o filtro de status (filtra o status baseado no status do filtro tipo)
    })
    if (filtroSelect !== []) {
        gravaPedido(filtroSelect)
    }
    if (filtroSelect == []) {
       gravaPedido(arrFiltro)
    }

};
let validStatus = (status) => {
    let statusClass = "";
    switch (status) {
      case "Recebido":
        statusClass = "Recebido";
        break;
  
      case "Pronto":
        statusClass = "Pronto";
        break;
  
      case "Entregue":
        statusClass = "Entregue";
        break;
  
      default:
        statusClass = "Recebido";
        break;
    }
    return statusClass;
  };
// ==================================================================================================================================================================================
//                                                                           FUNÇÃO EXCLUIR E ALTERA STATUS 
// ================================================================================================================================================================================== 

function funcaoCheckbox() { //Essa função verifica se as checkboxes dos pedidos estão marcadas e caso positivo exibe o botão de excluir pedido
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
function funcaoRemover() { //Remove todos os itens marcados por checkbox ao clicar no botão excluir e confirmar a ação
    let text = "Deseja realmente excluir o pedido?\nPressione OK para sim ou cancele.";
  if (confirm(text) == true) {
    var arr = [];
    let checkboxes = document.querySelectorAll('input[name="pedidoID"]:checked');
    checkboxes.forEach((checkbox) => {
        arr.push(checkbox.id);
    })
    filtrado = arr.map(function (item) { return item });
    arrGlobal = arrGlobal.filter((pedido) => {
        const estaSelecionado = filtrado.some((checked) => checked == pedido.numero); //Verifica se o ID dos pedidos selecionados corresponde a algum dos pedidos na lista e retorna todos os pedidos **NÃO** selecionados
        if (!estaSelecionado) {
            return pedido
        }
    })
    if(arrGlobal == []){
        blankImg.removeAttribute("class","hidden")
    }
    gravaPedido(arrGlobal);
    formFilter.removeAttribute("hidden")
    campoOptions.setAttribute("hidden", "");
    alertify.success('Pedido excluido com sucesso',2);
}}
let tabelaGeral = document.querySelector("#order_items"); //Obtem todos os itens dentro da tabela de pedidos cadastrados (HTML)
tabelaGeral.addEventListener("click", function funcaoTrocaStatus(event){ //Função chamada ao clicar no botão de status do pedido, verifica se o id do botão corresponde ao numero do pedido e executa a ação de trocar o status
    var botaoClicado = event.target;
    if(botaoClicado.classList.contains("btn_status")){
        botaoClicado = botaoClicado.id
        console.log(botaoClicado)
        arrGlobal.forEach((value)=>{
            if(value.numero == (botaoClicado / 4)){
                if(value.status === 'Recebido'){
                    value.status = "Pronto";
                }else {
                    value.status = "Entregue"
                }
            }
        })

   visualizarTabela()

}})
let visualizarTabela = () =>{
    gravaPedido(arrGlobal);
}
// ====================================================================================================================================================================================
//                                                                             FUNÇÕES DE CADASTRO DE PRODUTO 
// ====================================================================================================================================================================================
function funcaoTelaRegistro(){ //Função acionada ao clicar no botão cadastro de produtos e exibe a tela com todos os produtos cadastrados e opções
    sessao1.setAttribute("class","inactive");
    sessao3.setAttribute("class","active");
    exibeCadastrados(listaProdutos);
}
function funcaoExibeCampos(){ //Abre a tela de cadastro de um novo produto (também utilizada para edição dos cadastrados)
    botoesRegistro.setAttribute("class","hidden");
    tabelaCadastrados.setAttribute('class','inactive');
    telaCadastroProduto.setAttribute('class','active');
    novoCod.value = "";
    novoItem.value = "";
    novoPreco.value = "";
}
function exibeCadastrados(arrCadastrados){ //Função responsável por gravar a lista de produtos na tebela HTML
    tableItems.innerHTML = `<tr>
                                <th>Código</th>
                                <th>Item</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>`
    arrCadastrados.forEach(function(item){
        tableItems.innerHTML += `<tr>
                                    <td>${item.codigo}</td>
                                    <td>${item.produto}</td>
                                    <td>R$${item.preco}<td>
                                    <td><button id="${item.codigo}" class="btn_editar">Editar</button>
                                    <button id="${item.codigo * 2}" name="botaoID" class="btn_excluir">Excluir</button></td>
                                <tr>`
    })
}
let itemNovo = [];
let arrNovoCadastro = [];
function funcaoAdicionaNovoProduto(){ //Função utilizada para criar novo produto
    codigoInserido = novoCod.value;
    precoInserido = novoPreco.value;
    itemInserido = novoItem.value;
    if(codInserido == "" || precoInserido == "" || itemInserido == ""){ //Verifica se todos os campos estão devidamente preenchidos
        return alert("Todos os campos são obrigarórios")
    }
    let codigosCadastrados = [];
    listaProdutos.forEach(function(item){return codigosCadastrados.push(item.codigo)}) //Adiciona todos os códigos de produtos num array para verificação posterior
    itemNovo.push({ //objeto do novo item
        codigo:codigoInserido,
        produto:itemInserido,
        preco:precoInserido
    })
    let checaProduto = codigosCadastrados.some((value) => value == itemNovo.map(function(item){return item.codigo})) //Checa se o código do produto já existe e caso positivo impede que continue o cadastro
    if(checaProduto){
         alert("Código já cadastrado para outro produto");
         return itemNovo = [];
    }
    funcaoFinalizaRegistro(itemNovo);
    itemNovo = [];
    novoCod.value = "";
    novoItem.value = "";
    novoPreco.value = "";
}
function funcaoFinalizaRegistro(novoCadastrado){ //Pega o item e adiciona no array contendo todos os itens cadastrados
    for (var i = 0; i < novoCadastrado.length; i++) {
        listaProdutos.push(novoCadastrado[i]);}
    exibeCadastrados(listaProdutos)
    botoesRegistro.removeAttribute('class','hidden');
    tabelaCadastrados.setAttribute('class','active');
    telaCadastroProduto.setAttribute('class','inactive');
}
var tabela = document.querySelector("#all_items"); //Obtem todos os itens contidos na tabela de itens cadastrados (HTML)
let arrBotao = [];
tabela.addEventListener("click", function funcaoExcluir(event){ //Identifica o botão clicado e verifica se o ID dele corresponde a um item e renderiza a nova tabela sem o item encontrado
    var botaoClicado = event.target;
    if(botaoClicado.classList.contains("btn_excluir")){    //verifica se o clique feito foi de fato no botão correto
        let text = "Deseja realmente excluir o produto?\nPressione OK para sim ou cancele.";
  if (confirm(text) == true) {
    botaoClicado = botaoClicado.id;
    arrBotao.push(botaoClicado);
    listaProdutos = listaProdutos.filter((produto) => {
        const estaSelecionado = arrBotao.some((value) => (value / 2) == produto.codigo);
        if (!estaSelecionado) {
            return produto
        }
    })
    exibeCadastrados(listaProdutos);
    alertify.success('Produto excluido com sucesso',2);
    arrBotao = [];
}}
})
    tabela.addEventListener("click", function funcaoEditar(event){ //Identifica o botão clicado e verifica se o ID dele corresponde a um item, apaga ele do array de produtos e leva as informações pro campo de cadastro de itens
    var botaoClicado = event.target;
    if(botaoClicado.classList.contains("btn_editar")){ //verifica se o clique feito foi de fato no botão correto
    botaoClicado = botaoClicado.id;
    arrBotao.push(botaoClicado);
    let arrEdicao = [];
    arrEdicao = listaProdutos.filter((produto) => {
        const estaSelecionado = arrBotao.some((value) => value == produto.codigo); //filtra o produto clicado em editar
        if (estaSelecionado) {
            return produto
        }
    })
    botoesRegistro.setAttribute("class","hidden");
    tabelaCadastrados.setAttribute('class','inactive');
    telaCadastroProduto.setAttribute('class','active');
    novoCod.value = arrEdicao.map(function(item){return item.codigo})
    novoItem.value = arrEdicao.map(function(item){return item.produto})
    novoPreco.value = arrEdicao.map(function(item){return item.preco})
    let codigoEditado = arrEdicao.map(function(item){return item.codigo})
    listaProdutos = listaProdutos.filter((produto) => {
        const estaSelecionado = codigoEditado.some((value) => value == produto.codigo); //retorna o array sem o produto clicado, permitindo a inserção da atualização pelo cadastro
        if (!estaSelecionado) {
            return produto
        }
    })
}
arrBotao = [];
})
function funcaoVoltar(){ //volta pra tela inicial
    sessao1.setAttribute("class","active");
    sessao3.setAttribute("class","inactive");
}

// ====================================================================================================================================================================================
//                                                                      FIM DO CÓDIGO - SETOR DOS EVENTLISTENER 
// ====================================================================================================================================================================================
btnNewOrder.addEventListener("click", () => funcaoNovoPedido());
btnCancel.addEventListener("click", () => funcaoCancelar());
btnAddProduct.addEventListener("click", () => funcaoAdicionarProduto());
btnPesquisarProduto.addEventListener("click", () => funcaoPesquisarProduto());
btnSave.addEventListener("click", () => funcaoSalvaPedido());
filtroTipo.addEventListener("change", () => funcaoFiltrar());
filterStatus.addEventListener("change", () => funcaoFiltrar());
btnRemove.addEventListener("click", () => funcaoRemover());
btnProductRegistration.addEventListener("click", ()=> funcaoTelaRegistro());
botaoNovoProduto.addEventListener("click",()=> funcaoExibeCampos());
botaoSalvaProduto.addEventListener("click",()=> funcaoAdicionaNovoProduto());
btnMenuPrincipal.addEventListener("click",()=> funcaoVoltar());

// ======================================================================================================================================================================================
//  __________________________         ___________________________        _________________________
// /                          \       /                           \      /                         \
// |   _______________________/       |     _________________     |      |   ______________________/
// |  |                               |    /                 \    |      |  | 
// |  |                               |    |                  |   |      |  |
// |  |                               |    |                  |   |      |  |
// |  |                               |    |                  |   |      |  |
// |  |                               |    |                  |   |      |  |_____________________
// |  |_______________________        |    |                  |   |      |                        \
// |                          \       |    |                  |   |      |___________________      |
// |_____________________     |       |    |                  |   |                          |     |
//                       |    |       |    |                  |   |                          |     |
//                       |    |       |    |                  |   |                          |     |
//                       |    |       |    |                  |   |                          |     |
//  _____________________|    |  ____ |    \_________________/    | ____  ___________________|     |
// /                          | |    ||                           ||    |/                         |
// |__________________________| |____|\___________________________/|____||_________________________|
// ===== 1. DADOS: array de objetos =====
let produtos = [
  { nome: "PLACA MÃE",                 categoria: "HARDWARE",  preco:  350.0,  imagem: "img/placamãe2.jpeg", link: "https://www.mercadolivre.com.br" },
  { nome: "SSD",                       categoria: "HARDWARE",  preco: 139.9, imagem: "img/ssd1tb.jpg",  link: "https://www.mercadolivre.com.br" },
  { nome: "PC GAMER",                  categoria: "COMPUTADORES",preco: 1500.0,  imagem: "img/pcgamer.jpeg",   link: "https://www.mercadolivre.com.br" },
  { nome: "PC WORKSTATION",            categoria: "COMPUTADORES",preco: 3800.0,  imagem: "img/workstation.jpeg",  link: "https://www.mercadolivre.com.br" },
  { nome: "SUPORTE MONITOR",           categoria: "MONITORES",  preco: 70.0,   imagem: "img/suporte.jpeg",   link: "https://www.mercadolivre.com.br" },
  { nome: "MONITOR CASA E ESCRITORIO", categoria: "MONITORES",  preco: 280.0,  imagem: "img/monitor.jpeg",  link: "https://www.mercadolivre.com.br" }
];

let carrinho = [];
let categoriaAtual = "Todas";
let numeroLoja = "5521999999999"; // troque pelo número da sua loja (55 + DDD + número)

// ===== 2. FUNÇÕES AUXILIARES =====
function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function mostrarToast(mensagem) {
  let toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.add("mostrar");
  setTimeout(function () {
    toast.classList.remove("mostrar");
  }, 2000);
}

// ===== 3. FILTROS POR CATEGORIA =====
function montarFiltros() {
  let categorias = ["Todas"];
  for (let i = 0; i < produtos.length; i++) {
    if (categorias.includes(produtos[i].categoria) == false) {
      categorias.push(produtos[i].categoria);
    }
  }

  let html = "";
  for (let i = 0; i < categorias.length; i++) {
    let classe = categorias[i] == categoriaAtual ? "ativo" : "";
    html += `<button class="${classe}" onclick="filtrar('${categorias[i]}')">${categorias[i]}</button>`;
  }
  document.getElementById("filtros").innerHTML = html;
}

function filtrar(categoria) {
  categoriaAtual = categoria;
  montarFiltros();
  mostrarVitrine();
}

// ===== 4. VITRINE =====
function mostrarVitrine() {
  let html = "";

  for (let i = 0; i < produtos.length; i++) {
    let p = produtos[i];

    if (categoriaAtual == "Todas" || p.categoria == categoriaAtual) {
      html += `
        <article class="produto">
          <img src="${p.imagem}" alt="${p.nome}">
          <div class="corpo">
            <span class="categoria">${p.categoria}</span>
            <h3>${p.nome}</h3>
            <span class="preco">${formatarPreco(p.preco)}</span>
            <div class="botoes">
              <button class="btn-add" onclick="adicionarAoCarrinho(${i})">Adicionar</button>
              <a id="linkbranco" href="${p.link}" target="_blank" rel="noopener">Ver na loja</a>
            </div>
          </div>
        </article>`;
    }
  }

  document.getElementById("vitrine").innerHTML = html;
}

// ===== 5. CARRINHO =====
function adicionarAoCarrinho(posicao) {
  carrinho.push(produtos[posicao]);
  salvar();
  atualizarCarrinho();
  mostrarToast(produtos[posicao].nome + " adicionado!");
}

function removerDoCarrinho(posicao) {
  carrinho.splice(posicao, 1);
  salvar();
  atualizarCarrinho();
}

function limparCarrinho() {
  carrinho = [];
  salvar();
  atualizarCarrinho();
  mostrarToast("Carrinho esvaziado");
}

function atualizarCarrinho() {
  let total = 0;
  let html = "";

  for (let i = 0; i < carrinho.length; i++) {
    total += carrinho[i].preco;
    html += `<li>
      <span>${carrinho[i].nome} - ${formatarPreco(carrinho[i].preco)}</span>
      <button onclick="removerDoCarrinho(${i})">Remover</button>
    </li>`;
  }

  if (carrinho.length == 0) {
    html = "<li>Seu carrinho está vazio.</li>";
  }

  document.getElementById("lista-carrinho").innerHTML = html;
  document.getElementById("total").textContent = formatarPreco(total);
  document.getElementById("contador").textContent = carrinho.length;
  document.getElementById("qtd").textContent = carrinho.length;

  if (carrinho.length == 1) {
    document.getElementById("palavra").textContent = "item";
  } else {
    document.getElementById("palavra").textContent = "itens";
  }
}

// ===== 6. WHATSAPP =====
function enviarWhatsApp() {
  if (carrinho.length == 0) {
    mostrarToast("Adicione um produto primeiro");
    return;
  }

  let total = 0;
  let mensagem = "Olá! Quero fazer este pedido:\n";
  for (let i = 0; i < carrinho.length; i++) {
    mensagem += "- " + carrinho[i].nome + " (" + formatarPreco(carrinho[i].preco) + ")\n";
    total += carrinho[i].preco;
  }
  mensagem += "Total: " + formatarPreco(total);

  let url = "https://wa.me/" + numeroLoja + "?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank");
}

// ===== 7. MENU HAMBÚRGUER E TEMA =====
function alternarMenu() {
  document.getElementById("menu").classList.toggle("aberto");
}

function alternarTema() {
  document.body.classList.toggle("escuro");
  let escuro = document.body.classList.contains("escuro");
  localStorage.setItem("tema", escuro ? "escuro" : "claro");
  document.getElementById("btn-tema").textContent = escuro ? "Tema claro" : "Tema escuro";
}

// ===== 8. PERSISTÊNCIA (localStorage) =====
function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregar() {
  let guardado = localStorage.getItem("carrinho");
  if (guardado != null) {
    carrinho = JSON.parse(guardado);
  }
  if (localStorage.getItem("tema") == "escuro") {
    document.body.classList.add("escuro");
    document.getElementById("btn-tema").textContent = "Tema claro";
  }
}
function mostrarSenha() {
  var x = document.getElementById("senha");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password"
  }
}

// ===== 9. INÍCIO =====
carregar();
montarFiltros();
mostrarVitrine();
atualizarCarrinho();

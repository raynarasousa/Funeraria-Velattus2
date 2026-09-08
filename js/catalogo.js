// =========================================================
// FUNERÁRIA VELATTUS — Catálogo de flores (estático)
// Lê produtos e categorias de js/produtos-data.js (sem backend) e monta
// a vitrine. Para adicionar/editar/remover uma flor, edite esse arquivo.
// =========================================================
(function () {
  'use strict';

  var state = { produtos: [], categorias: [], categoriaAtiva: '' };

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function mensagemContato(produto) {
    return 'Olá! Tenho interesse na ' + produto.nome + ' (' + produto.categoria + ').';
  }

  function whatsappHref(produto) {
    var cfg = window.__vltConfig || {};
    var numero = cfg.whatsapp_numero || '5511934868348';
    return window.VelattusWhatsapp.build(numero, mensagemContato(produto));
  }

  function cardProduto(p) {
    var preco = p.preco
      ? '<span class="price-value">' + escapeHtml(p.preco) + '</span>'
      : '<span class="price-value placeholder">Consulte o valor</span>';
    return (
      '<li>' +
        '<article class="product-card" data-id="' + p.id + '" tabindex="0">' +
          '<figure class="product-img"><img src="' + escapeHtml(p.imagem) + '" alt="' + escapeHtml(p.nome) + '"></figure>' +
          '<section class="product-info">' +
            '<span class="product-category">' + escapeHtml(p.categoria || '') + '</span>' +
            '<h4 class="product-name">' + escapeHtml(p.nome) + '</h4>' +
            '<p class="product-desc">' + escapeHtml(p.descricao) + (p.medida ? ' · ' + escapeHtml(p.medida) : '') + '</p>' +
            '<footer class="product-footer">' +
              '<p class="product-price"><span class="price-label">Valor</span>' + preco + '</p>' +
              '<a href="' + whatsappHref(p) + '" class="btn-consult js-whatsapp-produto" data-produto-id="' + p.id + '">Entrar em contato</a>' +
            '</footer>' +
          '</section>' +
        '</article>' +
      '</li>'
    );
  }

  function cardDestaque(p) {
    var preco = p.preco
      ? '<span class="featured-price">' + escapeHtml(p.preco) + '</span>'
      : '<span class="featured-price placeholder">Consulte o valor</span>';
    return (
      '<li>' +
        '<article class="featured-card" data-id="' + p.id + '" tabindex="0">' +
          '<figure class="featured-img"><img src="' + escapeHtml(p.imagem) + '" alt="' + escapeHtml(p.nome) + '" style="display:block;"></figure>' +
          '<section class="featured-info">' +
            '<span class="featured-tag">' + escapeHtml(p.categoria || '') + ' · Destaque</span>' +
            '<h3>' + escapeHtml(p.nome) + '</h3>' +
            '<p>' + escapeHtml(p.descricao) + (p.medida ? ' Medida: ' + escapeHtml(p.medida) + '.' : '') + '</p>' +
            '<p class="featured-price-row"><span class="featured-price-label">Valor</span>' + preco + '</p>' +
            '<a href="' + whatsappHref(p) + '" class="featured-btn js-whatsapp-produto" data-produto-id="' + p.id + '">Consultar</a>' +
          '</section>' +
        '</article>' +
      '</li>'
    );
  }

  function renderFiltros() {
    var bar = document.getElementById('filter-bar');
    var existentes = bar.querySelectorAll('.filter-tab[data-categoria]:not([data-categoria=""])');
    existentes.forEach(function (b) { b.remove(); });
    var spacer = bar.querySelector('.filter-spacer');
    state.categorias.forEach(function (c) {
      var btn = document.createElement('button');
      btn.className = 'filter-tab';
      btn.dataset.categoria = c.id;
      btn.textContent = c.nome;
      bar.insertBefore(btn, spacer);
    });
    bar.querySelectorAll('.filter-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        bar.querySelectorAll('.filter-tab').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.categoriaAtiva = btn.dataset.categoria || '';
        renderProdutos();
      });
    });
  }

  function renderDestaques() {
    var row = document.getElementById('featured-row');
    var destaques = state.produtos.filter(function (p) { return p.destaque; }).slice(0, 4);
    var secao = document.getElementById('section-destaques');
    if (!destaques.length) { secao.style.display = 'none'; return; }
    row.innerHTML = destaques.map(cardDestaque).join('');
  }

  function renderProdutos() {
    var container = document.getElementById('produtos-por-categoria');
    var semProdutos = document.getElementById('sem-produtos');
    var countLabel = document.getElementById('count-label');

    var lista = state.produtos;
    if (state.categoriaAtiva) {
      lista = lista.filter(function (p) { return String(p.categoria_id) === String(state.categoriaAtiva); });
    }

    if (!lista.length) {
      container.innerHTML = '';
      semProdutos.style.display = 'block';
      countLabel.textContent = 'Nenhum produto encontrado';
      return;
    }
    semProdutos.style.display = 'none';
    countLabel.textContent = state.categoriaAtiva
      ? lista.length + (lista.length === 1 ? ' produto nesta categoria' : ' produtos nesta categoria')
      : 'Exibindo ' + lista.length + ' produtos';

    // agrupa por categoria, preservando a ordem em que vieram da API
    var grupos = [];
    var indice = {};
    lista.forEach(function (p) {
      var chave = p.categoria || 'Outros';
      if (!(chave in indice)) {
        indice[chave] = grupos.length;
        grupos.push({ nome: chave, itens: [] });
      }
      grupos[indice[chave]].itens.push(p);
    });

    container.innerHTML = grupos.map(function (g) {
      return (
        '<header class="row-label-block"><span class="row-label">' + escapeHtml(g.nome) + '</span></header>' +
        '<ul class="product-grid" style="margin-bottom:32px;">' + g.itens.map(cardProduto).join('') + '</ul>'
      );
    }).join('');
  }

  // -------------------- MODAL --------------------
  var modal = document.getElementById('produto-modal');

  function abrirModal(produto) {
    document.getElementById('modal-img').src = produto.imagem;
    document.getElementById('modal-img').alt = produto.nome;
    document.getElementById('modal-categoria').textContent = produto.categoria || '';
    document.getElementById('modal-nome').textContent = produto.nome;
    document.getElementById('modal-descricao').textContent = produto.descricao;
    document.getElementById('modal-medida').textContent = produto.medida ? 'Medida: ' + produto.medida : '';
    document.getElementById('modal-preco').textContent = produto.preco || 'Consulte o valor';

    var btn = document.getElementById('modal-whatsapp');
    btn.href = whatsappHref(produto);
    btn.setAttribute('data-produto-id', produto.id);

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-fechar-modal')) fecharModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) fecharModal();
  });

  function ativarCliqueNosCards() {
    document.body.addEventListener('click', function (e) {
      var btnContato = e.target.closest('.js-whatsapp-produto');
      if (btnContato) return; // deixa o link seguir normalmente para o WhatsApp

      var card = e.target.closest('.product-card, .featured-card');
      if (!card) return;
      var id = card.getAttribute('data-id');
      var produto = state.produtos.find(function (p) { return String(p.id) === String(id); });
      if (produto) abrirModal(produto);
    });
    document.body.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var card = e.target.closest('.product-card, .featured-card');
      if (!card) return;
      var id = card.getAttribute('data-id');
      var produto = state.produtos.find(function (p) { return String(p.id) === String(id); });
      if (produto) abrirModal(produto);
    });
  }

  function carregar() {
    state.produtos = window.VELATTUS_PRODUTOS || [];
    state.categorias = window.VELATTUS_CATEGORIAS || [];
    renderFiltros();
    renderDestaques();
    renderProdutos();
  }

  document.addEventListener('DOMContentLoaded', function () {
    ativarCliqueNosCards();
    carregar();
  });
})();

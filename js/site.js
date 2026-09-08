// =========================================================
// FUNERÁRIA VELATTUS — Config estática de WhatsApp
// Site 100% estático (sem servidor/backend). Usado em todas as páginas.
// Para trocar o número de WhatsApp ou o nome da empresa, edite as
// constantes abaixo e publique de novo.
// =========================================================
(function () {
  'use strict';

  var CONFIG = {
    whatsapp_numero: '5511934868348',
    whatsapp_planos: '5511980800104',
    nome_empresa: 'Funerária Velattus',
  };
  window.__vltConfig = CONFIG;

  function buildWhatsappUrl(numero, mensagem) {
    var base = 'https://api.whatsapp.com/send/?phone=' + encodeURIComponent(numero);
    if (mensagem) base += '&text=' + encodeURIComponent(mensagem);
    return base;
  }
  window.VelattusWhatsapp = { build: buildWhatsappUrl };

  // Sem backend: não há mais estatística de cliques em WhatsApp gravada em
  // banco de dados. Se um dia isso for necessário de novo, é aqui que entraria
  // uma chamada para um serviço de analytics (ex.: Google Analytics/Plausible).
  window.VelattusWhatsapp.registrarClique = function () {};

  // Mantido por compatibilidade com o restante do código (que "espera" a
  // configuração antes de montar a página) — já resolve na hora, sem rede.
  window.VelattusConfigReady = Promise.resolve(CONFIG);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.js-whatsapp[data-numero]').forEach(function (el) {
      var tipo = el.getAttribute('data-numero');
      var numero = tipo === 'planos' ? CONFIG.whatsapp_planos : CONFIG.whatsapp_numero;
      if (!numero) return;
      var msg = el.getAttribute('data-msg') || '';
      el.setAttribute('href', buildWhatsappUrl(numero, msg));
    });
  });
})();

// =========================================
// VELATTUS FLORES — Scripts
// NOTA: este arquivo não é mais carregado pelas páginas (a seção de
// planos funerários que usava switchTab() foi removida). Mantido apenas
// por precaução; pode ser apagado com segurança.
// =========================================

/**
 * Alterna entre abas de conteúdo (não usado nas páginas atuais)
 * @param {string} type - identificador da aba
 */
function switchTab(type) {
  // Remove a classe active de todas as abas e conteúdos
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.plans-content').forEach(c => c.classList.remove('active'));

  // Ativa o conteúdo correspondente
  document.getElementById('tab-' + type).classList.add('active');

  // Ativa o botão clicado
  event.target.classList.add('active');
}

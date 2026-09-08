// =========================================
// FUNERÁRIA VELATTUS — Scripts
// =========================================

/**
 * Alterna entre as abas de planos (Familiar / Empresarial)
 * @param {string} type - 'familiar' ou 'empresarial'
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

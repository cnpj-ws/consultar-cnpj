/**
 * Remove máscara comum (espaços, ponto, barra, hífen) e padroniza letras em
 * maiúsculas, conforme o CNPJ alfanumérico (A–Z e 0–9, IN RFB nº 2.229/2024).
 * CNPJs numéricos legados continuam válidos (apenas dígitos após a limpeza).
 *
 * @param {string} valor
 * @returns {string}
 */
function normalizarIdentificadorCnpj(valor) {
  return String(valor)
    .trim()
    .toUpperCase()
    .replace(/[\s./-]/g, "");
}

module.exports = { normalizarIdentificadorCnpj };

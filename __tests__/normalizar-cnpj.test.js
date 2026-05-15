const {
  normalizarIdentificadorCnpj,
} = require("../src/normalizar-cnpj");

describe("normalizarIdentificadorCnpj", () => {
  it("mantém CNPJ alfanumérico e remove apenas máscara", () => {
    expect(normalizarIdentificadorCnpj("UKPVME1E8HI996")).toBe(
      "UKPVME1E8HI996"
    );
    expect(normalizarIdentificadorCnpj("ukpv-me1-e8hi996")).toBe(
      "UKPVME1E8HI996"
    );
  });

  it("remove máscara do CNPJ numérico legado", () => {
    expect(normalizarIdentificadorCnpj("04.884.082/0002-16")).toBe(
      "04884082000216"
    );
  });

  it("aplica trim e maiúsculas", () => {
    expect(normalizarIdentificadorCnpj("  ab12cd34ef56  ")).toBe(
      "AB12CD34EF56"
    );
  });
});

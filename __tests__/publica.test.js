require("dotenv").config({ path: ".env" });
const consultaCNPJ = require("../src");

describe("Consulta CNPJ - API Pública", () => {
  it("Deve retornar um erro ao consultar sem passar o CNPJ", () => {
    expect(() => consultaCNPJ()).toThrow(/^CNPJ não informado$/);
  });

  it("Deve retornar os dados de um CNPJ valido na API Pública", async () => {
    const response = await consultaCNPJ("04884082000216");
    expect(response.cnpj_raiz).toBe("04884082");
  });

  it("Deve retornar o status 400 para um CNPJ invalido na API Pública", async () => {
    try {
      const response = await consultaCNPJ("94884082000216");
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });
});

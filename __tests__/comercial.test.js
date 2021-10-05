require("dotenv").config({ path: ".env" });
const consultaCNPJ = require("../src");

describe("Consulta CNPJ - API Comercial", () => {
  it("Deve retornar os dados de um CNPJ valido na API Comercial", async () => {
    const response = await consultaCNPJ(
      "04884082000216",
      process.env.TEST_TOKEN
    );
    expect(response.cnpj_raiz).toBe("04884082");
  });

  it("Deve retornar o status 400 para um CNPJ invalido na API Comercial", async () => {
    try {
      const response = await consultaCNPJ(
        "94884082000216",
        process.env.TEST_TOKEN
      );
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  it("Deve retornar o status 404 para um CNPJ valido nao encontrado na API Comercial", async () => {
    try {
      const response = await consultaCNPJ(
        "52376501000170",
        process.env.TEST_TOKEN
      );
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  it("Deve retornar o consumo do mes corrente", async () => {
    const response = await consultaCNPJ.consumo(process.env.TEST_TOKEN);
    expect(response[0].mes).toBe(new Date().getMonth() + 1);
  });

  it("Deve listar o consumo anual", async () => {
    const response = await consultaCNPJ.consumo(
      process.env.TEST_TOKEN,
      new Date().getFullYear
    );
    expect(response.length).toBeGreaterThan(0);
  });

  it("Deve listar o consumo anual", async () => {
    const response = await consultaCNPJ.consumo(
      process.env.TEST_TOKEN,
      new Date().getFullYear,
      new Date().getMonth() + 1
    );
    expect(response.length).toBeGreaterThan(0);
  });

  it("Deve retornar um erro ao consultar consumo sem o token", () => {
    expect(() => consultaCNPJ.consumo()).toThrow(/^Token não informado$/);
  });

  it("Deve retornar o status 200 para uma Raiz de CNPJ valida na API Comercial", async () => {
    const response = await consultaCNPJ.raiz(
      "04884082",
      process.env.TEST_TOKEN
    );
    expect(response.data.length).toBeGreaterThan(0);
  });
});

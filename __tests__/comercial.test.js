require("dotenv").config({ path: ".env" });
const consultaCNPJ = require("../src");

describe("Consulta CNPJ - API Comercial", () => {
  it("Deve retornar o status OK para um CNPJ valido na API Comercial", async () => {
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
});

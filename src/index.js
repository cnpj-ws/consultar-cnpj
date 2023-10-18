const axios = require("axios").default;
const pjson = require("../package.json");

module.exports = (cnpj, token) => {
  if (!cnpj) throw new Error("CNPJ não informado");

  cnpj = cnpj.replace(/[^0-9]/g, "");

  return new Promise((resolve, reject) => {
    let url = "";

    if (token) {
      url = `https://comercial.cnpj.ws/cnpj/${cnpj}?token=${token}`;
    } else {
      url = `https://publica.cnpj.ws/cnpj/${cnpj}`;
    }

    axios({
      method: "get",
      url,
      headers: { "User-Agent": `consultar-cnpj/${pjson.version}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response && error.response.data) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });
};

module.exports.raiz = (raiz, token, options = { page: 1 }) => {
  if (!raiz) throw new Error("Raiz do CNPJ não informada");
  if (!token) throw new Error("Token não informado");

  raiz = raiz.replace(/[^0-9]/g, "");

  return new Promise((resolve, reject) => {
    let url = `https://comercial.cnpj.ws/cnpj-raiz/${raiz}?token=${token}`;
    const opt = ["page", "nome_fantasia", "pais_id", "estado_id", "cidade_id"];

    opt.forEach((option) => {
      if (options[option]) url = `${url}&${option}=${options[option]}`;
    });

    axios({
      method: "get",
      url,
      headers: { "User-Agent": `consultar-cnpj/${pjson.version}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response && error.response.data) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });
};

module.exports.consumo = (token, ano, mes) => {
  if (!token) throw new Error("Token não informado");

  return new Promise((resolve, reject) => {
    let url = `https://comercial.cnpj.ws/consumo?token=${token}`;

    if (ano) url = `${url}&ano=${ano}`;

    if (mes && ano) url = `${url}&mes=${mes}`;

    axios({
      method: "get",
      url,
      headers: { "User-Agent": `consultar-cnpj/${pjson.version}` },
    })
      .then((response) => resolve(response.data.data))
      .catch((error) => {
        if (error.response && error.response.data) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });
};

module.exports.pesquisa = (filtros = null, token, page = 1, limite = 100) => {
  if (!token) throw new Error("Token não informado");

  if (!filtros) throw new Error("Filtros não informados");

  return new Promise((resolve, reject) => {
    let url = `https://comercial.cnpj.ws/pesquisa?page=${page}&limite=${limite}&token=${token}`;
    const fil = [
      "atividade_principal_id",
      "atividade_secundaria_id",
      "atividade_id",
      "natureza_juridica_id",
      "razao_social",
      "nome_fantasia",
      "pais_id",
      "estado_id",
      "cidade_id",
      "cep",
      "situacao_cadastral",
      "data_situacao_cadastral_de",
      "data_situacao_cadastral_ate",
      "porte_id",
      "socio_nome",
      "data_inicio_atividade_de",
      "data_inicio_atividade_ate",
    ];

    fil.forEach((filtro) => {
      if (filtros[filtro]) url = `${url}&${filtro}=${filtros[filtro]}`;
    });

    axios({
      method: "get",
      url,
      headers: { "User-Agent": `consultar-cnpj/${pjson.version}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response && error.response.data) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });
};

module.exports.suframa = (cnpj, inscricao, token) => {
  if (!cnpj) throw new Error("CNPJ não informado");

  if (!inscricao) throw new Error("Inscrição não informada");

  cnpj = cnpj.replace(/[^0-9]/g, "");
  inscricao = inscricao.replace(/[^0-9]/g, "");

  return new Promise((resolve, reject) => {
    let url = 'https://publica.cnpj.ws/suframa'

    if (token)
      url = `https://comercial.cnpj.ws/suframa?token=${token}`;

    axios({
      method: "post",
      url,
      headers: { "User-Agent": `consultar-cnpj/${pjson.version}` },
      data: {
        cnpj, inscricao
      }
    })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response && error.response.data) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });
};

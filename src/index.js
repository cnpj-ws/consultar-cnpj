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
        reject(error.response.data);
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

    opt.forEach(option =>{
      if (options[option]) url = `${url}&${option}=${options[option]}` 
    })

    axios({
      method: "get",
      url,
      headers: { "User-Agent": `consultar-cnpj/${pjson.version}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

module.exports.consumo = (token, ano, mes) => {
  if (!token) throw new Error("Token não informado");

  return new Promise((resolve, reject) => {
    let url = `https://comercial.cnpj.ws/consumo?token=${token}`;

    if (ano) url = `${url}&ano=${ano}`;

    if (mes) url = `${url}&mes=${mes}`;

    axios({
      method: "get",
      url,
      headers: { "User-Agent": `consultar-cnpj/${pjson.version}` },
    })
      .then((response) => resolve(response.data.data))
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

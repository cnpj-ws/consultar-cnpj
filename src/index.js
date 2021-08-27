const axios = require("axios").default;
const pjson = require('../package.json');

module.exports = (cnpj, token) => {
  cnpj = cnpj.replace(/[^0-9]/g, "");

  if (!cnpj) throw new Error("CNPJ não informado");

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

const request = require("request");

module.exports = (cnpj, token) => {
  cnpj = cnpj.replace(/[^0-9]/g, "");

  if (!cnpj) throw new Error("CNPJ não informado");

  return new Promise((resolve, reject) => {
    let url = "https://data.cnpj.ws/";

    if (token) {
      url = `${url}comercial/cnpj/${cnpj}?token=${token}`;
    } else {
      url = `${url}publica/cnpj/${cnpj}`;
    }

    request(url, (error, res, body) => {
      if (error) return reject(error);

      try {
        return resolve(body);
      } catch (e) {
        return reject(e);
      }
    });
  });
};

const request = require("request");

class CNPJws {
  constructor() {
    this.baseURL = "https://data.cnpj.ws/";
  }

  consulta(cnpj, token) {
    cnpj = cnpj.replace(/[^0-9]/g, '')
    
    if (!cnpj) throw new Error('CNPJ não informado')

    return new Promise((resolve, reject) => {
      let url = this.baseURL;

      if (token) {
        url = `${url}comercial/${cnpj}`;
      } else {
        url = `${url}publica/${cnpj}`;
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
  }
}

module.exports = new CNPJws();

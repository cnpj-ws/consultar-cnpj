<p align="center">
  <a href="https://www.cnpj.ws">
    <img src="https://www.cnpj.ws/img/CNPJ-ws-V2.svg" width="300" alt="Logo CNPJ.ws" />
  </a>
</p>

# Consultar CNPJ

Esse pacote permite a consulta da API do CNPJ.ws de maneira gratuita, mas limitada a 4 consultas por minuto 
ou utilizando um token que pode ser obtido no nosso site: [CNPJ.ws](https://www.cnpj.ws)

## Instalação

Utilizando YARN:

```shell
yarn add consultar-cnpj
```

Utilizando NPM:

```shell
npm i consultar-cnpj --save
```

## Utilização

O CNPJ.ws possui uma API Pública e uma Comercial, para utilização da API Pública você não precisa de um token,
 mas caso esteja utilizando a API Comercial você deve passar o token como segundo parâmetro na consulta para 
 utilizar os seus benefícios.

```javascript
const consultarCNPJ = require('consultar-cnpj')

async function getCNPJ(){
  const token = process.env.CNPJWS_TOKEN

  // O Token é opcional
  const empresa = await consultarCNPJ('40154884000153', token)
  console.log(empresa)
}

getCNPJ()
```

## Conclusão

Utilizando a API do CNPJ.ws você obtém os dados das empresas brasileiras de forma simples e fácil, dê uma 
olhada em nossa [documentação](https://www.cnpj.ws/docs/intro).

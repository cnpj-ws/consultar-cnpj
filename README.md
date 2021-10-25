<p align="center">
  <a href="https://www.cnpj.ws">
    <img src="https://www.cnpj.ws/img/CNPJ-ws-V2.svg" width="300" alt="Logo CNPJ.ws" />
  </a>
</p>

# Consultar CNPJ

Esse pacote permite a consulta da API do CNPJ.ws de maneira gratuita, mas limitada a 3 consultas por minuto 
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

```js
const consultarCNPJ = require("consultar-cnpj");

async function getCNPJ() {
  const token = "INFORME O SEU TOKEN DE ACESSO";

  try {
    // O Token é opcional
    const empresa = await consultarCNPJ("40154884000153", token);
    console.log(empresa);
  } catch (e) {
    console.log(e);
  }
}
```

Você pode fazer uma consulta pela Raiz do CNPJ (apenas na API Comercial), que são os primeiros 8 dígitos

```js
const consultarCNPJ = require("consultar-cnpj");

async function getRaiz() {
  const token = "INFORME O SEU TOKEN DE ACESSO";

  try {
    // O Token é obrigatório
    const data = await consultarCNPJ.raiz("40154884", token);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
```

Abaixo o JSON retornado:

```json
{
  "data": [
    "40154884000153",
    "40154884000234"
  ],
  "paginacao": {
    "limite": 20,
    "pagina": 1,
    "paginas": 1,
    "total": 2
  },
  "ordenacao": [],
  "filtros_disponiveis": [
    "nome_fantasia",
    "pais_id",
    "estado_id",
    "cidade_id"
  ],
  "filtros_aplicados": {}
}
```

Você também pode consultar o consumo (apenas na API Comercial), caso esteja usando um token

```js
const consultarCNPJ = require("consultar-cnpj");

async function getConsumo() {
  const token = "INFORME O SEU TOKEN DE ACESSO";

  try {
    // O Token é obrigatório
    const consumo = await consultarCNPJ.consumo(token);
    console.log(consumo);
  } catch (e) {
    console.log(e);
  }
}
```

Você também pode informar o ano e o mês a serem consultados: `consultarCNPJ.consumo(token, ano, mes)`

Abaixo o JSON de retorno da consulta de consumo:

```json
[
  {
    "mes": 9,
    "ano": 2021,
    "quantidade": 1157,
    "atualizado_em": "2021-09-30T23:30:32.414Z",
    "cnpjws_usuario_id": "d046b852-XXXX-XXXX-XXXX-8dccdf11d417"
  }
]
```

## Conclusão

Utilizando a API do CNPJ.ws você obtém os dados das empresas brasileiras de forma simples e fácil, dê uma 
olhada em nossa [documentação](https://www.cnpj.ws/docs/intro).

## Contribuindo

Issues e Pull Requests são bem-vindos.

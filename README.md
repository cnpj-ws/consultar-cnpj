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
 mas caso esteja utilizando a API Comercial você deve passar o token como segundo parâmetro na consulta para utilizar os seus benefícios.

Abaixo um exemplo de consulta de CNPJ:

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

### Consultar/Validar dados no Suframa

No CNPJ.ws você pode consultar o status de um CNPJ e Inscrição na SUFRAMA, essa consulta está disponível na API Pública (com a limitação de 3 consultas por minuto) e na API Comercial.

Você precisa enviar o CNPJ e o número da inscrição suframa para a consulta:

```js
const consultarCNPJ = require("consultar-cnpj");

async function validarSuframa() {
  const token = "INFORME O SEU TOKEN DE ACESSO";

  try {
    // O Token é opcional
    const data = await consultarCNPJ.suframa("61940292006682","210140267", token);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
```

Abaixo o JSON retornado:

```json
{
  "cnpj_raiz": "61940292",
  "cnpj": "61940292006682",
  "inscricao_suframa": "210140267",
  "ativo": true,
  "atualizado_em": "2022-01-16T12:28:32.384Z"
}
```

### Consultar pela Raiz do CNPJ na API Comercial

Você pode fazer uma consulta pela Raiz do CNPJ (apenas na API Comercial), que são os primeiros 8 dígitos.

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

### Fazer pesquisas na API Comercial

Você pode fazer uma pesquisa na API comercial utilizando os seguintes filtros:

| Campo | Descrição |
| ----- | --------- |
|atividade_principal_id|Código CNAE|
|natureza_juridica_id|Código da Natureza Jurídica|
|razao_social|Razão Social|
|nome_fantasia|Nome Fantasia|
|pais_id|Código do País do BACEN|
|estado_id|Código IBGE do estado|
|cidade_id|Código IBGE da Cidade|
|cep|CEP|

```js
const consultarCNPJ = require("consultar-cnpj");

async function getPesquisa() {
  const token = "INFORME O SEU TOKEN DE ACESSO";
  const page = 2

  try {
    // O Token é obrigatório
    const data = await consultarCNPJ.pesquisa({ atividade_principal_id: "6203100", estado_id: 28 }, token, page);
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

### Consultar o consumo na API Comercial

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

Utilizando a API do CNPJ.ws você obtém os dados das empresas brasileiras de forma simples e fácil, dê uma olhada em nossa [documentação](https://www.cnpj.ws/docs/intro).

## Contribuindo

Issues e Pull Requests são bem-vindos.

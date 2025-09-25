declare function consultarCNPJ(
  cnpj: string,
  token?: string
): Promise<consultarCNPJ.Empresa>;

declare namespace consultarCNPJ {
  type DateString = string;

  // Subtipos
  interface Porte {
    id: string;
    descricao: string;
  }
  interface NaturezaJuridica {
    id: string;
    descricao: string;
  }
  interface Qualificacao {
    id: number;
    descricao: string;
  }

  interface Pais {
    id: string;
    iso2: string;
    iso3: string;
    nome: string;
    comex_id: string;
  }

  interface Atividade {
    id: string;
    secao: string;
    divisao: string;
    grupo: string;
    classe: string;
    subclasse: string;
    descricao: string;
  }

  interface Estado {
    id: number;
    nome: string;
    sigla: string;
    ibge_id: number;
  }

  interface Cidade {
    id: number;
    nome: string;
    ibge_id: number;
    siafi_id: string;
  }

  interface MotivoSituacaoCadastral {
    id: number;
    descricao: string;
  }

  interface InscricaoEstadual {
    inscricao_estadual: string;
    ativo: boolean;
    atualizado_em: string;
    estado: Estado;
  }

  interface Socio {
    cpf_cnpj_socio: string;
    nome: string;
    tipo: string;
    data_entrada: string;
    cpf_representante_legal: string;
    nome_representante: string | null;
    faixa_etaria: string;
    atualizado_em: string;
    pais_id: string;
    qualificacao_socio: Qualificacao;
    qualificacao_representante: Qualificacao | null;
    pais: Pais;
  }

  interface Estabelecimento {
    cnpj: string;
    atividades_secundarias: Atividade[];
    cnpj_raiz: string;
    cnpj_ordem: string;
    cnpj_digito_verificador: string;
    tipo: string;
    nome_fantasia: string | null;
    situacao_cadastral: string;
    data_situacao_cadastral: string | null;
    data_inicio_atividade: string;
    nome_cidade_exterior: string | null;
    tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cep: string;
    ddd1: string | null;
    telefone1: string | null;
    ddd2: string | null;
    telefone2: string | null;
    ddd_fax: string | null;
    fax: string | null;
    email: string | null;
    situacao_especial: string | null;
    data_situacao_especial: string | null;
    atualizado_em: string;
    atividade_principal: Atividade;
    pais: Pais;
    estado: Estado;
    cidade: Cidade;
    motivo_situacao_cadastral: MotivoSituacaoCadastral | null;
    inscricoes_estaduais: InscricaoEstadual[];
    inscricoes_suframa: InscricaoSuframaEstabelecimento[];
    regimes_tributarios: RegimeTributario[];
  }

  interface Empresa {
    cnpj_raiz: string;
    razao_social: string;
    capital_social: string;
    responsavel_federativo: string | null;
    atualizado_em: DateString;
    criado_em?: DateString;
    porte: Porte;
    natureza_juridica: NaturezaJuridica;
    qualificacao_do_responsavel: Qualificacao | null;
    socios: Socio[];
    simples: SimplesMei | null;
    estabelecimento: Estabelecimento;

    [key: string]: unknown;
  }

  interface RegimeTributario {
    ano: number;
    regime_tributario: string;
    forma_de_tributacao: string;
    atualizado_em: string;
  }

  interface SuframaInscricao {
    cnpj_raiz: string;
    cnpj: string;
    inscricao_suframa: string;
    ativo: boolean;
    atualizado_em: string;
  }

  interface RaizOptions {
    page?: number;
    nome_fantasia?: string;
    pais_id?: number;
    estado_id?: number;
    cidade_id?: number;
  }

  interface PesquisaFiltros {
    atividade_principal_id?: string;
    atividade_secundaria_id?: string;
    atividade_id?: string;
    natureza_juridica_id?: string;
    razao_social?: string;
    nome_fantasia?: string;
    pais_id?: number;
    estado_id?: number;
    cidade_id?: number;
    cep?: string;
    situacao_cadastral?: string | number;
    data_situacao_cadastral_de?: string;
    data_situacao_cadastral_ate?: string;
    porte_id?: number;
    socio_nome?: string;
    data_inicio_atividade_de?: string;
    data_inicio_atividade_ate?: string;
  }

  interface Paginacao {
    limite: number;
    pagina: number;
    paginas: number;
    total: number;
  }

  interface ListaResponse {
    data: string[];
    paginacao: Paginacao;
    ordenacao: unknown[];
    filtros_disponiveis: string[];
    filtros_aplicados: Record<string, unknown>;
  }

  interface ConsumoItem {
    mes: number;
    ano: number;
    quantidade: number;
    consultas_serpro: number;
    data_inicio: string;
    data_fim: string;
    atualizado_em: string;
    cnpjws_usuario_id: string;
  }

  interface SimplesMei {
    simples: "Sim" | "Não" | string;
    data_opcao_simples: string | null;
    data_exclusao_simples: string | null;
    mei: "Sim" | "Não" | string;
    data_opcao_mei: string | null;
    data_exclusao_mei: string | null;
    atualizado_em: string;
  }

  interface InscricaoSuframaEstabelecimento {
    inscricao_suframa: string;
    ativo: boolean;
    atualizado_em: string;
  }

  function raiz(
    raiz: string,
    token: string,
    options?: consultarCNPJ.RaizOptions
  ): Promise<consultarCNPJ.ListaResponse>;

  function consumo(
    token: string,
    ano?: number,
    mes?: number
  ): Promise<consultarCNPJ.ConsumoItem[]>;

  function pesquisa(
    filtros: consultarCNPJ.PesquisaFiltros,
    token: string,
    page?: number,
    limite?: number
  ): Promise<consultarCNPJ.ListaResponse>;

  function suframa(
    cnpj: string,
    inscricao: string,
    token?: string
  ): Promise<consultarCNPJ.SuframaInscricao>;
}

export = consultarCNPJ;

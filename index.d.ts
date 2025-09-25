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
    motivo_situacao_cadastral: MotivoSituacaoCadastral;
    inscricoes_estaduais: InscricaoEstadual[];
  }

  // Atualize Empresa para usar os subtipos
  interface Empresa {
    cnpj_raiz: string;
    razao_social: string;
    capital_social?: string;
    responsavel_federativo?: string;
    criado_em: DateString;
    atualizado_em: DateString;

    porte: Porte;
    natureza_juridica: NaturezaJuridica;
    qualificacao_do_responsavel: Qualificacao;
    socios: Socio[];
    simples: unknown | null; // ajuste se quiser tipar o modelo de Simples/MEI
    estabelecimento: Estabelecimento;

    [key: string]: unknown;
  }

  // (demais tipos/métodos que você já tem permanecem iguais)
}

export = consultarCNPJ;

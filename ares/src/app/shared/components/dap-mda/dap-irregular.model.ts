
export interface Motivo {
    descricao: string;
    providencia: string;
}

export interface EntidadeEmissora {
    nome: string;
    cnpj: string;
}

export interface DapIrregular {
    numDap: string;
    enquadramento: string;
    dataEmissao: string;
    dataValidade: string;
    municipio: string;
    titular1: string;
    titular1cpf: string;
    titular2: string;
    titular2cpf: string;
    informe: string;
    motivos: Motivo[];
    entidadeEmissora: EntidadeEmissora;
}

